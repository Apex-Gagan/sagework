import { useEffect, useRef, useState } from 'react';
import { SAGE_OS, type SageOsVariant } from '../../data/sageOs';
import { prefersReducedMotion } from '../../lib/motion';

const AUTO_ADVANCE_MS = 4500;

/** Four-stage stepper. Advances by itself until a stage is clicked. */
export function SageOs({ variant }: { variant: SageOsVariant }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(() => {
      // offsetParent is null while the page this stepper sits on is hidden.
      if (rootRef.current?.offsetParent) setCurrent((i) => (i + 1) % SAGE_OS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [auto]);

  const select = (index: number) => {
    setAuto(false);
    setCurrent(index);
  };

  const stage = SAGE_OS[current];

  return (
    <div ref={rootRef}>
      <div className="os-steps" role="tablist" aria-label="SAGE OS stages">
        {SAGE_OS.map(({ name, tagline }, i) => (
          <button
            key={name}
            className={i === current ? 'os-step on' : i < current ? 'os-step done' : 'os-step'}
            role="tab"
            aria-selected={i === current}
            onClick={() => select(i)}
          >
            <span className="sn">{`Stage ${i + 1}`}</span>
            <span className="st">{name}</span>
            <span className="ss">{tagline}</span>
          </button>
        ))}
      </div>
      <div className="os-detail" aria-live="polite">
        <div>
          <p className="small" style={{ margin: '0 0 6px', opacity: 0.7 }}>
            {`Stage ${current + 1} of 4`}
          </p>
          <p className="d3" style={{ margin: 0 }}>
            {stage.name}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: '1.05rem' }}>{stage.detail[variant]}</p>
      </div>
    </div>
  );
}
