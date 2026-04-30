import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: 'Material honesty',
    body:
      'Solid wood, brushed steel, woven textile. We choose materials that age with use rather than hide behind veneer.',
  },
  {
    title: 'Small-batch makers',
    body:
      'Our partners run workshops measured in dozens, not thousands. Every order ships through people we know by name.',
  },
  {
    title: 'European origin',
    body:
      'Producing in the EU keeps lead times honest, supports local craft, and lets us visit the workshops yearly.',
  },
  {
    title: 'Built to last decades',
    body:
      'Joinery, hardware, and finishes specified to outlast trends. Spare parts available for years after purchase.',
  },
];

export function SourcingPage() {
  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8">
          <p className="caption text-stone">Sourcing</p>
          <h1 className="display-xl mt-6">
            Where it <ScriptReveal>comes from</ScriptReveal>
          </h1>
        </div>
      </header>

      <FadeRise>
        <img
          src="/images/lifestyle/sourcing-hero.jpg"
          alt="Weathered wooden surface with grain"
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

      <FadeRise>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
          <img
            src="/images/lifestyle/sourcing-detail.jpg"
            alt="Wooden surface detail"
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="caption text-stone">Coming Autumn 2026</p>
            <h3 className="display-md mt-4">
              Lighting <ScriptReveal>collection</ScriptReveal>
            </h3>
            <p className="text-stone mt-6 leading-relaxed">
              Our first lighting drop launches alongside our autumn furniture
              additions, sourced from two ateliers in northern Italy and one in
              Denmark.
            </p>
          </div>
        </div>
      </FadeRise>
    </section>
  );
}
