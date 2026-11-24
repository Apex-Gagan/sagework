import { useState } from 'react';
import { PUBLICATIONS, type PublicationKind } from '../../data/publications';

type Filter = 'all' | PublicationKind;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All (8)' },
  { key: 'peer', label: 'Peer-reviewed (5)' },
  { key: 'pre', label: 'Preprints (3)' },
];

export function PublicationsList() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <>
      <div className="seg" role="group" aria-label="Filter publications">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={filter === key ? 'on' : undefined}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="pubs" style={{ borderTop: '1px solid var(--line)' }}>
        {PUBLICATIONS.map(({ year, kind, title, journal, summary }) => (
          <article className="lrow" key={title} hidden={filter !== 'all' && filter !== kind}>
            <span className="yr">{year ?? 'Preprint'}</span>
            <div>
              <span className="j">{journal}</span>
              <h3>{title}</h3>
              <p>{summary}</p>
              <a
                className="ul"
                href="https://www.researchgate.net/profile/Shruti-Pai-3"
                target="_blank"
                rel="noopener"
              >
                {kind === 'pre' ? 'View the manuscript ↗' : 'Read the publication ↗'}
              </a>
            </div>
            <span className={`pill ${kind}`}>{kind === 'pre' ? 'Preprint' : 'Peer-reviewed'}</span>
          </article>
        ))}
      </div>
    </>
  );
}
