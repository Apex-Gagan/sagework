import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { ScrollButton } from '../components/navigation/ScrollButton';
import { CtaPanel } from '../components/shared/CtaPanel';
import { SageOs } from '../components/shared/SageOs';
import { SERVICES } from '../data/services';

export function WorkPage() {
  return (
    <View name="work">
      <div className="hero">
        <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
          <div style={{ gridColumn: '1 / span 10' }}>
            <p className="label">Work with Sagework</p>
            <h1 className="d1">
              Build health and performance into the way your organisation works.
            </h1>
          </div>
          <div style={{ gridColumn: '1 / span 6' }}>
            <p className="lede">
              Sagework helps leaders and institutions turn scientific evidence into practical
              decisions about people, places and everyday practices. We begin with your challenge,
              the people your organisation serves and what you want to improve.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-dark">
                Start a conversation <span className="arr">→</span>
              </HashLink>
              <ScrollButton target="w-svc" className="ul">
                Explore our services <span className="arr">↓</span>
              </ScrollButton>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 'clamp(56px,6vw,90px)' }}>
        <hr className="hr" style={{ marginBottom: '28px' }} />
        <p className="label">Who we work with</p>
        <div className="aud">
          <span>Healthcare and care settings</span>
          <span>Schools and universities</span>
          <span>Workplaces and leadership teams</span>
          <span>Architects and built-environment teams</span>
          <span>Food, hospitality and community organisations</span>
          <span>Health founders and research partners</span>
        </div>
      </div>
      <div className="sec paper" id="w-svc">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Ways to work with Sagework</p>
              <h2 className="d2">Choose the service that matches your need.</h2>
            </div>
            <p>Services can be combined, with scope and deliverables agreed at the outset.</p>
          </div>
          <div className="grid g3">
            {SERVICES.map(({ name, detail, outputs }) => (
              <div
                key={name}
                className="bord"
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <h3 className="d3" style={{ margin: 0 }}>
                  {name}
                </h3>
                <p className="grey" style={{ margin: 0, flex: 1 }}>
                  {detail}
                </p>
                <div className="out">
                  <b>Possible outputs</b>
                  {outputs}
                </div>
                <HashLink
                  to="contact"
                  intent={{ enquiry: name }}
                  className="btn btn-line"
                  style={{
                    alignSelf: 'flex-start',
                    height: '46px',
                    whiteSpace: 'normal',
                    textAlign: 'left',
                  }}
                >
                  {`Discuss ${name} `}
                  <span className="arr">→</span>
                </HashLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">How an engagement can take shape</p>
              <h2 className="d2">Formats shaped around your question.</h2>
            </div>
            <p>
              The format, timeline, deliverables and fees are agreed after an initial discussion of
              the scope.
            </p>
          </div>
          <div className="grid g4">
            <div className="bord">
              <h3 className="h4">Focused project</h3>
              <p className="grey small" style={{ margin: 0 }}>
                Addresses a defined question, assessment or design brief.
              </p>
            </div>
            <div className="bord">
              <h3 className="h4">Ongoing advisory</h3>
              <p className="grey small" style={{ margin: 0 }}>
                Supports decisions over time as they evolve.
              </p>
            </div>
            <div className="bord">
              <h3 className="h4">Workshop or leadership session</h3>
              <p className="grey small" style={{ margin: 0 }}>
                Builds shared understanding around a specific need.
              </p>
            </div>
            <div className="bord">
              <h3 className="h4">Partnership</h3>
              <p className="grey small" style={{ margin: 0 }}>
                Shaped around an agreed purpose and contribution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Our working process</p>
              <h2 className="d2">SAGE OS provides the structure.</h2>
            </div>
            <p>The SAGE Triad keeps biology, environment and behaviour connected throughout.</p>
          </div>
          <SageOs variant="work" />
          <p className="muted mt" style={{ maxWidth: '66ch' }}>
            The measures of progress are chosen for the question and setting. They may concern
            experience, operating practices or implementation, with health and performance outcomes
            assessed where the evaluation supports them.
          </p>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Start with the challenge you want to address</p>
            <h2 className="d2">Tell us about your organisation and what you'd like to change.</h2>
            <p>
              We will review your enquiry and identify whether a further conversation would be
              useful. Where there is a fit, the next step is an agreed scope of work.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-light">
                Start a conversation <span className="arr">→</span>
              </HashLink>
              <HashLink to="research" className="btn btn-ghost-w">
                Research &amp; evidence
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
