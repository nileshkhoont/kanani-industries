"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  bgImage: string;
  alt: string;
  headline: string;
  subtextPart1: string;
  highlightWord: string;
  subtextPart2: string;
}

const slides: Slide[] = [
  {
    id: "protein-purity",
    bgImage: "/images/hero/toor-grains-hero.jpg",
    alt: "Purity That Powers Nutrition - Authentic Gujarat Whole Toor",
    headline: "Protein That Powers Nutrition",
    subtextPart1: "Delivering ",
    highlightWord: "consistency, quality, and taste",
    subtextPart2: " in every single grain.",
  },
  {
    id: "worldwide-network",
    bgImage: "/images/hero/world-network-hd.png",
    alt: "Kanani Industries Worldwide Export & Distribution Network",
    headline: "Kanani Industries",
    subtextPart1: "Sourcing Gujarat’s Finest Toor: Your ",
    highlightWord: "Trusted",
    subtextPart2: " Export Partner.",
  },
  {
    id: "direct-milling",
    bgImage: "/images/hero/hero-slide-3.jpg",
    alt: "Kanani Industries Modern Junagadh Mill Facility and Bulk Dispatch",
    headline: "Direct From Junagadh Mills",
    subtextPart1: "Empowering ",
    highlightWord: "traders & wholesalers",
    subtextPart2: " with 28+ years of dependable Saurashtra supply.",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  // Autoplay (6.5s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  // Touch navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      paginate(diff > 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] lg:h-[720px] overflow-hidden select-none bg-[#F6F2EA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Kanani Industries Hero Carousel"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* ========================================================= */}
          {/* FULL MAP ON RIGHT & BACKGROUND LAYER                      */}
          {/* ========================================================= */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#F6F2EA]">
            {slide.id === "worldwide-network" ? (
              <div className="absolute inset-0 w-full h-full flex justify-end items-center pointer-events-none">
                <div className="relative w-full md:w-[68%] lg:w-[62%] xl:w-[58%] h-[82%] sm:h-[88%] md:h-[92%] mr-0 sm:mr-3 md:mr-6 lg:mr-10">
                  <Image
                    src={slide.bgImage}
                    alt={slide.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 65vw"
                    className="object-contain object-center md:object-right opacity-20 sm:opacity-35 md:opacity-100 transition-opacity duration-300"
                  />
                  {/* Soft light veil on mobile to guarantee crystal-clear text contrast */}
                  <div className="absolute inset-0 bg-[#F6F2EA]/30 md:hidden pointer-events-none" />
                </div>
              </div>
            ) : (
              <Image
                src={slide.bgImage}
                alt={slide.alt}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            )}
          </div>

          {/* ========================================================= */}
          {/* CLEAN, ELEGANT TEXT OVERLAY (ON LEFT WITH ZERO OVERLAP)   */}
          {/* ========================================================= */}
          <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-10 sm:px-14 lg:px-20 pointer-events-none">
            <div className="max-w-md sm:max-w-lg lg:max-w-xl text-center md:text-left pointer-events-auto">
              {/* Bold Serif Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A1B14] tracking-tight leading-[1.15] drop-shadow-[0_1px_1px_rgba(246,242,234,0.8)]">
                {slide.headline}
              </h1>

              {/* Subtitle with highlighted terracotta keyword */}
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[#3A2D24] font-medium sm:font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(246,242,234,0.8)]">
                {slide.subtextPart1}
                <span className="text-[#C84C27] font-bold">
                  {slide.highlightWord}
                </span>
                {slide.subtextPart2}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ============================================================= */}
      {/* MINIMALIST CHEVRON NAVIGATION ARROWS (< and >) - HIDDEN ON MOBILE */}
      {/* ============================================================= */}
      <button
        onClick={() => paginate(-1)}
        className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 items-center justify-center text-[#2A1B14]/70 hover:text-[#2A1B14] hover:bg-white/50 rounded-full transition-all z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.75]" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 items-center justify-center text-[#2A1B14]/70 hover:text-[#2A1B14] hover:bg-white/50 rounded-full transition-all z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.75]" />
      </button>

      {/* ============================================================= */}
      {/* BOTTOM PAGINATION DOTS                                        */}
      {/* ============================================================= */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              current === idx
                ? "w-7 h-2 bg-[#C84C27]"
                : "w-2 h-2 bg-[#D1C5B6] hover:bg-[#A89886]"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
