import type { CSSProperties } from 'react';

interface PlaceholderProps {
  kind: 'image' | 'video';
  label: string;
  className?: string;
  style?: CSSProperties;
}

/** Stands in for a photograph or video that has not been supplied yet. */
export function Placeholder({ kind, label, className, style }: PlaceholderProps) {
  return (
    <div
      className={className ? `ph ${className}` : 'ph'}
      style={style}
      role="img"
      aria-label={`${kind === 'video' ? 'Video' : 'Image'} to come: ${label}`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        {kind === 'video' ? (
          <>
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
          </>
        ) : (
          <>
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="9" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3.5 17l5-4.5 4 3.5 3-2.5 5 4" stroke="currentColor" strokeWidth="1.5" />
          </>
        )}
      </svg>
      <span className="ph-kind">
        {kind === 'video' ? 'Video placeholder' : 'Image placeholder'}
      </span>
      <span className="ph-label">{label}</span>
    </div>
  );
}
