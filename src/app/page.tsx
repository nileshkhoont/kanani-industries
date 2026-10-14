import { getAllProducts } from '@/lib/products';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { StatsSection } from '@/components/home/StatsSection';
import { ProcessTeaser } from '@/components/home/ProcessTeaser';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { LifestyleBadges } from '@/components/home/LifestyleBadges';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Trust Strip */}
      <TrustStrip />

      {/* 5. About Teaser */}
      <AboutTeaser />

      {/* 6. Featured Products (All 4 Products) */}
      <FeaturedProducts products={products} />

      {/* 7. Animated Stat Counters */}
      <StatsSection />

      {/* 8. Our Sortex Process */}
      <ProcessTeaser />

      {/* 9. Why Choose Kanani */}
      <WhyChooseUs />

      {/* 10. Lifestyle Badges */}
      <LifestyleBadges />
    </>
  );
}
