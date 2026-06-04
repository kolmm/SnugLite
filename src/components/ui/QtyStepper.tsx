import { Minus, Plus } from 'lucide-react';

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
}

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  ariaLabel = 'Quantity',
}: QtyStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className="inline-flex items-stretch border border-dashed border-stone/60"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className="px-3 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="px-4 py-2 min-w-[3ch] text-center tabular">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className="px-3 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
