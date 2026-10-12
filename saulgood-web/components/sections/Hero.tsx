"use client";

import React, { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { usePageTransition } from "@/components/layout/PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;
const frameSrc = (i: number) => `/media/frames/f_${String(i + 1).padStart(4, "0")}.webp`;

/**
 * Scroll-scrubbed hero: a pinned full-viewport canvas plays an image sequence
 * as the visitor scrolls (GSAP ScrollTrigger scrub:2, driven by Lenis).
 * Frames come from scripts/make-hero-sequence.* — swap in real footage later.
 * Reduced motion: static first frame, no pin.
 */
export function Hero() {
  const { navigate } = usePageTransition();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let current = 0;
    let cancelled = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(current);
    };

    const draw = (i: number) => {
      // nearest loaded frame at or before i (keeps picture steady while loading)
      let img: HTMLImageElement | null = null;
      for (let k = i; k >= 0 && !img; k--) img = frames[k];
      if (!img) return;
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (frames[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
      });

    const init = async () => {
      // first frames immediately, the rest in the background
      await Promise.all(Array.from({ length: reduced ? 1 : 10 }, (_, i) => load(i)));
      if (cancelled) return;
      resize();
      if (reduced) return;
      for (let i = 10; i < FRAME_COUNT && !cancelled; i += 6) {
        await Promise.all(
          Array.from({ length: 6 }, (_, j) => (i + j < FRAME_COUNT ? load(i + j) : Promise.resolve()))
        );
      }
    };

    window.addEventListener("resize", resize);
    init();

    const gctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".hero-word");
      const rest = textRef.current?.querySelectorAll(".hero-reveal");

      if (reduced) {
        gsap.set([words, rest, cueRef.current], { clearProps: "all" });
        return;
      }

      // Load-in: masked headline words, then supporting copy, rule, cue
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-canvas", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.6 }, 0)
        .fromTo(words ?? [], { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.07 }, 0.2)
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.6)
        .fromTo(rest ?? [], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.7)
        .fromTo(cueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);

      // Scroll scrub: frame index + text drifts away + cue fades
      const state = { frame: 0 };
      gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: 2 },
        onUpdate: () => {
          const f = Math.round(state.frame);
          if (f !== current) {
            current = f;
            draw(f);
          }
        },
      });
      gsap.to(textRef.current, {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "55% top", end: "85% top", scrub: true },
      });
      gsap.to(cueRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: wrap, start: "top top", end: "8% top", scrub: true },
      });
    }, wrap);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      gctx.revert();
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  const words = copy.hero.headline.split(" ");

  return (
    <section aria-label="Hero Section">
      {/* Tall wrapper = scroll distance for the scrub (collapses to 100svh with reduced motion) */}
      <div ref={wrapRef} className="relative h-[380vh] motion-reduce:h-[100svh]">
        <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-theme-hero-fallback">
          <canvas
            ref={canvasRef}
            className="hero-canvas absolute inset-0 h-full w-full"
            aria-hidden="true"
          />

          {/* Even scrim + bottom-left gradient: keeps text >= 4.5:1 on any frame */}
          <div className="absolute inset-0 bg-theme-scrim pointer-events-none" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_110%_at_10%_100%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.44)_55%,rgba(0,0,0,0)_100%)]"
            aria-hidden="true"
          />

          <div
            ref={textRef}
            className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[88rem] [text-shadow:0_1px_22px_rgba(0,0,0,0.35)] flex-col gap-7 px-5 pb-16 text-theme-photo-ink sm:px-10 md:pb-20 lg:px-20"
          >
            <span className="hero-reveal label text-theme-photo-ink tracking-[0.24em] [text-shadow:0_0_14px_rgba(0,0,0,0.6)]">
              {copy.hero.eyebrow}
            </span>

            <h1 className="display max-w-5xl font-light text-balance text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.02em]" aria-label={copy.hero.headline}>
              {words.map((w, i) => {
                const isItalic = w.toLowerCase().replace(/[^a-z]/g, "") === "elevated";
                return (
                  <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
                    <span className={`hero-word inline-block will-change-transform ${isItalic ? "italic font-normal" : "font-light"}`}>
                      {w}
                    </span>
                    {i < words.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h1>

            <div className="hero-rule h-px w-24 origin-left bg-theme-photo-accent" aria-hidden="true" />

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="hero-reveal max-w-[62ch] text-[17px] font-light leading-[1.7] text-theme-photo-ink/90">
                {copy.hero.body}
              </p>
              <div className="hero-reveal flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={copy.hero.ctaPrimary.href}
                    onClick={(e) => handleCtaClick(e, copy.hero.ctaPrimary.href)}
                    className="label inline-flex min-h-[48px] items-center justify-center border border-theme-photo-ink bg-theme-photo-ink px-8 text-[11px] font-normal tracking-[0.22em] text-theme-ink transition-all duration-100 hover:bg-transparent hover:text-theme-photo-ink active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-photo-ink focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                  >
                    {copy.hero.ctaPrimary.label}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={copy.hero.ctaSecondary.href}
                    onClick={(e) => handleCtaClick(e, copy.hero.ctaSecondary.href)}
                    className="label inline-flex min-h-[48px] items-center justify-center border border-theme-photo-ink/60 px-8 text-[11px] font-normal tracking-[0.22em] text-theme-photo-ink transition-all duration-100 hover:border-theme-photo-ink hover:bg-theme-photo-ink/10 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-photo-ink focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                  >
                    {copy.hero.ctaSecondary.label}
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            ref={cueRef}
            className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 text-theme-photo-ink/80 sm:flex md:right-10"
            aria-hidden="true"
          >
            <span className="label text-[10px] tracking-[0.3em] [writing-mode:vertical-rl]">SCROLL</span>
            <span className="relative block h-16 w-px overflow-hidden bg-theme-photo-ink/30">
              <span className="absolute inset-x-0 top-0 h-6 animate-[cue_1.8s_ease-in-out_infinite] bg-theme-photo-ink" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
