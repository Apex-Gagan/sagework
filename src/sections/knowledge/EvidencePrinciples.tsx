/** How we work with evidence: the distinctions every claim on the site keeps. */
const DISTINCTIONS: [string, string][] = [
  ['Associations', 'demonstrated effects'],
  ['Biological mechanisms', 'proven practical benefits'],
  ['Findings in a specific population', 'claims about everyone'],
];

export function EvidencePrinciples() {
  return (
    <div className="sec dark">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">How we work with evidence</p>
          <h2 className="d2">Clear sources. Proportionate claims. Visible uncertainty.</h2>
          <p className="muted">
            We assess study quality, the consistency of the wider research and its relevance to the
            people, setting and outcome being discussed.
          </p>
        </div>
        <div className="c-r" style={{ borderTop: '1px solid rgba(12,13,11,.15)' }}>
          {DISTINCTIONS.map(([first, second], i) => (
            <div
              key={first}
              style={{
                padding: '26px 0',
                borderBottom:
                  i < DISTINCTIONS.length - 1 ? '1px solid rgba(12,13,11,.15)' : undefined,
              }}
            >
              <p className="muted small" style={{ margin: '0 0 6px' }}>
                We distinguish
              </p>
              <p className="d3" style={{ margin: 0 }}>
                {`${first} `}
                <span className="muted">from</span>
                {` ${second}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
