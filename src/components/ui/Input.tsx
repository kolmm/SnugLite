import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    const fieldClass = [
      'bg-transparent border-0 border-b border-dashed border-stone/60 py-3 text-ink placeholder:text-stone/60 focus:border-solid focus:border-ink focus:outline-none transition-colors',
      error ? 'border-error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="caption text-stone">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={fieldClass} {...props} />
        {error && (
          <span className="caption text-error normal-case tracking-normal">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
