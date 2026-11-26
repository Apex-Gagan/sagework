import { useRef } from 'react';
import { HashLink } from '../../components/navigation/HashLink';
import { Media } from '../../components/shared/Media';
import type { MediaId } from '../../data/media';
import { scrollBehavior } from '../../lib/motion';
import { sectionId } from '../../routing/views';
import { FounderHero } from './FounderHero';

/** Founder credentials, grouped as the deck asks: business, science, design, education. */
const CREDENTIALS = [
  {
    area: 'Business',
    title: 'Business leader',
    text: 'Founded and scaled Chef on Wheels at Manipal Resorts into a catering operation delivering approximately 110,000 meals a day. It later became part of Manipal Integrated Services, whose facility management and catering businesses Quess Corp acquired in 2016.',
  },
  {
    area: 'Science',
    title: 'Scientist',
    text: 'PhD and MSc in Clinical Nutrition; BSc (Hons) in Biomedical Sciences (Medical Virology). Doctoral research on the maternal and infant gut microbiome, infant growth and body composition in the first year of life.',
  },
  {
    area: 'Design',
    title: 'Human systems designer',
    text: 'More than a decade as Creative Director across hospitals, universities, clinics, hostels and workplaces.',
  },
  {
    area: 'Education',
    title: 'Writer and educator',
    text: "The gut microbiome, nutrition, women's health, early-life biology, behaviour, and the relationship between people and their environments.",
  },
];

const GALLERY: MediaId[] = [
  'founder-gallery-1',
  'founder-gallery-2',
  'founder-gallery-3',
  'founder-gallery-4',
  'founder-gallery-5',
  'founder-gallery-6',
];

export function FounderSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) =>
    stripRef.current?.scrollBy({
      left: direction * stripRef.current.clientWidth * 0.6,
      behavior: scrollBehavior,
    });

  return (
    <section id={sectionId('about', 'founder')} className="anchor">
      <FounderHero />
      <div className="wrap two fintro" style={{ alignItems: 'center' }}>
        <figure className="fphoto" style={{ gridColumn: '1 / span 5' }}>
          <Media id="founder-portrait" sized={false} />
        </figure>
        <div className="c-r">
          <p className="quote">How do we build systems that truly help people?</p>
          <p className="lede" style={{ color: 'var(--ink)', marginTop: 0 }}>
            For more than two decades, Dr Shruti has worked at the intersection of business,
            science, environment and human behaviour, across hospitality, healthcare, education and
            food systems.
          </p>
          <p className="grey">
            She founded Sagework to help leaders and institutions move beyond fragmented solutions
            and address the connected biological, environmental and behavioural conditions that
            shape human outcomes.
          </p>
          <div className="row mt">
            <a
              className="btn btn-dark"
              href="https://shodhganga.inflibnet.ac.in/handle/10603/677114"
              target="_blank"
              rel="noopener"
            >
              Read the PhD thesis ↗
            </a>
            <a
              className="btn btn-line"
              href="https://www.researchgate.net/profile/Shruti-Pai-3"
              target="_blank"
              rel="noopener"
            >
              ResearchGate ↗
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="grid g4 creds-grid">
          {CREDENTIALS.map(({ area, title, text }) => (
            <div className="bord" key={area}>
              <span className="k">{area}</span>
              <h3 className="h4">{title}</h3>
              <p className="grey small" style={{ margin: 0 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
        <dl className="facets" style={{ margin: 'clamp(40px,5vw,64px) 0 0' }}>
          <div>
            <dt>Dr Gutsy</dt>
            <dd>
              {"Founder of Dr Gutsy, Sagework's women's health education platform. "}
              <HashLink to="dr-gutsy" className="ul">
                Explore Dr Gutsy <span className="arr">→</span>
              </HashLink>
            </dd>
          </div>
          <div>
            <dt>Global perspective</dt>
            <dd>
              Life and work across India, Singapore, Malaysia, Australia and the United Kingdom.
            </dd>
          </div>
          <div>
            <dt>Lived experience</dt>
            <dd>Mother, entrepreneur, researcher, designer and lifelong learner.</dd>
          </div>
        </dl>
      </div>

      <div className="sec paper fgal" style={{ marginTop: 'clamp(64px,8vw,120px)' }}>
        <div className="wrap fgal-head">
          <div>
            <p className="label">Gallery</p>
            <h2 className="d2">In pictures.</h2>
          </div>
          <div className="row">
            <button className="fgal-btn" aria-label="Previous photos" onClick={() => scroll(-1)}>
              ←
            </button>
            <button className="fgal-btn" aria-label="Next photos" onClick={() => scroll(1)}>
              →
            </button>
          </div>
        </div>
        <div
          className="fgal-strip"
          ref={stripRef}
          tabIndex={0}
          role="region"
          aria-label="Photos of Dr Shruti Pai"
        >
          {GALLERY.map((id) => (
            <Media key={id} id={id} className="fgal-item" />
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="wrap two" style={{ alignItems: 'end' }}>
          <div style={{ gridColumn: '1 / span 8' }}>
            <p className="quote" style={{ maxWidth: '22ch' }}>
              Business taught her to execute. Science taught her to question. Design taught her to
              observe.
            </p>
          </div>
          <div style={{ gridColumn: '10 / span 3' }}>
            <div className="row">
              <HashLink to="what-we-do" className="btn btn-dark">
                Work with Sagework <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
