import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigation } from '../../routing/NavigationContext';
import { createTriadPrism, type TriadPrism } from '../../scenes/triadPrism';

/** The SAGE Triad as a 3D glass triangle. */
export function TriadStage() {
  const { visit } = useNavigation();
  const hostRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<TriadPrism | null>(null);

  useEffect(() => {
    const prism = createTriadPrism(hostRef.current!);
    prismRef.current = prism;
    return () => {
      prism?.dispose();
      prismRef.current = null;
    };
  }, []);

  // The stage has no size while its page is hidden, so redraw on arrival.
  useLayoutEffect(() => {
    prismRef.current?.resize();
  }, [visit]);

  return (
    <div className="stage" id="stage" ref={hostRef}>
      <div className="fallback" aria-hidden="true">
        <svg className="fb-tri" viewBox="0 0 200 180">
          <path
            d="M100 34 L168 146 L32 146 Z"
            fill="#F7F9F0"
            stroke="#F7F9F0"
            strokeWidth="44"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="66" r="24" fill="#59750B" />
          <circle cx="140" cy="134" r="24" fill="#A4C94A" />
          <circle cx="60" cy="134" r="24" fill="#C7D99E" />
        </svg>
      </div>
      <div className="chipf glass" style={{ left: '22px', top: '22px' }}>
        <b style={{ background: '#59750B' }}></b>Biology
      </div>
      <div className="chipf glass" style={{ right: '22px', top: '30%' }}>
        <b style={{ background: '#A4C94A' }}></b>Environment
      </div>
      <div className="chipf glass" style={{ left: '22px', top: '60%' }}>
        <b style={{ background: '#C7D99E' }}></b>Behaviour
      </div>
      <div className="stage-cap glass">
        <span>The SAGE Triad</span>
        <span>One human system. Three connected forces.</span>
      </div>
    </div>
  );
}
