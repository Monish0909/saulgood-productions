"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { LogoLoop, type LogoItem } from "@/components/ui/LogoLoop";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const placeholderLogos: LogoItem[] = Array.from({ length: copy.clients.placeholderCount }, (_, i) => ({
  title: `Client logo ${i + 1}`,
}));

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
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

      // 3. Header text reveal
      const headerItems = sectionRef.current?.querySelectorAll(".clients-header-reveal");
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

      // 4. Client slots reveal
      const slots = slotsRef.current?.querySelectorAll(".client-slot");
      if (slots?.length) {
        if (isReducedMotion) {
          gsap.fromTo(
            slots,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.03,
              scrollTrigger: {
                trigger: slotsRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          gsap.fromTo(
            slots,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slotsRef.current,
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

  const headingWords = copy.clients.heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="Our Clients"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-20">
        {/* Header Block: Label, Heading, Body */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="clients-header-reveal">
            <span className="label text-theme-accent-ink">
              {copy.clients.label}
            </span>
          </div>

          <div className="max-w-4xl">
            <h2
              ref={headingRef}
              className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]"
              aria-label={copy.clients.heading}
            >
              {headingWords.map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                const isItalic = cleanWord === "exceptional";
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

          <div className="clients-header-reveal">
            <p className="text-theme-muted font-light leading-[1.7] text-[17px] max-w-[62ch]">
              {copy.clients.body}
            </p>
          </div>
        </div>

        {/* 
          BUILD RULE: Replace with verified client logos when supplied by client; never invent names.
          Display 6 neutral placeholder slots labelled "Client logo", monochrome, opacity .6.
        */}
        <div className="w-full">
          {/* Hairline that draws in */}
          <div
            ref={hairlineRef}
            className="w-full h-px bg-theme-line/70 origin-left will-change-transform mb-12"
            aria-hidden="true"
          />

          <div ref={slotsRef}>
            <div className="client-slot">
              <LogoLoop
                logos={placeholderLogos}
                speed={40}
                gap={16}
                logoHeight={96}
                pauseOnHover
                fadeOut
                fadeOutColor="var(--bg)"
                ariaLabel="Our clients (placeholders)"
                renderItem={() => (
                  <div className="flex h-24 w-56 items-center justify-center border border-theme-line bg-theme-surface/30 p-4">
                    <div className="flex h-full w-full items-center justify-center opacity-60 grayscale">
                      <Image
                        src={mediaManifest.clientLogoPlaceholder.src}
                        alt=""
                        width={140}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
