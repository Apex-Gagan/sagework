import founderPhoto from '../assets/founder.jpg';
import { FounderGallery } from '../components/founder/FounderGallery';
import { FounderHero } from '../components/founder/FounderHero';
import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';

export function FounderPage() {
  return (
    <View name="founder">
      <FounderHero />
      <div className="wrap two fintro" style={{ alignItems: 'center' }}>
        <figure className="fphoto" style={{ gridColumn: '1 / span 5' }}>
          <img
            src={founderPhoto}
            alt="Dr Shruti Pai writing in a notebook"
            loading="lazy"
            decoding="async"
            width={1200}
            height={1800}
          />
        </figure>
        <div className="c-r">
          <p className="quote">How do we build systems that truly help people?</p>
          <p className="lede" style={{ color: 'var(--ink)', marginTop: 0 }}>
            For more than two decades, Dr Shruti has worked at the intersection of business,
            science, environment and human behaviour, across hospitality, healthcare, education and
            food systems.
          </p>
          <p className="grey">
            She founded Sagework to help leaders and institutions move beyond fragmented solutions
            and address the connected biological, environmental and behavioural conditions that
            shape human outcomes.
          </p>
          <div className="row mt">
            <a
              className="btn btn-dark"
              href="https://shodhganga.inflibnet.ac.in/handle/10603/677114"
              target="_blank"
              rel="noopener"
            >
              Read the PhD thesis ↗
            </a>
            <a
              className="btn btn-line"
              href="https://www.researchgate.net/profile/Shruti-Pai-3"
              target="_blank"
              rel="noopener"
            >
              ResearchGate ↗
            </a>
          </div>
        </div>
      </div>
      <div className="wrap">
        <dl className="facets" style={{ margin: 0 }}>
          <div>
            <dt>Business leader</dt>
            <dd>
              Founded and scaled Chef on Wheels at Manipal Resorts into a catering operation
              delivering approximately 110,000 meals a day. It later became part of Manipal
              Integrated Services, whose facility management and catering businesses Quess Corp
              acquired in 2016.
            </dd>
          </div>
          <div>
            <dt>Scientist</dt>
            <dd>
              PhD and MSc in Clinical Nutrition; BSc (Hons) in Biomedical Sciences (Medical
              Virology). Doctoral research on the maternal and infant gut microbiome, infant growth
              and body composition in the first year of life.
            </dd>
          </div>
          <div>
            <dt>Human systems designer</dt>
            <dd>
              More than a decade as Creative Director across hospitals, universities, clinics,
              hostels and workplaces.
            </dd>
          </div>
          <div>
            <dt>Writer and educator</dt>
            <dd>
              The gut microbiome, nutrition, women's health, early-life biology, behaviour, and the
              relationship between people and their environments.
            </dd>
          </div>
          <div>
            <dt>Dr Gutsy</dt>
            <dd>
              {"Founder of Dr Gutsy, Sagework's women's health education platform. "}
              <HashLink to="gutsy" className="ul">
                Explore Dr Gutsy <span className="arr">→</span>
              </HashLink>
            </dd>
          </div>
          <div>
            <dt>Global perspective</dt>
            <dd>
              Life and work across India, Singapore, Malaysia, Australia and the United Kingdom.
            </dd>
          </div>
          <div>
            <dt>Lived experience</dt>
            <dd>Mother, entrepreneur, researcher, designer and lifelong learner.</dd>
          </div>
        </dl>
      </div>
      <FounderGallery />
      <div className="sec">
        <div className="wrap two" style={{ alignItems: 'end' }}>
          <div style={{ gridColumn: '1 / span 8' }}>
            <p className="quote" style={{ maxWidth: '22ch' }}>
              Business taught her to execute. Science taught her to question. Design taught her to
              observe.
            </p>
          </div>
          <div style={{ gridColumn: '10 / span 3' }}>
            <div className="row">
              <HashLink to="work" className="btn btn-dark">
                Work with Sagework <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}
