import { TRIAD } from '../../data/triad';
import { LoopVideo } from './LoopVideo';

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

export function TriadColumns({ variant }: { variant: 'short' | 'long' }) {
  return (
    <div className="tcols">
      {TRIAD.map((domain, i) => (
        <div className="tcol" key={domain.name}>
          <LoopVideo className="tvid" src={domain.video} poster={domain.poster} />
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
