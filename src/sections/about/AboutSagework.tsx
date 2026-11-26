import { HashLink } from '../../components/navigation/HashLink';
import { PageHero } from '../../components/shared/PageHero';
import { sectionId } from '../../routing/views';

/** Identity and purpose: what Sagework is and why it exists. */
export function AboutSagework() {
  return (
    <section id={sectionId('about', 'sagework')} className="anchor">
      <PageHero
        label="About Sagework"
        title="The conditions around us become part of the conditions within us."
        lede="Sagework advises leaders, institutions and organisations on how environments, systems and everyday practices influence how people feel, function, recover and perform, then translates that understanding into strategy, design and action."
      >
        <div className="row mt">
          <HashLink to="contact" className="btn btn-dark">
            Start a Conversation <span className="arr">→</span>
          </HashLink>
          <HashLink to="approach" className="ul">
            Our approach <span className="arr">→</span>
          </HashLink>
        </div>
      </PageHero>
      <div className="sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Who we are</p>
            <h2 className="d2">Health is shaped by systems.</h2>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Sagework is an evidence-led advisory and design practice working across biology,
              environment and behaviour.
            </p>
            <p className="grey">
              We bring these forces into one evidence-led framework and translate research into
              practical strategy, system design and implementation for organisations, institutions
              and leaders addressing complex human challenges. Sagework advises leaders who
              recognise that health, resilience and performance are shaped by systems, not
              information alone.
            </p>
            <p className="pull">
              Sagework reconnects these parts through science, systems thinking and design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
