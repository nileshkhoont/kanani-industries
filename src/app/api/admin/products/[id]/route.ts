import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PriceUpdateSchema } from '@/lib/validators';
import { verifyAdminToken, JWT_COOKIE_NAME } from '@/lib/auth';
import { getStorage } from '@/lib/storage';
import { getProductById } from '@/lib/products';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // 1. Verify same-origin
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json(
            { error: 'Cross-origin requests are forbidden' },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json({ error: 'Invalid origin header' }, { status: 403 });
      }
    }

    // 2. Verify admin JWT
    const token = request.cookies.get(JWT_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: missing token' }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized: invalid or expired token' }, { status: 401 });
    }

    // 3. Find target product
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: `Product with id "${id}" not found` }, { status: 404 });
    }

    // 4. Validate payload (Price ONLY, strict mode rejects all other fields)
    const body = await request.json().catch(() => null);
    const parsed = PriceUpdateSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json(
        { error: `Validation error: ${errorMsg}` },
        { status: 400 }
      );
    }

    const { price, mrp } = parsed.data;

    const targetPrice = price !== undefined ? price : existingProduct.price;
    const targetMrp = mrp !== undefined ? mrp : existingProduct.mrp;

    // 5. Check selling price <= MRP
    if (targetPrice > targetMrp) {
      return NextResponse.json(
        {
          error: `Selling Price (₹${targetPrice}) cannot exceed MRP (₹${targetMrp})`,
        },
        { status: 400 }
      );
    }

    // 6. Atomic write via storage adapter
    const storage = getStorage();
    const { updatedProduct } = await storage.updateProductPrice(id, { price, mrp });

    // 7. On-demand cache revalidation for instant reflection across entire site
    revalidatePath('/admin', 'page');
    revalidatePath('/admin');
    revalidatePath('/', 'page');
    revalidatePath('/products', 'page');
    revalidatePath(`/products/${existingProduct.slug}`, 'page');

    return NextResponse.json({
      success: true,
      message: `Rates for ${existingProduct.name} successfully updated (Price: ₹${targetPrice}/kg, MRP: ₹${targetMrp}/kg)`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product price:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update product price' },
      { status: 500 }
    );
  }
}
