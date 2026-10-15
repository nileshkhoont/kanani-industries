'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Bhaveshbhai Patel',
    role: 'Wholesale Grain Distributor, APMC Ahmedabad',
    image: '/images/testimonials/avatar-1.jpg',
    quote:
      'We have traded Kanani Industries Savaj Brand toor for over 8 years. Their Sortex consistency is unmatched in Gujarat — virtually zero foreign grain, spotless yellow color, and reliable delivery dispatch during peak harvest seasons.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rajesh Mehta',
    role: 'Procurement Head, Western Retail Stores, Mumbai',
    image: '/images/testimonials/avatar-2.jpg',
    quote:
      'Our retail customers specifically ask for Ganesh Brand Varjin Toor. The grain cooks evenly into a luscious thick gravy without breaking down into mush. The sealed packaging keeps it fresh on supermarket shelves.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatima Al-Mansoor',
    role: 'Foodstuff Import Director, Dubai, UAE',
    image: '/images/testimonials/avatar-3.jpg',
    quote:
      'Importing 50kg bulk containers from Kanani Industries has been seamless. Phytosanitary certificates, SGS inspection, and container stuffing at Mundra port are managed with total professionalism.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Geetaben Shah',
    role: 'Homemaker & Catering Lead, Rajkot',
    image: '/images/testimonials/avatar-4.jpg',
    quote:
      'The Natural Brand unpolished toor has that real rustic village aroma. You can tell there is no artificial shine or oil coating. My family loves the authentic sweet taste in our daily meals.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28 bg-surface-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Client Voices &amp; Culinary Trust
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
            Trusted by Millers, Importers &amp; Homes
          </h2>
        </div>

        {/* Carousel Container with Pause on Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto bg-white rounded-3xl border border-border shadow-navy-md p-8 sm:p-12"
        >
          <Quote className="w-12 h-12 text-secondary/20 absolute top-8 right-8" />

          {/* Active Testimonial */}
          <div className="space-y-6">
            <div className="flex items-center gap-1 text-accent">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <p className="text-base sm:text-lg text-ink font-medium leading-relaxed italic">
              “{testimonials[currentIndex].quote}”
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-alt shrink-0 border border-border">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-base text-primary-dark">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-xs text-ink-muted">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-border hover:bg-ink-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full border border-border text-primary hover:bg-surface-alt transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full border border-border text-primary hover:bg-surface-alt transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
