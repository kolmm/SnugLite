import { Hero } from '../components/sections/Hero';
import { FeaturedCollection } from '../components/sections/FeaturedCollection';
import { AboutTeaser } from '../components/sections/AboutTeaser';
import { CategoriesShowcase } from '../components/sections/CategoriesShowcase';
import { Manifesto } from '../components/sections/Manifesto';
import { Newsletter } from '../components/sections/Newsletter';

const MANIFESTO_BODY = [
  'We started SnugLite because the office is the place we spend most of our waking life — and most of what fills it is forgettable.',
  'Every SKU in this catalogue is chosen for material honesty and longevity. We vet our suppliers, test every unit in our own studio, and publish the spec in full.',
  'Function meets material. Nothing more, nothing less.',
];

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <AboutTeaser />
      <Manifesto
        body={MANIFESTO_BODY}
        scriptAccent={{ text: 'matters', insertAfter: 'material honesty' }}
      />
      <CategoriesShowcase />
      <Newsletter />
    </>
  );
}
