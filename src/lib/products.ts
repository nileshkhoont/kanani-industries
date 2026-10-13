import { z } from 'zod';
import { getStorage } from './storage';

export const NutritionSchema = z.object({
  energyKcal: z.number().positive(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fiberG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
});

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  mrp: z.number().positive(),
  unit: z.literal('kg'),
  packSizes: z.array(z.number().positive()).min(1),
  images: z.array(z.string()).min(1),
  badges: z.array(z.string()),
  highlights: z.array(z.string()),
  nutritionPer100g: NutritionSchema,
  shelfLife: z.string().min(1),
  inStock: z.boolean(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Nutrition = z.infer<typeof NutritionSchema>;

export async function getAllProducts(): Promise<Product[]> {
  const storage = getStorage();
  const rawProducts = await storage.readProducts();
  const parsed = z.array(ProductSchema).safeParse(rawProducts);
  if (!parsed.success) {
    console.error('Failed to validate products:', parsed.error);
    throw new Error('Invalid products database format');
  }
  return parsed.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}
