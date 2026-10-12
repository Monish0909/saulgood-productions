"use client";

import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Main Content Flow */}
      <main className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-32 py-24 w-full">
        {/* Philosophy Section */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-12">
          <div className="flex flex-col gap-4">
            <span className="label text-theme-accent">
              {copy.philosophy.label}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-theme-ink">
              {copy.philosophy.heading}
            </h2>
            <p className="text-theme-muted italic text-lg">
              {copy.philosophy.lead}
            </p>
            <p className="text-theme-ink/80 text-sm md:text-base leading-relaxed">
              {copy.philosophy.paragraphs[0]}
            </p>
          </div>

          {/* Media Placeholder Proof */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-theme-line bg-theme-surface">
              <Image
                src={mediaManifest.heroMosaic[0].src}
                alt={mediaManifest.heroMosaic[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-theme-muted border-t border-theme-line pt-3">
              <span>Asset: {mediaManifest.heroMosaic[0].src}</span>
              <span className="label text-[10px]">VERIFIED VIA MANIFEST</span>
            </div>
          </div>
        </section>

        {/* Services Section Anchor Target */}
        <section id="services" className="border-t border-theme-line pt-16 flex flex-col gap-6">
          <span className="label text-theme-accent">{copy.specialisation.label}</span>
          <h2 className="display text-3xl md:text-5xl font-light text-theme-ink">
            {copy.specialisation.heading}
          </h2>
          <p className="text-theme-muted max-w-2xl">{copy.specialisation.lead}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {copy.specialisation.services.map((svc) => (
              <div key={svc.id} className="p-6 border border-theme-line bg-theme-surface/40 flex flex-col gap-4">
                <span className="label text-theme-muted">{svc.number}</span>
                <h3 className="font-serif text-xl text-theme-ink">{svc.title}</h3>
                <p className="text-sm text-theme-muted">{svc.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Section Anchor Target */}
        <section id="work" className="border-t border-theme-line pt-16 flex flex-col gap-6">
          <span className="label text-theme-accent">{copy.work.label}</span>
          <h2 className="display text-3xl md:text-5xl font-light text-theme-ink">
            {copy.work.heading}
          </h2>
          <p className="text-theme-muted max-w-2xl">{copy.work.lead}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {copy.work.categories.map((cat) => (
              <div key={cat.id} className="p-6 border border-theme-line bg-theme-surface/40 flex flex-col gap-2">
                <h3 className="font-serif text-xl text-theme-ink">{cat.title}</h3>
                <p className="text-sm text-theme-muted">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

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
