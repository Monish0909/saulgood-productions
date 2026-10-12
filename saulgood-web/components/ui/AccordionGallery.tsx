"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export interface AccordionItem {
  image: { src: string; alt: string };
  label: string;
  /** Small numeral shown on every panel, e.g. "01" */
  number?: string;
  /** Revealed on the active panel */
  description?: string;
}

interface AccordionGalleryProps {
  items: AccordionItem[];
  /** Controlled: the expanded panel (e.g. driven by scroll progress) */
  activeIndex: number;
  /** Called on hover, click, focus and arrow keys */
  onActiveChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  /** Any CSS height, e.g. "min(70svh, 620px)" */
  height?: string;
  gap?: number;
  radius?: number;
  /** Share of the main axis the active panel takes (0.2 – 0.9) */
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Image accordion: one panel expands, neighbours collapse with a slight tilt,
 * grayscale + dim on inactive panels. Active panel is controlled by the parent
 * (scroll in our Approach section) and can also be changed by hover/click/keys.
 */
export function AccordionGallery({
  items,
  activeIndex,
  onActiveChange,
  orientation = "horizontal",
  height = "460px",
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  duration = 0.7,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  className = "",
  ariaLabel = "Image accordion",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const descRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;
      const dur = animate && !reduced ? duration : 0;

      tlRef.current?.kill();
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === activeIndex;
        const rot = vertical ? 0 : isActive ? 0 : i < activeIndex ? tilt : -tilt;
        tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, "--ag-gray": isActive ? 0 : 1, "--ag-dim": isActive ? 0 : 0.35, duration: dur, ease }, 0);

        const media = mediaRefs.current[i];
        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, activeIndex - i));
          const shift = drift * parallax * mediaSize * 0.06;
          tl.to(
            media,
            { xPercent: -50, yPercent: -50, x: vertical ? 0 : isActive ? 0 : shift, y: vertical ? (isActive ? 0 : shift) : 0, duration: dur, ease },
            0
          );
        }

        const desc = descRefs.current[i];
        if (desc) {
          tl.to(desc, { opacity: isActive ? 1 : 0, y: isActive ? 0 : 12, duration: isActive ? dur : dur * 0.5, ease, delay: 0 }, isActive && dur ? stagger : 0);
        }
      });
      tlRef.current = tl;
    },
    [activeIndex, count, expandRatio, duration, ease, vertical, tilt, parallax, stagger]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRef.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRef.current);
    firstRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => void tlRef.current?.kill(), []);

  const onKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onActiveChange?.((i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onActiveChange?.((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex w-full max-w-full ${vertical ? "flex-col" : "flex-row [perspective:1400px]"} ${className}`.trim()}
      style={{ gap: `${gap}px`, height }}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
            onMouseEnter={() => onActiveChange?.(i)}
            onClick={() => onActiveChange?.(i)}
            onFocus={() => onActiveChange?.(i)}
            onKeyDown={(e) => onKeyDown(i, e)}
            className="relative block min-h-0 min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-theme-hero-fallback outline-none [transform-origin:center] [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-theme-ink focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
            style={{ borderRadius: `${radius}px`, willChange: "flex-grow, transform" }}
          >
            <div className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <div
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 [filter:grayscale(var(--ag-gray,1))]"
                style={{
                  width: vertical ? "100%" : "var(--ag-media-size, 320px)",
                  height: vertical ? "var(--ag-media-size, 320px)" : "100%",
                  willChange: "transform, filter",
                }}
              >
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="select-none object-cover" draggable={false} />
              </div>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 12%, rgba(8,6,4,0.66) 52%, rgba(8,6,4,0.9) 100%), rgba(8,6,4,calc(var(--ag-dim, 0.35)))",
                }}
                aria-hidden="true"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-3 text-theme-photo-ink [text-shadow:0_1px_18px_rgba(0,0,0,0.4)] md:p-7">
              {item.description && (
                <div
                  ref={(el) => {
                    descRefs.current[i] = el;
                  }}
                  className="absolute inset-x-3 bottom-full max-w-[44ch] pb-2 opacity-0 md:inset-x-7"
                  aria-hidden={!isActive}
                >
                  <div className="mb-3 h-px w-12 bg-theme-photo-accent" />
                  <p className="text-[15px] font-light leading-[1.65] md:text-[17px]">{item.description}</p>
                </div>
              )}
              <div className="flex items-baseline gap-3 md:gap-4">
                {item.number && (
                  <span className={`font-serif font-light tracking-tight ${vertical && !isActive ? "text-xl" : "text-3xl md:text-4xl"}`}>
                    {item.number}
                  </span>
                )}
                {(isActive || vertical) && (
                  <span className={`font-serif font-light tracking-tight ${vertical && !isActive ? "text-lg" : "text-xl md:text-3xl"}`}>
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AccordionGallery;
