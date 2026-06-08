import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SealStamp } from '../brand/SealStamp';
import { ScriptReveal } from '../motion/ScriptReveal';
import { FadeRise } from '../motion/FadeRise';
import { ROUTES } from '../../lib/constants';

export function AboutTeaser() {
  return (
    <section className="bg-paper px-6 lg:px-10 py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <FadeRise className="lg:col-span-5 relative">
          <div className="relative">
            <img
              src="/images/lifestyle/about-hero.jpg"
              alt="Considered office workspace in natural light"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -top-12 -right-8 hidden md:block text-ink">
              <SealStamp
                size={140}
                centerLines={['EST', '2026']}
                perimeterText="SNUGLITE • CONSIDERED WORKSPACES •"
              />
            </div>
          </div>
        </FadeRise>

        <div className="lg:col-span-6 lg:col-start-7">
          <FadeRise>
            <p className="caption text-stone">About</p>
            <h2 className="display-lg mt-4">
              Where function meets <ScriptReveal>disclosure</ScriptReveal>
            </h2>
            <p className="text-lg text-stone leading-relaxed mt-8 max-w-xl">
              SnugLite is a curated reseller of office seating, lighting, and
              workspace accessories. We vet suppliers, test every SKU in the
              studio, and publish the full spec sheet — materials, dimensions,
              certifications, warranty in writing.
            </p>
            <Link
              to={ROUTES.ABOUT}
              className="caption inline-flex items-center gap-3 border-b border-ink mt-8 hover:text-rust hover:border-rust"
            >
              Read Our Story
              <ArrowRight size={14} />
            </Link>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}
