import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

export interface ProductRateUpdate {
  price?: number;
  mrp?: number;
}

export interface StorageAdapter {
  readProducts(): Promise<unknown[]>;
  updateProductPrice(
    productId: string,
    updates: number | ProductRateUpdate
  ): Promise<{ updatedProduct: unknown; allProducts: unknown[] }>;
}

function mergeWithBundled(
  bundled: Array<Record<string, unknown>>,
  dynamicList: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  if (!Array.isArray(bundled) || bundled.length === 0) return dynamicList;
  if (!Array.isArray(dynamicList) || dynamicList.length === 0) return bundled;

  const dynMap = new Map<string, Record<string, unknown>>();
  for (const item of dynamicList) {
    if (item && typeof item === 'object' && typeof item.id === 'string') {
      dynMap.set(item.id, item);
    }
  }

  return bundled.map((b) => {
    const dyn = dynMap.get(b.id as string);
    if (!dyn) return b;
    return {
      ...b,
      price: dyn.price !== undefined ? dyn.price : b.price,
      mrp: dyn.mrp !== undefined ? dyn.mrp : b.mrp,
      inStock: dyn.inStock !== undefined ? dyn.inStock : b.inStock,
      updatedAt: dyn.updatedAt || b.updatedAt,
    };
  });
}

/**
 * Hybrid file storage that handles local development (src/data/products.json)
 * and serverless / Vercel read-only filesystems (/tmp/kanani-products.json) seamlessly.
 */
class HybridFileStorageAdapter implements StorageAdapter {
  private bundledFilePath: string;
  private activeFilePath: string;
  private inMemoryCache: unknown[] | null = null;

  constructor() {
    this.bundledFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

    // On Vercel / AWS Lambda / Serverless, root /var/task is strictly read-only (EROFS).
    // The only writable path in serverless functions is os.tmpdir() (/tmp).
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.VERCEL_ENV ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT ||
      process.env.NETLIFY ||
      (process.env.NODE_ENV === 'production' && !process.env.LOCAL_DEV)
    );

    if (isServerless) {
      this.activeFilePath = path.join(os.tmpdir(), 'kanani-products.json');
    } else {
      this.activeFilePath = this.bundledFilePath;
    }
  }

  private async ensureActiveFile(): Promise<void> {
    if (this.activeFilePath !== this.bundledFilePath && !existsSync(this.activeFilePath)) {
      try {
        const initialData = await fs.readFile(this.bundledFilePath, 'utf-8');
        await fs.writeFile(this.activeFilePath, initialData, 'utf-8');
      } catch (err) {
        console.error('Could not initialize /tmp products file:', err);
      }
    }
  }

  async readBundledProducts(): Promise<unknown[]> {
    try {
      const raw = await fs.readFile(this.bundledFilePath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async readProducts(): Promise<unknown[]> {
    if (process.env.NODE_ENV === 'development') {
      try {
        const raw = await fs.readFile(this.bundledFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.inMemoryCache = parsed;
        return parsed;
      } catch (err) {
        console.error('Error reading bundled products.json:', err);
      }
    }

    if (this.inMemoryCache && Array.isArray(this.inMemoryCache) && this.inMemoryCache.length > 0) {
      return this.inMemoryCache;
    }

    await this.ensureActiveFile();
    try {
      const raw = await fs.readFile(this.activeFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (this.activeFilePath !== this.bundledFilePath) {
        const bundled = (await this.readBundledProducts()) as Array<Record<string, unknown>>;
        const merged = mergeWithBundled(bundled, parsed as Array<Record<string, unknown>>);
        this.inMemoryCache = merged;
        return merged;
      }
      this.inMemoryCache = parsed;
      return parsed;
    } catch {
      // Fallback to bundled file if reading active path fails
      const raw = await fs.readFile(this.bundledFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      this.inMemoryCache = parsed;
      return parsed;
    }
  }

  async updateProductPrice(
    productId: string,
    updates: number | ProductRateUpdate
  ): Promise<{ updatedProduct: unknown; allProducts: unknown[] }> {
    await this.ensureActiveFile();

    let raw: string;
    try {
      raw = await fs.readFile(this.activeFilePath, 'utf-8');
    } catch {
      raw = await fs.readFile(this.bundledFilePath, 'utf-8');
    }

    const products: Array<Record<string, unknown>> = JSON.parse(raw);

    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
      throw new Error(`Product with ID "${productId}" not found`);
    }

    const current = products[index];
    const currentPrice = Number(current.price);
    const currentMrp = Number(current.mrp);

    let targetPrice = currentPrice;
    let targetMrp = currentMrp;

    if (typeof updates === 'number') {
      targetPrice = Math.round(updates * 100) / 100;
    } else {
      if (updates.price !== undefined) {
        targetPrice = Math.round(updates.price * 100) / 100;
      }
      if (updates.mrp !== undefined) {
        targetMrp = Math.round(updates.mrp * 100) / 100;
      }
    }

    if (targetPrice > targetMrp) {
      throw new Error(`Selling Price (₹${targetPrice}) cannot exceed MRP (₹${targetMrp})`);
    }

    const updated = {
      ...current,
      price: targetPrice,
      mrp: targetMrp,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updated;
    this.inMemoryCache = products;

    // Atomic write to active file. If EROFS / read-only error occurs, divert to /tmp automatically.
    try {
      const tempFile = `${this.activeFilePath}.${Date.now()}.tmp`;
      await fs.writeFile(tempFile, JSON.stringify(products, null, 2), 'utf-8');
      await fs.rename(tempFile, this.activeFilePath);
    } catch (err: unknown) {
      const isErofs =
        (err as { code?: string }).code === 'EROFS' ||
        (err as { code?: string }).code === 'EACCES' ||
        (err as Error).message?.includes('read-only');

      if (isErofs) {
        try {
          this.activeFilePath = path.join(os.tmpdir(), 'kanani-products.json');
          const tempFile = `${this.activeFilePath}.${Date.now()}.tmp`;
          await fs.writeFile(tempFile, JSON.stringify(products, null, 2), 'utf-8');
          await fs.rename(tempFile, this.activeFilePath);
        } catch (tmpErr) {
          console.warn('Could not write to /tmp fallback either:', tmpErr);
        }
      } else {
        console.warn('Storage file write warning:', err);
      }
    }

    return {
      updatedProduct: updated,
      allProducts: products,
    };
  }
}

/**
 * Cloud Storage Adapter for Vercel KV / Upstash Redis.
 * Activates automatically when KV_REST_API_URL or UPSTASH_REDIS_REST_URL is configured.
 */
class UpstashRedisStorageAdapter implements StorageAdapter {
  private url: string;
  private token: string;
  private fallback: HybridFileStorageAdapter;

  constructor(url: string, token: string) {
    this.url = url.replace(/\/$/, '');
    this.token = token;
    this.fallback = new HybridFileStorageAdapter();
  }

  async readProducts(): Promise<unknown[]> {
    try {
      const res = await fetch(`${this.url}/get/kanani:products`, {
        headers: { Authorization: `Bearer ${this.token}` },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.result !== null && data.result !== undefined) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed) && parsed.length > 0) {
            const bundled = (await this.fallback.readBundledProducts()) as Array<Record<string, unknown>>;
            const merged = mergeWithBundled(bundled, parsed as Array<Record<string, unknown>>);
            
            // Check if Redis stored outdated image paths or fields, and resync in background if needed
            const needsSync = JSON.stringify(parsed) !== JSON.stringify(merged);
            if (needsSync) {
              this.saveToRedis(merged).catch((e) => console.warn('Redis sync error:', e));
            }
            return merged;
          }
        }
      }

      // Seed KV if empty
      const initial = await this.fallback.readProducts();
      await this.saveToRedis(initial);
      return initial;
    } catch (err) {
      console.warn('Redis read failed, falling back to hybrid storage:', err);
      return this.fallback.readProducts();
    }
  }

  private async saveToRedis(products: unknown[]): Promise<void> {
    try {
      // Upstash REST API command array execution
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['SET', 'kanani:products', JSON.stringify(products)]),
      });

      if (!res.ok) {
        // Fallback endpoint style
        await fetch(`${this.url}/set/kanani:products`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSON.stringify(products)),
        });
      }
    } catch (err) {
      console.warn('saveToRedis failed:', err);
    }
  }

  async updateProductPrice(
    productId: string,
    updates: number | ProductRateUpdate
  ): Promise<{ updatedProduct: unknown; allProducts: unknown[] }> {
    const rawProducts = await this.readProducts();
    const products: Array<Record<string, unknown>> = Array.isArray(rawProducts)
      ? (rawProducts as Array<Record<string, unknown>>)
      : [];

    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
      throw new Error(`Product with ID "${productId}" not found`);
    }

    const current = products[index];
    const currentPrice = Number(current.price);
    const currentMrp = Number(current.mrp);

    let targetPrice = currentPrice;
    let targetMrp = currentMrp;

    if (typeof updates === 'number') {
      targetPrice = Math.round(updates * 100) / 100;
    } else {
      if (updates.price !== undefined) {
        targetPrice = Math.round(updates.price * 100) / 100;
      }
      if (updates.mrp !== undefined) {
        targetMrp = Math.round(updates.mrp * 100) / 100;
      }
    }

    if (targetPrice > targetMrp) {
      throw new Error(`Selling Price (₹${targetPrice}) cannot exceed MRP (₹${targetMrp})`);
    }

    const updated = {
      ...current,
      price: targetPrice,
      mrp: targetMrp,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updated;

    try {
      await this.saveToRedis(products);
    } catch (err) {
      console.warn('Failed to update Redis, updating fallback:', err);
      await this.fallback.updateProductPrice(productId, updates);
    }

    return {
      updatedProduct: updated,
      allProducts: products,
    };
  }
}

// Global storage singleton
let storageInstance: StorageAdapter | null = null;

export function getStorage(): StorageAdapter {
  if (!storageInstance) {
    const kvUrl =
      process.env.KV_REST_API_URL ||
      process.env.UPSTASH_REDIS_REST_URL ||
      process.env.UPSTASH_REST_API_URL ||
      process.env.REDIS_REST_URL;
    const kvToken =
      process.env.KV_REST_API_TOKEN ||
      process.env.UPSTASH_REDIS_REST_TOKEN ||
      process.env.UPSTASH_REST_API_TOKEN ||
      process.env.REDIS_REST_TOKEN;

    if (kvUrl && kvToken) {
      storageInstance = new UpstashRedisStorageAdapter(kvUrl, kvToken);
    } else {
      storageInstance = new HybridFileStorageAdapter();
    }
  }
  return storageInstance;
}

export function getStorageMode(): 'cloud' | 'ephemeral' {
  const kvUrl =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REST_API_URL ||
    process.env.REDIS_REST_URL;
  const kvToken =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN;
  return Boolean(kvUrl && kvToken) ? 'cloud' : 'ephemeral';
}
