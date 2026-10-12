"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MediaItem } from "@/content/media";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed photographic band (70svh) with smooth parallax inside the frame.
 * Reduced motion: static image with no parallax scroll scrub.
 */
export function ImageBand({ image }: { image: MediaItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isReducedMotion || !containerRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[70svh] w-full overflow-hidden bg-theme-surface border-y border-theme-line/40"
      aria-hidden="true"
    >
      <div
        ref={imgRef}
        className="relative h-[130%] w-full -top-[15%] will-change-transform"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
