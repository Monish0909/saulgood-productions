"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CreativeStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header elements reveal
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

      // 2. 6 Pillars Staggered Reveal
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
            <div className="cs-header-reveal">
              <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
                {copy.creativeStandard.heading}
              </h2>
            </div>
            <div className="cs-header-reveal">
              <p className="font-serif text-xl sm:text-2xl text-theme-muted font-light italic leading-relaxed">
                {copy.creativeStandard.lead}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 pt-2 text-theme-muted font-light text-sm md:text-base leading-relaxed">
            <p className="cs-header-reveal text-theme-ink/90 font-normal">
              {copy.creativeStandard.paragraphs[0]}
            </p>
            <p className="cs-header-reveal">
              {copy.creativeStandard.paragraphs[1]}
            </p>
          </div>
        </div>

        {/* 6 Pillars in a 3x2 Grid (Desktop) / Single Column (Mobile) Separated by Hairlines */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-theme-line/70"
        >
          {copy.creativeStandard.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card border-r border-b border-theme-line/70 p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-theme-surface/30 hover:bg-theme-surface/60 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl md:text-4xl font-light text-theme-accent-ink">
                  0{pillar.id}
                </span>
                <span className="label text-[9px] text-theme-muted tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity">
                  PILLAR
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl md:text-2xl font-light text-theme-ink tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-theme-muted text-sm font-light leading-relaxed">
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
