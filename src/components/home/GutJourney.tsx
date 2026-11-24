import { useEffect, useRef, useState } from 'react';
import still from '../../assets/anatomy/still.webp';
import { prefersReducedMotion } from '../../lib/motion';
import { useNavigation } from '../../routing/NavigationContext';
import type { AnatomyLabel, GutAnatomy } from '../../scenes/anatomy/gutAnatomy';
import { HashLink } from '../navigation/HashLink';

const STEPS = [
  {
    marker: '01 · Stomach',
    title: 'Food meets acid.',
    body: 'Acid and enzymes begin breaking down proteins, and muscular contractions churn food into a semi-liquid that is released gradually into the small intestine.',
  },
  {
    marker: '02 · Small intestine',
    title: 'Where most nutrients are absorbed.',
    body: 'Its lining is folded into villi and microvilli, creating a vast surface through which most nutrients pass into the bloodstream.',
  },
  {
    marker: '03 · Colon',
    title: 'Home to most gut microbes.',
    body: 'The colon hosts the densest community of gut microbes. They ferment fibre the body cannot digest on its own, producing compounds such as short-chain fatty acids.',
  },
  {
    marker: '04 · Gut–brain axis',
    title: 'A conversation in both directions.',
    body: 'The gut and brain communicate through the vagus nerve, hormones, immune signals and microbial metabolites. What this means for mood and behaviour is an active area of research, and much remains uncertain.',
    link: 'White Paper 03 · The Gut–Brain Axis',
  },
];

const SETTLE_MS = 3500;

const TICKS = ['Stomach', 'Small intestine', 'Colon', 'Gut–brain'];

const LABELS: { key: AnatomyLabel; text: string; step: number }[] = [
  { key: 'stomach', text: 'Stomach', step: 0 },
  { key: 'small', text: 'Small intestine', step: 1 },
  { key: 'colon', text: 'Colon', step: 2 },
  { key: 'axis', text: 'Gut–brain axis', step: 3 },
  { key: 'brain', text: 'Brain', step: 3 },
];

/** Scroll-driven 3D journey from first bite to the brain. Static under reduced motion. */
export function GutJourney() {
  const { view, visit } = useNavigation();
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [wanted, setWanted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<Partial<Record<AnatomyLabel, HTMLSpanElement | null>>>({});
  const ticksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const anatomyRef = useRef<GutAnatomy | null>(null);
  const positionRef = useRef(0);
  const updateRef = useRef(() => {});

  // The 3D code and models are heavy, so they wait until the page has settled, or until the
  // visitor is a screen away.
  useEffect(() => {
    if (wanted || view !== 'home') return;
    const load = () => setWanted(true);
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && load(), {
      rootMargin: '100% 0px',
    });
    observer.observe(sectionRef.current!);
    let idle = 0;
    const timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(load);
      else load();
    }, SETTLE_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, [wanted, view]);

  useEffect(() => {
    if (!wanted) return;
    let cancelled = false;
    void import('../../scenes/anatomy/gutAnatomy').then(({ createGutAnatomy }) => {
      if (cancelled) return;
      const anatomy = createGutAnatomy(hostRef.current!, {
        onReady: () => setStatus('ready'),
        onLabel: (label, left, top) => {
          const element = labelsRef.current[label];
          if (!element) return;
          element.style.left = `${left}%`;
          // Keep the label inside the picture, and hide it once its organ has left the frame.
          const { clientWidth, clientHeight } = hostRef.current!;
          const room = clientWidth * (1 - left / 100) - element.offsetWidth;
          element.style.transform = `translate(${Math.min(10, room)}px, -50%)`;
          const y = (clientHeight * top) / 100;
          const margin = element.offsetHeight / 2;
          const inFrame = y > -margin && y < clientHeight;
          element.style.top = `${Math.max(y, margin + 6)}px`;
          element.style.visibility = inFrame ? 'visible' : 'hidden';
        },
      });
      if (!anatomy) {
        setStatus('unavailable');
        return;
      }
      anatomyRef.current = anatomy;
      anatomy.setPosition(positionRef.current);
    });
    return () => {
      cancelled = true;
      anatomyRef.current?.dispose();
      anatomyRef.current = null;
    };
  }, [wanted]);

  useEffect(() => {
    const section = sectionRef.current!;

    const update = () => {
      if (section.offsetParent === null) return;
      let progress = 1;
      if (!prefersReducedMotion) {
        const rect = section.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      }
      const position = progress * 4;
      const current = Math.min(3, Math.floor(position));
      const t = progress >= 1 ? 1 : position - current;
      positionRef.current = position;
      anatomyRef.current?.setPosition(position);
      ticksRef.current.forEach((tick, k) =>
        tick?.style.setProperty('--f', `${k < current ? 1 : k === current ? t : 0}`),
      );
      setStage(current);
    };
    updateRef.current = update;

    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        update();
        queued = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      cancelAnimationFrame(queued);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      updateRef.current();
      anatomyRef.current?.resize();
    });
    return () => cancelAnimationFrame(raf);
  }, [visit]);

  // The static layout shows every step at once, so the highlight stays put.
  const activeStep = prefersReducedMotion ? 0 : stage;

  return (
    <section
      className={prefersReducedMotion ? 'gut static' : 'gut'}
      id="gutJourney"
      data-stage={stage}
      aria-label="A journey through the gut"
      ref={sectionRef}
    >
      <div className="gut-sticky">
        <div className="wrap gut-grid">
          <div className="gut-copy">
            <p className="label">A journey through the gut</p>
            <h2 className="d2">From first bite to the brain.</h2>
            <div className="gut-steps">
              {STEPS.map(({ marker, title, body, link }, i) => (
                <div key={marker} className={i === activeStep ? 'gstep on' : 'gstep'}>
                  <span className="gn">{marker}</span>
                  <h3 className="d3">{title}</h3>
                  <p className="grey">{body}</p>
                  {link && (
                    <HashLink to="research" className="ul">
                      {`${link} `}
                      <span className="arr">→</span>
                    </HashLink>
                  )}
                </div>
              ))}
            </div>
            <div className="gut-prog" aria-hidden="true">
              {TICKS.map((tick, i) => (
                <span
                  key={tick}
                  className={i <= stage ? 'gtick on' : 'gtick'}
                  ref={(node) => {
                    ticksRef.current[i] = node;
                  }}
                >
                  <i></i>
                  {tick}
                </span>
              ))}
            </div>
          </div>
          <div className="gut-vis">
            <div
              className={`ganat ${status}`}
              ref={hostRef}
              role="img"
              aria-label="Realistic 3D view of the human digestive tract, from oesophagus and stomach through the small intestine and colon, with the vagus nerve connecting the gut to the brain"
            >
              {status === 'unavailable' && <img className="ganat-still" src={still} alt="" />}
              {LABELS.map(({ key, text, step }) => (
                <span
                  key={key}
                  className={step === stage ? 'ganat-label glass on' : 'ganat-label glass'}
                  aria-hidden="true"
                  ref={(node) => {
                    labelsRef.current[key] = node;
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
            <p className="ganat-credit">
              3D anatomy adapted from{' '}
              <a
                href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/desc.html"
                target="_blank"
                rel="noopener"
              >
                BodyParts3D
              </a>
              , © The Database Center for Life Science, and the{' '}
              <a href="https://humanatlas.io/3d-reference-library" target="_blank" rel="noopener">
                Human Reference Atlas
              </a>{' '}
              (Allen Institute), both CC BY 4.0
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
