import { useEffect, useRef, useState } from 'react';
import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { referenceId, References } from '../components/senses/References';
import { SenseBar } from '../components/senses/SenseBar';
import { SensePhotos } from '../components/senses/SensePhotos';
import { SenseVideo } from '../components/senses/SenseVideo';
import { CtaPanel } from '../components/shared/CtaPanel';
import { SageOs } from '../components/shared/SageOs';
import { REFERENCES } from '../data/references';
import { scrollToElement } from '../lib/scroll';

const HIGHLIGHT_MS = 1800;

export function FiveSensesPage() {
  const [highlighted, setHighlighted] = useState<ReadonlySet<number>>(new Set());
  const timers = useRef(new Set<number>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const showReference = (id: number) => {
    scrollToElement(document.getElementById(referenceId(id)), 160);
    setHighlighted((current) => new Set(current).add(id));
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      setHighlighted((current) => new Set([...current].filter((other) => other !== id)));
    }, HIGHLIGHT_MS);
    timers.current.add(timer);
  };

  return (
    <View name="senses">
      <div className="hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
          <div style={{ gridColumn: '1 / span 9' }}>
            <p className="label">The Five Senses</p>
            <h1 className="d1">How the environment communicates with the body.</h1>
          </div>
          <div style={{ gridColumn: '1 / span 6' }}>
            <p className="lede">
              Every environment places demands on the people within it. Light, sound, smell, taste
              and touch shape how we experience a space, direct our attention and respond to what is
              around us.
            </p>
          </div>
        </div>
      </div>
      <SenseBar />
      <section className="ssec" id="s-sight">
        <div className="wrap ssec-grid">
          <div>
            <p className="label">01 · Sight</p>
            <h2 className="d2">Light that supports the activity.</h2>
            <p>
              Light supports vision and also carries information about time of day. Glare, contrast,
              visual complexity and access to daylight all deserve attention when designing a space.
            </p>
            <div className="evbox">
              <div className="n">Day · Evening · Night</div>
              <p>
                An international expert consensus provides separate recommendations for daytime,
                evening and night-time light exposure in healthy adults, supporting light as a timed
                biological input.
                <References ids={[1]} onSelect={showReference} />
              </p>
              <span className="src">Source: PLOS Biology</span>
            </div>
            <p className="grey">
              For organisations, the starting point is to assess lighting where people actually
              work, learn or rest, then address glare and task visibility.
            </p>
          </div>
          <SenseVideo sense="sight" />
          <SensePhotos sense="sight" />
        </div>
      </section>
      <section className="ssec" id="s-sound">
        <div className="wrap ssec-grid">
          <div>
            <p className="label">02 · Sound</p>
            <h2 className="d2">Acoustics with consequences.</h2>
            <p>
              Sound can support communication or compete with it. Its source, duration and
              predictability matter, alongside its volume.
            </p>
            <div className="evbox">
              <div className="n">8%</div>
              <p>
                Higher relative risk of developing ischaemic heart disease for each 10 dB increase
                in long-term road-traffic noise exposure, in a WHO-commissioned systematic review.
                This population-level association is specific to that exposure and outcome.
                <References ids={[2]} onSelect={showReference} />
              </p>
              <span className="src">Source: WHO-commissioned systematic review</span>
            </div>
            <p className="grey">
              Within organisations, we examine avoidable noise, speech clarity, privacy and the
              separation of activities that make competing acoustic demands.
            </p>
          </div>
          <SenseVideo sense="sound" />
          <SensePhotos sense="sound" />
        </div>
      </section>
      <section className="ssec" id="s-smell">
        <div className="wrap ssec-grid">
          <div>
            <p className="label">03 · Smell</p>
            <h2 className="d2">The biology of scent and association.</h2>
            <p>
              Smell helps us recognise food, places and familiar experiences. It is closely
              connected with memory and emotion, yet responses to the same odour can differ
              considerably. A screen cannot carry scent, so notice what your memory supplies as you
              watch.
            </p>
            <div className="evbox">
              <div className="n">2004</div>
              <p>
                Richard Axel and Linda Buck received the Nobel Prize in Physiology or Medicine for
                discoveries explaining odour receptors and the organisation of the olfactory system.
                <References ids={[3]} onSelect={showReference} />
              </p>
              <span className="src">Source: nobelprize.org</span>
            </div>
            <p className="grey">
              In practice, Sagework begins with odour sources, ventilation and the needs of the
              people exposed. A pleasant scent alone does not establish a health benefit.
            </p>
          </div>
          <SenseVideo sense="smell" />
          <SensePhotos sense="smell" />
        </div>
      </section>
      <section className="ssec" id="s-taste">
        <div className="wrap ssec-grid">
          <div>
            <p className="label">04 · Taste</p>
            <h2 className="d2">Food choices begin with the food environment.</h2>
            <p>
              Flavour combines taste with smell, texture, temperature and expectation. Food choice
              also depends on what is available, affordable, convenient and culturally familiar.
            </p>
            <div className="evbox">
              <div className="n">11.5%</div>
              <p>
                Reduction in calories purchased from targeted food categories when availability and
                portion sizes changed, in a randomised trial across 19 workplace cafeterias. The
                study measured purchases, not consumption or weight loss.
                <References ids={[4]} onSelect={showReference} />
              </p>
              <span className="src">Source: PLOS</span>
            </div>
            <p className="grey">
              Sagework connects sensory appeal with nutrition, food provision and operational
              feasibility, considering the needs of the population being served.
            </p>
          </div>
          <SenseVideo sense="taste" />
          <SensePhotos sense="taste" />
        </div>
      </section>
      <section className="ssec" id="s-touch">
        <div className="wrap ssec-grid">
          <div>
            <p className="label">05 · Touch</p>
            <h2 className="d2">Contact and physical comfort.</h2>
            <p>
              We encounter environments through seating, surfaces, materials and movement.
              Temperature and airflow add to the experience of physical comfort.
            </p>
            <div className="evbox">
              <div className="n">137 studies</div>
              <p>
                In a 2024 meta-analysis, defined touch interventions showed benefits for outcomes
                including pain and anxiety. Those findings concern the interventions studied, not a
                general effect of interior materials. The 2021 Nobel Prize recognised discoveries
                concerning temperature and touch receptors.
                <References ids={[6, 5]} onSelect={showReference} />
              </p>
              <span className="src">Source: Nature Human Behaviour · nobelprize.org</span>
            </div>
            <p className="grey">
              For environmental design, we examine usability, physical comfort and opportunities for
              adjustment. Where interpersonal touch is relevant to care, consent, training and
              context are essential.
            </p>
          </div>
          <SenseVideo sense="touch" />
          <SensePhotos sense="touch" />
        </div>
      </section>
      <div className="sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">The senses work together</p>
            <h2 className="d2">A space is experienced as a whole.</h2>
            <p className="grey">
              Light, conversation, temperature, odour and physical comfort can reinforce one another
              or create competing demands. The same setting may also affect people differently, by
              age, health, sensory sensitivity and task.
            </p>
          </div>
          <div className="c-r">
            <p className="label">The SAGE Triad: three connected lenses</p>
            <div className="lens-list" style={{ borderTop: '1px solid var(--line)' }}>
              <div>
                <h3 className="h4">Biology</h3>
                <p className="grey" style={{ margin: 0 }}>
                  Considers the people receiving sensory input and how their needs and responses may
                  differ.
                </p>
              </div>
              <div>
                <h3 className="h4">Environment</h3>
                <p className="grey" style={{ margin: 0 }}>
                  Examines the conditions they encounter, including light, sound, odour, food and
                  physical comfort.
                </p>
              </div>
              <div>
                <h3 className="h4">Behaviour</h3>
                <p className="grey" style={{ margin: 0 }}>
                  Considers what those conditions encourage, interrupt or make easier to sustain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">From understanding to implementation</p>
              <h2 className="d2">A change is useful when it can be implemented and evaluated.</h2>
            </div>
            <p>
              Depending on the setting: lighting adjustments, acoustic zoning, odour-source
              management, changes to food provision or greater personal control over physical
              comfort.
            </p>
          </div>
          <SageOs variant="senses" />
          <p className="muted mt" style={{ maxWidth: '66ch' }}>
            Measures may include task visibility, speech intelligibility, reported comfort, food
            purchasing patterns, satisfaction and food waste. Clinical or productivity outcomes
            require an evaluation designed to test those outcomes directly.
          </p>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap two">
          <div className="c-l4">
            <p className="label">References</p>
            <HashLink
              to="research"
              className="feature"
              style={{ background: 'var(--sand)', minHeight: 0, padding: '28px', marginTop: '8px' }}
            >
              <div>
                <p className="label">White Paper 02</p>
                <h3 className="h4">The Biology of the Five Senses</h3>
              </div>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Research &amp; evidence <span className="arr">→</span>
              </span>
            </HashLink>
          </div>
          <div className="c-r7">
            <ol className="refs">
              {REFERENCES.map((reference, i) => (
                <li
                  key={reference}
                  id={referenceId(i + 1)}
                  className={highlighted.has(i + 1) ? 'hl' : undefined}
                >
                  {reference}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="sec s" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CtaPanel>
            <p className="label">Work with Sagework</p>
            <h2 className="d2">
              What are the conditions in your organisation asking of the people within it?
            </h2>
            <p>
              Explore how sensory conditions can be assessed within your workplace, healthcare
              setting, educational institution or hospitality environment.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-light">
                Start a conversation <span className="arr">→</span>
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
