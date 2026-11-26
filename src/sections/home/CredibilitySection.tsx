import { LatestPublications } from '../../components/home/LatestPublications';
import { HashLink } from '../../components/navigation/HashLink';
import { Media } from '../../components/shared/Media';

/** Founder, research and Dr Gutsy: the people and evidence behind Sagework. */
export function CredibilitySection() {
  return (
    <>
      <div className="sec paper">
        <div className="wrap two hfounder">
          <figure className="fphoto" style={{ gridColumn: '1 / span 5' }}>
            <Media id="home-founder" sized={false} />
          </figure>
          <div style={{ gridColumn: '7 / span 6' }}>
            <p className="label">Meet Dr Shruti Pai · Founder and Director</p>
            <p className="quote" style={{ marginBottom: '32px' }}>
              “How do we build systems that genuinely help people live and work better?”
            </p>
            <p style={{ color: 'var(--ink)' }}>
              Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome
              researcher and human systems designer, with more than two decades of experience across
              business, healthcare, education, food systems, research and environmental design.
            </p>
            <div className="row mt">
              <HashLink to="about" section="founder" className="btn btn-dark">
                Meet the founder <span className="arr">→</span>
              </HashLink>
              <a
                className="btn btn-line"
                href="https://shodhganga.inflibnet.ac.in/handle/10603/677114"
                target="_blank"
                rel="noopener"
              >
                PhD thesis ↗
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap two">
          <div style={{ gridColumn: '1 / span 7' }}>
            <div className="head" style={{ marginBottom: '28px' }}>
              <div>
                <p className="label">Latest research</p>
                <h2 className="d3" style={{ margin: 0 }}>
                  Recent peer-reviewed work.
                </h2>
              </div>
              <HashLink to="knowledge" section="research" className="ul">
                All research <span className="arr">→</span>
              </HashLink>
            </div>
            <LatestPublications />
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <HashLink to="dr-gutsy" className="feature paper" style={{ minHeight: '100%' }}>
              <div>
                <p className="label">Our initiative · Dr Gutsy</p>
                <h3 className="d3">Curiosity backed by evidence.</h3>
                <p className="grey">
                  Dr Gutsy is Sagework's women's health education platform: hormonal health,
                  periods, fertility, perimenopause and menopause, explained without trends, fear or
                  false certainty.
                </p>
              </div>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Explore Dr Gutsy <span className="arr">→</span>
              </span>
            </HashLink>
          </div>
        </div>
      </div>
    </>
  );
}
