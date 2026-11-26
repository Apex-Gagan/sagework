import { HashLink } from '../../components/navigation/HashLink';
import { sectionId } from '../../routing/views';

/** Gut health: where Dr Shruti's microbiome research meets women's health. */
export function GutHealth() {
  return (
    <section id={sectionId('dr-gutsy', 'gut-health')} className="anchor sec paper">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">Gut health</p>
          <h2 className="d2">The gut–hormone connection.</h2>
        </div>
        <div className="c-r">
          <p className="lede" style={{ color: 'var(--ink)' }}>
            How do nutrition, the gut microbiome and hormones interact?
          </p>
          <p className="grey">
            Explore emerging research, with established findings clearly separated from hypotheses.
            Dr Gutsy draws on Dr Shruti's research in clinical nutrition and the maternal and infant
            gut microbiome.
          </p>
          <div className="row mt">
            <HashLink to="knowledge" section="explainers" className="btn btn-line">
              The microbiome, explained <span className="arr">→</span>
            </HashLink>
            <HashLink to="knowledge" section="research" className="ul">
              Academic research <span className="arr">→</span>
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
}
