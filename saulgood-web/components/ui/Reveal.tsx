"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  delay?: number;
  /** ScrollTrigger start, default fires as the element enters the lower 12% of the viewport */
  start?: string;
}

/** Fade + rise on scroll, matching the section reveals used across the site. */
export function Reveal({ as: Tag = "div", delay = 0, start = "top 90%", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        reduced() ? { opacity: 0 } : { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced() ? 0.2 : 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, start]);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

interface RevealWordsProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: React.ElementType;
  /** words (lowercased, letters only) to set in italic */
  italic?: string[];
}

/** Masked word-by-word rise, same as the section headings. */
export function RevealWords({ text, as: Tag = "h2", italic = [], ...rest }: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".heading-word");
      if (reduced()) return;
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} aria-label={text} {...rest}>
      {words.map((word, i) => {
        const isItalic = italic.includes(word.toLowerCase().replace(/[^a-z]/g, ""));
        return (
          <React.Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
              <span className={`heading-word inline-block will-change-transform ${isItalic ? "italic font-normal" : "font-light"}`}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
