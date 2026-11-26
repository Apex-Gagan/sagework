import { HashLink } from '../../components/navigation/HashLink';
import { sectionId } from '../../routing/views';

/** Disciplines the practice draws on, as already described across the site. */
const DISCIPLINES = [
  'Clinical nutrition',
  'Gut microbiome science',
  'Maternal and early-life biology',
  'Preventive health',
  'Food systems and hospitality',
  'Healthcare and care environments',
  'Education and learning environments',
  'Human systems and environmental design',
  'Research and evidence synthesis',
];

/** Our Expertise: scientific authority backed by cross-sector execution. */
export function ExpertiseSection() {
  return (
    <section id={sectionId('about', 'expertise')} className="anchor sec paper">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">Our expertise</p>
          <h2 className="d2">Scientific authority backed by cross-sector execution.</h2>
        </div>
        <div className="c-r">
          <p className="lede" style={{ color: 'var(--ink)' }}>
            Sagework is founded and led by Dr Shruti Pai, a clinical nutrition and gut microbiome
            scientist, entrepreneur and human systems designer whose work spans healthcare,
            education, food, hospitality and the built environment.
          </p>
          <p className="grey">
            The practice brings together peer-reviewed research, preventive health, design expertise
            and more than two decades of experience leading and shaping real-world organisations and
            environments, moving from evidence to execution.
          </p>
          <p className="label" style={{ marginTop: '36px' }}>
            Disciplines
          </p>
          <div className="aud">
            {DISCIPLINES.map((discipline) => (
              <span key={discipline}>{discipline}</span>
            ))}
          </div>
          <HashLink to="knowledge" className="ul mt" style={{ display: 'inline-flex' }}>
            The research behind the practice <span className="arr">→</span>
          </HashLink>
        </div>
      </div>
    </section>
  );
}
