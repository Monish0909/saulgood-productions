"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll direction detection (hide on scroll down, show on scroll up)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show at the very top
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current + 8) {
            // Scrolling down
            setIsVisible(false);
          } else if (currentScrollY < lastScrollYRef.current - 8) {
            // Scrolling up
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key and focus trapping for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Focus first actionable element in mobile menu
      const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Trap focus inside mobile overlay
  const handleKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className="nav-glass mx-auto flex h-20 w-full items-center justify-between px-6 md:px-12 lg:px-20"
          aria-label="Main Navigation"
        >
          {/* Wordmark Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
          >
            <span className="font-serif text-xl md:text-2xl font-light tracking-[0.22em] text-theme-ink transition-opacity group-hover:opacity-80">
              SAULGOOD
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-theme-muted font-sans -mt-1">
              PRODUCTIONS
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="label text-[11px] text-theme-ink/80 transition-colors hover:text-theme-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="label text-[11px] rounded-none border border-theme-ink bg-theme-ink px-5 py-2.5 text-theme-bg transition-all hover:bg-transparent hover:text-theme-ink active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            >
              Work With Us
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 text-theme-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-opacity duration-200 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          onKeyDown={handleKeyDownTrap}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-theme-bg/95 p-8 backdrop-blur-2xl transition-all"
        >
          {/* Header in overlay with Close button */}
          <div className="flex items-center justify-between border-b border-theme-line pb-6">
            <div className="font-serif text-xl tracking-[0.22em] text-theme-ink">
              SAULGOOD
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-theme-ink label text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              aria-label="Close menu"
            >
              ✕ Close
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6 py-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-serif text-3xl font-light tracking-wide text-theme-ink transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA & Footer Info */}
          <div className="flex flex-col gap-4 border-t border-theme-line pt-6">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="label text-center py-4 bg-theme-ink text-theme-bg tracking-widest transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            >
              Work With Us
            </a>
            <p className="text-center text-xs text-theme-muted tracking-wider">
              HOSPITALITY VISUAL PRODUCTION STUDIO
            </p>
          </div>
        </div>
      )}
    </>
  );
}
