"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Heading masked word-by-word reveal
      const words = headingRef.current?.querySelectorAll(".heading-word");
      if (words?.length) {
        if (isReducedMotion) {
          gsap.set(words, { clearProps: "all" });
        } else {
          gsap.fromTo(
            words,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 2. Hairline draw-in
      if (hairlineRef.current) {
        if (isReducedMotion) {
          gsap.set(hairlineRef.current, { clearProps: "all" });
        } else {
          gsap.fromTo(
            hairlineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: hairlineRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 3. Editorial reveals for other content items
      const items = containerRef.current?.querySelectorAll(".philosophy-reveal");
      if (items?.length) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = copy.philosophy.heading.split(" ");

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

        {/* Large Display Heading with Masked Rise */}
        <div className="max-w-4xl">
          <h2
            ref={headingRef}
            className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-theme-ink font-light leading-[1.02] tracking-[-0.02em]"
            aria-label={copy.philosophy.heading}
          >
            {headingWords.map((word, i) => {
              const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
              const isItalic = cleanWord === "details";
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
                  <span className={`heading-word inline-block will-change-transform ${isItalic ? "italic font-normal" : "font-light"}`}>
                    {word}
                  </span>
                  {i < headingWords.length - 1 ? " " : ""}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Lead sentence */}
        <div className="philosophy-reveal max-w-[62ch]">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-theme-ink/90 font-light italic leading-snug">
            {copy.philosophy.lead}
          </p>
        </div>

        {/* Three paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4">
          {copy.philosophy.paragraphs.map((p, index) => (
            <div key={index} className="philosophy-reveal flex flex-col gap-3">
              <span className="text-[11px] font-mono text-theme-accent-ink tracking-[0.22em]">
                0{index + 1}
              </span>
              <p className="text-[17px] text-theme-muted font-light leading-[1.7] max-w-[62ch]">
                {p}
              </p>
            </div>
          ))}
        </div>

        {/* Hairline divider that draws in */}
        <div className="w-full pt-12 md:pt-16">
          <div
            ref={hairlineRef}
            className="w-full h-px bg-theme-line origin-left will-change-transform"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
