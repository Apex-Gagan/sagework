import { ContentToCome, Pending } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';

/** Books: long-form work, still in development. */
export function BooksSection() {
  return (
    <Pending>
      <section id={sectionId('knowledge', 'books')} className="anchor sec">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Books &amp; long-form work</p>
            <h2 className="d2">Space to explore the connections.</h2>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Books and extended writing offer room for deeper explanation, narrative and
              illustration, with clearly identified projects in development.
            </p>
            <ContentToCome title="Books and long-form projects" owner="Jyoti">
              Working titles, covers and status for each project.
            </ContentToCome>
          </div>
        </div>
      </section>
    </Pending>
  );
}
