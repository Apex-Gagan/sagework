import { ContentToCome, Pending } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';

/** Vision & Philosophy: awaiting copy. */
export function VisionSection() {
  return (
    <Pending>
      <section id={sectionId('about', 'vision')} className="anchor sec">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Vision &amp; Philosophy</p>
            <h2 className="d2">Vision &amp; Philosophy</h2>
          </div>
          <div className="c-r">
            <ContentToCome title="Sagework's vision and guiding philosophy" owner="Jyoti">
              Vision direction from Jyoti; narrative drafted by the content creator.
            </ContentToCome>
          </div>
        </div>
      </section>
    </Pending>
  );
}
