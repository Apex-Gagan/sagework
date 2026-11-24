import { QuestionsAccordion } from '../components/gutsy/QuestionsAccordion';
import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { ScrollButton } from '../components/navigation/ScrollButton';
import { CtaPanel } from '../components/shared/CtaPanel';

export function DrGutsyPage() {
  return (
    <View name="gutsy">
      <div className="hero">
        <div className="wrap two" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: '1 / span 8' }}>
            <p className="label">Dr Gutsy · Women's health education</p>
            <h1 className="d1">Women's health, explained with evidence.</h1>
            <p className="lede">
              Hormonal health, periods, fertility, perimenopause and menopause. Clear answers to the
              questions women actually ask, without fear, shame or quick fixes.
            </p>
            <div className="row mt">
              <ScrollButton target="g-q" className="btn btn-dark">
                Explore the questions <span className="arr">↓</span>
              </ScrollButton>
              <HashLink to="research" className="ul">
                The WISE series <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <p className="qhero" aria-hidden="true">
              ?
            </p>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="tags" style={{ margin: 0 }}>
          <span>Hormonal health</span>
          <span>Periods &amp; PCOS</span>
          <span>Fertility</span>
          <span>Pregnancy &amp; the first 1,000 days</span>
          <span>Perimenopause</span>
          <span>Menopause</span>
          <span>The gut–hormone connection</span>
        </div>
      </div>
      <div className="sec s paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">About Dr Gutsy</p>
            <h2 className="d2">Every stage of a woman's life deserves clear science.</h2>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Dr Gutsy is Sagework's women's health education platform, founded by Dr Shruti Pai. It
              brings curiosity, scientific rigour and clear communication to hormonal health and the
              transitions across the female life course.
            </p>
            <p className="grey">
              From puberty and periods to fertility, pregnancy, perimenopause and menopause, Dr
              Gutsy looks at what the evidence shows, what remains uncertain and where women's
              experiences and the available information do not yet match. It draws on Dr Shruti's
              background in clinical nutrition and the gut microbiome, and on Sagework's WISE
              women's health series.
            </p>
            <h3 className="d3" style={{ marginTop: '40px' }}>
              Meet the character behind the questions
            </h3>
            <p className="grey">
              Dr Gutsy is a character created by Dr Shruti Pai to bring health education to life.
              Curious, empathetic and occasionally witty, Dr Gutsy listens to everyday questions,
              investigates the evidence and turns complex explanations into stories people can
              follow.
            </p>
          </div>
        </div>
      </div>
      <div className="sec" id="g-q">
        <div className="wrap two">
          <div className="c-l4">
            <p className="label">Explore the questions</p>
            <h2 className="d2">The questions women ask most.</h2>
          </div>
          <div className="c-r7">
            <QuestionsAccordion />
          </div>
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">How Dr Gutsy approaches a question</p>
              <h2 className="d2">Listen. Investigate. Explain. Connect.</h2>
            </div>
          </div>
          <div className="grid g4">
            <div>
              <p className="muted small">Step 1</p>
              <h3 className="d3">Listen</h3>
              <p className="muted">
                Begin with a question or experience people recognise, taking its context seriously
                rather than rushing to an explanation.
              </p>
            </div>
            <div>
              <p className="muted small">Step 2</p>
              <h3 className="d3">Investigate</h3>
              <p className="muted">
                Examine the evidence, question assumptions and distinguish what is established from
                what remains uncertain.
              </p>
            </div>
            <div>
              <p className="muted small">Step 3</p>
              <h3 className="d3">Explain</h3>
              <p className="muted">
                Use clear language, relatable stories and visual explanations to make the science
                understandable without losing its meaning.
              </p>
            </div>
            <div>
              <p className="muted small">Step 4</p>
              <h3 className="d3">Connect</h3>
              <p className="muted">
                Show what the evidence may mean in everyday life, what it does not establish and
                when a question needs qualified professional care.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">What you can expect</p>
            <ul className="checks">
              <li>Questions drawn from everyday life.</li>
              <li>Scientific explanations in clear, accessible language.</li>
              <li>Stories and visuals that make complex ideas easier to follow.</li>
              <li>Practical observations and questions to inform everyday decisions.</li>
              <li>Visible sources and honest explanations of uncertainty.</li>
            </ul>
          </div>
          <div className="c-r">
            <div className="tile" style={{ padding: 'clamp(28px,3.4vw,44px)' }}>
              <span className="k">Clear science. Honest boundaries.</span>
              <p style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
                Dr Gutsy is grounded in evidence-led science. We explain what research supports,
                where uncertainty remains and why findings may not apply equally to everyone.
              </p>
              <p>
                <strong style={{ fontWeight: '600', color: 'var(--ink)' }}>
                  The platform provides health education.
                </strong>
                {
                  ' It does not diagnose conditions, prescribe treatment or replace individual medical care.'
                }
              </p>
              <p>
                We do not use fear, shame or promises of a cure to make an explanation more
                compelling. Where a question requires personal assessment, we encourage qualified
                professional care.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Meet the scientist behind Dr Gutsy</p>
            <h2 className="d2">Dr Shruti Pai</h2>
            <HashLink to="founder" className="btn btn-dark">
              Meet the founder <span className="arr">→</span>
            </HashLink>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              A business leader, clinical nutrition scientist, gut microbiome researcher and human
              systems designer.
            </p>
            <p className="grey">
              Her research background includes maternal and infant gut microbiome science,
              nutrition, growth and body composition, and her professional experience spans food
              systems, healthcare, education, hospitality and environmental design. Through Dr
              Gutsy, she brings this perspective into public education: asking questions, examining
              assumptions and helping people understand the connections behind health information.
            </p>
            <div className="bord" style={{ marginTop: '32px' }}>
              <p className="label">Part of Sagework</p>
              <h3 className="h4">Public understanding. Practical application.</h3>
              <p className="grey">
                The two share a scientific foundation while serving different purposes: public
                understanding through Dr Gutsy, and organisational advisory and design through
                Sagework.
              </p>
              <div className="row">
                <HashLink to="discover" className="ul">
                  Discover Sagework <span className="arr">→</span>
                </HashLink>
                <HashLink to="work" className="ul">
                  Work with Sagework <span className="arr">→</span>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Keep questioning</p>
            <h2 className="d2">Stay curious. Stay evidence-led. Stay gutsy.</h2>
            <p>
              Good health education helps people recognise better questions, understand the evidence
              and see where context changes the interpretation.
            </p>
            <div className="row mt">
              <ScrollButton target="g-q" className="btn btn-light">
                Explore the questions <span className="arr">↑</span>
              </ScrollButton>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
