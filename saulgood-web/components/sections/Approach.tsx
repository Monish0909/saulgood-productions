"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const headerItems = sectionRef.current?.querySelectorAll(".approach-header-reveal");
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

      // 2. 5 Steps Staggered Reveal
      const steps = stepsContainerRef.current?.querySelectorAll(".step-item");
      if (steps?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            steps,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.04,
              scrollTrigger: {
                trigger: stepsContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            steps,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stepsContainerRef.current,
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
      id="approach"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Our Approach"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-20">
        {/* Header Block: Label and Heading */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="approach-header-reveal">
            <span className="label text-theme-accent-ink">
              {copy.approach.label}
            </span>
          </div>
          <div className="approach-header-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
              {copy.approach.heading}
            </h2>
          </div>
        </div>

        {/* 5 Steps: Horizontal 5-column timeline with hairlines on Desktop, vertical stack on Mobile */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-5 border-t border-theme-line/70"
        >
          {copy.approach.steps.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className={`step-item flex flex-col justify-between p-6 sm:p-8 md:p-6 lg:p-8 bg-theme-surface/20 hover:bg-theme-surface/50 transition-colors border-b border-theme-line/70 ${
                index < 4 ? "md:border-r border-theme-line/70" : ""
              } group`}
            >
              {/* Top: Step numeral and connector pin */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-theme-line/40 pb-4">
                  <span className="font-serif text-3xl md:text-4xl font-light text-theme-accent-ink tracking-tighter">
                    {stepItem.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-theme-accent/60 group-hover:bg-theme-accent transition-colors" />
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-xl lg:text-2xl font-light text-theme-ink tracking-tight">
                  {stepItem.title}
                </h3>
              </div>

              {/* Bottom: Description */}
              <div className="pt-8">
                <p className="text-theme-muted text-xs sm:text-sm font-light leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
