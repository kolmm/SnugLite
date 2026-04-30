import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ArrowRight } from 'lucide-react';
import { GrainOverlay } from '../brand/GrainOverlay';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      <img
        src="/images/marketing/1972.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <GrainOverlay opacity={0.08} />
      <div className="relative px-6 lg:px-10 py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="caption text-cream/60">Join the List</p>
          <h2 className="display-lg mt-4">
            New pieces.{' '}
            <span
              className="text-rust"
              style={{ fontFamily: 'Italianno, cursive', fontSize: '1.1em' }}
            >
              Quietly.
            </span>
          </h2>
          <p className="text-cream/70 mt-6 max-w-lg leading-relaxed">
            Two emails a year, when something we are proud of arrives. No
            promotions, no noise.
          </p>
        </div>

        <form className="lg:col-span-5 self-end w-full" onSubmit={onSubmit}>
          {submitted ? (
            <p className="text-cream/90 py-4 caption">
              Subscribed. We will be in touch.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                type="email"
                required
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-cream placeholder:text-cream/40 border-cream/40 focus:border-cream"
              />
              <Button type="submit" variant="rust" className="self-start">
                Subscribe
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
