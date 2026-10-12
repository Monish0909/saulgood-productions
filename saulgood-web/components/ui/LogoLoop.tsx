"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 } as const;

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  ariaLabel?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  /** px per second */
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  /** Any CSS colour, e.g. "var(--bg)" */
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

type RefLike = React.RefObject<HTMLElement | null>;

const useResizeObserver = (callback: () => void, elements: RefLike[]) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", callback);
      callback();
      return () => window.removeEventListener("resize", callback);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
  }, [callback, elements]);
};

const useImageLoader = (seqRef: RefLike, onLoad: () => void) => {
  useEffect(() => {
    const images = Array.from(seqRef.current?.querySelectorAll("img") ?? []);
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach((img) => {
      if (img.complete) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
  }, [onLoad, seqRef]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const seqSize = isVertical ? seqHeight : seqWidth;
    const place = () => {
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      place();
    }

    if (reduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return () => {
        lastTsRef.current = null;
      };
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqSize > 0) {
        const next = offsetRef.current + velocityRef.current * dt;
        offsetRef.current = ((next % seqSize) + seqSize) % seqSize;
        place();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

/** Seamless infinite logo / content loop with hover pause and edge fade. Static under reduced motion. */
export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const dir = isVertical ? (direction === "up" ? 1 : -1) : direction === "left" ? 1 : -1;
    return magnitude * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect?.();
    const sw = rect?.width ?? 0;
    const sh = rect?.height ?? 0;
    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const th = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${th}px`) containerRef.current.style.height = `${th}px`;
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh));
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sh;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(viewport / sh) + ANIMATION_CONFIG.COPY_HEADROOM));
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, [isVertical]);

  const observed = useMemo<RefLike[]>(() => [containerRef, seqRef], []);
  useResizeObserver(updateDimensions, observed);
  useImageLoader(seqRef, updateDimensions);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVariables = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }) as React.CSSProperties,
    [gap, logoHeight, fadeOutColor]
  );

  const rootClasses = cx(
    "relative group",
    isVertical ? "overflow-hidden h-full inline-block" : "overflow-x-hidden",
    scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
    className
  );

  const handleEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);
  const handleLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const itemClass = cx(
    "flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]",
    isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]",
    scaleOnHover && "overflow-visible group/item"
  );

  const renderLogoItem = useCallback(
    (item: LogoItem, key: string) => {
      if (renderItem) {
        return (
          <li className={itemClass} key={key}>
            {renderItem(item, key)}
          </li>
        );
      }
      const isNode = item.node !== undefined;
      const content = isNode ? (
        <span
          className={cx(
            "inline-flex items-center motion-reduce:transition-none",
            scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-[1.2]"
          )}
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={cx(
            "h-[var(--logoloop-logoHeight)] w-auto block object-contain pointer-events-none motion-reduce:transition-none",
            scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-[1.2]"
          )}
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const label = isNode ? item.ariaLabel ?? item.title : item.alt ?? item.title;
      const inner = item.href ? (
        <a
          className="inline-flex items-center rounded no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
          href={item.href}
          aria-label={label || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );
      return (
        <li className={itemClass} key={key}>
          {inner}
        </li>
      );
    },
    [itemClass, renderItem, scaleOnHover]
  );

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className={cx("flex items-center", isVertical && "flex-col")}
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, i) => renderLogoItem(item, `${copyIndex}-${i}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem, isVertical]
  );

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      width: isVertical ? (toCssLength(width) === "100%" ? undefined : toCssLength(width)) : toCssLength(width) ?? "100%",
      ...cssVariables,
      ...style,
    }),
    [width, cssVariables, style, isVertical]
  );

  const fade = (side: "left" | "right" | "top" | "bottom") => {
    const horizontal = side === "left" || side === "right";
    const toward = { left: "right", right: "left", top: "bottom", bottom: "top" }[side];
    return (
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute z-10",
          horizontal ? "inset-y-0 w-[clamp(24px,8%,120px)]" : "inset-x-0 h-[clamp(24px,8%,120px)]",
          side === "left" && "left-0",
          side === "right" && "right-0",
          side === "top" && "top-0",
          side === "bottom" && "bottom-0"
        )}
        style={{
          background: `linear-gradient(to ${toward}, var(--logoloop-fadeColor, var(--bg)) 0%, color-mix(in srgb, var(--logoloop-fadeColor, var(--bg)) 0%, transparent) 100%)`,
        }}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {fadeOut && (isVertical ? <>{fade("top")}{fade("bottom")}</> : <>{fade("left")}{fade("right")}</>)}
      <div
        className={cx(
          "flex will-change-transform select-none relative z-0 motion-reduce:transform-none",
          isVertical ? "flex-col h-max w-full" : "flex-row w-max"
        )}
        ref={trackRef}
      >
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
