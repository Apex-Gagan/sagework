import { TriadStage } from '../../components/home/TriadStage';
import { HashLink } from '../../components/navigation/HashLink';
import { SageOs } from '../../components/shared/SageOs';
import { TriadColumns } from '../../components/shared/TriadColumns';

/** SAGE Triad and SAGE OS at a glance; Our Approach has the full explanation. */
export function FrameworksSection() {
  return (
    <>
      <div className="sec paper">
        <div className="wrap hero-grid">
          <div>
            <p className="label">The SAGE Triad</p>
            <h2 className="d2">Three domains. One human system.</h2>
            <p className="grey">
              Biology, environment and behaviour are not separate variables. Sagework examines how
              these domains interact, identifies where the system is working against people and
              designs interventions that can be applied in the real world.
            </p>
            <HashLink to="approach" section="sage-triad" className="ul">
              The SAGE Triad <span className="arr">→</span>
            </HashLink>
          </div>
          <TriadStage />
        </div>
        <div className="wrap" style={{ marginTop: 'clamp(48px,6vw,80px)' }}>
          <TriadColumns variant="short" />
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">SAGE OS</p>
              <h2 className="d2">From diagnosis to action, in four stages.</h2>
            </div>
            <p>
              SAGE OS connects biology, environment and behaviour in a disciplined process that
              moves from observation to execution.
            </p>
          </div>
          <SageOs variant="discover" />
          <HashLink
            to="approach"
            section="sage-os"
            className="ul mt"
            style={{ display: 'inline-flex' }}
          >
            How SAGE OS works <span className="arr">→</span>
          </HashLink>
        </div>
      </div>
    </>
  );
}
