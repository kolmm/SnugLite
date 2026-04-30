import type { ProductVariant } from '../../types';
import { formatPriceEUR } from '../../lib/format';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId?: string;
  onSelect: (variant: ProductVariant) => void;
}

const TYPE_LABEL: Record<ProductVariant['type'], string> = {
  color: 'Color',
  material: 'Material',
  size: 'Size',
};

export function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) return null;

  const groups = new Map<ProductVariant['type'], ProductVariant[]>();
  for (const v of variants) {
    const list = groups.get(v.type) ?? [];
    list.push(v);
    groups.set(v.type, list);
  }

  return (
    <div className="flex flex-col gap-6">
      {Array.from(groups.entries()).map(([type, opts]) => (
        <fieldset key={type} className="flex flex-col gap-3">
          <legend className="caption text-stone">{TYPE_LABEL[type]}</legend>
          <div className="flex flex-wrap gap-3">
            {opts.map((v) => {
              const active = v.id === selectedId;
              const btnClass = [
                'px-4 py-2 border transition-colors caption',
                active
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-cream text-ink border-stone/60 hover:border-ink',
              ].join(' ');
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelect(v)}
                  className={btnClass}
                  aria-pressed={active}
                >
                  {v.name}
                  {v.priceModifier !== 0 && (
                    <span className="ml-2 text-stone normal-case tracking-normal">
                      ({v.priceModifier > 0 ? '+' : ''}
                      {formatPriceEUR(v.priceModifier)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
