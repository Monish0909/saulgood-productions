"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaItem } from "@/content/media";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

interface ScrollExpandProps {
  image: MediaItem;
  /** Overlay content revealed once the photo is full-bleed */
  children?: React.ReactNode;
  /** Start size of the framed photo, % of viewport (desktop / mobile) */
  start?: { desktop: [number, number]; mobile: [number, number] };
  startRadius?: number;
  mediaZoom?: number;
  /** Scroll distance of the expansion, in viewport heights */
  scrollDistance?: number;
  /** Extra hold at full size, in viewport heights */
  holdDistance?: number;
  smoothing?: number;
  /** Max scrim opacity at full size (keeps overlay text legible) */
  overlayScrim?: number;
  className?: string;
}

/**
 * Pinned photo that starts as a small rounded frame and expands to full-bleed
 * while the visitor scrolls, then reveals overlay content.
 * Window-scroll driven (works with Lenis). Reduced motion: shows the end state.
 */
export function ScrollExpand({
  image,
  children,
  start = { desktop: [42, 58], mobile: [78, 62] },
  startRadius = 24,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.7,
  className = "",
}: ScrollExpandProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const cfg = useRef({ start, startRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim });
  useEffect(() => {
    cfg.current = { start, startRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim };
  });

  const apply = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = cfg.current;
    const e = smoothstep(0, 1, p);
    const [sw, sh] = window.innerWidth < 768 ? c.start.mobile : c.start.desktop;
    const w = sw + (100 - sw) * e;
    const h = sh + (100 - sh) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius * (1 - e);
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;
    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
    if (overlayRef.current) {
      const inn = smoothstep(0.62, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = cfg.current;
      stageH = window.innerHeight;
      stage.style.height = `${stageH}px`;
      track.style.height = reduced ? `${stageH}px` : `${stageH * (1 + c.scrollDistance + c.holdDistance)}px`;
    };
    const readProgress = () => {
      if (reduced) return 1;
      const span = stageH * Math.max(0.01, cfg.current.scrollDistance);
      return clamp(-track.getBoundingClientRect().top / span, 0, 1);
    };
    const tick = () => {
      const k = cfg.current.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * cfg.current.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      target = readProgress();
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      apply(current);
    };

    measure();
    target = readProgress();
    current = target;
    apply(current);

    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [apply]);

  return (
    <div ref={trackRef} className={`relative w-full ${className}`.trim()}>
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-theme-bg">
        <div
          ref={frameRef}
          className="absolute inset-0 [clip-path:inset(21%_29%_21%_29%_round_24px)] [will-change:clip-path]"
        >
          <div ref={mediaRef} className="absolute inset-0 origin-center [will-change:transform]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="select-none object-cover"
              draggable={false}
            />
          </div>
          <div
            ref={scrimRef}
            className="pointer-events-none absolute inset-0 opacity-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78),rgba(0,0,0,0.5)_45%,rgba(0,0,0,0.5))]"
            aria-hidden="true"
          />
          {children ? (
            <div
              ref={overlayRef}
              className="absolute inset-0 flex flex-col items-center justify-center p-[8%] text-center text-theme-photo-ink opacity-0 [text-shadow:0_1px_22px_rgba(0,0,0,0.35)] [will-change:opacity,transform]"
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
