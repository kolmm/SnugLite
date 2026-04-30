import type { ReactNode } from 'react';

interface LegalLayoutProps {
  caption?: string;
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export function LegalLayout({
  caption = 'Legal',
  title,
  effectiveDate,
  children,
}: LegalLayoutProps) {
  return (
    <article className="px-6 lg:px-10 py-24 max-w-3xl mx-auto">
      <header className="mb-12">
        <p className="caption text-stone">{caption}</p>
        <h1 className="display-md mt-4">{title}</h1>
        <p className="caption text-stone mt-4">Effective: {effectiveDate}</p>
      </header>
      <div className="flex flex-col gap-8 text-ink leading-relaxed">
        {children}
      </div>
    </article>
  );
}
