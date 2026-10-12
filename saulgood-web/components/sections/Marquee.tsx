import { copy } from "@/content/copy";

/** Slow editorial ticker under the hero. Pure CSS; static under reduced motion. */
export function Marquee() {
  const items = copy.brand.servicesLine.split(" · ");
  const row = (hidden: boolean) => (
    <div className="marquee-row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="font-serif text-3xl font-light italic tracking-tight text-theme-ink md:text-5xl">
            {t}
          </span>
          <span className="mx-8 text-theme-accent-ink md:mx-14" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="marquee overflow-hidden border-y border-theme-line bg-theme-bg py-8 md:py-12"
      role="presentation"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
