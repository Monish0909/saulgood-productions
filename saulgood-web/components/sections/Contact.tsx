"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
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
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 3. Editorial reveals
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

  const headingWords = copy.contact.heading.split(" ");

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

            <div className="max-w-xl">
              <h2
                ref={headingRef}
                className="display [overflow-wrap:anywhere] hyphens-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]"
                aria-label={copy.contact.heading}
              >
                {headingWords.map((word, i) => {
                  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                  const isItalic = cleanWord === "extraordinary";
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

            <div className="contact-reveal">
              <p className="font-serif text-xl sm:text-2xl text-theme-ink/90 font-light italic leading-snug max-w-[62ch]">
                {copy.contact.lead}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-theme-muted font-light leading-[1.7] text-[17px] max-w-[62ch]">
            <p className="contact-reveal">{copy.contact.body}</p>
            <p className="contact-reveal font-serif text-lg text-theme-accent-ink italic font-light">
              {copy.contact.closer}
            </p>
          </div>

          {/* CTA: START A CONVERSATION */}
          <div className="contact-reveal pt-2">
            <Magnetic>
              <button
                type="button"
                onClick={handleStartConversation}
                className="label inline-flex items-center gap-2 border border-theme-ink bg-theme-ink px-8 py-4 text-theme-bg text-[11px] font-normal tracking-[0.22em] transition-all duration-100 active:scale-[0.97] hover:opacity-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                <span>{copy.contact.cta}</span>
                <span>↓</span>
              </button>
            </Magnetic>
          </div>

          {/* Company Block & Mailto */}
          <div className="contact-reveal pt-8 flex flex-col gap-3">
            <div
              ref={hairlineRef}
              className="w-full h-px bg-theme-line/70 origin-left will-change-transform mb-4"
              aria-hidden="true"
            />
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
