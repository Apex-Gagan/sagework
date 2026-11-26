import { GutJourney } from '../../components/home/GutJourney';
import { MicrobiomeFilm } from '../../components/home/MicrobiomeFilm';
import { sectionId } from '../../routing/views';

/** Visual explainers: the microbiome film and the journey through the gut. */
export function ExplainersSection() {
  return (
    <section id={sectionId('knowledge', 'explainers')} className="anchor">
      <div className="sec" id="moreHuman">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">The microbiome, explained</p>
              <h2 className="d2">You are more than human.</h2>
            </div>
            <p>
              Your body isn't yours alone. It is home to around 38 trillion bacteria that help power
              digestion, immunity and more. Press play, turn the sound on, and see how their health
              connects to yours.
            </p>
          </div>
          <MicrobiomeFilm />
          <p className="small grey" style={{ marginTop: '16px' }}>
            Bacterial estimate: Sender, Fuchs and Milo, PLOS Biology, 2016.
          </p>
        </div>
      </div>
      <GutJourney />
    </section>
  );
}
