import type { MediaId } from '../../data/media';
import { TRIAD } from '../../data/triad';
import { Media } from './Media';

const CIRCLES = [
  [17, 15],
  [39, 15],
  [28, 26],
];

function TriadMark({ active }: { active: number }) {
  return (
    <svg className="mini" viewBox="0 0 56 40" aria-hidden="true">
      {CIRCLES.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="11"
          fill={i === active ? '#A4C94A' : 'none'}
          stroke="#59750B"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

interface TriadColumnsProps {
  variant: 'short' | 'long';
  /** Show each domain's photograph above it. */
  media?: boolean;
}

export function TriadColumns({ variant, media = false }: TriadColumnsProps) {
  return (
    <div className="tcols">
      {TRIAD.map((domain, i) => (
        <div className="tcol" key={domain.name}>
          {media && (
            <Media
              id={`triad-${domain.name.toLowerCase()}` as MediaId}
              className="tvid"
              sized={false}
            />
          )}
          <TriadMark active={i} />
          <span className="tn">{`0${i + 1}`}</span>
          <h3 className="d3">{domain.name}</h3>
          <p className="tq">{domain.question}</p>
          <p className="grey" style={{ margin: 0 }}>
            {domain[variant]}
          </p>
        </div>
      ))}
    </div>
  );
}
