"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".contact-reveal");
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

  const handleStartConversation = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo("#inquiry-form", { offset: -100 });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Contact and Inquiries"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Left Column: Copy & Company Block */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="contact-reveal">
              <span className="label text-theme-accent-ink">
                {copy.contact.label}
              </span>
            </div>
            <div className="contact-reveal">
              <h2 className="display [overflow-wrap:anywhere] hyphens-auto text-3xl sm:text-4xl md:text-4xl xl:text-5xl font-light text-theme-ink tracking-tight leading-[1.08]">
                {copy.contact.heading}
              </h2>
            </div>
            <div className="contact-reveal">
              <p className="font-serif text-xl text-theme-ink/90 font-light italic leading-snug">
                {copy.contact.lead}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-theme-muted font-light leading-relaxed text-sm md:text-base">
            <p className="contact-reveal">{copy.contact.body}</p>
            <p className="contact-reveal font-serif text-lg text-theme-accent-ink italic">
              {copy.contact.closer}
            </p>
          </div>

          {/* CTA: START A CONVERSATION */}
          <div className="contact-reveal pt-2">
            <button
              type="button"
              onClick={handleStartConversation}
              className="label inline-flex items-center gap-2 border border-theme-ink bg-theme-ink px-8 py-4 text-theme-bg text-[11px] font-medium tracking-widest transition-all duration-100 active:scale-[0.97] hover:opacity-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            >
              <span>{copy.contact.cta}</span>
              <span>↓</span>
            </button>
          </div>

          {/* Company Block & Mailto */}
          <div className="contact-reveal border-t border-theme-line/70 pt-8 flex flex-col gap-3">
            <p className="text-xs text-theme-muted font-mono leading-relaxed">
              {copy.contact.companyBlock}
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${copy.brand.email}`}
                className="text-sm font-mono text-theme-accent-ink hover:underline inline-flex min-h-[44px] items-center gap-1.5"
              >
                <span>✉</span>
                <span>{copy.brand.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: InquiryForm */}
        <div className="lg:col-span-7 w-full contact-reveal">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
