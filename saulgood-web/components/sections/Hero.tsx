"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Initial Load Reveal
      if (!isReducedMotion && contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll(".hero-reveal");
        gsap.fromTo(
          revealElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }

      // 2. Parallax on Mosaic Grid (y ±3% on scroll)
      if (!isReducedMotion && gridRef.current && sectionRef.current) {
        const photos = gridRef.current.querySelectorAll(".hero-photo");
        photos.forEach((photo, idx) => {
          // Alternate direction/magnitude slightly for depth
          const dir = idx % 2 === 0 ? -3 : 3;
          gsap.fromTo(
            photo,
            { yPercent: -dir },
            {
              yPercent: dir,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-theme-bg flex items-center justify-center pt-20"
      aria-label="Hero Section"
    >
      {/* 4x2 Desktop / 2x4 Mobile Edge-to-Edge Grid of 8 Manifest Photos */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 h-full w-full pointer-events-none select-none"
      >
        {mediaManifest.heroMosaic.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="relative h-full w-full overflow-hidden"
          >
            <div className="hero-photo relative h-[115%] w-full -top-[7.5%]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 4}
                className="object-cover scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Scrim Overlay Ensuring Text Contrast >= 4.5:1 */}
      <div
        className="absolute inset-0 bg-theme-scrim backdrop-blur-[2px] transition-colors pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient Radial Gradient for Center Focus */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center flex flex-col items-center gap-8 text-[#F3EDE2]"
      >
        {/* Eyebrow from content.md */}
        <div className="hero-reveal">
          <span className="label tracking-[0.24em] text-[#C08A4B] md:text-xs">
            {copy.hero.eyebrow}
          </span>
        </div>

        {/* Centered Headline */}
        <div className="hero-reveal max-w-4xl">
          <h1 className="display text-[#F3EDE2] font-light tracking-tight text-balance leading-[1.05]">
            {copy.hero.headline}
          </h1>
        </div>

        {/* Body from content.md */}
        <div className="hero-reveal max-w-2xl">
          <p className="text-sm md:text-base lg:text-lg text-[#F3EDE2]/85 font-light leading-relaxed">
            {copy.hero.body}
          </p>
        </div>

        {/* CTAs with Press Feedback scale 0.97 (100ms) */}
        <div className="hero-reveal flex flex-wrap items-center justify-center gap-5 pt-4">
          <a
            href={copy.hero.ctaPrimary.href}
            onClick={(e) => handleCtaClick(e, copy.hero.ctaPrimary.href)}
            className="label inline-flex items-center justify-center border border-theme-ink bg-theme-ink px-8 py-4 text-theme-bg text-[11px] font-medium tracking-widest transition-all duration-100 active:scale-[0.97] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
          >
            {copy.hero.ctaPrimary.label}
          </a>
          <a
            href={copy.hero.ctaSecondary.href}
            onClick={(e) => handleCtaClick(e, copy.hero.ctaSecondary.href)}
            className="label inline-flex items-center justify-center border border-[#F3EDE2]/40 bg-black/25 backdrop-blur-sm px-8 py-4 text-[#F3EDE2] text-[11px] font-medium tracking-widest transition-all duration-100 active:scale-[0.97] hover:border-[#F3EDE2] hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
          >
            {copy.hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
