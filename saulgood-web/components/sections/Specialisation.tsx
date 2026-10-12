"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarMobileRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal (runs on all viewports)
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

      // 2. Desktop pinned stage with scrubbed slide swap & image crossfade
      if (pinWrapperRef.current) {
        const wrapper = pinWrapperRef.current;
        const totalSlides = copy.specialisation.services.length;

        // Progress bar scroll trigger
        if (progressBarRef.current) {
          gsap.fromTo(
            progressBarRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }

        if (progressBarMobileRef.current) {
          gsap.fromTo(
            progressBarMobileRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }

        // Stepped progress trigger for changing active service index
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const raw = self.progress * totalSlides;
            const idx = Math.min(Math.floor(raw), totalSlides - 1);
            setActiveIndex(idx);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full border-t border-theme-line bg-theme-bg"
      aria-label="Our Specialisation"
    >
      {/* Header Block */}
      <div className="pt-28 md:pt-36 pb-14 px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 max-w-4xl">
          <div className="spec-header-reveal">
            <span className="label text-theme-accent-ink">
              {copy.specialisation.label}
            </span>
          </div>
          <div className="spec-header-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]">
              Hospitality, through a more <span className="italic font-normal">refined</span> lens.
            </h2>
          </div>
          <div className="spec-header-reveal">
            <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed max-w-[62ch]">
              {copy.specialisation.lead}
            </p>
          </div>
        </div>
      </div>

      {/* Pinned stage (all viewports): scroll swaps the service + crossfades the image */}
      <div
        ref={pinWrapperRef}
        className="relative h-[300svh]"
      >
        <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-start overflow-hidden border-t border-theme-line px-6 pb-4 pt-[4.5rem] md:px-12 lg:justify-center lg:px-12 lg:py-0 xl:px-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-12 xl:gap-20">

            {/* Image stage: top on mobile, right on desktop */}
            <div className="relative order-1 h-[26svh] min-h-[150px] w-full overflow-hidden border border-theme-line bg-theme-surface shadow-md lg:order-2 lg:col-span-7 lg:aspect-[4/3] lg:h-auto lg:min-h-[480px] xl:min-h-[580px]">
              {copy.specialisation.services.map((service, index) => {
                const imgAsset = serviceImages[service.id] || mediaManifest.services.photography;
                const isActive = index === activeIndex;

                return (
                  <div
                    key={service.id}
                    className={`absolute inset-0 h-full w-full transition-all duration-1000 motion-reduce:duration-0 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-[1.05] z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={imgAsset.src}
                      alt={imgAsset.alt}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                );
              })}
            </div>

            {/* Text: below the image on mobile, left on desktop */}
            <div className="relative order-2 flex gap-6 lg:order-1 lg:col-span-5 xl:gap-8">
              {/* Vertical progress line (desktop) */}
              <div className="relative my-2 hidden w-0.5 shrink-0 self-stretch overflow-hidden bg-theme-line/50 lg:block">
                <div
                  ref={progressBarRef}
                  className="absolute inset-x-0 top-0 h-full w-full origin-top bg-theme-accent transition-transform"
                />
              </div>

              <div className="relative flex-1">
                {/* Horizontal progress line (mobile) */}
                <div className="relative mb-4 h-0.5 w-full overflow-hidden bg-theme-line/50 lg:hidden">
                  <div
                    ref={progressBarMobileRef}
                    className="absolute inset-0 origin-left bg-theme-accent"
                  />
                </div>

                <div className="relative min-h-[250px] sm:min-h-[300px] lg:min-h-[440px] flex flex-col justify-start lg:justify-center">
                  {copy.specialisation.services.map((service, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={service.id}
                        className={`flex flex-col gap-2 sm:gap-3 lg:gap-6 transition-all duration-700 motion-reduce:duration-0 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "relative opacity-100 translate-y-0 pointer-events-auto"
                            : "absolute inset-0 opacity-0 translate-y-8 pointer-events-none"
                        }`}
                        aria-hidden={!isActive}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-serif text-3xl font-light tracking-tighter text-theme-accent-ink sm:text-4xl lg:text-5xl xl:text-6xl">
                            {service.number}
                          </span>
                          <span className="label text-[11px] tracking-[0.22em] text-theme-muted">
                            SPECIALISATION
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl font-light leading-[1.05] tracking-tight text-theme-ink sm:text-3xl xl:text-4xl">
                          {service.title}
                        </h3>

                        <p className="max-w-[62ch] font-serif text-base font-light italic leading-snug text-theme-accent-ink lg:text-xl">
                          {service.tagline}
                        </p>

                        <p className="max-w-[62ch] text-[14px] font-light leading-[1.5] text-theme-muted sm:text-[15px] lg:text-[17px] lg:leading-[1.7]">
                          {service.body}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1 lg:pt-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="cursor-default rounded-none border border-theme-line bg-theme-surface/50 px-2.5 py-1 text-[11px] sm:text-xs text-theme-ink/80 transition-all duration-100 hover:border-theme-accent hover:text-theme-ink lg:px-3.5 lg:py-1.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
