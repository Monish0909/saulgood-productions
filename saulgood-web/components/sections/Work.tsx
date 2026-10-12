"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest, MediaItem } from "@/content/media";
import { Lightbox } from "@/components/ui/Lightbox";
import { Magnetic } from "@/components/ui/Magnetic";
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
  const gridRef = useRef<HTMLDivElement>(null);

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

      // 2. Editorial Tiles Reveal
      const tiles = gridRef.current?.querySelectorAll(".work-tile");
      if (tiles?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            tiles,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.05,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            tiles,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
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

  const categories = copy.work.categories;
  const mainCategory = categories[0]; // 1 large tile (Hotels)
  const secondaryCategories = categories.slice(1, 4); // 3 small tiles (Resorts, Villas, Experiences)

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
              <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]">
                Aesthetics that <span className="italic font-normal">speak</span> for themselves.
              </h2>
            </div>
            <div className="work-header-reveal">
              <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed max-w-[62ch]">
                {copy.work.lead}
              </p>
            </div>
            <div className="work-header-reveal">
              <p className="text-theme-muted text-[17px] font-light leading-[1.7] max-w-[62ch]">
                {copy.work.body}
              </p>
            </div>
          </div>

          {/* CTA: DISCOVER OUR PORTFOLIO */}
          <div className="work-header-reveal flex-shrink-0">
            <Magnetic>
              <button
                type="button"
                onClick={() => openLightbox(mainCategory.id)}
                className="label inline-flex items-center gap-2 border border-theme-ink bg-theme-ink px-6 py-4 text-theme-bg text-[11px] font-normal tracking-[0.22em] transition-all duration-100 active:scale-[0.97] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
              >
                <span>{copy.work.cta}</span>
                <span className="text-xs">↗</span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Editorial Grid: 1 Large Tile (col-span-12 lg:col-span-7) + 3 Small Tiles (col-span-12 lg:col-span-5) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* 1. Large Feature Tile */}
          {(() => {
            const data = categoryManifestMap[mainCategory.id] || categoryManifestMap["hotels"];
            const coverImage = data.images[0];

            return (
              <div
                key={mainCategory.id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${data.title} gallery`}
                onClick={() => openLightbox(mainCategory.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(mainCategory.id);
                  }
                }}
                className="work-tile group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-ink lg:col-span-7 relative flex flex-col justify-between overflow-hidden border border-theme-line bg-theme-surface aspect-[4/5] lg:aspect-auto lg:min-h-[640px] shadow-sm transition-all hover:border-theme-accent active:scale-[0.99]"
              >
                {/* Background Image with Hover Scale 1.04 */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={coverImage.src}
                    alt={coverImage.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity group-hover:opacity-95"
                    aria-hidden="true"
                  />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-8 flex items-center justify-between">
                  <span className="label text-[11px] text-white/80 tracking-widest">
                    01 · FEATURED EDITORIAL
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-photo-accent bg-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
                    {data.images.length} FRAMES
                  </span>
                </div>

                {/* Bottom Caption Slide-Up */}
                <div className="relative z-10 p-8 flex flex-col gap-3 transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                    {mainCategory.title}
                  </h3>
                  <p className="font-serif text-lg text-white/90 italic max-w-xl">
                    {mainCategory.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-theme-photo-accent transition-opacity opacity-80 group-hover:opacity-100">
                    <span>EXPLORE COLLECTION</span>
                    <span className="transition-transform group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 2. Three Small Tiles Stacked in the Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {secondaryCategories.map((cat, index) => {
              const data = categoryManifestMap[cat.id] || categoryManifestMap["hotels"];
              const coverImage = data.images[0];
              const displayNumber = `0${index + 2}`;

              return (
                <div
                  key={cat.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${data.title} gallery`}
                  onClick={() => openLightbox(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(cat.id);
                    }
                  }}
                  className="work-tile group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-ink relative flex flex-col justify-between overflow-hidden border border-theme-line bg-theme-surface aspect-[16/9] lg:aspect-[16/8] shadow-sm transition-all hover:border-theme-accent active:scale-[0.99]"
                >
                  {/* Background Image with Hover Scale 1.04 */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={coverImage.src}
                      alt={coverImage.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 transition-opacity group-hover:opacity-95"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                    <span className="label text-[10px] text-white/80 tracking-widest">
                      {displayNumber}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-theme-photo-accent bg-black/50 px-2.5 py-1 backdrop-blur-md border border-white/10">
                      {data.images.length} FRAMES
                    </span>
                  </div>

                  {/* Bottom Caption Slide-Up */}
                  <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-1.5 transition-transform duration-500 ease-out translate-y-1.5 group-hover:translate-y-0">
                    <h3 className="font-serif text-2xl font-light text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="font-serif text-sm text-white/85 italic line-clamp-1">
                      {cat.description}
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-theme-photo-accent">
                      <span>VIEW GALLERY</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
