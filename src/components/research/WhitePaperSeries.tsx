import { useState } from 'react';
import { HUMAN_ADAPTATION_SERIES, WISE_SERIES, type WhitePaper } from '../../data/whitePapers';

type Series = 'ha' | 'wise';

const SERIES: { key: Series; label: string }[] = [
  { key: 'ha', label: 'Human Adaptation Series' },
  { key: 'wise', label: "WISE: Women's Health" },
];

export function WhitePaperSeries() {
  const [series, setSeries] = useState<Series>('ha');

  return (
    <>
      <div className="seg" role="tablist" aria-label="White paper series">
        {SERIES.map(({ key, label }) => (
          <button
            key={key}
            className={series === key ? 'on' : undefined}
            onClick={() => setSeries(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div hidden={series !== 'ha'}>
        <div className="two">
          <div className="c-l4">
            <h3 className="d3">
              Understanding the relationship between human biology and contemporary life.
            </h3>
            <p className="grey">
              The series examines the conditions in which people live, work, eat, rest and recover.
            </p>
            <div className="chain">
              <span>Adaptation</span>
              <i>→</i>
              <span>Sensory input</span>
              <i>→</i>
              <span>Biological translation</span>
              <i>→</i>
              <span>Timing</span>
              <i>→</i>
              <span>Recovery</span>
              <i>→</i>
              <span>Resilience</span>
            </div>
          </div>
          <div className="c-r7" id="haList">
            <PaperRows papers={HUMAN_ADAPTATION_SERIES} />
          </div>
        </div>
      </div>
      <div hidden={series !== 'wise'}>
        <div className="two">
          <div className="c-l4">
            <h3 className="d3">An integrated systems perspective across the female life course.</h3>
            <p className="grey">
              WISE examines biological transitions alongside the choices, environments, care systems
              and structural conditions surrounding them.
            </p>
          </div>
          <div className="c-r7" id="wiseList">
            <PaperRows papers={WISE_SERIES} />
          </div>
        </div>
      </div>
    </>
  );
}

function PaperRows({ papers }: { papers: WhitePaper[] }) {
  return papers.map(({ number, title, question, summary }) => (
    <div className="lrow" key={number} style={{ gridTemplateColumns: '70px minmax(0,1fr)' }}>
      <span className="yr" style={{ color: 'var(--forest)' }}>
        {number}
      </span>
      <div>
        <h3>{title}</h3>
        {question && (
          <p style={{ color: 'var(--ink)', fontWeight: 500, marginBottom: '6px' }}>{question}</p>
        )}
        <p style={{ margin: 0 }}>{summary}</p>
      </div>
    </div>
  ));
}
