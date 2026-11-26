import { HashLink } from '../../components/navigation/HashLink';
import { SERVICES } from '../../data/services';
import { sectionId } from '../../routing/views';

/** Services: what Sagework can be engaged to do. */
export function ServicesSection() {
  return (
    <section id={sectionId('what-we-do', 'services')} className="anchor anchor-bar sec paper">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">Services</p>
            <h2 className="d2">Choose the service that matches your need.</h2>
          </div>
          <p>Services can be combined, with scope and deliverables agreed at the outset.</p>
        </div>
        <div className="grid g3">
          {SERVICES.map(({ name, detail, outputs }) => (
            <div key={name} className="bord svc-card">
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
              <HashLink to="contact" intent={{ enquiry: name }} className="btn btn-line svc-btn">
                {`Discuss ${name} `}
                <span className="arr">→</span>
              </HashLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
