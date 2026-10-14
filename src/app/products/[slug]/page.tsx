import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = `${product.name} (${product.brand}) - Sortex Toor Dal`;
  const description = `${product.shortDescription} Selling rate ₹${product.price}/kg (MRP ₹${product.mrp}). 100% Sortex cleaned Gujarat pigeon peas.`;
  const imageUrl = product.images[0] ? `${siteConfig.url}${product.images[0]}` : siteConfig.logo.ogImage;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/products/${product.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1000,
          height: 1000,
          alt: `${product.name} - ${product.brand}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  // Schema.org Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `${product.name} - ${product.brand}`,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
