import { SageOs } from '../../components/shared/SageOs';
import { sectionId } from '../../routing/views';

/** SAGE OS: the working method, from diagnosis to action. */
export function SageOsSection() {
  return (
    <section id={sectionId('approach', 'sage-os')} className="anchor sec dark">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">SAGE OS</p>
            <h2 className="d2">A disciplined framework from diagnosis to action.</h2>
          </div>
          <p>
            SAGE OS connects biology, environment and behaviour in a disciplined process that moves
            from observation to execution.
          </p>
        </div>
        <SageOs variant="discover" />
        <p className="muted mt" style={{ maxWidth: '60ch' }}>
          Learning runs through every stage. Measurement, feedback, reflection and evolving evidence
          inform the next scan of the system.
        </p>
      </div>
    </section>
  );
}
