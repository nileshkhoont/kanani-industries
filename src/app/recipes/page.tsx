import { Metadata } from 'next';
import { ChefHat } from 'lucide-react';
import { RecipeList } from '@/components/recipes/RecipeList';

export const metadata: Metadata = {
  title: 'Authentic Toor Dal Recipes | Gujarati Dal, Dal Tadka, Khichdi & More',
  description:
    'Discover 6 traditional toor dal recipes crafted with Kanani Industries Sortex pigeon peas — Gujarati Dal, Dhaba Dal Tadka, Sambhar, Dal Dhokli, Khichdi, and Puran Poli.',
};

export default function RecipesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-12 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
            <ChefHat className="w-3.5 h-3.5 text-accent" />
            Heritage Kitchen Guides
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight mt-1">
            Toor Dal Culinary Recipes
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl">
            Because Sortex cleaning leaves the natural pulse grain coat pure and unadulterated, Kanani
            toor dal delivers exceptional creamy broth texture, aroma, and fast cooking times.
          </p>
        </div>

        {/* Recipes Grid */}
        <RecipeList />
      </div>
    </div>
  );
}
