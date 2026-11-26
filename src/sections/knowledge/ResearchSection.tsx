import { PublicationsList } from '../../components/research/PublicationsList';
import { CopyButton } from '../../components/shared/CopyButton';
import { sectionId } from '../../routing/views';

const THESIS_HANDLE = 'http://hdl.handle.net/10603/677114';

/** Research Publications: the doctoral thesis and journal work. */
export function ResearchSection() {
  return (
    <section id={sectionId('knowledge', 'research')} className="anchor">
      <div className="sec s paper">
        <div className="wrap two" style={{ alignItems: 'center' }}>
          <div className="c-l6">
            <p className="label">Dr Shruti Pai's academic research</p>
            <h2 className="d2">From early-life biology to a connected understanding of health.</h2>
            <p className="grey">
              Dr Shruti Pai's academic work focuses on clinical nutrition, the maternal and infant
              gut microbiome, early-life growth and body composition. Her doctoral research examined
              the relationship between the maternal and infant gut microbiome, infant growth and
              body composition during the first year of life. This work informs her wider interest
              in how biological, environmental and behavioural conditions interact.
            </p>
          </div>
          <div style={{ gridColumn: '8 / span 5' }}>
            <div className="bord" style={{ padding: 'clamp(26px,3vw,40px)' }}>
              <p className="label">Doctoral thesis · Shodhganga</p>
              <h3 className="d3">PhD in Clinical Nutrition</h3>
              <p className="grey small">
                Maternal and infant gut microbiome, infant growth and body composition in the first
                year of life.
              </p>
              <div className="row" style={{ marginTop: '20px' }}>
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
              <div className="cite">
                <span>
                  {'Cite or link: '}
                  <strong style={{ fontWeight: '500' }}>{THESIS_HANDLE}</strong>
                </span>
                <CopyButton value={THESIS_HANDLE} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Research publications</p>
              <h2 className="d2">Published research and original sources.</h2>
            </div>
            <p>
              Journal publications on infant growth, body composition, breastfeeding and the gut
              microbiome, with preprint manuscripts shown separately from peer-reviewed work.
            </p>
          </div>
          <PublicationsList />
        </div>
      </div>
    </section>
  );
}
