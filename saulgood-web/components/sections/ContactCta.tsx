import { copy } from "@/content/copy";
import { TransitionLink } from "@/components/layout/PageTransition";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

/** Home-page closer: points to /contact, reusing the Contact copy */
export function ContactCta() {
  return (
    <section
      className="relative w-full border-t border-theme-line bg-theme-bg px-6 py-28 text-center md:px-16 md:py-40"
      aria-label="Start a conversation"
    >
      <Reveal as="p" className="label mb-8 text-[11px] tracking-[0.3em] text-theme-accent-ink">
        {copy.contact.label}
      </Reveal>
      <RevealWords
        text={copy.contact.heading}
        italic={["extraordinary"]}
        className="display mx-auto max-w-[18ch] text-4xl font-light leading-[1.05] md:text-6xl"
      />
      <Reveal as="p" delay={0.1} className="mx-auto mt-8 max-w-[44ch] text-lg font-light text-theme-muted">
        {copy.contact.lead}
      </Reveal>
      <Reveal delay={0.2} className="mt-12">
        <TransitionLink
          href="/contact"
          className="label inline-flex min-h-[48px] items-center justify-center border border-theme-ink bg-theme-ink px-8 text-[11px] tracking-[0.22em] text-theme-bg transition-colors hover:bg-transparent hover:text-theme-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
        >
          {copy.contact.cta}
        </TransitionLink>
      </Reveal>
    </section>
  );
}
