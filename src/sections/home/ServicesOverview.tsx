import { ServicesAccordion } from '../../components/home/ServicesAccordion';
import { HashLink } from '../../components/navigation/HashLink';
import { SECTORS } from '../../data/sectors';

/** Services and sectors in brief; What We Do has the detail. */
export function ServicesOverview() {
  return (
    <div className="sec">
      <div className="wrap two">
        <div className="c-l4">
          <p className="label">What we do</p>
          <h2 className="d2">Build health and performance into the system.</h2>
          <p className="grey">
            Health, resilience and performance designed into the way you operate, not added as a
            disconnected initiative.
          </p>
          <HashLink to="what-we-do" className="btn btn-dark mt">
            What we do <span className="arr">→</span>
          </HashLink>
        </div>
        <div className="c-r7">
          <ServicesAccordion />
          <p className="label" style={{ marginTop: '48px' }}>
            Sectors we serve
          </p>
          <div className="aud">
            {SECTORS.map(({ name }) => (
              <HashLink key={name} to="what-we-do" section="sectors">
                {name}
              </HashLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
