import { useState } from 'react';
import { ContentToCome } from '../../components/shared/Pending';
import { SHOW_PENDING_CONTENT } from '../../config/launch';
import { EVIDENCE_SOURCES, EVIDENCE_TOPICS, type EvidenceTopic } from '../../data/evidence';
import { sectionId } from '../../routing/views';

const countFor = (topic: EvidenceTopic) =>
  EVIDENCE_SOURCES.filter(({ topics }) => topics.includes(topic)).length;

/** Topics with sources, plus, while drafting, the empty ones still to be catalogued. */
const TOPICS = EVIDENCE_TOPICS.filter((topic) => SHOW_PENDING_CONTENT || countFor(topic) > 0);

/** Evidence Library: the sources behind the ideas, filed by topic. */
export function EvidenceLibrary() {
  const [topic, setTopic] = useState<EvidenceTopic | null>(null);
  const sources = topic
    ? EVIDENCE_SOURCES.filter(({ topics }) => topics.includes(topic))
    : EVIDENCE_SOURCES;

  return (
    <section id={sectionId('knowledge', 'evidence')} className="anchor sec">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">Evidence library</p>
            <h2 className="d2">Follow the sources behind the ideas.</h2>
          </div>
          <p>
            Resources identify the type of evidence, the question addressed and relevant
            limitations. Where a source supports a specific Sagework explanation, that connection is
            made clear.
          </p>
        </div>
        <div className="ev-topics" role="group" aria-label="Filter sources by topic">
          <button
            className={topic === null ? 'on' : undefined}
            aria-pressed={topic === null}
            onClick={() => setTopic(null)}
          >
            All topics <span>{EVIDENCE_SOURCES.length}</span>
          </button>
          {TOPICS.map((name) => (
            <button
              key={name}
              className={topic === name ? 'on' : undefined}
              aria-pressed={topic === name}
              onClick={() => setTopic(name)}
            >
              {name} <span>{countFor(name)}</span>
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {sources.length > 0 ? (
            <ol className="ev-list">
              {sources.map(({ text, topics }) => (
                <li key={text}>
                  <p>{text}</p>
                  <div className="ev-tags">
                    {topics.map((name) => (
                      <span key={name}>{name}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <ContentToCome
              title={`Sources for “${topic}” are being catalogued.`}
              owner="content creator"
            />
          )}
        </div>
      </div>
    </section>
  );
}
