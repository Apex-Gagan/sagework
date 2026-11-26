import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { LoopVideo } from '../../components/shared/LoopVideo';
import { Placeholder } from '../../components/shared/Placeholder';
import { MEDIA, type MediaSlot } from '../../data/media';
import { prefersReducedMotion } from '../../lib/motion';

const WORDS = ['Shruti', 'Pai'];
const SLOT: MediaSlot = MEDIA['founder-hero'];

/** For the film supplied earlier: seconds into the loop while the subject faces the camera. */
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

/** Full-width founder opening, with the name set large over the film or photograph. */
export function FounderHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  // Without a film to follow, the name simply stays filled in.
  const [facing, setFacing] = useState(prefersReducedMotion || !SLOT.src);

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
        const top = hero.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, -top / hero.offsetHeight));
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
      {SLOT.src ? (
        <LoopVideo
          className="vhero-video"
          src={SLOT.src}
          poster={SLOT.poster ?? ''}
          position="50% 18%"
          onTime={(seconds) => setFacing(seconds >= FACING.from && seconds < FACING.to)}
        />
      ) : (
        <Placeholder kind="video" label={SLOT.label} className="vhero-video ph-dark" />
      )}
      <div className="vhero-scrim"></div>
      <Name className="fname-glow" />
      <Name className="fname-fill" />
      <div className="wrap vhero-copy">
        <h2 className="sr-only">Dr Shruti Pai</h2>
        <p className="label">Founder and Director, Sagework</p>
        <p className="lede">
          Business leader, clinical nutrition scientist, gut microbiome researcher and human systems
          designer.
        </p>
      </div>
    </div>
  );
}
