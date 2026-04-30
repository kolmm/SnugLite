# SnugLite — Design System

> **Status:** APPROVED 2026-04-30
> **Variant:** A — "Atelier Editorial"
> **Inspired by:** casperscaviar.com (premium gourmet editorial → applied to office furniture/lighting)

---

## 1. Concept

**Editorial Luxury for Workspace Objects.**
SnugLite presents office furniture and lighting the way a quiet luxury house presents seasonal collections. Generous whitespace, asymmetric grids, photo-first composition, decorative stamps and seals as brand artifacts. Product as object-of-considered-design, not as commodity.

**Audience:** design-led offices, creative agencies, architects specifying interiors, design-conscious procurement.

**One memorable thing:** the dual-typeface rhythm — bold didone caps + script italic accent — repeating across hero, section headings, and stamp emblems. It is the signature.

---

## 2. Color Tokens

```css
:root {
  /* Core */
  --color-ink:        #0A0A0A;   /* primary text, deep brand */
  --color-cream:      #F4F1EA;   /* primary background, warm off-white */
  --color-paper:      #FAF8F3;   /* secondary background, slight lift */
  --color-stone:      #8B847D;   /* muted secondary text, dividers */
  --color-bone:       #E8E3D8;   /* borders, subtle surfaces */

  /* Accent */
  --color-rust:       #B85C38;   /* CTA, decorative accents, sparingly */
  --color-rust-dark:  #94472A;   /* CTA hover */

  /* Functional */
  --color-success:    #4A6741;
  --color-error:      #8B2E1F;
  --color-overlay:    rgba(10, 10, 10, 0.65);
}
```

**Usage rules:**
- Cream `#F4F1EA` is the default background. Ink `#0A0A0A` is the default text.
- Rust accent appears at most 2-3 times per viewport — CTA buttons, key italic words, or decorative seal strokes. Never as background block.
- For dark hero sections: invert (Ink background, Cream text). Rust accent retained.
- Stone `#8B847D` for metadata, secondary copy, captions.

---

## 3. Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;0,6..96,800;0,6..96,900;1,6..96,400;1,6..96,500&family=Italianno&family=Jost:wght@300;400;500;600;700&display=swap');
```

| Role | Family | Usage |
|---|---|---|
| **Display** | Bodoni Moda (700-900, optical-size 96) | Hero headings, section titles, product names — UPPERCASE preferred, tight tracking |
| **Script accent** | Italianno (400) | Single decorative words inside headings, signature elements (e.g. "*Considered Workspaces*"), stamp seal text. Never full sentences. |
| **Body** | Jost (300, 400, 500, 700) | Body copy, UI labels, navigation, buttons, captions |
| **Numerals** | Bodoni Moda 500 with `font-feature-settings: "tnum"` | Prices, dimensions, product numbers (e.g. "Nº 001") |

**Type scale (rem, base 16px):**
- `display-xl` — 6.5rem / 1.0 / -0.02em (hero)
- `display-lg` — 4.5rem / 1.05 / -0.015em (section)
- `display-md` — 3rem / 1.1 / -0.01em (page titles)
- `heading-lg` — 2rem / 1.2 / 0
- `heading-md` — 1.5rem / 1.3 / 0
- `body-lg` — 1.125rem / 1.6 / 0
- `body-md` — 1rem / 1.6 / 0
- `caption` — 0.8125rem / 1.5 / 0.06em (UPPERCASE, letterspaced)

**Italianno scale:**
- Hero: `clamp(5rem, 10vw, 9rem)` — overlapping with bodoni words
- Section: `clamp(2.5rem, 5vw, 4rem)`

---

## 4. Spacing & Grid

- Base unit: **4px**. All spacing in multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160).
- 12-column grid, gutter 24px, max-width 1440px content / 1920px media-edge.
- Section vertical padding: desktop `clamp(96px, 12vh, 160px)`, mobile `64px`.
- Asymmetric layouts encouraged — 5/7, 4/8, 3/9 splits — never default to 6/6.

---

## 5. Surfaces & Borders

- Cards: 1px hairline `--color-bone`, no shadow by default.
- Hover: subtle 4px translate-y up + hairline darkens to `--color-stone`.
- No drop shadows in default state. Reserved for sticky elements (header on scroll, modal).
- Dashed borders (1px dashed `--color-stone` at 40% opacity) for contact form fields and FAQ accordions — direct nod to Casper's stamp aesthetic.

---

## 6. Decorative Brand Artifacts

The seal/stamp is a signature element. Reuse across pages:

- **Circular seal:** SVG, 120-200px diameter, ink stroke, contains brand initials + tagline circling the perimeter and small mark at center. Variants: location stamp ("SNUGLITE • SRL • EU 2026"), tagline stamp ("*Considered* Workspaces").
- **Postage-stamp frame:** dashed-border rectangle around mailing-address blocks (contact page, footer).
- **Numbered tags:** `Nº 001`, `Nº 002` — Bodoni Moda 500, used on product cards near the name as a curated-collection signal.

These appear as accents — never as primary content. One decorative element per viewport, max two.

---

## 7. Motion

```css
:root {
  --ease-soft:  cubic-bezier(0.32, 0.72, 0, 1);
  --ease-snap:  cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast:   200ms;
  --duration-base:   400ms;
  --duration-slow:   700ms;
  --duration-stage:  1100ms;
}
```

- **Page entrance:** staggered fade+rise (`opacity 0→1, translateY 24px→0`), delays 0/100/200/300ms across hero text lines.
- **Scroll reveals:** IntersectionObserver, `--duration-base` with `--ease-soft`. 80px translateY rise.
- **Image parallax:** subtle, `translateY` driven by scroll progress, max 60px range, throttled.
- **Italic accent words:** entrance with `clip-path: inset(0 100% 0 0)` reveal animating to `inset(0 0 0 0)` over 700ms — gives a hand-drawn signature feel.
- **Hover (cards/buttons):** `--duration-fast`, `translateY(-4px)` + border darken.
- **Add-to-cart:** brief seal stamp animation — circle scales 0→1 with rotate(-12deg), then fades, behind the button label flipping to "Added".
- Respect `prefers-reduced-motion: reduce` — disable all transforms, keep only opacity fades.

---

## 8. Components — Visual Notes

**Header**
- Cream background, slight blur backdrop on scroll.
- Layout: left nav (Shop, About, Sourcing) | center wordmark | right (Contact, Cart count).
- Wordmark: "SNUGLITE" in Bodoni Moda 700, with "*srl*" or descriptor in Italianno underneath, smaller.

**Footer**
- Two columns: Information (About, Contact, FAQ, Legal) | Shop (categories).
- Brand wordmark + tagline.
- Hairline dividers, copyright bottom-left.

**Buttons**
- Primary: Ink background, Cream text, no radius, 16px y-padding, body-md uppercase, letter-spaced.
- Secondary: Cream background, Ink hairline border, same metrics.
- Text-link: caret-right arrow + uppercase caption, underline on hover.
- Rust CTA only on the most important conversions (Add to Cart, Send Message).

**Product card**
- Square aspect ratio image on Cream background (matches Casper's product tiles).
- Below image: name + `Nº 00X` on left, price on right. Stone metadata under name.
- No shadow, no border. Hover lifts image 4px, no card movement.

**Forms**
- Label above field, caption-style.
- Field: dashed-border bottom only (`1px dashed stone`), 16px y-padding, transparent background.
- Focus: border solid Ink, no box-shadow.

---

## 9. Imagery Direction

- **Photography:** moody, low-key, single-subject. Product on neutral concrete or wood. Drape-of-light feel. Avoid bright e-commerce white-cyclorama unless used as a stylistic choice on shop grid (then commit fully to it).
- **Hero:** full-bleed, often dark/atmospheric. Workspace context — chair-by-window, lamp casting light on desk.
- **Detail shots:** macro of fabric/wood/metal — emphasize materiality.
- **Avoid:** stock-office cliches (open-plan with people pointing at screens), generic flatlays, AI-renders that betray themselves through soft surfaces and impossible reflections.

---

## 10. Anti-patterns — Avoid

- Saturated brand-blue / brand-orange CTAs in playful tones.
- Card grids with drop-shadows + rounded-2xl corners (default Tailwind UI).
- Generic body fonts — Inter, Roboto, system-ui — even as fallback should be `'Jost', system-ui`.
- Emoji icons. Use Lucide React or hand-drawn SVG.
- Stock photos with people awkwardly smiling at laptops.
- Marketing chrome: "Trusted by 10,000+ teams", trust badges, hero star ratings — does not match the editorial tone.

---

## 11. Pre-delivery Checklist

- [ ] All text contrast ≥ 4.5:1 (Cream/Ink hits 19:1 — safe)
- [ ] `cursor: pointer` on all interactive
- [ ] Visible focus rings (2px Ink offset, no removal)
- [ ] `prefers-reduced-motion` honored
- [ ] Responsive at 375 / 768 / 1024 / 1440 / 1920
- [ ] No emoji as icons (Lucide React)
- [ ] Lighthouse accessibility ≥ 95
- [ ] All product imagery alt-texted
- [ ] Italianno used sparingly — count instances per page, ≤ 3 per viewport

---

## 12. Stack Anchors (locked)

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (with custom theme tokens above)
- React Router v6 (DOM)
- Framer Motion (animations)
- Lucide React (icons)
- React Hook Form (contact form)
- Zustand (cart state, persisted to localStorage)
- Google Fonts (Bodoni Moda, Italianno, Jost) self-hosted via @fontsource for performance
