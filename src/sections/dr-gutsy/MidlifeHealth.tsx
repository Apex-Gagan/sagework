import { ContentToCome, Pending } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';
import { WisePapers } from './WisePapers';

/** Midlife health: perimenopause, menopause and the years beyond. */
export function MidlifeHealth() {
  return (
    <Pending>
      <section id={sectionId('dr-gutsy', 'midlife')} className="anchor sec">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Midlife health</p>
            <h2 className="d2">Perimenopause, menopause and the years beyond.</h2>
          </div>
          <div className="c-r">
            <ContentToCome title="Dr Gutsy on midlife health" owner="content creator">
              Questions, explainers and episodes for this theme.
            </ContentToCome>
            <WisePapers numbers={['01', '06']} />
          </div>
        </div>
      </section>
    </Pending>
  );
}
