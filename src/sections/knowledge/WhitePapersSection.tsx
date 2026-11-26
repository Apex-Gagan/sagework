import { WhitePaperSeries } from '../../components/research/WhitePaperSeries';
import { sectionId } from '../../routing/views';

/** White Papers: Sagework's own programme. */
export function WhitePapersSection() {
  return (
    <section id={sectionId('knowledge', 'white-papers')} className="anchor sec paper">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">White papers</p>
            <h2 className="d2">Connecting evidence with human systems.</h2>
          </div>
          <p>
            The collections below define Sagework's white-paper programme. Each paper's availability
            and publication status will be clearly identified.
          </p>
        </div>
        <WhitePaperSeries />
      </div>
    </section>
  );
}
