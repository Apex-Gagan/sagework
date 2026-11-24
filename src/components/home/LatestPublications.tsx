import { PUBLICATIONS } from '../../data/publications';

export function LatestPublications() {
  return (
    <div id="pubsHome" style={{ borderTop: '1px solid var(--line)' }}>
      {PUBLICATIONS.slice(0, 3).map(({ year, title, journal, summary }) => (
        <article className="lrow" key={title}>
          <span className="yr">{year}</span>
          <div>
            <span className="j">{journal}</span>
            <h3>{title}</h3>
            <p>{summary}</p>
          </div>
          <span className="pill peer">Peer-reviewed</span>
        </article>
      ))}
    </div>
  );
}
