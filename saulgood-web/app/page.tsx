"use client";

import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { About } from "@/components/sections/About";
import { Specialisation } from "@/components/sections/Specialisation";
import { CreativeStandard } from "@/components/sections/CreativeStandard";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Philosophy Section */}
      <Philosophy />

      {/* About Section */}
      <About />

      {/* Specialisation Section */}
      <Specialisation />

      {/* Creative Standard Section */}
      <CreativeStandard />

      {/* Work Section (Tall Tiles + Lightbox) */}
      <Work />

      {/* Main Content Flow */}
      <main className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-32 py-24 w-full">
        {/* Client Logo Slot Proof */}
        <section className="flex flex-col gap-6 border-t border-theme-line pt-12">
          <div className="flex justify-between items-center">
            <span className="label text-theme-muted">{copy.clients.label}</span>
            <span className="text-xs text-theme-muted">
              {copy.clients.placeholderCount} Anonymous Placeholder Slots
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Array.from({ length: copy.clients.placeholderCount }).map((_, i) => (
              <div
                key={i}
                className="relative h-16 w-full flex items-center justify-center border border-theme-line bg-theme-surface/50 p-2"
              >
                <Image
                  src={mediaManifest.clientLogoPlaceholder.src}
                  alt={mediaManifest.clientLogoPlaceholder.alt}
                  width={120}
                  height={40}
                  className="opacity-60"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section Anchor Target */}
        <section id="contact" className="border-t border-theme-line pt-16 pb-24 flex flex-col gap-6">
          <span className="label text-theme-accent">{copy.contact.label}</span>
          <h2 className="display text-3xl md:text-5xl font-light text-theme-ink">
            {copy.contact.heading}
          </h2>
          <p className="text-theme-muted max-w-2xl">{copy.contact.lead}</p>
          <div className="p-8 border border-theme-line bg-theme-surface/30 max-w-xl">
            <p className="text-sm text-theme-ink/80">{copy.contact.companyBlock}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
