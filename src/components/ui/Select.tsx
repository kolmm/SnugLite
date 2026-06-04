import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, id, className, ...props }, ref) => {
    const selectId = id ?? props.name;
    const fieldClass = [
      'w-full appearance-none bg-transparent border-0 border-b border-dashed border-stone/60 py-3 pr-8 text-ink focus:border-solid focus:border-ink focus:outline-none cursor-pointer',
      error ? 'border-error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={selectId} className="caption text-stone">
            {label}
          </label>
        )}
        <div className="relative">
          <select ref={ref} id={selectId} className={fieldClass} {...props}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
          />
        </div>
        {error && (
          <span className="caption text-error normal-case tracking-normal">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
