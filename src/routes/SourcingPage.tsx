import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';
import { PostageFrame } from '../components/brand/PostageFrame';
import { ROUTES } from '../lib/constants';

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: 'We curate, we do not manufacture',
    body:
      'SnugLite is a curated online reseller. We choose suppliers, audit the spec, and stand behind every order — manufacturing and dispatch happen at vetted partner factories that ship direct to the buyer.',
  },
  {
    title: 'Spec-first listing',
    body:
      'No SKU goes live before we have the full sheet on file — materials, certifications, load ratings, warranty terms. If the supplier cannot disclose it on paper, it does not enter the catalogue.',
  },
  {
    title: 'Standards-led, not marketing-led',
    body:
      'A chair earns a listing because it meets BIFMA, EN 1335, and EU chemical safety — not because the photography is pretty.',
  },
  {
    title: 'Honest lead times',
    body:
      'We disclose where a piece ships from, how long it actually takes, and what the warranty floor is. No glossy estimates that fall apart at checkout.',
  },
  {
    title: 'Direct from the supplier',
    body:
      'We do not keep stock. Orders ship from the supplier’s EU warehouse straight to the buyer — fewer intermediaries, faster route to your door, and the same warranty that ships with the unit.',
  },
];

const STATS: { figure: string; label: string }[] = [
  { figure: '44', label: 'Listings active' },
  { figure: '03', label: 'Active categories' },
  { figure: '100%', label: 'Spec sheets published' },
  { figure: '24mo', label: 'Warranty floor' },
];

const CATEGORIES: { name: string; spec: string; body: string; status: string }[] = [
  {
    name: 'Office furniture',
    spec: 'Seating · desks · pedestals',
    body:
      'Ergonomic task chairs, executive and gaming seating, desks, and mobile filing. Class 4 gas lifts, BIFMA/EN 1335 reports on file, foams and mesh chosen to hold past the warranty window.',
    status: 'Active',
  },
  {
    name: 'Shelving systems',
    spec: 'Powder-coat steel · MDF cores',
    body:
      'Rolling carts, drawer units, and storage pedestals chosen for stability under load, fastener quality, and finish wear at this price point.',
    status: 'Active',
  },
  {
    name: 'Lighting',
    spec: 'Task · ambient · decorative',
    body:
      'Clamp lamps, LED ceiling fixtures, table lamps, and pendants. Every unit ships with EU plug, CE declaration of conformity, and a written warranty card.',
    status: 'Active',
  },
];

const PROCESS: { title: string; body: string }[] = [
  {
    title: 'Sourcing dossier',
    body:
      'A supplier is shortlisted only after we receive a full dossier: business registration, certifications on file, factory audit references, and existing client list.',
  },
  {
    title: 'Spec sheet review',
    body:
      'We request the full technical sheet — materials, load ratings, gas-lift class, foam density, finish certifications. We cross-check against the standards we list against (BIFMA, EN 1335, CE, REACH).',
  },
  {
    title: 'Reference check',
    body:
      'We check existing customer reviews on the supplier’s own channels, ask for a sample of recent shipping records, and confirm warranty handling on past claims. Patterns of complaint kill the listing before it starts.',
  },
  {
    title: 'Spec sheet & listing',
    body:
      'If it passes, we publish a public spec sheet — materials, certifications, dimensions, country of dispatch, lead time, and the warranty terms in writing.',
  },
  {
    title: 'Quarterly review',
    body:
      'Every active supplier is re-checked each quarter. Quality drift, delivery slippage, or warranty noise triggers a delisting. Customers see the change before they hear about it.',
  },
];

const YES: string[] = [
  'BIFMA X5.1 / EN 1335 certified seating',
  'CE-marked electrical accessories',
  'Class 4 SGS-rated gas lifts',
  'Mesh tested past 30,000 Martindale rubs',
  'Welded steel frames with documented load ratings',
  '24-month minimum manufacturer warranty',
  'Public spec sheet on every listing',
];

const NO: string[] = [
  'Anonymous suppliers without business registration',
  'Class 1 or 2 gas lifts (low-cycle hardware)',
  'Listings without weight, payload, or material disclosure',
  'White-label rebrands with no traceable factory',
  'Warranty terms shorter than twelve months',
  'Adhesives or finishes outside REACH compliance',
  'Photos from one supplier, product from another',
];

const STANDARDS: { label: string; body: string }[] = [
  {
    label: 'BIFMA X5.1',
    body: 'Seating durability and structural standard. We require test reports on file for every task and executive chair we list.',
  },
  {
    label: 'EN 1335',
    body: 'European office-chair safety standard. Covers dimensions, stability, and durability of office seating sold into the EU.',
  },
  {
    label: 'CE & REACH',
    body: 'Electrical accessories and lighting carry CE conformity. Finishes, adhesives, and foams meet EU chemical safety regulation.',
  },
];

export function SourcingPage() {
  return (
    <>
      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <p className="caption text-stone">Sourcing</p>
            <h1 className="display-xl mt-6">
              How we choose <ScriptReveal>what we carry</ScriptReveal>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-lg text-stone leading-relaxed">
              SnugLite is a curated reseller of office seating, lighting, and
              workspace accessories. We do not manufacture — we vet, test, and
              stand behind every listing.
            </p>
          </div>
        </header>

        <FadeRise>
          <img
            src="/images/lifestyle/sourcing-hero.jpg"
            alt="Workspace texture and material detail"
            className="w-full aspect-[16/9] object-cover mb-20"
          />
        </FadeRise>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {PRINCIPLES.map((p, idx) => (
            <FadeRise key={p.title} delay={idx * 0.1}>
              <div className="flex flex-col gap-4">
                <p className="caption text-stone">
                  Nº {String(idx + 1).padStart(2, '0')}
                </p>
                <h2 className="font-display text-3xl font-bold leading-tight">
                  {p.title}
                </h2>
                <p className="text-stone leading-relaxed">{p.body}</p>
              </div>
            </FadeRise>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 border-y border-ink/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat, idx) => (
            <FadeRise key={stat.label} delay={idx * 0.06}>
              <div className="flex flex-col gap-3 border-t border-ink pt-5">
                <p className="font-display text-5xl md:text-6xl font-bold leading-none tabular">
                  {stat.figure}
                </p>
                <p className="caption text-stone">{stat.label}</p>
              </div>
            </FadeRise>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <p className="caption text-stone">Categories</p>
            <h2 className="display-lg mt-6">
              What we <span className="script-accent">carry</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <p className="text-lg text-stone leading-relaxed">
              Three active categories — furniture, shelving, and lighting — all
              held to the same testing bar.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          {CATEGORIES.map((cat, idx) => (
            <FadeRise key={cat.name} delay={idx * 0.08}>
              <article className="flex flex-col gap-4 border-t border-ink pt-6 h-full">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl font-bold leading-tight">
                    {cat.name}
                  </h3>
                  <p className="caption tabular text-stone">
                    Nº {String(idx + 1).padStart(2, '0')}
                  </p>
                </div>
                <p className="caption text-stone">{cat.spec}</p>
                <p className="text-stone leading-relaxed">{cat.body}</p>
                <p
                  className={
                    'caption mt-auto pt-4 ' +
                    (cat.status === 'Active' ? 'text-rust' : 'text-stone')
                  }
                >
                  {cat.status}
                </p>
              </article>
            </FadeRise>
          ))}
        </div>
      </section>

      <section className="bg-ink text-cream px-6 lg:px-10 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="caption text-stone">Process</p>
            <h2 className="display-lg mt-6 text-cream">
              How a SKU <span className="script-accent">earns a listing</span>
            </h2>
            <p className="mt-8 text-stone leading-relaxed max-w-sm">
              Five steps between a supplier reaching out and a product appearing
              in the catalogue. Most never finish the path — that is the point.
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6 flex flex-col gap-12">
            {PROCESS.map((step, idx) => (
              <FadeRise key={step.title} delay={idx * 0.06} as="div">
                <li className="grid grid-cols-12 gap-6 border-t border-stone/40 pt-6 list-none">
                  <p className="caption text-stone col-span-3 md:col-span-2">
                    Step {String(idx + 1).padStart(2, '0')}
                  </p>
                  <div className="col-span-9 md:col-span-10 flex flex-col gap-3">
                    <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight text-cream">
                      {step.title}
                    </h3>
                    <p className="text-stone leading-relaxed">{step.body}</p>
                  </div>
                </li>
              </FadeRise>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <p className="caption text-stone">Bar to entry</p>
            <h2 className="display-lg mt-6">
              What clears the bar — <span className="script-accent">and what doesn't</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <p className="text-lg text-stone leading-relaxed">
              The catalogue is shaped as much by the no as by the yes. Both
              lists are kept public.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FadeRise>
            <div className="flex flex-col gap-6 border-t border-ink pt-6">
              <p className="caption text-ink">Listed</p>
              <ul className="flex flex-col">
                {YES.map((item) => (
                  <li
                    key={item}
                    className="border-b border-ink/15 py-4 text-lg leading-snug"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeRise>

          <FadeRise delay={0.08}>
            <div className="flex flex-col gap-6 border-t border-stone pt-6">
              <p className="caption text-stone">Declined</p>
              <ul className="flex flex-col">
                {NO.map((item) => (
                  <li
                    key={item}
                    className="border-b border-stone/30 py-4 text-lg leading-snug text-stone line-through decoration-rust/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeRise>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-paper">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="caption text-stone">Standards</p>
            <h2 className="display-md mt-4">
              Verified, <span className="script-accent">on file</span>
            </h2>
            <p className="text-stone leading-relaxed mt-6 max-w-sm">
              Every listed supplier provides current test reports and conformity
              documents. We share them on request before purchase.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {STANDARDS.map((std, idx) => (
              <FadeRise key={std.label} delay={idx * 0.08}>
                <div className="flex flex-col gap-4 border-t border-ink pt-5">
                  <p className="font-display text-2xl font-bold tracking-wide">
                    {std.label}
                  </p>
                  <p className="text-stone leading-relaxed text-sm">
                    {std.body}
                  </p>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <FadeRise>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <img
              src="/images/lifestyle/sourcing-detail.jpg"
              alt="Material and finish detail"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="caption text-stone">In closing</p>
              <h3 className="display-md mt-4">
                The yes is slow. <ScriptReveal>The no is honest.</ScriptReveal>
              </h3>
              <p className="text-stone mt-6 leading-relaxed max-w-md">
                We carry fewer SKUs because the path to a listing is harder than
                the path off one. Every product you see has cleared the bar —
                and we will tell you, plainly, when something has not.
              </p>
            </div>
          </div>
        </FadeRise>

        <FadeRise>
          <PostageFrame className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-10 md:p-16">
            <div className="md:col-span-7">
              <p className="caption text-stone">Continue</p>
              <h2 className="display-md mt-4">
                See the pieces <span className="script-accent">we list</span>
              </h2>
              <p className="text-stone leading-relaxed mt-6 max-w-lg">
                Browse the current catalogue, or read the longer story behind
                how SnugLite came to be.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
              <Link
                to={ROUTES.SHOP}
                className="caption inline-flex items-center justify-between gap-3 border border-ink px-5 py-4 hover:bg-ink hover:text-cream transition-colors"
              >
                Browse the catalogue
                <ArrowRight size={14} />
              </Link>
              <Link
                to={ROUTES.ABOUT}
                className="caption inline-flex items-center justify-between gap-3 border-b border-ink py-2 hover:text-rust hover:border-rust"
              >
                The story behind it
                <ArrowRight size={14} />
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="caption inline-flex items-center justify-between gap-3 border-b border-ink py-2 hover:text-rust hover:border-rust"
              >
                Speak with us
                <ArrowRight size={14} />
              </Link>
            </div>
          </PostageFrame>
        </FadeRise>
      </section>
    </>
  );
}
