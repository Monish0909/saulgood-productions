"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MediaItem } from "@/content/media";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: MediaItem[];
  initialIndex?: number;
  categoryTitle?: string;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  categoryTitle,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Remember the trigger so focus returns to it on close (parent mounts this only while open)
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    return () => trigger?.focus?.();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Tab") {
        // Focus trap
        if (!containerRef.current) return;
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus on close button
    const closeBtn = containerRef.current?.querySelector<HTMLElement>(
      'button[aria-label="Close lightbox"]'
    );
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // min swipe distance in px

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  if (!isOpen || !images.length) return null;

  const currentImg = images[currentIndex];
  // Calculate neighbours for preloading
  const prevImg = images[(currentIndex - 1 + images.length) % images.length];
  const nextImg = images[(currentIndex + 1) % images.length];

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${categoryTitle ?? "Portfolio"} Lightbox Gallery`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-theme-photo-ink backdrop-blur-2xl transition-all"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hidden preloads for neighbours */}
      <div className="hidden" aria-hidden="true">
        <Image src={prevImg.src} alt="" width={100} height={100} priority />
        <Image src={nextImg.src} alt="" width={100} height={100} priority />
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="label text-[10px] text-theme-photo-accent tracking-widest">
            {categoryTitle}
          </span>
          <span className="font-mono text-xs text-white/50">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="label text-xs uppercase tracking-widest text-white/80 hover:text-white px-3 py-2 border border-white/20 hover:border-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
        >
          ✕ Close (Esc)
        </button>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 md:left-8 z-20 h-12 w-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
        >
          ‹
        </button>

        {/* Current Image with Spring/Smooth scale transition */}
        <div className="relative h-full w-full max-w-6xl max-h-[75vh] flex items-center justify-center">
          <Image
            key={currentImg.src + currentIndex}
            src={currentImg.src}
            alt={currentImg.alt}
            fill
            className="object-contain animate-fadeIn"
            priority
            sizes="100vw"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 md:right-8 z-20 h-12 w-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
        >
          ›
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 border-t border-white/10 bg-black/40 gap-2">
        <p className="font-serif text-lg text-white font-light italic">
          {currentImg.caption || currentImg.alt}
        </p>
        <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
          SaulGood Productions LLP
        </span>
      </div>
    </div>
  );
}
