import { ContentToCome, Pending } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';

/** Articles & Perspectives: the format is set, the pieces are still to be written. */
export function ArticlesSection() {
  return (
    <Pending>
      <section id={sectionId('knowledge', 'articles')} className="anchor sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Articles &amp; perspectives</p>
            <h2 className="d2">Bringing research into the wider conversation.</h2>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Plain-language research explanations, analysis of health claims, commentary on new
              findings and perspectives on food, environments and human systems.
            </p>
            <ContentToCome title="First articles and perspectives" owner="content creator">
              Titles, summaries and publication dates for the launch set.
            </ContentToCome>
          </div>
        </div>
      </section>
    </Pending>
  );
}
