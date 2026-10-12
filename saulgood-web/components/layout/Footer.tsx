"use client";

import React, { useSyncExternalStore } from "react";
import { copy } from "@/content/copy";

export function Footer() {
  // Server renders the fallback year; client swaps in the real one (no prerender Date read)
  const currentYear = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2025
  );

  return (
    <footer
      className="w-full border-t border-theme-line bg-theme-bg py-16 px-4 sm:px-6 md:px-16 lg:px-24"
      aria-label="Site Footer"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        {/* Wordmark, Tagline, Property Types */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.22em] text-theme-ink">
              {copy.footer.brandName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-theme-muted font-sans -mt-1">
              {copy.brand.descriptor}
            </span>
          </div>

          <p className="font-serif text-base text-theme-muted italic">
            {copy.footer.tagline}
          </p>

          <p className="text-xs font-mono uppercase tracking-widest text-theme-muted">
            {copy.footer.propertyTypes}
          </p>
        </div>

        {/* Dynamic Legal Copyright */}
        <div className="flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 border-theme-line/60 pt-6 md:pt-0 w-full md:w-auto">
          <p suppressHydrationWarning className="text-xs font-mono text-theme-muted tracking-wider">
            © {currentYear} {copy.brand.legalName}. All Rights Reserved.
          </p>
          <span className="text-[10px] font-mono tracking-widest text-theme-muted uppercase">
            {copy.brand.locationLine}
          </span>
        </div>
      </div>
    </footer>
  );
}
