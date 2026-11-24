import { useState } from 'react';
import poster from '../../assets/video/home-hero.webp';
import video from '../../assets/video/home-hero.mp4';
import videoSmall from '../../assets/video/home-hero-720.mp4';
import { HashLink } from '../navigation/HashLink';
import { LoopVideo } from '../shared/LoopVideo';

const DOMAINS = [
  { name: 'Biology', color: '#59750B' },
  { name: 'Environment', color: '#A4C94A' },
  { name: 'Behaviour', color: '#C7D99E' },
];

/** The film shows one clip per domain, in this order, and loops. */
const FILM_ORDER = ['Environment', 'Behaviour', 'Biology'];
const SECONDS_PER_CLIP = 5;
/** The last 0.8 s of each clip is a crossfade; the label changes halfway through it. */
const HALF_CROSSFADE = 0.4;

export function HomeHero() {
  const [active, setActive] = useState(FILM_ORDER[0]);

  const follow = (seconds: number) => {
    const clip = Math.floor((seconds + HALF_CROSSFADE) / SECONDS_PER_CLIP);
    setActive(FILM_ORDER[clip % FILM_ORDER.length]);
  };

  return (
    <div className="vhero hhero">
      <LoopVideo
        className="vhero-video"
        src={video}
        mobileSrc={videoSmall}
        poster={poster}
        priority
        onTime={follow}
      />
      <div className="vhero-scrim"></div>
      <div className="wrap vhero-copy">
        <div>
          <p className="label">Evidence-led advisory &amp; design practice</p>
          <h1 className="d1">Designing human systems for health, resilience and performance.</h1>
          <p className="lede">
            Sagework helps leaders, institutions and organisations understand and improve the
            systems that shape how people live, work and perform.
          </p>
          <div className="row mt">
            <HashLink to="discover" className="btn btn-dark">
              Discover Sagework <span className="arr">→</span>
            </HashLink>
            <HashLink to="founder" className="ul">
              Meet Dr Shruti Pai <span className="arr">→</span>
            </HashLink>
          </div>
        </div>
        <div className="hhero-domains" aria-hidden="true">
          {DOMAINS.map(({ name, color }) => (
            <span key={name} className={name === active ? 'chipd on' : 'chipd'}>
              <b style={{ background: color }}></b>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
