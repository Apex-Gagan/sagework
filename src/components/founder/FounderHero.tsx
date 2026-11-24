import { useEffect, useRef, useState, type CSSProperties } from 'react';
import poster from '../../assets/video/founder-hero.webp';
import video from '../../assets/video/founder-hero.mp4';
import { prefersReducedMotion } from '../../lib/motion';
import { LoopVideo } from '../shared/LoopVideo';

const WORDS = ['Shruti', 'Pai'];

/** Seconds into the loop during which the subject faces the camera. */
const FACING = { from: 2.8, to: 5.3 };

/** The name, letter by letter. Drawn twice: lit by the video, then filled in. */
function Name({ className }: { className: string }) {
  let index = 0;
  return (
    <div className={`fname ${className}`} aria-hidden="true">
      {WORDS.map((word) => (
        <span className="fname-word" key={word}>
          {[...word].map((letter, i) => (
            <span className="fname-letter" key={i} style={{ '--i': index++ } as CSSProperties}>
              {letter}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export function FounderHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [facing, setFacing] = useState(prefersReducedMotion);

  // Scrolling away parts the two words.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const hero = heroRef.current!;
    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        if (hero.offsetParent === null) return;
        const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
        hero.style.setProperty('--p', progress.toFixed(4));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(queued);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={facing ? 'vhero fhero facing' : 'vhero fhero'} ref={heroRef}>
      <LoopVideo
        className="vhero-video"
        src={video}
        poster={poster}
        position="50% 18%"
        onTime={(seconds) => setFacing(seconds >= FACING.from && seconds < FACING.to)}
      />
      <div className="vhero-scrim"></div>
      <Name className="fname-glow" />
      <Name className="fname-fill" />
      <div className="wrap vhero-copy">
        <h1 className="sr-only">Dr Shruti Pai</h1>
        <p className="label">Founder and Director, Sagework</p>
        <p className="lede">
          Business leader, clinical nutrition scientist, gut microbiome researcher and human systems
          designer.
        </p>
      </div>
    </div>
  );
}
