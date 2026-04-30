import type { ReactNode } from 'react';
import { ScriptReveal } from '../motion/ScriptReveal';

interface SectionHeadingProps {
  caption?: string;
  title: string;
  scriptAccent?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  caption,
  title,
  scriptAccent,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const composed = [
    'flex flex-col gap-4',
    align === 'center' ? 'items-center text-center' : 'items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={composed}>
      {caption && <p className="caption text-stone">{caption}</p>}
      <h2 className="display-md">
        {title}
        {scriptAccent && (
          <>
            {' '}
            <ScriptReveal>{scriptAccent}</ScriptReveal>
          </>
        )}
      </h2>
      {description && (
        <p className="text-lg text-stone max-w-xl">{description}</p>
      )}
    </header>
  );
}
