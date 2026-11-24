import { SERVICES } from '../../data/services';
import { HashLink } from '../navigation/HashLink';
import { AccordionItem } from '../shared/Accordion';

export function ServicesAccordion() {
  return (
    <div className="acc">
      {SERVICES.map((service, i) => (
        <AccordionItem
          key={service.name}
          id={`svc${i}`}
          number={`0${i + 1}`}
          title={service.name}
          defaultOpen={i === 0}
        >
          <p>{service.summary}</p>
          <div className="out" style={{ border: 0, margin: 0, padding: 0 }}>
            <b>Possible outputs</b>
            {service.outputs}
            <div style={{ marginTop: '12px' }}>
              <HashLink
                to="contact"
                intent={{ enquiry: service.name }}
                className="ul"
                style={{ color: 'var(--ink)' }}
              >
                {`Discuss ${service.name} `}
                <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}
