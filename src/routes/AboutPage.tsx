import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';
import { SealStamp } from '../components/brand/SealStamp';
import { PostageFrame } from '../components/brand/PostageFrame';
import { Manifesto } from '../components/sections/Manifesto';
import { BRAND, ROUTES } from '../lib/constants';

const ABOUT_BODY = [
  'SnugLite was founded on the conviction that the office should be the place we choose, not endure.',
  'We curate seating, lighting, and workspace accessories from a vetted list of suppliers. We test every SKU in our own studio, publish full spec sheets, and back the warranty for the period we list.',
  'Function meets material. The rest is noise.',
];

const TENETS: { title: string; body: string }[] = [
  {
    title: 'Curation over catalogue',
    body:
      'We carry fewer SKUs than any room would expect. What stays has been tested in the studio, audited for spec, and chosen for one reason: it earns its place at this price.',
  },
  {
    title: 'Specs over slogans',
    body:
      'Every listing publishes the full sheet — materials, dimensions, certifications, warranty terms in writing. If we cannot disclose it, we do not list it.',
  },
  {
    title: 'Honesty over polish',
    body:
      'We tell you where it ships from, when it actually arrives, and what we will and will not back. The site should read like the receipt that follows it.',
  },
];

const PROCESS: { title: string; body: string }[] = [
  {
    title: 'Supplier vetting',
    body:
      'We require business registration, current certifications, audit references, and a real client list before we order a sample. Anonymous suppliers do not enter the path.',
  },
  {
    title: 'Studio trial',
    body:
      'A unit lives in the studio for ninety days under daily load. We log gas-lift drop, fastener loosening, finish wear, and whether we still reach for it. If we do not, it does not ship.',
  },
  {
    title: 'Direct fulfilment',
    body:
      'Orders move from the supplier through our European fulfilment partner to your door. We track every leg, share the tracking, and answer when something goes wrong.',
  },
];

export function AboutPage() {
  return (
    <>
      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <p className="caption text-stone">About SnugLite</p>
            <h1 className="display-xl mt-6">
              Curated <ScriptReveal>for</ScriptReveal> Workspaces
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-lg text-stone leading-relaxed">
              An EU-registered curated reseller of office seating, lighting,
              and workspace accessories. Operating across the EU since {BRAND.YEAR_FOUNDED}.
            </p>
          </div>
        </header>

        <FadeRise>
          <div className="grid grid-cols-12 gap-6">
            <img
              src="/images/lifestyle/about-hero.jpg"
              alt="Studio interior with curated office furniture"
              className="col-span-12 md:col-span-8 aspect-[4/3] object-cover"
            />
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <img
                src="/images/lifestyle/about-inset.jpg"
                alt="Workspace storage detail"
                className="w-full aspect-square object-cover"
              />
              <div className="text-rust self-end">
                <SealStamp
                  size={140}
                  centerLines={['SRL', '2026']}
                  perimeterText="SNUGLITE • CONSIDERED WORKSPACES •"
                />
              </div>
            </div>
          </div>
        </FadeRise>
      </section>

      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="caption text-stone">Origin · Nº 01</p>
            <h2 className="display-lg mt-6">
              A brief <span className="script-accent">before</span> a shop
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6 text-lg leading-relaxed">
            <FadeRise delay={0.05}>
              <p>
                SnugLite began as a furnishing problem — a single office in
                Bucharest that needed seating, storage, and lighting on a real
                budget. The market split clean down the middle: anonymous
                resellers with broken specs, or design stores at three times
                the budget.
              </p>
            </FadeRise>
            <FadeRise delay={0.1}>
              <p>
                So we built the middle ourselves. We vetted suppliers, ordered
                samples at retail, and ran each unit through ninety days of
                studio use before listing it. Friends asked where the chair
                came from, and the lamp, and the cart. The list became a
                catalogue.
              </p>
            </FadeRise>
            <FadeRise delay={0.15}>
              <p className="text-stone">
                Today {BRAND.ENTITY} operates as a small curated reseller,
                working with vetted suppliers across the EU. The brief is
                unchanged: clear specs, fair price, real backing.
              </p>
            </FadeRise>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <p className="caption text-stone">Tenets</p>
            <h2 className="display-lg mt-6">
              What we <span className="script-accent">believe</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <p className="text-lg text-stone leading-relaxed">
              Three principles guide every selection — and every piece we
              choose to leave out.
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TENETS.map((tenet, idx) => (
            <FadeRise key={tenet.title} delay={idx * 0.08}>
              <article className="flex flex-col gap-5 border-t border-ink pt-6">
                <p className="caption text-stone">
                  Nº {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  {tenet.title}
                </h3>
                <p className="text-stone leading-relaxed">{tenet.body}</p>
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
              From spec <span className="script-accent">to</span> door
            </h2>
            <p className="mt-8 text-stone leading-relaxed max-w-sm">
              How a SKU moves from a supplier dossier to a room you keep
              returning to.
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6 flex flex-col gap-12">
            {PROCESS.map((step, idx) => (
              <FadeRise key={step.title} delay={idx * 0.08} as="div">
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

      <Manifesto
        body={ABOUT_BODY}
        scriptAccent={{
          text: 'matters',
          insertAfter: 'Function meets material',
        }}
      />

      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <FadeRise>
          <PostageFrame className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-10 md:p-16">
            <div className="md:col-span-7">
              <p className="caption text-stone">Continue</p>
              <h2 className="display-md mt-4">
                See the pieces <span className="script-accent">we keep</span>
              </h2>
              <p className="text-stone leading-relaxed mt-6 max-w-lg">
                Every listing has been tested in our studio and signed off on
                spec. Browse the current selection, or read how each one makes
                it through.
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
                to={ROUTES.SOURCING}
                className="caption inline-flex items-center justify-between gap-3 border-b border-ink py-2 hover:text-rust hover:border-rust"
              >
                How we source
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
