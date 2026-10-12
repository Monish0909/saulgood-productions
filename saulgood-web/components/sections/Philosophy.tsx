"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".philosophy-reveal");
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
      id="philosophy"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Philosophy"
    >
      <div
        ref={containerRef}
        className="mx-auto max-w-5xl flex flex-col gap-12 md:gap-16"
      >
        {/* Label */}
        <div className="philosophy-reveal">
          <span className="label text-theme-accent-ink">
            {copy.philosophy.label}
          </span>
        </div>

        {/* Large Display Heading */}
        <div className="philosophy-reveal max-w-4xl">
          <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-theme-ink font-light leading-[1.08] tracking-tight">
            {copy.philosophy.heading}
          </h2>
        </div>

        {/* Lead sentence */}
        <div className="philosophy-reveal max-w-3xl">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-theme-ink/90 font-light italic leading-snug">
            {copy.philosophy.lead}
          </p>
        </div>

        {/* Three paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4">
          {copy.philosophy.paragraphs.map((p, index) => (
            <div key={index} className="philosophy-reveal flex flex-col gap-3">
              <span className="text-[11px] font-mono text-theme-accent-ink/80 tracking-widest">
                0{index + 1}
              </span>
              <p className="text-sm md:text-base text-theme-muted font-light leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>

        {/* Hairline divider */}
        <div className="philosophy-reveal w-full border-t border-theme-line pt-12 md:pt-16">
          {/* Closer as a pull-quote */}
          <blockquote className="max-w-3xl">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-theme-ink font-normal tracking-wide leading-tight">
              “{copy.philosophy.closer}”
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
