import { SECTORS } from '../../data/sectors';
import { sectionId } from '../../routing/views';

/** Sectors We Serve: where the work applies. */
export function SectorsSection() {
  return (
    <section id={sectionId('what-we-do', 'sectors')} className="anchor anchor-bar sec">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">Sectors we serve</p>
            <h2 className="d2">Health is shaped wherever people spend their lives.</h2>
          </div>
          <p>
            The context changes, but the principle remains the same: design for people as whole
            human systems.
          </p>
        </div>
        <div className="grid g3">
          {SECTORS.map(({ name, description }, i) => (
            <div className="tile" key={name}>
              <span className="k">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h4" style={{ margin: 0 }}>
                {name}
              </h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
