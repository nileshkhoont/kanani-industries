'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, ChefHat, ChevronLeft, ChevronRight } from 'lucide-react';
import recipesData from '@/data/recipes.json';

export function RecipeTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? recipesData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === recipesData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              Kitchen Inspirations
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
              Traditional Toor Dal Delicacies
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-xl">
              From comforting everyday Gujarati dal to savory Dal Dhokli and festive sweet Puran Poli,
              discover tested authentic recipes using Kanani Industries dals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous recipe slide"
              className="p-3 rounded-full bg-white border border-border shadow-navy-xs text-primary-dark hover:bg-surface-alt transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next recipe slide"
              className="p-3 rounded-full bg-white border border-border shadow-navy-xs text-primary-dark hover:bg-surface-alt transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/recipes"
              className="ml-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
            >
              <span>View All 6 Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            recipesData[currentIndex % recipesData.length],
            recipesData[(currentIndex + 1) % recipesData.length],
            recipesData[(currentIndex + 2) % recipesData.length],
          ].map((recipe) => (
            <div
              key={recipe.id}
              className="group rounded-3xl bg-white border border-border overflow-hidden shadow-navy-xs hover:shadow-navy-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-alt">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary-dark/85 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-accent" />
                  <span>{recipe.cookTime}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-primary-dark group-hover:text-secondary transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1.5 leading-relaxed line-clamp-2">
                    {recipe.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs font-semibold text-secondary">
                    Serves {recipe.servings}
                  </span>
                  <Link
                    href={`/recipes#${recipe.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-dark hover:text-secondary transition-colors"
                  >
                    <span>Read Recipe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
