import { QUESTIONS } from '../../data/questions';
import { AccordionItem } from '../shared/Accordion';

export function QuestionsAccordion() {
  return (
    <div className="acc">
      {QUESTIONS.map(({ topic, question, answer }, i) => (
        <AccordionItem
          key={topic}
          id={`q${i}`}
          number={`0${i + 1}`}
          title={question}
          defaultOpen={i === 0}
        >
          <p>{answer}</p>
          <div>
            <span className="pill peer">{topic}</span>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}
