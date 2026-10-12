"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest, MediaItem } from "@/content/media";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Service mapping to manifest items
const serviceImages: Record<string, MediaItem> = {
  "hospitality-photography": mediaManifest.services.photography,
  "cinematic-videography": mediaManifest.services.videography,
  "aerial-visuals": mediaManifest.services.aerial,
};

export function Specialisation() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const headerItems = sectionRef.current?.querySelectorAll(".spec-header-reveal");
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

      // 2. Service Rows reveal + Image scale (1.06 -> 1)
      const rows = rowsRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row) => {
        const textCol = row.querySelector(".service-text");
        const img = row.querySelector(".service-img");

        if (isReducedMotion) {
          gsap.fromTo(
            [textCol, img],
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          // Animate text column
          if (textCol) {
            gsap.fromTo(
              textCol,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Image scale 1.06 -> 1.00 on reveal
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.06, opacity: 0.8 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Our Specialisation"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-24">
        {/* Header Block */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="spec-header-reveal">
            <span className="label text-theme-accent">
              {copy.specialisation.label}
            </span>
          </div>
          <div className="spec-header-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
              {copy.specialisation.heading}
            </h2>
          </div>
          <div className="spec-header-reveal">
            <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed">
              {copy.specialisation.lead}
            </p>
          </div>
        </div>

        {/* 3 ServiceRows (Alternating image side on desktop, stacked on mobile) */}
        <div ref={rowsRef} className="flex flex-col gap-28 md:gap-36">
          {copy.specialisation.services.map((service, index) => {
            const isImageLeft = index % 2 === 1; // Row 02 has image on left
            const imgAsset = serviceImages[service.id] || mediaManifest.services.photography;

            return (
              <div
                key={service.id}
                className="service-row grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-theme-line/60 pt-16"
              >
                {/* Text Content Column */}
                <div
                  className={`service-text lg:col-span-6 flex flex-col gap-6 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Large Numeral in Accent */}
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-theme-accent tracking-tighter">
                      {service.number}
                    </span>
                    <span className="label text-[10px] text-theme-muted tracking-[0.25em]">
                      SPECIALISATION
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-theme-ink font-normal tracking-tight">
                    {service.title}
                  </h3>

                  {/* Italic Serif Tagline */}
                  <p className="font-serif text-lg sm:text-xl text-theme-accent italic leading-snug">
                    {service.tagline}
                  </p>

                  {/* Body Paragraph */}
                  <p className="text-theme-muted font-light leading-relaxed text-sm md:text-base">
                    {service.body}
                  </p>

                  {/* Bordered Tag Chips with Press Feedback */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="cursor-default rounded-none border border-theme-line bg-theme-surface/50 px-3.5 py-1.5 text-xs text-theme-ink/80 transition-all duration-100 active:scale-[0.97] hover:border-theme-accent hover:text-theme-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Manifest Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden border border-theme-line bg-theme-surface">
                    <div className="service-img relative h-full w-full">
                      <Image
                        src={imgAsset.src}
                        alt={imgAsset.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
