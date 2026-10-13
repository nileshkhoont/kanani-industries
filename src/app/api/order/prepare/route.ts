import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAllProducts } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { CheckoutFormSchema } from '@/lib/validators';
import { formatPrice } from '@/lib/format';

const OrderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  packSize: z.number().positive('Pack size must be positive'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(500, 'Max quantity is 500 per line'),
});

const ServerOrderRequestSchema = z.object({
  customer: CheckoutFormSchema,
  items: z.array(OrderItemSchema).min(1, 'At least one item is required in the order'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = ServerOrderRequestSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMsg}` },
        { status: 400 }
      );
    }

    const { customer, items } = parsed.data;

    // Load authentic, tamper-proof products directly from products.json on the server
    const serverProducts = await getAllProducts();

    let serverGrandTotal = 0;
    const verifiedOrderLines: Array<{
      name: string;
      brand: string;
      packSize: number;
      quantity: number;
      unitPricePerKg: number;
      lineTotal: number;
    }> = [];

    // Verify every single item and strictly use server prices
    for (const item of items) {
      const foundProduct = serverProducts.find((p) => p.id === item.productId);

      if (!foundProduct) {
        return NextResponse.json(
          { error: `Product with ID "${item.productId}" does not exist in catalog.` },
          { status: 400 }
        );
      }

      if (!foundProduct.inStock) {
        return NextResponse.json(
          { error: `${foundProduct.name} (${foundProduct.brand}) is currently out of stock.` },
          { status: 400 }
        );
      }

      if (!foundProduct.packSizes.includes(item.packSize)) {
        return NextResponse.json(
          { error: `Invalid pack size (${item.packSize}kg) for ${foundProduct.name}.` },
          { status: 400 }
        );
      }

      // Server calculates the exact price - completely immune to any client-side inspect edits
      const unitPrice = foundProduct.price;
      const lineTotal = unitPrice * item.packSize * item.quantity;
      serverGrandTotal += lineTotal;

      verifiedOrderLines.push({
        name: foundProduct.name,
        brand: foundProduct.brand,
        packSize: item.packSize,
        quantity: item.quantity,
        unitPricePerKg: unitPrice,
        lineTotal,
      });
    }

    // Build official tamper-proof WhatsApp order dispatch text
    let message = `*NEW ORDER - KANANI INDUSTRIES*\n`;
    message += `-----------------------------------------\n`;
    message += `*Customer:* ${customer.fullName}\n`;
    message += `*Phone:* ${customer.phone}\n`;
    message += `*Delivery Address:*\n${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}\n`;
    if (customer.notes && customer.notes.trim()) {
      message += `*Instructions:* ${customer.notes.trim()}\n`;
    }
    message += `-----------------------------------------\n`;
    message += `*VERIFIED ORDER ITEMS:*\n`;

    verifiedOrderLines.forEach((line, idx) => {
      message += `${idx + 1}. *${line.name}* (${line.brand})\n`;
      message += `   Pack Size: ${line.packSize}kg bag | Qty: ${line.quantity}\n`;
      message += `   Line Price: ₹${line.lineTotal} (₹${line.unitPricePerKg}/kg)\n`;
    });

    message += `-----------------------------------------\n`;
    message += `*TOTAL AMOUNT:* ₹${serverGrandTotal}\n`;
    message += `*Dispatch Location:* Gujarat Facility\n`;
    message += `*Pricing Status:* Verified from Official Mill Database\n`;
    message += `\nPlease confirm my order and share dispatch timeline. Thank you!`;

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      grandTotal: serverGrandTotal,
      formattedTotal: formatPrice(serverGrandTotal),
      lines: verifiedOrderLines,
    });
  } catch (error) {
    console.error('Order preparation error:', error);
    return NextResponse.json(
      { error: 'An error occurred while validating your order.' },
      { status: 500 }
    );
  }
}
