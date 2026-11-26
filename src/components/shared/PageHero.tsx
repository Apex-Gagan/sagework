import type { ReactNode } from 'react';

interface PageHeroProps {
  label: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  /** Tighter bottom spacing, for pages that continue straight into a bar or form. */
  compact?: boolean;
}

/** The opening block every inner page shares: label, headline, introduction, actions. */
export function PageHero({ label, title, lede, children, compact = false }: PageHeroProps) {
  return (
    <div className="hero" style={compact ? { paddingBottom: '40px' } : undefined}>
      <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
        <div style={{ gridColumn: '1 / span 9' }}>
          <p className="label">{label}</p>
          <h1 className="d1">{title}</h1>
        </div>
        {(lede || children) && (
          <div style={{ gridColumn: '1 / span 6' }}>
            {lede && <p className="lede">{lede}</p>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
