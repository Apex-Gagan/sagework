import { HashLink } from '../../components/navigation/HashLink';
import { Media } from '../../components/shared/Media';

const TAGS = [
  'Hormonal health',
  'Periods & PCOS',
  'Fertility',
  'Pregnancy & the first 1,000 days',
  'Perimenopause',
  'Menopause',
  'The gut–hormone connection',
];

/** Dr Gutsy opening, with the character artwork beside the headline. */
export function GutsyHero() {
  return (
    <>
      <div className="hero">
        <div className="wrap two" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: '1 / span 8' }}>
            <p className="label">Our initiatives · Dr Gutsy</p>
            <h1 className="d1">Women's health, explained with evidence.</h1>
            <p className="lede">
              Hormonal health, periods, fertility, perimenopause and menopause. Clear answers to the
              questions women actually ask, without fear, shame or quick fixes.
            </p>
            <div className="row mt">
              <HashLink to="dr-gutsy" section="questions" className="btn btn-dark">
                Explore the questions <span className="arr">↓</span>
              </HashLink>
              <HashLink to="knowledge" section="white-papers" className="ul">
                The WISE series <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
          <div className="gutsy-art" style={{ gridColumn: '9 / span 4' }}>
            <Media id="gutsy-character" />
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="tags" style={{ margin: 0 }}>
          {TAGS.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
}
