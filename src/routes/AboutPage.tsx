import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';
import { SealStamp } from '../components/brand/SealStamp';
import { Manifesto } from '../components/sections/Manifesto';

const ABOUT_BODY = [
  'SnugLite was founded on the conviction that the office should be the place we choose, not endure.',
  'We curate furniture and lighting from a small group of European makers — workshops we visit, materials we hold, joinery we trust to last decades. Each piece earns its space.',
  'Function meets material. The rest is noise.',
];

export function AboutPage() {
  return (
    <>
      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <p className="caption text-stone">About SnugLite</p>
            <h1 className="display-xl mt-6">
              Atelier <ScriptReveal>for</ScriptReveal> Workspaces
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-lg text-stone leading-relaxed">
              A curated reseller of office furniture and lighting working with
              European makers since 2026.
            </p>
          </div>
        </header>

        <FadeRise>
          <div className="grid grid-cols-12 gap-6">
            <img
              src="/images/lifestyle/about-hero.jpg"
              alt="Workshop interior"
              className="col-span-12 md:col-span-8 aspect-[4/3] object-cover"
            />
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <img
                src="/images/lifestyle/about-inset.jpg"
                alt="Considered cabinet"
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

      <Manifesto
        body={ABOUT_BODY}
        scriptAccent={{
          text: 'matters',
          insertAfter: 'Function meets material',
        }}
      />
    </>
  );
}
