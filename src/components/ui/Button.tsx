import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'rust' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-ink text-cream hover:bg-stone disabled:bg-stone/50 disabled:cursor-not-allowed',
  secondary:
    'bg-cream text-ink border border-ink hover:bg-ink hover:text-cream',
  rust:
    'bg-rust text-cream hover:bg-rust-dark disabled:bg-rust/50 disabled:cursor-not-allowed',
  text:
    'bg-transparent text-ink border-b border-ink hover:border-rust hover:text-rust px-0 py-1',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className, children, ...props }, ref) => {
    const base =
      'caption inline-flex items-center justify-center px-8 py-4 transition-colors duration-200';
    const widthClass = fullWidth ? 'w-full' : '';
    const composed = [base, VARIANT_CLASS[variant], widthClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={composed} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
