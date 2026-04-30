interface NumberedTagProps {
  number: number;
  className?: string;
}

export function NumberedTag({ number, className }: NumberedTagProps) {
  const composed = ['caption tabular text-stone', className]
    .filter(Boolean)
    .join(' ');
  return <span className={composed}>Nº {String(number).padStart(3, '0')}</span>;
}
