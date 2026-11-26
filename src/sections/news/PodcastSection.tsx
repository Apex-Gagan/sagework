import { Media } from '../../components/shared/Media';
import { ContentToCome } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';

/** Podcast: cover, title, description and where to watch or listen. */
export function PodcastSection() {
  return (
    <section id={sectionId('news', 'podcast')} className="anchor sec paper">
      <div className="wrap two podcast" style={{ alignItems: 'center' }}>
        <div className="podcast-cover" style={{ gridColumn: '1 / span 5' }}>
          <Media id="podcast-cover" />
        </div>
        <div className="c-r">
          <p className="label">Podcast</p>
          <h2 className="d2">Podcast</h2>
          <ContentToCome title="Podcast title and description" owner="Jyoti">
            Show name, a short description and the links for each platform.
          </ContentToCome>
          <div className="row mt">
            {/* Links arrive with the podcast details. */}
            <button className="btn btn-dark" type="button" disabled>
              Watch <span className="arr">↗</span>
            </button>
            <button className="btn btn-line" type="button" disabled>
              Listen <span className="arr">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
