import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    const fieldClass = [
      'bg-transparent border border-dashed border-stone/60 px-4 py-3 text-ink placeholder:text-stone/60 focus:border-solid focus:border-ink focus:outline-none transition-colors resize-y',
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
        <textarea
          ref={ref}
          id={inputId}
          rows={5}
          className={fieldClass}
          {...props}
        />
        {error && (
          <span className="caption text-error normal-case tracking-normal">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
