"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
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

      // 2. Client slots reveal
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
            <span className="label text-theme-accent">
              {copy.clients.label}
            </span>
          </div>
          <div className="clients-header-reveal">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-theme-ink tracking-tight leading-[1.08]">
              {copy.clients.heading}
            </h2>
          </div>
          <div className="clients-header-reveal">
            <p className="text-theme-muted font-light leading-relaxed text-base md:text-lg max-w-2xl">
              {copy.clients.body}
            </p>
          </div>
        </div>

        {/* 
          BUILD RULE: Replace with verified client logos when supplied by client; never invent names.
          Display 6 neutral placeholder slots labelled "Client logo", monochrome, opacity .6.
        */}
        <div
          ref={slotsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-theme-line/70 pt-12"
        >
          {Array.from({ length: copy.clients.placeholderCount }).map((_, index) => (
            <div
              key={index}
              className="client-slot group relative h-24 w-full flex items-center justify-center border border-theme-line bg-theme-surface/30 p-4 transition-all hover:bg-theme-surface/60 hover:border-theme-accent/60"
            >
              <div className="relative h-full w-full flex items-center justify-center opacity-60 transition-opacity group-hover:opacity-100 grayscale">
                <Image
                  src={mediaManifest.clientLogoPlaceholder.src}
                  alt={mediaManifest.clientLogoPlaceholder.alt}
                  width={140}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
