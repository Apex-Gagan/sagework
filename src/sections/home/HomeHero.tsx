import { HashLink } from '../../components/navigation/HashLink';
import { Media } from '../../components/shared/Media';

/** Hero and brand promise. */
export function HomeHero() {
  return (
    <div className="vhero hhero">
      <Media id="home-hero" className="vhero-video ph-dark" sized={false} priority />
      <div className="vhero-scrim"></div>
      <div className="wrap vhero-copy">
        <div>
          <p className="label">Evidence-led advisory &amp; design practice</p>
          <h1 className="d1">Designing human systems for health, resilience and performance.</h1>
          <p className="lede">
            Sagework helps leaders, institutions and organisations understand and improve the
            systems that shape how people live, work and perform.
          </p>
          <div className="row mt">
            <HashLink to="about" className="btn btn-dark">
              Discover Sagework <span className="arr">→</span>
            </HashLink>
            <HashLink to="about" section="founder" className="ul">
              Meet Dr Shruti Pai <span className="arr">→</span>
            </HashLink>
          </div>
        </div>
      </div>
    </div>
  );
}
