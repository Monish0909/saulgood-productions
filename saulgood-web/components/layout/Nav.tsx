"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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
        hamburgerRef.current?.focus();
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
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        onFocusCapture={() => setIsVisible(true)}
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className="nav-glass mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20"
          aria-label="Main Navigation"
        >
          {/* Wordmark Left */}
          <Link
            href="/"
            aria-label="SaulGood Productions, home"
            onClick={(e) => handleNavClick(e, "/")}
            className="group flex flex-col justify-center min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
          >
            <span className="font-serif text-xl md:text-2xl font-light tracking-[0.22em] text-theme-ink transition-opacity group-hover:opacity-80">
              SAULGOOD
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-theme-muted font-sans -mt-1">
              PRODUCTIONS
            </span>
          </Link>

          {/* Desktop Nav Items with Underline Draw */}
          <div className="hidden md:flex items-center gap-2 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link-underline label text-[11px] min-h-[44px] px-3 inline-flex items-center text-theme-ink/80 transition-colors hover:text-theme-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Magnetic CTA Right */}
          <div className="hidden md:flex items-center">
            <Magnetic>
              <Link
                href="/contact"
                onClick={(e) => handleNavClick(e, "/contact")}
                className="label text-[11px] font-normal tracking-[0.22em] min-h-[44px] inline-flex items-center rounded-none border border-theme-ink bg-theme-ink px-6 text-theme-bg transition-all hover:bg-transparent hover:text-theme-ink active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
              >
                Work With Us
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Hamburger Button (Accessible 44x44 tap target) */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 p-2 text-theme-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
          className="fixed inset-0 z-50 flex flex-col justify-between bg-theme-bg/95 p-6 sm:p-8 backdrop-blur-2xl transition-all"
        >
          {/* Header in overlay with Close button */}
          <div className="flex items-center justify-between border-b border-theme-line pb-6">
            <div className="font-serif text-xl tracking-[0.22em] text-theme-ink">
              SAULGOOD
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-theme-ink label text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent cursor-pointer"
              aria-label="Close menu"
            >
              ✕ Close
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-4 py-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-serif text-3xl font-light tracking-wide text-theme-ink py-2 min-h-[44px] flex items-center transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA & Footer Info */}
          <div className="flex flex-col gap-4 border-t border-theme-line pt-6">
            <Link
              href="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className="label text-center min-h-[48px] flex items-center justify-center bg-theme-ink text-theme-bg tracking-widest transition-opacity hover:opacity-90 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            >
              Work With Us
            </Link>
            <p className="text-center text-xs text-theme-muted tracking-wider">
              HOSPITALITY VISUAL PRODUCTION STUDIO
            </p>
          </div>
        </div>
      )}
    </>
  );
}
