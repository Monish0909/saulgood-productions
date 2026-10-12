# SaulGood Productions — Prompt Pack

Pipeline: **Stitch (visual reference) → Antigravity (build, one step at a time) → Claude (QA + motion polish)**

Rules for the whole pack
- Attach `content.md` to every Stitch and Antigravity prompt. Copy is final. Do not rewrite it.
- Paste Antigravity steps ONE AT A TIME (B0 → B9). Do not merge. Large prompts time out.
- Images/video are samples for now. All media goes through one manifest so real assets swap in later without code changes.
- Two themes, one codebase: `data-theme="light"` (A, editorial) and `data-theme="dark"` (B, cinematic).

References (inspiration only, do not copy):
- soupbyfalka.com: serif display + light sans, image-led, client video testimonials, WhatsApp CTA.
- thewanderlustlab.com: centred logo + split nav, full-width photo bands, category tiles, trailer grid, qualifying contact form (budget, lead time, brief).
- explorishh.com: edge-to-edge photo mosaic, serif nav, black solid buttons, restrained palette.
- Beat them: they all feel template-like, with weak text-over-photo contrast and no real motion. SaulGood must feel more refined: one cohesive system, real scroll motion, readable overlays.

---

# PROMPT 1 — PLAN & ARCHITECTURE

## 1A. STITCH — Direction A (light editorial)

```
Design a desktop + mobile marketing website for "SaulGood Productions", a premium hospitality photography, cinematic videography and aerial studio for hotels, resorts and luxury villas (India). Use the attached content.md as the exact copy.

Direction A — LIGHT EDITORIAL. Quiet luxury, like a boutique hotel brochure.
Palette: warm off-white #F6F2EA background, near-black #14110E text, muted taupe #6B645A secondary, champagne #B89B6A single accent. No gradients except a soft scrim over photos.
Type: high-contrast serif display (Cormorant Garamond style), large, tight tracking (-0.02em), tight leading (1.05); light geometric sans body (Hanken Grotesk style); small wide-tracked uppercase labels (0.18em).
Layout: generous whitespace, 12-col grid, asymmetric image/text pairs, hairline 1px dividers in taupe at 20% opacity.
Screens to design:
1. Hero: 8-photo edge-to-edge mosaic (4x2, no gutters) of resort/hotel/villa/aerial shots, with headline "HOSPITALITY, ELEVATED THROUGH VISUALS." centred over a soft dark scrim, two buttons (solid near-black "EXPLORE OUR WORK", outlined "WORK WITH US"). Floating translucent glass nav (logo wordmark left, links Work, Services, About, Contact right).
2. Philosophy + About (editorial split, big pull-quote, "7+ years" stat).
3. Specialisation: 3 numbered service rows (01/02/03), each with tagline, body, tag list, one large image.
4. Creative Standard: 6 pillars in a 3x2 grid, numerals in champagne.
5. Our Work: 4 category tiles (Hotels, Resorts, Luxury Villas, Hospitality Experiences) as tall image cards with caption + "DISCOVER OUR PORTFOLIO".
6. Approach: 5-step horizontal timeline 01-05.
7. Why SaulGood + Clients strip (6 neutral "Client logo" placeholder slots).
8. Contact: split layout, left copy + email, right qualifying form (Name, Email, Property name & website, Location, Services needed [Photography/Videography/Aerial], Preferred timeline, Message). Black solid submit button.
9. Footer.
Style rules: text over photos must always pass contrast via scrim. Mobile-first stacked layouts. Sample photography only (luxury hotel, villa pool, aerial resort, suite interior, spa, heritage palace).
```

## 1B. STITCH — Direction B (dark cinematic)

```
Same site, content.md, same 9 screens + footer. Direction B — DARK CINEMATIC. Film title sequence feel.
Palette: near-black #0B0A09 background, warm white #F3EDE2 text, muted #9A9288 secondary, bronze #C08A4B single accent, surfaces #14120F.
Type: same serif display pairing but thinner weights and larger scale (up to ~9vw hero), same sans body, wide-tracked caps labels.
Hero: ONE full-viewport aerial resort frame (video still) with headline revealed in two lines, thin bronze rule, scroll cue; text sits on bottom-left over a dark gradient scrim. Translucent glass nav (blur + 60% black).
Other screens: full-bleed photo bands with text overlaid on scrim; horizontal scrolling portfolio strip for "Our Work" (large cards, category label, counter 01/04); services as stacked full-width panels; approach as a vertical progress line with 5 steps; pillars as a 2-col list with hairline separators.
Contact: dark form, bronze focus ring, same fields as A.
Same rule: contrast-safe text over photos, mobile-first.
```

## 1C. PLAN — paste into Claude / Antigravity planning mode

```
ROLE: Principal frontend engineer. Produce a PLAN ONLY. Do not write app code yet.

PROJECT: One-page marketing site for SaulGood Productions (hospitality photography/videography/aerial studio, India). Copy is in the attached content.md (final, verbatim). Two switchable visual themes from one codebase: light editorial (A) and dark cinematic (B). Stitch screens for both are attached as visual reference.

STACK: Next.js (App Router) + TypeScript + Tailwind CSS + GSAP (ScrollTrigger) + Lenis. Deploy target: Vercel. No CMS. No database.

DELIVER:
1. Folder structure (app/, components/sections/, components/ui/, lib/, content/, public/media/placeholder/).
2. Design tokens as CSS variables per theme (`[data-theme=light]`, `[data-theme=dark]`): bg, surface, ink, muted, accent, line, scrim. Map to Tailwind. Theme chosen by `?theme=light|dark` query + a dev-only floating toggle; default dark. Persist in localStorage inside try/catch.
3. Content model: `content/copy.ts` (typed, from content.md), `content/media.ts` (manifest: heroVideoFrames, heroMosaic[8], services[3], work[4 categories x 4 images], approachBg, contactBg; each with src, alt, width, height). Real assets swap by editing the manifest only.
4. Component map: Nav, Hero (variant "scrub" for dark, "mosaic" for light), Philosophy, About, Specialisation (ServiceRow x3), CreativeStandard (Pillar x6), Work (CategoryCard x4; horizontal strip on dark, grid on light), Approach (Step x5), WhySaulGood, Clients (6 placeholder slots), Contact (InquiryForm), Footer.
5. Motion spec (apply /apple-design principles):
   - Lenis smooth scroll, GSAP ScrollTrigger synced via lenis.on('scroll', ScrollTrigger.update) and gsap.ticker.
   - Hero scrub (dark): canvas image-sequence, frames extracted with ffmpeg at fps=24, ScrollTrigger scrub: 2, pinned. Preload first 10 frames immediately, rest lazily.
   - Reveals: opacity + y 24px, spring-like ease (power3.out, ~0.8s), staggered 0.08s. Transform/opacity only.
   - Press feedback on pointer-down: scale 0.97, 100ms.
   - Nav: backdrop-filter blur(20px) saturate(180%), translucent bg, no hard border; fades a soft edge when overlapping content.
   - Type tracking: display -0.02em, body 0, labels +0.18em. Leading: display 1.05, body 1.6.
   - prefers-reduced-motion: disable Lenis + scrub; hero shows static poster; reveals become 200ms opacity cross-fades. Also honour prefers-reduced-transparency and prefers-contrast.
6. Contact form: fields Name, Email, Property name & website, Location, Services needed (checkboxes: Photography, Videography, Aerial), Preferred timeline, Message. Next.js route handler /api/inquiry: zod validation, honeypot field, rate limit by IP (in-memory), send to saulgoodproductions@gmail.com via Resend when RESEND_API_KEY exists, else log to console. No secrets in repo; `.env.example` only. Success + error states inline.
7. Performance budget: LCP < 2.5s, CLS < 0.1, hero frames <= 150 webp at ~1600px wide, next/image everywhere, AVIF/WebP, lazy-load below fold, fonts via next/font with display swap.
8. A11y: semantic landmarks, skip link, visible focus, alt text from manifest, contrast >= 4.5:1 on all text-over-image (scrim tokens), keyboard-operable form.
9. SEO: title, meta description from tagline, OG tags, JSON-LD (LocalBusiness/Organization), sitemap, robots.
10. Build order = steps B0..B9 (below), each independently runnable.
11. Risks + assumptions list (max 8 lines).

Output: concise markdown plan. No code beyond file tree and token tables.
```

---

# PROMPT 2 — IMPLEMENTATION (Antigravity, paste ONE step at a time)

Always attach `content.md` and the Stitch screenshots for the current theme. After each step: run `npm run build`, fix errors, then move on.

### B0 — Scaffold + tokens + media manifest
```
Create a Next.js (App Router) + TypeScript + Tailwind project "saulgood-web". Install gsap, lenis, zod, clsx. Use next/font: Cormorant Garamond (display, weights 300-600) and Hanken Grotesk (body). 
Implement theme tokens in globals.css:
[data-theme="light"]: --bg #F6F2EA; --surface #EFE9DD; --ink #14110E; --muted #6B645A; --accent #B89B6A; --line rgba(20,17,14,.18); --scrim rgba(10,8,6,.45)
[data-theme="dark"]: --bg #0B0A09; --surface #14120F; --ink #F3EDE2; --muted #9A9288; --accent #C08A4B; --line rgba(243,237,226,.16); --scrim rgba(0,0,0,.55)
Map to Tailwind colors. Add ThemeProvider: reads ?theme= query, defaults dark, persists in localStorage (try/catch), sets data-theme on <html>. Add dev-only floating Theme Toggle.
Create content/copy.ts (typed, verbatim from content.md) and content/media.ts manifest per the plan. Download royalty-free sample hospitality photos (resort, villa pool, suite interior, heritage palace, spa, aerial resort, architecture) into public/media/placeholder/ and reference ONLY via the manifest. Use a neutral "Client logo" placeholder SVG for client slots.
Type scale utilities: .display (clamp(2.5rem,7vw,7rem), lh 1.05, tracking -0.02em), .label (0.75rem, uppercase, tracking .18em). Page renders a basic themed shell with the toggle working. Stop there.
```

### B1 — Lenis + GSAP + Nav
```
Add a SmoothScroll provider: Lenis (lerp ~0.1) synced with GSAP ScrollTrigger (lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)). Disable Lenis when prefers-reduced-motion.
Build Nav: wordmark "SAULGOOD" left, links Work, Services, About, Contact right (anchor scroll via lenis.scrollTo), CTA "Work With Us". Translucent glass: backdrop-filter blur(20px) saturate(180%), semi-transparent --bg, no 1px border; add a soft fade edge below. Hides on scroll down, returns on scroll up (spring-like ease). Mobile: full-screen overlay menu, focus-trapped, Esc closes. Respect prefers-reduced-transparency (solid bg).
```

### B2 — Hero (two variants)
```
Build Hero with prop variant = "scrub" (dark) | "mosaic" (light), chosen by theme.
SCRUB: pinned full-viewport canvas image-sequence. Provide script scripts/extract-frames.sh: `ffmpeg -i public/media/hero.mp4 -vf "fps=24,scale=1600:-2" -c:v libwebp -quality 75 public/media/frames/f_%04d.webp` (cap ~150 frames). If no hero.mp4 yet, use a sample stock aerial resort clip as placeholder. ScrollTrigger scrub: 2 drives frame index. Preload first 10 frames, lazy-load the rest. Headline lines reveal over bottom-left gradient scrim; scroll cue; thin accent rule. Unpin after sequence ends.
MOSAIC: 4x2 edge-to-edge grid of 8 manifest photos, no gutters, slow parallax (y +-3%), centred headline over --scrim.
Both: CTAs "EXPLORE OUR WORK" (solid) and "WORK WITH US" (outline); pointer-down scale .97. Reduced motion: static first frame / static mosaic, no pin. Text contrast >= 4.5:1 via scrim.
```

### B3 — Philosophy + About
```
Build Philosophy and About sections from content.md. Philosophy: label, large display heading, lead line, three paragraphs, closer line as a pull-quote. Light: editorial 2-col with hairline divider. Dark: centred over a subtle full-bleed image with scrim. About: image/text asymmetric split, a "7+ years" stat chip, closer line in accent. Reveal on scroll: opacity + y 24px, power3.out, 0.8s, stagger .08. Reduced motion: 200ms cross-fade only.
```

### B4 — Specialisation
```
Build Specialisation: label, heading, lead, then 3 ServiceRows (01 Photography, 02 Videography, 03 Aerial). Each row: big numeral in accent, title, tagline (italic serif), body, tag list as small bordered chips, one large manifest image. Alternate image side on desktop (light); stacked full-width panels with sticky heading on dark. Image gets subtle scale 1.06→1 on reveal. Hover/pointer-down feedback on chips and images. Mobile stacked.
```

### B5 — Creative Standard
```
Build Creative Standard: label, heading, lead, two paragraphs, then 6 Pillars (numeral, title, description). Light: 3x2 grid with hairline separators. Dark: 2-col list with a vertical accent line that fills as you scroll (scrub). Staggered reveal. No placeholder text; use content.md exactly.
```

### B6 — Our Work
```
Build Work: label, heading, lead, body, then 4 CategoryCards (Hotels, Resorts, Luxury Villas, Hospitality Experiences) each with tagline from content.md and 4 images from manifest. Light: 4 tall image tiles in a grid, image zoom 1.04 on hover, caption below. Dark: pinned horizontal strip, vertical scroll maps to horizontal translate (scrub), counter 01/04, drag-to-scroll with momentum (pointer capture, velocity handoff). Click a card opens a fullscreen lightbox gallery (keyboard arrows + Esc, focus trap, swipe on touch, spring-eased transitions, interruptible). CTA "DISCOVER OUR PORTFOLIO" opens the first lightbox. Reduced motion: no pin, normal vertical layout.
```

### B7 — Approach + Why SaulGood
```
Build Approach: label, heading, 5 Steps (01 UNDERSTAND … 05 DELIVER) with descriptions. Light: horizontal 5-column timeline with hairlines. Dark: vertical timeline with an accent progress line scrubbed by scroll. Build WhySaulGood: heading + 5 points (bold title + description) as a 2-col editorial list, large number-free typography, hairline separators. Same reveal rules.
```

### B8 — Clients + Contact + Footer
```
Clients: label, heading, body, 6 neutral "Client logo" placeholder slots in a responsive row (monochrome, opacity .6, hover 1). Add a code comment: replace with verified client logos; never invent names.
Contact: label, heading, lead, body, closer, CTA anchor "START A CONVERSATION" scrolls to form. Build InquiryForm per plan (Name, Email, Property name & website, Location, Services needed checkboxes, Preferred timeline, Message). Inline validation (on blur), success/error states, honeypot, disabled-while-sending, aria-live status. API route /api/inquiry: zod validate, rate limit (5/hour/IP in-memory), send to saulgoodproductions@gmail.com via Resend if RESEND_API_KEY set else console.log. Add .env.example. Company block + email mailto link.
Footer: wordmark, tagline, property types line, dynamic-year copyright "© {year} SaulGood Productions LLP. All Rights Reserved."
```

### B9 — Responsive, motion polish, perf, SEO
```
Audit and fix: mobile 375px and tablet 768px layouts; no horizontal scroll; 16px side gutters. Apply /apple-design checklist: all animations interruptible, press feedback on pointer-down, transform/opacity only, will-change only where motion is imminent, reduced-motion / reduced-transparency / prefers-contrast fallbacks. Add metadata (title, description, OG, Twitter), JSON-LD Organization, sitemap.ts, robots.ts, favicon. next/image sizes everywhere, lazy-load below fold. Run `next build` and Lighthouse; report scores. Fix anything under: Performance 85, Accessibility 95, SEO 95.
```

---

# PROMPT 3 — REVIEW, TESTING & OPTIMIZATION (Claude QA)

```
ROLE: Senior frontend reviewer + QA. Review the built saulgood-web repo against content.md and the Stitch screens. Report findings by severity (Blocker / Major / Minor) with file:line and a concrete fix. Then apply fixes.

CHECK
1. Copy fidelity: every string matches content.md exactly (headings, taglines, tags, CTAs). List any deviation. Footer year is dynamic. No invented client names.
2. Themes: switching ?theme=light|dark changes tokens only, no layout bugs, no hardcoded colours outside tokens.
3. Hero: dark scrub plays forward/back smoothly, no frame pop, first paint fast; light mosaic parallax is subtle; both show a usable static state with reduced motion.
4. Motion quality (/apple-design): interruptible, no jumps on reverse scroll, no layout shift, lightbox + horizontal strip use velocity handoff, nothing animates width/height/top/left.
5. Contrast: every text-over-image passes WCAG AA (measure, don't eyeball). Fix with scrim tokens.
6. Accessibility: landmarks, skip link, focus order, focus-visible, form labels/errors, Esc/arrow keys in lightbox, alt text from manifest, screen-reader text for numerals.
7. Form: validation, honeypot, rate limit, no secrets committed, graceful failure, mailto fallback works.
8. Performance: Lighthouse mobile >= 85 perf, LCP < 2.5s, CLS < 0.1, hero frame payload size, image formats, unused JS.
9. Responsive: 375 / 768 / 1280 / 1920 screenshots, no overflow, tap targets >= 44px.
10. SEO + security headers, env handling, console errors = 0.
11. Swap test: replace three manifest images + hero video with new files, confirm nothing else changes.

OUTPUT: findings table, fixes applied, remaining risks, final readiness verdict (Ship / Ship after fixes / Not ready).
```
