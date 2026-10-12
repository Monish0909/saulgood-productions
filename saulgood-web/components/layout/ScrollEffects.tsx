"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide scroll choreography (one place, no per-section duplication):
 *  - section headings: masked rise + tracking settle
 *  - hairlines draw in
 *  - photos: slow parallax inside their frame
 *  - [data-band] images: full-bleed parallax
 * All of it is skipped under prefers-reduced-motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("main h2.display").forEach((h) => {
        gsap.fromTo(
          h,
          { clipPath: "inset(0 -100vw 105% -100vw)", y: 36, letterSpacing: "0.03em" },
          {
            clipPath: "inset(-10% -100vw -10% -100vw)",
            y: 0,
            letterSpacing: "-0.02em",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("main section .border-t, main section hr").forEach((line) => {
        gsap.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 95%", toggleActions: "play none none none" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("#about img, #services .service-img img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7,
            scale: 1.14,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-band] img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img.closest("[data-band]"), start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    // images/fonts shift layout after first paint
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
