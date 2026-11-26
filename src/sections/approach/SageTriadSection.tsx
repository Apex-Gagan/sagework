import { TriadColumns } from '../../components/shared/TriadColumns';
import { sectionId } from '../../routing/views';

/** The SAGE Triad in full: biology, environment, behaviour. */
export function SageTriadSection() {
  return (
    <section id={sectionId('approach', 'sage-triad')} className="anchor sec">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">The SAGE Triad</p>
            <h2 className="d2">Three domains. One human system.</h2>
          </div>
          <p>
            Biology, environment and behaviour are not separate variables. Sagework examines how
            these domains interact, identifies where the system is working against people and
            designs interventions that can be applied in the real world.
          </p>
        </div>
        <TriadColumns variant="long" media />
        <p className="quote" style={{ marginTop: '64px', maxWidth: '26ch' }}>
          Biology responds to its environment. Behaviour shapes what we repeat. Health emerges from
          their interaction.
        </p>
      </div>
    </section>
  );
}
