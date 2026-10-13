import fs from 'fs/promises';
import path from 'path';

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

class JsonFileStorageAdapter implements StorageAdapter {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  }

  async readProducts(): Promise<unknown[]> {
    const raw = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(raw);
  }

  async updateProductPrice(
    productId: string,
    updates: number | ProductRateUpdate
  ): Promise<{ updatedProduct: unknown; allProducts: unknown[] }> {
    const raw = await fs.readFile(this.filePath, 'utf-8');
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

    // Atomic write via temp file + rename
    const tempFile = `${this.filePath}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(products, null, 2), 'utf-8');
    await fs.rename(tempFile, this.filePath);

    return {
      updatedProduct: updated,
      allProducts: products,
    };
  }
}

// Global storage singleton for seamless swapping with SQL/KV/Blob in future
let storageInstance: StorageAdapter | null = null;

export function getStorage(): StorageAdapter {
  if (!storageInstance) {
    storageInstance = new JsonFileStorageAdapter();
  }
  return storageInstance;
}
