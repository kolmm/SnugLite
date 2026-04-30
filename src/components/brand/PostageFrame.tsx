import type { ReactNode } from 'react';

interface PostageFrameProps {
  children: ReactNode;
  className?: string;
}

export function PostageFrame({ children, className }: PostageFrameProps) {
  const composed = ['relative p-6 border border-dashed border-stone/60', className]
    .filter(Boolean)
    .join(' ');
  return <div className={composed}>{children}</div>;
}
