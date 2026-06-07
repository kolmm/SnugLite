import { Accordion } from '../components/ui/Accordion';
import { FAQ_ITEMS } from '../data/faq';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';

export function FaqPage() {
  const items = FAQ_ITEMS.map((q) => ({
    title: q.question,
    content: <p>{q.answer}</p>,
  }));

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <FadeRise className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          <p className="caption text-stone">Information</p>
          <h1 className="display-lg mt-6">
            Frequently <ScriptReveal>asked</ScriptReveal>
          </h1>
          <p className="text-stone mt-8 leading-relaxed max-w-md">
            Everything we get asked, in one place. If you do not find what you
            need, the contact form is one click away.
          </p>
          <img
            src="/images/lifestyle/contact-bg.jpg"
            alt=""
            aria-hidden
            className="mt-12 aspect-[4/5] object-cover"
          />
        </FadeRise>

        <div className="lg:col-span-7">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
