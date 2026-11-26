import { SageOs } from '../../components/shared/SageOs';
import { ENGAGEMENT_MODELS } from '../../data/sectors';
import { sectionId } from '../../routing/views';

/** Engagement Models: the formats a piece of work can take, and the process behind them. */
export function EngagementSection() {
  return (
    <section id={sectionId('what-we-do', 'engagement')} className="anchor anchor-bar">
      <div className="sec paper">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Engagement models</p>
              <h2 className="d2">Formats shaped around your question.</h2>
            </div>
            <p>
              The format, timeline, deliverables and fees are agreed after an initial discussion of
              the scope.
            </p>
          </div>
          <div className="grid g4">
            {ENGAGEMENT_MODELS.map(({ name, description }) => (
              <div className="bord" key={name}>
                <h3 className="h4">{name}</h3>
                <p className="grey small" style={{ margin: 0 }}>
                  {description}
                </p>
              </div>
            ))}
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
    </section>
  );
}
