import { useId } from 'react';

interface SealStampProps {
  size?: number;
  centerLines?: string[];
  perimeterText?: string;
  className?: string;
  color?: string;
}

const DEFAULT_PERIMETER = 'SNUGLITE • CONSIDERED WORKSPACES • EST. 2026 •';

export function SealStamp({
  size = 160,
  centerLines = ['SRL', 'EU', '2026'],
  perimeterText = DEFAULT_PERIMETER,
  className,
  color = 'currentColor',
}: SealStampProps) {
  const pathId = useId();
  const radius = size / 2 - 4;
  const innerRadius = radius - 14;
  const textRadius = radius - 8;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="SnugLite stamp"
    >
      <defs>
        <path
          id={pathId}
          d={`M ${size / 2}, ${size / 2} m -${textRadius}, 0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
          fill="none"
        />
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={innerRadius}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <text fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2" fill={color}>
        <textPath href={`#${pathId}`} startOffset="0">
          {perimeterText}
        </textPath>
      </text>
      {centerLines.map((line, idx) => (
        <text
          key={line + idx}
          x={size / 2}
          y={size / 2 + (idx - (centerLines.length - 1) / 2) * 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Bodoni Moda, serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill={color}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
