'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  ChevronDown,
  ChefHat,
  Utensils,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import recipesData from '@/data/recipes.json';

export function RecipeList() {
  const [expandedId, setExpandedId] = useState<string | null>(recipesData[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recipesData.map((recipe) => {
          const isExpanded = expandedId === recipe.id;

          return (
            <div
              key={recipe.id}
              id={recipe.id}
              className={`rounded-3xl bg-white border transition-all duration-300 shadow-navy-xs flex flex-col overflow-hidden ${
                isExpanded
                  ? 'border-secondary/40 ring-2 ring-secondary/20 shadow-navy-md'
                  : 'border-border hover:border-secondary/20'
              }`}
            >
              {/* Recipe Card Media */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-surface-alt">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-primary-dark/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <ChefHat className="w-3.5 h-3.5 text-accent" />
                    <span>Serves: {recipe.servings}</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Cook: {recipe.cookTime}</span>
                  </span>
                </div>
              </div>

              {/* Recipe Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-2xl text-primary-dark">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                    {recipe.tagline}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-secondary mt-3">
                    <span>Prep Time: {recipe.prepTime}</span>
                    <span>&bull;</span>
                    <span>Cook Time: {recipe.cookTime}</span>
                  </div>
                </div>

                {/* Accordion Toggle CTA */}
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <button
                    onClick={() => toggleExpand(recipe.id)}
                    className="w-full py-3 px-4 rounded-2xl bg-surface-alt hover:bg-surface text-primary-dark font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-secondary" />
                      <span>{isExpanded ? 'Hide Ingredients & Steps' : 'View Recipe Details'}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-secondary' : 'text-ink-muted'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expandable Accordion Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="border-t border-border bg-surface/50 overflow-hidden"
                  >
                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Ingredients */}
                      <div>
                        <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary-dark mb-3 flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-secondary" />
                          <span>Ingredients Required</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-2 bg-white p-2 rounded-xl border border-border/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Preparation Steps */}
                      <div>
                        <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary-dark mb-3 flex items-center gap-2">
                          <ChefHat className="w-4 h-4 text-secondary" />
                          <span>Step-by-Step Cooking Guide</span>
                        </h4>
                        <ol className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {recipe.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex gap-3 bg-white p-3 rounded-xl border border-border/80">
                              <span className="w-6 h-6 rounded-lg bg-surface-alt font-heading font-black text-xs text-primary flex items-center justify-center shrink-0">
                                {sIdx + 1}
                              </span>
                              <span className="flex-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
