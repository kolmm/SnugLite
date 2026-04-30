import type { ReactNode } from 'react';

interface ScriptAccentProps {
  children: ReactNode;
  className?: string;
}

export function ScriptAccent({ children, className }: ScriptAccentProps) {
  const composed = ['script-accent inline-block align-baseline', className]
    .filter(Boolean)
    .join(' ');
  return <span className={composed}>{children}</span>;
}
