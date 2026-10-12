"use client";

import React, { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { AccordionGallery } from "@/components/ui/AccordionGallery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mq = window.matchMedia("(max-width: 767px)");
    const syncOrientation = () => setVertical(mq.matches);
    syncOrientation();
    mq.addEventListener("change", syncOrientation);

    const ctx = gsap.context(() => {
      // 1. Header reveal (runs on all viewports)
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

      // 2. Desktop pinned stage where the 5 steps advance one by one as the user scrolls
      if (!isReducedMotion && pinWrapperRef.current) {
        const wrapper = pinWrapperRef.current;
        const totalSteps = copy.approach.steps.length;

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const raw = self.progress * totalSteps;
            const idx = Math.min(Math.floor(raw), totalSteps - 1);
            setActiveStepIndex(idx);
          },
        });
      }
    }, sectionRef);

    return () => {
      mq.removeEventListener("change", syncOrientation);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full border-t border-theme-line bg-theme-bg"
      aria-label="Our Approach"
    >
      {/* Header Block */}
      <div className="pt-28 md:pt-36 pb-12 px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 max-w-4xl">
          <div className="approach-header-reveal">
            <span className="label text-theme-accent-ink">
              {copy.approach.label}
            </span>
          </div>
          <div className="approach-header-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]">
              From the first frame to the <span className="italic font-normal">final</span> finish.
            </h2>
          </div>
        </div>
      </div>

      {/* Pinned stage: scroll drives which of the 5 photo panels is expanded */}
      <div
        ref={pinWrapperRef}
        className="relative h-[360vh] motion-reduce:hidden"
      >
        <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-center gap-6 overflow-hidden border-t border-theme-line px-5 sm:px-10 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-8">
            {/* Step counter */}
            <div className="flex items-center gap-4">
              <span className="label text-xs tracking-[0.25em] text-theme-accent-ink">
                STEP {String(activeStepIndex + 1).padStart(2, "0")} / 05
              </span>
              <div className="relative h-px max-w-[200px] flex-1 overflow-hidden bg-theme-line/60">
                <div
                  className="h-full bg-theme-accent transition-all duration-500 ease-out"
                  style={{ width: `${((activeStepIndex + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            <AccordionGallery
              ariaLabel="Our approach, five steps"
              orientation={vertical ? "vertical" : "horizontal"}
              height={vertical ? "min(68svh, 560px)" : "min(66svh, 600px)"}
              gap={vertical ? 8 : 10}
              expandRatio={vertical ? 0.5 : 0.5}
              activeIndex={activeStepIndex}
              onActiveChange={setActiveStepIndex}
              items={copy.approach.steps.map((stepItem, i) => ({
                image: mediaManifest.approachSteps[i],
                label: stepItem.title,
                number: stepItem.step,
                description: stepItem.description,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Mobile & Reduced Motion Fallback: Clean stacked presentation */}
      <div className="hidden motion-reduce:block px-6 md:px-16 pb-28 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-theme-line/70">
          {copy.approach.steps.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className={`flex flex-col justify-between p-6 sm:p-8 bg-theme-surface/20 border-b border-theme-line/70 ${
                index < 4 ? "md:border-r border-theme-line/70" : ""
              }`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-theme-line/40 pb-4">
                  <span className="font-serif text-3xl font-light text-theme-accent-ink tracking-tighter">
                    {stepItem.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-theme-accent/60" />
                </div>

                <h3 className="font-serif text-xl font-light text-theme-ink tracking-tight leading-[1.1]">
                  {stepItem.title}
                </h3>
              </div>

              <div className="pt-6">
                <p className="text-theme-muted text-[17px] font-light leading-[1.7] max-w-[62ch]">
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
