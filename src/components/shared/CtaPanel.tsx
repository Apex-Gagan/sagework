import type { ReactNode } from 'react';

/** Closing call-to-action panel with the triad ring behind it. */
export function CtaPanel({ children }: { children: ReactNode }) {
  return (
    <div className="cta">
      <svg
        className="ring"
        viewBox="0 0 400 400"
        aria-hidden="true"
        fill="none"
        stroke="rgba(12,13,11,.2)"
        strokeWidth="1"
      >
        <circle cx="160" cy="160" r="110" />
        <circle cx="240" cy="160" r="110" />
        <circle cx="200" cy="230" r="110" />
        <circle cx="200" cy="183" r="7" fill="#0C0D0B" stroke="none" />
      </svg>
      {children}
    </div>
  );
}
