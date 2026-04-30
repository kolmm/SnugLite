import { formatPriceEUR } from '../../lib/format';

interface PriceTagProps {
  amount: number;
  fromAmount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASS = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
} as const;

export function PriceTag({ amount, fromAmount, size = 'md', className }: PriceTagProps) {
  const composed = ['tabular font-display', SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ');
  const showFromLabel = fromAmount !== undefined && fromAmount !== amount;

  return (
    <span className={composed}>
      {showFromLabel && (
        <span className="caption text-stone mr-1 align-middle">From</span>
      )}
      {formatPriceEUR(amount)}
    </span>
  );
}
