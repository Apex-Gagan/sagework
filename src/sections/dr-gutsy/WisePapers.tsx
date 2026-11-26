import { HashLink } from '../../components/navigation/HashLink';
import { WISE_SERIES } from '../../data/whitePapers';

/** The WISE papers behind a Dr Gutsy theme, linking through to the series. */
export function WisePapers({ numbers }: { numbers: string[] }) {
  const papers = WISE_SERIES.filter(({ number }) => numbers.includes(number));
  return (
    <div className="grid g2 wise-cards">
      {papers.map(({ number, title, summary }) => (
        <HashLink key={number} to="knowledge" section="white-papers" className="tile">
          <span className="k">{`WISE ${number}`}</span>
          <h3 className="h4" style={{ margin: 0 }}>
            {title}
          </h3>
          <p className="grow">{summary}</p>
          <span className="ul" style={{ alignSelf: 'flex-start' }}>
            WISE series <span className="arr">→</span>
          </span>
        </HashLink>
      ))}
    </div>
  );
}
