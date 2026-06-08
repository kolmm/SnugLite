import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { SealStamp } from '../components/brand/SealStamp';
import { PostageFrame } from '../components/brand/PostageFrame';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { CONTACT, BRAND } from '../lib/constants';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  topic: z.enum(['general', 'order', 'wholesale', 'press']),
  message: z.string().min(10, 'Tell us a little more (10+ characters).'),
});

type ContactForm = z.infer<typeof schema>;

const TOPIC_OPTIONS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'order', label: 'Question about an order' },
  { value: 'wholesale', label: 'Wholesale / trade' },
  { value: 'press', label: 'Press' },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'general' },
  });

  const onSubmit = async () => {
    setSubmitted(true);
  };

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <p className="caption text-stone">Get in Touch</p>
        <h1 className="display-xl mt-6">
          Contact <ScriptReveal>us</ScriptReveal>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {submitted ? (
            <PostageFrame className="text-center py-20">
              <p className="caption text-stone">Sent</p>
              <h2 className="display-md mt-4">Thank you.</h2>
              <p className="text-stone mt-4 max-w-md mx-auto">
                We read every message. Expect a reply within one business day.
              </p>
            </PostageFrame>
          ) : (
            <PostageFrame>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Phone (optional)"
                    type="tel"
                    {...register('phone')}
                  />
                  <Select
                    label="Topic"
                    {...register('topic')}
                    options={TOPIC_OPTIONS}
                  />
                </div>
                <Textarea
                  label="Message"
                  {...register('message')}
                  error={errors.message?.message}
                  placeholder="Tell us how we can help..."
                />
                <Button
                  type="submit"
                  variant="rust"
                  disabled={isSubmitting}
                  className="self-start"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </PostageFrame>
          )}
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-12">
          <div>
            <p className="caption text-stone mb-4">Email</p>
            <a
              href={`mailto:${CONTACT.EMAIL}`}
              className="font-display text-xl hover:text-rust transition-colors"
            >
              {CONTACT.EMAIL}
            </a>
          </div>
          {/* <div>
            <p className="caption text-stone mb-4">Phone</p>
            <a
              href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`}
              className="font-display text-xl hover:text-rust transition-colors tabular"
            >
              {CONTACT.PHONE}
            </a>
          </div> */}
          <div>
            <p className="caption text-stone mb-4">Address</p>
            <p className="text-ink leading-relaxed">
              {CONTACT.ADDRESS_LINE_1}
              <br />
              {CONTACT.ADDRESS_LINE_2}
              <br />
              {CONTACT.COUNTRY}
            </p>
          </div>
          <div>
            <p className="caption text-stone mb-4">Company Number</p>
            <p className="text-ink tabular">{BRAND.COMPANY_NUMBER}</p>
          </div>
          <div className="text-rust self-start">
            <SealStamp size={160} centerLines={['SRL', 'EU', '2026']} />
          </div>
        </aside>
      </div>
    </section>
  );
}
