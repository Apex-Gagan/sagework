import { QuestionsAccordion } from '../../components/gutsy/QuestionsAccordion';
import { sectionId } from '../../routing/views';

/** The questions women ask most. */
export function QuestionsSection() {
  return (
    <section id={sectionId('dr-gutsy', 'questions')} className="anchor sec">
      <div className="wrap two">
        <div className="c-l4">
          <p className="label">Explore the questions</p>
          <h2 className="d2">The questions women ask most.</h2>
        </div>
        <div className="c-r7">
          <QuestionsAccordion />
        </div>
      </div>
    </section>
  );
}
