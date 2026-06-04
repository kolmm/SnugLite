interface GrainOverlayProps {
  opacity?: number;
  className?: string;
}

export function GrainOverlay({ opacity = 0.06, className }: GrainOverlayProps) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>`;
  const dataUri = `url("data:image/svg+xml;utf8,${svg}")`;
  const composed = ['pointer-events-none absolute inset-0 mix-blend-multiply', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      aria-hidden
      className={composed}
      style={{ backgroundImage: dataUri, opacity }}
    />
  );
}
