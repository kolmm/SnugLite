import { Link } from 'react-router';
import { ROUTES } from '../../lib/constants';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

const SIZE_CLASS = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const;

export function Logo({ size = 'md', inverted = false }: LogoProps) {
  const wordmarkClass = [
    'font-display font-bold tracking-tight uppercase leading-none transition-opacity group-hover:opacity-80',
    SIZE_CLASS[size],
    inverted ? 'text-cream' : 'text-ink',
  ].join(' ');

  const subClass = [
    'inline-block transition-opacity group-hover:opacity-80',
    inverted ? 'text-cream/80' : 'text-rust',
  ].join(' ');

  return (
    <Link
      to={ROUTES.HOME}
      className="inline-flex flex-col items-center group"
      aria-label="SnugLite — Home"
    >
      <span className={wordmarkClass}>SnugLite</span>
      <span
        className={subClass}
        style={{ fontFamily: 'Italianno, cursive', fontSize: '1rem', marginTop: '-0.4em' }}
      >
        srl
      </span>
    </Link>
  );
}
