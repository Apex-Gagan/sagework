import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { PublicationsList } from '../components/research/PublicationsList';
import { WhitePaperSeries } from '../components/research/WhitePaperSeries';
import { CopyButton } from '../components/shared/CopyButton';
import { CtaPanel } from '../components/shared/CtaPanel';

export function ResearchPage() {
  return (
    <View name="research">
      <div className="hero">
        <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
          <div style={{ gridColumn: '1 / span 9' }}>
            <p className="label">Research &amp; evidence</p>
            <h1 className="d1">The research behind the perspective.</h1>
          </div>
          <div style={{ gridColumn: '1 / span 6' }}>
            <p className="lede">
              Sagework brings together academic research, evidence synthesis and systems thinking to
              examine the conditions that shape human health, resilience and performance.
            </p>
          </div>
        </div>
      </div>
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
                  <strong style={{ fontWeight: '500' }}>http://hdl.handle.net/10603/677114</strong>
                </span>
                <CopyButton value="http://hdl.handle.net/10603/677114" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Academic publications</p>
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
      <div className="sec paper">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Sagework white papers</p>
              <h2 className="d2">Connecting evidence with human systems.</h2>
            </div>
            <p>
              The collections below define Sagework's white-paper programme. Each paper's
              availability and publication status will be clearly identified.
            </p>
          </div>
          <WhitePaperSeries />
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Evidence library</p>
              <h2 className="d2">Follow the sources behind the ideas.</h2>
            </div>
            <p>
              Resources identify the type of evidence, the question addressed and relevant
              limitations. Where a source supports a specific Sagework explanation, that connection
              is made clear.
            </p>
          </div>
          <div className="grid g4">
            <div className="tile">
              <span className="k">01</span>
              <p style={{ color: 'var(--ink)' }}>Clinical nutrition and food systems</p>
            </div>
            <div className="tile">
              <span className="k">02</span>
              <p style={{ color: 'var(--ink)' }}>Gut microbiome and gut–brain communication</p>
            </div>
            <div className="tile">
              <span className="k">03</span>
              <p style={{ color: 'var(--ink)' }}>Maternal, infant and early-life biology</p>
            </div>
            <div className="tile">
              <span className="k">04</span>
              <p style={{ color: 'var(--ink)' }}>Women's health across the life course</p>
            </div>
            <div className="tile">
              <span className="k">05</span>
              <p style={{ color: 'var(--ink)' }}>Sensory biology and environmental conditions</p>
            </div>
            <div className="tile">
              <span className="k">06</span>
              <p style={{ color: 'var(--ink)' }}>Circadian rhythms and sleep</p>
            </div>
            <div className="tile">
              <span className="k">07</span>
              <p style={{ color: 'var(--ink)' }}>Stress, recovery and human regulation</p>
            </div>
            <div className="tile">
              <span className="k">08</span>
              <p style={{ color: 'var(--ink)' }}>Behaviour and everyday practices</p>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: '16px' }}>
            <div className="bord">
              <p className="label">Articles and perspectives</p>
              <h3 className="d3">Bringing research into the wider conversation.</h3>
              <p className="grey">
                Plain-language research explanations, analysis of health claims, commentary on new
                findings and perspectives on food, environments and human systems.
              </p>
            </div>
            <div className="bord">
              <p className="label">Books and long-form work</p>
              <h3 className="d3">Space to explore the connections.</h3>
              <p className="grey">
                Books and extended writing offer room for deeper explanation, narrative and
                illustration, with clearly identified projects in development.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">How we work with evidence</p>
            <h2 className="d2">Clear sources. Proportionate claims. Visible uncertainty.</h2>
            <p className="muted">
              We assess study quality, the consistency of the wider research and its relevance to
              the people, setting and outcome being discussed.
            </p>
          </div>
          <div className="c-r" style={{ borderTop: '1px solid rgba(12,13,11,.15)' }}>
            <div style={{ padding: '26px 0', borderBottom: '1px solid rgba(12,13,11,.15)' }}>
              <p className="muted small" style={{ margin: '0 0 6px' }}>
                We distinguish
              </p>
              <p className="d3" style={{ margin: 0 }}>
                Associations <span className="muted">from</span> demonstrated effects
              </p>
            </div>
            <div style={{ padding: '26px 0', borderBottom: '1px solid rgba(12,13,11,.15)' }}>
              <p className="muted small" style={{ margin: '0 0 6px' }}>
                We distinguish
              </p>
              <p className="d3" style={{ margin: 0 }}>
                Biological mechanisms <span className="muted">from</span> proven practical benefits
              </p>
            </div>
            <div style={{ padding: '26px 0' }}>
              <p className="muted small" style={{ margin: '0 0 6px' }}>
                We distinguish
              </p>
              <p className="d3" style={{ margin: 0 }}>
                Findings in a specific population <span className="muted">from</span> claims about
                everyone
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">From research to application</p>
            <h2 className="d2">Scientific understanding, connected with context.</h2>
            <p>
              Research can inform a decision without providing a ready-made solution. Sagework
              considers how evidence relates to the people involved, the setting, available
              resources and the practical requirements of implementation and evaluation.
            </p>
            <div className="row mt">
              <HashLink to="work" className="btn btn-light">
                Work with Sagework <span className="arr">→</span>
              </HashLink>
              <HashLink to="senses" className="btn btn-ghost-w">
                Explore the Five Senses
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
