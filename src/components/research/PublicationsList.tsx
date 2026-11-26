import { PUBLICATIONS, type PublicationKind } from '../../data/publications';

const GROUPS: { kind: PublicationKind; title: string; link: string }[] = [
  { kind: 'peer', title: 'Peer-reviewed publications', link: 'Read the publication ↗' },
  { kind: 'pre', title: 'Preprint manuscripts', link: 'View the manuscript ↗' },
];

/** Journal publications, with preprints listed apart from peer-reviewed work. */
export function PublicationsList() {
  return (
    <div className="pub-groups">
      {GROUPS.map(({ kind, title, link }) => {
        const items = PUBLICATIONS.filter((publication) => publication.kind === kind);
        return (
          <div className="pub-group" key={kind}>
            <h3 className="pub-group-title">
              {title} <span className="grey">({items.length})</span>
            </h3>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {items.map(({ year, title: name, journal, summary }) => (
                <article className="lrow" key={name}>
                  <span className="yr">{year ?? 'Preprint'}</span>
                  <div>
                    <span className="j">{journal}</span>
                    <h4 className="lrow-title">{name}</h4>
                    <p>{summary}</p>
                    <a
                      className="ul"
                      href="https://www.researchgate.net/profile/Shruti-Pai-3"
                      target="_blank"
                      rel="noopener"
                    >
                      {link}
                    </a>
                  </div>
                  <span className={`pill ${kind}`}>
                    {kind === 'pre' ? 'Preprint' : 'Peer-reviewed'}
                  </span>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
