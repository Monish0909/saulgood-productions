"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CreativeStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

      // 2. Header text reveals
      const headerItems = sectionRef.current?.querySelectorAll(".cs-header-reveal");
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

      // 3. Hairlines drawing in on the 6 Pillars grid
      const hairlines = containerRef.current?.querySelectorAll(".pillar-hairline");
      if (hairlines?.length) {
        if (isReducedMotion) {
          gsap.set(hairlines, { clearProps: "all" });
        } else {
          gsap.fromTo(
            hairlines,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power2.inOut",
              stagger: 0.08,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 4. 6 Pillars Staggered Card Reveal
      const pillars = containerRef.current?.querySelectorAll(".pillar-card");
      if (pillars?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            pillars,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.04,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            pillars,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
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

  const headingWords = copy.creativeStandard.heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="creative-standard"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Our Creative Standard"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-20 md:gap-24">
        {/* Header Block: Label, Heading, Lead, 2 Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="cs-header-reveal">
              <span className="label text-theme-accent-ink">
                {copy.creativeStandard.label}
              </span>
            </div>

            <div className="max-w-4xl">
              <h2
                ref={headingRef}
                className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]"
                aria-label={copy.creativeStandard.heading}
              >
                {headingWords.map((word, i) => {
                  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                  const isItalic = cleanWord === "process";
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

            <div className="cs-header-reveal">
              <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed max-w-[62ch]">
                {copy.creativeStandard.lead}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 pt-2 text-theme-muted font-light text-[17px] leading-[1.7] max-w-[62ch]">
            <p className="cs-header-reveal text-theme-ink/90 font-light">
              {copy.creativeStandard.paragraphs[0]}
            </p>
            <p className="cs-header-reveal">
              {copy.creativeStandard.paragraphs[1]}
            </p>
          </div>
        </div>

        {/* 6 Pillars in a 3x2 Grid (Desktop) / Single Column (Mobile) Separated by Hairlines that draw in */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-theme-line/70"
        >
          {/* Top border hairline that draws in */}
          <div className="pillar-hairline absolute -top-px left-0 right-0 h-px bg-theme-line/70 origin-left will-change-transform" aria-hidden="true" />

          {copy.creativeStandard.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card border-r border-b border-theme-line/70 p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-theme-surface/30 hover:bg-theme-surface/60 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl md:text-4xl font-light text-theme-accent-ink">
                  0{pillar.id}
                </span>
                <span className="label text-[11px] text-theme-muted tracking-[0.22em] opacity-75 group-hover:opacity-100 transition-opacity">
                  PILLAR
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl md:text-2xl font-light text-theme-ink tracking-tight leading-[1.1]">
                  {pillar.title}
                </h3>
                <p className="text-theme-muted text-[17px] font-light leading-[1.7] max-w-[62ch]">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
