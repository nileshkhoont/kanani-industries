const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return inrFormatter.format(amount);
}

export function calculateDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatWeight(sizeInKg: number): string {
  if (sizeInKg < 1) {
    return `${Math.round(sizeInKg * 1000)}g`;
  }
  return `${sizeInKg} kg`;
}

export function calculatePackPrice(pricePerKg: number, packSizeInKg: number): number {
  return Math.round(pricePerKg * packSizeInKg * 100) / 100;
}
