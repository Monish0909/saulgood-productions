import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Marquee } from "@/components/sections/Marquee";
import { ContactCta } from "@/components/sections/ContactCta";
import { ScrollExpand } from "@/components/ui/ScrollExpand";
import { copy } from "@/content/copy";
import { mediaManifest } from "@/content/media";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Marquee />
      <Philosophy />
      <ScrollExpand image={mediaManifest.heroMosaic.find((m) => m.src.includes("suite-interior")) ?? mediaManifest.heroMosaic[1]}>
        <blockquote>
          <p className="max-w-[14em] font-serif text-3xl font-light leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
            &ldquo;{copy.philosophy.closer}&rdquo;
          </p>
        </blockquote>
      </ScrollExpand>
      <ContactCta />
    </div>
  );
}
