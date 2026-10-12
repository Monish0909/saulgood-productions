"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhySaulGood() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Heading reveal
      const headingEl = sectionRef.current?.querySelector(".why-heading-reveal");
      if (headingEl) {
        if (isReducedMotion) {
          gsap.fromTo(
            headingEl,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            headingEl,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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

      // 2. 5 Points Staggered Reveal
      const items = listRef.current?.querySelectorAll(".why-point-item");
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
                trigger: listRef.current,
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
                trigger: listRef.current,
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
      id="why-saulgood"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Why SaulGood Productions"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-20">
        {/* Section Heading */}
        <div className="why-heading-reveal max-w-4xl flex flex-col gap-4">
          <span className="label text-theme-accent-ink">
            THE SAULGOOD STANDARD
          </span>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
            {copy.whySaulGood.heading}
          </h2>
        </div>

        {/* 5 Points in a 2-Column Editorial List with Hairline Separators */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-theme-line/70"
        >
          {copy.whySaulGood.points.map((point, index) => (
            <div
              key={point.title}
              className={`why-point-item flex flex-col gap-3 py-8 md:py-10 border-b border-theme-line/70 ${
                index === 4 ? "md:col-span-2 md:max-w-xl" : ""
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-theme-accent-ink font-medium">
                  [0{index + 1}]
                </span>
                <h3 className="font-serif text-lg md:text-xl font-normal text-theme-ink tracking-wide uppercase">
                  {point.title}
                </h3>
              </div>
              <p className="text-theme-muted text-sm md:text-base font-light leading-relaxed pl-8">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
