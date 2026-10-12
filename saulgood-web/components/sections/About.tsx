"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".about-reveal");
      if (!items || !items.length) return;

      if (isReducedMotion) {
        gsap.fromTo(
          items,
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
          items,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="About Us"
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
      >
        {/* Asymmetric Image Column (5 Cols) with "7+ years" Stat Chip */}
        <div className="about-reveal lg:col-span-5 relative w-full flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-theme-line bg-theme-surface">
            <Image
              src={mediaManifest.approachBg.src}
              alt={mediaManifest.approachBg.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Subtle Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* "7+ years" Stat Chip */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 bg-theme-surface/90 border border-theme-line px-5 py-3 backdrop-blur-md shadow-xl">
              <span className="font-serif text-3xl font-light text-theme-ink tracking-tight">
                {copy.about.statChip}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-theme-muted max-w-[100px] leading-tight">
                Production Experience
              </span>
            </div>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-theme-muted">
            {copy.brand.descriptor} · INDIA
          </p>
        </div>

        {/* Text Narrative Column (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="about-reveal">
            <span className="label text-theme-accent">
              {copy.about.label}
            </span>
          </div>

          <div className="about-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
              {copy.about.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-theme-muted font-light leading-relaxed text-base md:text-lg">
            <p className="about-reveal text-theme-ink/90 font-normal">
              {copy.about.paragraphs[0]}
            </p>
            <p className="about-reveal">{copy.about.paragraphs[1]}</p>
            <p className="about-reveal">{copy.about.paragraphs[2]}</p>
            <p className="about-reveal">{copy.about.paragraphs[3]}</p>
          </div>

          {/* Closer line in Accent */}
          <div className="about-reveal border-l-2 border-theme-accent pl-6 py-2 mt-2">
            <p className="font-serif text-lg md:text-xl text-theme-accent italic tracking-wide">
              {copy.about.closer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
