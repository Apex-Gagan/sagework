import { ContentToCome, Pending } from '../../components/shared/Pending';
import { sectionId } from '../../routing/views';
import { WisePapers } from './WisePapers';

/** Maternal health: pregnancy, mother to child and the first 1,000 days. */
export function MaternalHealth() {
  return (
    <Pending>
      <section id={sectionId('dr-gutsy', 'maternal')} className="anchor sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Maternal health</p>
            <h2 className="d2">Pregnancy and the first 1,000 days.</h2>
          </div>
          <div className="c-r">
            <ContentToCome title="Dr Gutsy on maternal health" owner="content creator">
              Questions, explainers and episodes for this theme.
            </ContentToCome>
            <WisePapers numbers={['04', '05']} />
          </div>
        </div>
      </section>
    </Pending>
  );
}
