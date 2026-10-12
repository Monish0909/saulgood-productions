"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PixelSwap } from "@/components/ui/PixelSwap";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PageTransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

/** Ink panel with the wordmark: what the pixels reveal / cover */
function InkPanel() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-theme-ink text-theme-photo-ink">
      <span className="font-serif text-4xl font-light tracking-[0.28em] md:text-6xl">SAULGOOD</span>
      <span className="h-px w-16 bg-theme-photo-accent" aria-hidden="true" />
      <span className="label text-[10px] tracking-[0.3em] text-theme-photo-ink/70">PRODUCTIONS</span>
    </div>
  );
}

const COVER_MS = 750;
const REVEAL_MS = 850;

/**
 * Pixel page transitions. Click a link → ink pixels cover the screen → route changes
 * underneath → pixels shrink away to reveal the new page.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const [covered, setCovered] = useState(false);
  const [busy, setBusy] = useState(false);
  const targetRef = useRef<string | null>(null);
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (busy) return;
      const path = href.split("#")[0] || "/";
      if (path === pathRef.current) {
        scrollTo(0);
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      targetRef.current = href;
      setBusy(true);
      setCovered(true); // pixels cover; router.push fires from onComplete below
    },
    [busy, scrollTo, router]
  );

  const onComplete = useCallback(
    (nowCovered: boolean) => {
      if (nowCovered && targetRef.current) {
        router.push(targetRef.current, { scroll: false });
      } else if (!nowCovered) {
        targetRef.current = null;
        setBusy(false);
        ScrollTrigger.refresh();
      }
    },
    [router]
  );

  // New route committed while covered → jump to top, then reveal.
  useEffect(() => {
    if (!busy || !covered || !targetRef.current) return;
    const target = targetRef.current.split("#")[0] || "/";
    if (pathname !== target) return;
    const t = window.setTimeout(() => {
      window.scrollTo(0, 0);
      scrollTo(0, { immediate: true });
      setCovered(false);
    }, 350);
    return () => window.clearTimeout(t);
  }, [pathname, busy, covered, scrollTo]);

  return (
    <PageTransitionContext.Provider value={{ navigate, isTransitioning: busy }}>
      {children}
      <div
        className={`fixed inset-0 z-[100] ${busy ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden="true"
      >
        <PixelSwap
          trigger="none"
          active={covered}
          onComplete={onComplete}
          firstContent={<div className="h-full w-full" />}
          secondContent={<InkPanel />}
          pixelSize={110}
          pattern="diagonal"
          randomness={0.25}
          pixelScale={0.3}
          fade
          duration={covered ? COVER_MS : REVEAL_MS}
          pixelDuration={380}
          easing="cubic-bezier(0.22, 1, 0.36, 1)"
          revealToFirst
          aspectRatio="auto"
          className="!h-full"
        />
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/** next/link that runs the pixel transition on plain left-clicks */
export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const h = typeof href === "string" ? href : href.pathname ?? "/";
        if (!h.startsWith("/")) return;
        e.preventDefault();
        navigate(h);
      }}
    >
      {children}
    </Link>
  );
}
