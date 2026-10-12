"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhySaulGood() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

      // 2. Hairlines drawing in across the points list
      const hairlines = listRef.current?.querySelectorAll(".point-hairline");
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
                trigger: listRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 3. 5 Points Staggered Reveal
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

  const headingWords = copy.whySaulGood.heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="why-saulgood"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Why SaulGood Productions"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-20">
        {/* Section Heading */}
        <div className="max-w-4xl flex flex-col gap-4">
          <span className="label text-theme-accent-ink">
            THE SAULGOOD STANDARD
          </span>
          <h2
            ref={headingRef}
            className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]"
            aria-label={copy.whySaulGood.heading}
          >
            {headingWords.map((word, i) => {
              const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
              const isItalic = cleanWord === "uncompromising";
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

        {/* 5 Points in a 2-Column Editorial List with Hairline Separators that draw in */}
        <div
          ref={listRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-x-16"
        >
          {/* Top border hairline */}
          <div className="point-hairline absolute top-0 left-0 right-0 h-px bg-theme-line/70 origin-left will-change-transform" aria-hidden="true" />

          {copy.whySaulGood.points.map((point, index) => (
            <div
              key={point.title}
              className={`why-point-item flex flex-col gap-3 py-8 md:py-10 border-b border-theme-line/70 ${
                index === 4 ? "md:col-span-2 md:max-w-xl" : ""
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-theme-accent-ink">
                  [0{index + 1}]
                </span>
                <h3 className="font-serif text-lg md:text-xl font-light text-theme-ink tracking-wide">
                  {point.title}
                </h3>
              </div>
              <p className="text-theme-muted text-[17px] font-light leading-[1.7] pl-8 max-w-[62ch]">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
