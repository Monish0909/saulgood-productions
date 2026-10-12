"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest, MediaItem } from "@/content/media";
import { Lightbox } from "@/components/ui/Lightbox";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Category mapping helper
const categoryManifestMap: Record<string, { title: string; images: MediaItem[] }> = {
  hotels: {
    title: "Hotels",
    images: mediaManifest.work.hotels,
  },
  resorts: {
    title: "Resorts",
    images: mediaManifest.work.resorts,
  },
  "luxury-villas": {
    title: "Luxury Villas",
    images: mediaManifest.work.villas,
  },
  "hospitality-experiences": {
    title: "Hospitality Experiences",
    images: mediaManifest.work.experiences,
  },
};

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Lightbox state
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const headerItems = sectionRef.current?.querySelectorAll(".work-header-reveal");
      if (headerItems?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            headerItems,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.05,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            headerItems,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 2. 4 Category Cards Reveal
      const cards = cardsRef.current?.querySelectorAll(".category-card");
      if (cards?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            cards,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.05,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const closeLightbox = useCallback(() => setIsLightboxOpen(false), []);

  const openLightbox = (key: string) => {
    setActiveCategoryKey(key);
    setIsLightboxOpen(true);
  };

  const currentGallery = activeCategoryKey
    ? categoryManifestMap[activeCategoryKey]
    : categoryManifestMap["hotels"];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Our Work"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-20">
        {/* Header Block: Label, Heading, Lead, Body & Discover CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-theme-line/60 pb-12">
          <div className="flex flex-col gap-5 max-w-3xl">
            <div className="work-header-reveal">
              <span className="label text-theme-accent-ink">
                {copy.work.label}
              </span>
            </div>
            <div className="work-header-reveal">
              <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
                {copy.work.heading}
              </h2>
            </div>
            <div className="work-header-reveal">
              <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed">
                {copy.work.lead}
              </p>
            </div>
            <div className="work-header-reveal">
              <p className="text-theme-muted text-sm md:text-base font-light leading-relaxed max-w-2xl">
                {copy.work.body}
              </p>
            </div>
          </div>

          {/* CTA: DISCOVER OUR PORTFOLIO */}
          <div className="work-header-reveal flex-shrink-0">
            <button
              type="button"
              onClick={() => openLightbox("hotels")}
              className="label inline-flex items-center gap-2 border border-theme-ink bg-theme-ink px-6 py-4 text-theme-bg text-[11px] font-medium tracking-widest transition-all duration-100 active:scale-[0.97] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
            >
              <span>{copy.work.cta}</span>
              <span className="text-xs">↗</span>
            </button>
          </div>
        </div>

        {/* 4 CategoryCards as tall image tiles in a grid (Desktop: 2x2 or 4-col, Mobile: 1-col) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {copy.work.categories.map((cat, index) => {
            const data = categoryManifestMap[cat.id] || categoryManifestMap["hotels"];
            const coverImage = data.images[0];

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${cat.title} gallery`}
                onClick={() => openLightbox(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(cat.id);
                  }
                }}
                className="category-card group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-ink focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg relative flex flex-col justify-between overflow-hidden border border-theme-line bg-theme-surface aspect-[3/4] md:aspect-[2/3] transition-all hover:border-theme-accent active:scale-[0.98]"
              >
                {/* Background Image with Hover Scale 1.04 */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={coverImage.src}
                    alt={coverImage.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Subtle dark gradient overlay for legibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 transition-opacity group-hover:opacity-90"
                    aria-hidden="true"
                  />
                </div>

                {/* Top index & badge */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <span className="label text-[10px] text-white/70 tracking-widest">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-photo-accent bg-black/40 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                    {data.images.length} FRAMES
                  </span>
                </div>

                {/* Bottom title & tagline */}
                <div className="relative z-10 p-6 flex flex-col gap-2">
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-tight group-hover:text-theme-photo-ink">
                    {cat.title}
                  </h3>
                  <p className="font-serif text-sm text-white/80 italic line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-theme-photo-accent">
                    <span>VIEW GALLERY</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Gallery */}
      {isLightboxOpen && (
        <Lightbox
          isOpen
          onClose={closeLightbox}
          images={currentGallery.images}
          categoryTitle={currentGallery.title}
        />
      )}
    </section>
  );
}
