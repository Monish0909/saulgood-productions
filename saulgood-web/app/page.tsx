import Image from "next/image";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-24">
      {/* Brand Header */}
      <header className="flex flex-col gap-4 border-b border-theme-line pb-8">
        <span className="label text-theme-muted tracking-widest">
          {copy.brand.descriptor} · {copy.brand.locationLine}
        </span>
        <h1 className="display text-theme-ink tracking-tight font-light">
          {copy.hero.headline}
        </h1>
        <p className="text-theme-muted max-w-2xl text-base md:text-lg">
          {copy.hero.body}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href={copy.hero.ctaPrimary.href}
            className="label inline-block rounded-none border border-theme-ink bg-theme-ink px-6 py-3 text-theme-bg font-medium tracking-widest transition-opacity hover:opacity-90"
          >
            {copy.hero.ctaPrimary.label}
          </a>
          <a
            href={copy.hero.ctaSecondary.href}
            className="label inline-block rounded-none border border-theme-line bg-theme-surface px-6 py-3 text-theme-ink font-medium tracking-widest transition-colors hover:border-theme-ink"
          >
            {copy.hero.ctaSecondary.label}
          </a>
        </div>
      </header>

      {/* Proof Shell: Philosophy & Tokens */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
              priority
            />
          </div>
          <div className="flex items-center justify-between text-xs text-theme-muted border-t border-theme-line pt-3">
            <span>Asset: {mediaManifest.heroMosaic[0].src}</span>
            <span className="label text-[10px]">VERIFIED VIA MANIFEST</span>
          </div>
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
    </main>
  );
}
