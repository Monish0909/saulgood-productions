"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

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

      // 2. Image clip-path reveal + slow parallax inside frame
      if (imageFrameRef.current && imageInnerRef.current) {
        if (isReducedMotion) {
          gsap.set([imageFrameRef.current, imageInnerRef.current], { clearProps: "all" });
        } else {
          // Clip path wipe
          gsap.fromTo(
            imageFrameRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: imageFrameRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // Slow parallax drift
          gsap.fromTo(
            imageInnerRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: imageFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      }

      // 3. Editorial reveals for paragraphs and stat chip
      const items = contentRef.current?.querySelectorAll(".about-reveal");
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

  const headingWords = copy.about.heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full border-t border-theme-line py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-theme-bg"
      aria-label="About Us"
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
      >
        {/* Asymmetric Image Column enlarged by 40% (7 Cols) with Clip-Path Reveal + Slow Parallax */}
        <div className="lg:col-span-7 relative w-full flex flex-col gap-4">
          <div
            ref={imageFrameRef}
            className="relative aspect-[3/4] min-h-[520px] md:min-h-[640px] w-full overflow-hidden border border-theme-line bg-theme-surface"
          >
            <div
              ref={imageInnerRef}
              className="relative h-[116%] w-full -top-[8%] will-change-transform"
            >
              <Image
                src={mediaManifest.approachBg.src}
                alt={mediaManifest.approachBg.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Subtle Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* "7+ years" Stat Chip */}
            <div className="about-reveal absolute bottom-6 left-6 z-10 flex items-center gap-3 bg-theme-surface/90 border border-theme-line px-5 py-3 backdrop-blur-md shadow-xl">
              <span className="font-serif text-3xl font-light text-theme-ink tracking-tight">
                {copy.about.statChip}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-theme-muted max-w-[100px] leading-tight">
                Production Experience
              </span>
            </div>
          </div>
          <p className="about-reveal text-[11px] font-mono uppercase tracking-widest text-theme-muted">
            {copy.brand.descriptor} · INDIA
          </p>
        </div>

        {/* Text Narrative Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="about-reveal">
            <span className="label text-theme-accent-ink">
              {copy.about.label}
            </span>
          </div>

          <div className="max-w-xl">
            <h2
              ref={headingRef}
              className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-[-0.02em] leading-[1.02]"
              aria-label={copy.about.heading}
            >
              {headingWords.map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                const isItalic = cleanWord === "dedicated";
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

          <div className="flex flex-col gap-6 text-theme-muted font-light leading-[1.7] text-[17px] max-w-[62ch]">
            <p className="about-reveal text-theme-ink/90 font-light">
              {copy.about.paragraphs[0]}
            </p>
            <p className="about-reveal">{copy.about.paragraphs[1]}</p>
            <p className="about-reveal">{copy.about.paragraphs[2]}</p>
            <p className="about-reveal">{copy.about.paragraphs[3]}</p>
          </div>

          {/* Closer line in Accent */}
          <div className="about-reveal border-l-2 border-theme-accent pl-6 py-2 mt-2 max-w-[62ch]">
            <p className="font-serif text-lg md:text-xl text-theme-accent-ink italic tracking-wide font-light">
              {copy.about.closer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
