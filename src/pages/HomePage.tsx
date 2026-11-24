import founderDesk from '../assets/founder/desk.webp';
import { GutJourney } from '../components/home/GutJourney';
import { HomeHero } from '../components/home/HomeHero';
import { LatestPublications } from '../components/home/LatestPublications';
import { MicrobiomeFilm } from '../components/home/MicrobiomeFilm';
import { ServicesAccordion } from '../components/home/ServicesAccordion';
import { TriadStage } from '../components/home/TriadStage';
import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { SageOs } from '../components/shared/SageOs';
import { TriadColumns } from '../components/shared/TriadColumns';

export function HomePage() {
  return (
    <View name="home">
      <HomeHero />
      <div className="wrap">
        <div className="stats">
          <div>
            <div className="n">3</div>
            <p>Connected domains: biology, environment and behaviour</p>
          </div>
          <div>
            <div className="n">5</div>
            <p>Senses studied as functional inputs to human systems</p>
          </div>
          <div>
            <div className="n">4</div>
            <p>Stages in SAGE OS, from diagnosis to action</p>
          </div>
          <div>
            <div className="n">20+</div>
            <p>Years of founder experience across business, science and design</p>
          </div>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">At a glance</p>
              <h2 className="d2">Everything Sagework does, in one place.</h2>
            </div>
            <p>
              Advisory and design for leaders and institutions, a public education platform, and the
              research that underpins both.
            </p>
          </div>
          <div className="grid g3">
            <HashLink to="discover" className="tile">
              <span className="k">Discover</span>
              <h3 className="d3" style={{ margin: 0 }}>
                The Human Adaptation Gap
              </h3>
              <p className="grow">
                Modern systems are changing faster than human biology. Sagework begins with the
                system itself, not with the effects once they appear.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Discover Sagework <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="founder" className="tile">
              <span className="k">Founder</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Dr Shruti Pai
              </h3>
              <p className="grow">
                PhD in Clinical Nutrition and gut microbiome researcher, who also founded and scaled
                a catering operation to approximately 110,000 meals a day.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Meet the founder <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="senses" className="tile">
              <span className="k">The Five Senses</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Light, sound, scent, taste, touch
              </h3>
              <p className="grow">
                See the light, watch the sound, and feel how each sense carries the environment into
                the body, with the evidence behind it.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Experience the senses <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="gutsy" className="tile">
              <span className="k">Dr Gutsy</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Women's health, explained
              </h3>
              <p className="grow">
                Women's health education on hormonal health, periods, fertility, perimenopause and
                menopause.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Explore Dr Gutsy <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="research" className="tile">
              <span className="k">Research &amp; evidence</span>
              <h3 className="d3" style={{ margin: 0 }}>
                5 peer-reviewed papers
              </h3>
              <p className="grow">
                Plus a doctoral thesis, 3 preprints and two white-paper series: the Human Adaptation
                Series and WISE.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                See the research <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="work" className="tile">
              <span className="k">Work with Sagework</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Six ways to work together
              </h3>
              <p className="grow">
                Consulting, strategic advisory, evaluation and audit, education, board strategy, and
                investments and partnerships.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Work with Sagework <span className="arr">→</span>
              </span>
            </HashLink>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap hero-grid">
          <div>
            <p className="label">About Sagework</p>
            <h2 className="d2">Health is shaped by systems.</h2>
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Biology does not operate in isolation. Nutrition, the gut microbiome, the built
              environment and human behaviour interact continuously, influencing health, resilience
              and performance.
            </p>
            <p className="grey">
              Sagework is an evidence-led advisory and design practice working across biology,
              environment and behaviour. We bring these forces into one evidence-led framework and
              translate research into practical strategy, system design and implementation for
              organisations, institutions and leaders addressing complex human challenges.
            </p>
            <HashLink to="discover" className="ul">
              Discover Sagework <span className="arr">→</span>
            </HashLink>
          </div>
          <TriadStage />
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">The SAGE Triad</p>
              <h2 className="d2">Three domains. One human system.</h2>
            </div>
            <p>
              Biology, environment and behaviour are not separate variables. Sagework examines how
              these domains interact, identifies where the system is working against people and
              designs interventions that can be applied in the real world.
            </p>
          </div>
          <TriadColumns variant="short" />
          <p className="quote" style={{ marginTop: '72px', maxWidth: '24ch' }}>
            Biology responds to conditions. Environments influence behaviour. Behaviour reinforces
            outcomes.
          </p>
          <p className="grey" style={{ marginTop: '20px' }}>
            Sustainable change requires all three to be considered together.
          </p>
          <HashLink to="research" className="btn btn-line">
            Research &amp; evidence <span className="arr">→</span>
          </HashLink>
        </div>
      </div>
      <GutJourney />
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
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">SAGE OS</p>
              <h2 className="d2">From diagnosis to action, in four stages.</h2>
            </div>
            <p>
              SAGE OS connects biology, environment and behaviour in a disciplined process that
              moves from observation to execution.
            </p>
          </div>
          <SageOs variant="discover" />
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap two hfounder">
          <figure className="fphoto" style={{ gridColumn: '1 / span 5' }}>
            <img
              src={founderDesk}
              alt="Dr Shruti Pai smiling at her desk with a laptop"
              loading="lazy"
              decoding="async"
              width={1400}
              height={932}
            />
          </figure>
          <div style={{ gridColumn: '7 / span 6' }}>
            <p className="label">Meet Dr Shruti Pai · Founder and Director</p>
            <p className="quote" style={{ marginBottom: '32px' }}>
              “How do we build systems that genuinely help people live and work better?”
            </p>
            <p style={{ color: 'var(--ink)' }}>
              Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome
              researcher and human systems designer, with more than two decades of experience across
              business, healthcare, education, food systems, research and environmental design.
            </p>
            <p className="grey">
              She founded Sagework to help leaders and institutions move beyond fragmented
              solutions.
            </p>
            <div className="row mt">
              <HashLink to="founder" className="btn btn-dark">
                Meet the founder <span className="arr">→</span>
              </HashLink>
              <a
                className="btn btn-line"
                href="https://shodhganga.inflibnet.ac.in/handle/10603/677114"
                target="_blank"
                rel="noopener"
              >
                PhD thesis ↗
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap two">
          <div className="c-l4">
            <p className="label">Work with Sagework</p>
            <h2 className="d2">Build health and performance into the system.</h2>
            <p className="grey">
              Health, resilience and performance designed into the way you operate, not added as a
              disconnected initiative.
            </p>
            <HashLink to="work" className="btn btn-dark mt">
              Work with Sagework <span className="arr">→</span>
            </HashLink>
          </div>
          <div className="c-r7">
            <ServicesAccordion />
          </div>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Latest research</p>
              <h2 className="d2">Recent peer-reviewed work.</h2>
            </div>
            <HashLink to="research" className="btn btn-line">
              All research <span className="arr">→</span>
            </HashLink>
          </div>
          <LatestPublications />
        </div>
      </div>
      <div className="sec s">
        <div className="wrap grid g2">
          <HashLink to="gutsy" className="feature paper">
            <div>
              <p className="label">Dr Gutsy</p>
              <h3 className="d2" style={{ maxWidth: '12ch' }}>
                Curiosity backed by evidence.
              </h3>
              <p className="grey">
                Dr Gutsy is Sagework's women's health education platform: hormonal health, periods,
                fertility, perimenopause and menopause, explained without trends, fear or false
                certainty.
              </p>
            </div>
            <span className="ul" style={{ alignSelf: 'flex-start' }}>
              Explore Dr Gutsy <span className="arr">→</span>
            </span>
          </HashLink>
          <HashLink to="research" className="feature" style={{ background: 'var(--sand)' }}>
            <div>
              <p className="label">Research and evidence</p>
              <h3 className="d2" style={{ maxWidth: '12ch' }}>
                Evidence must be visible.
              </h3>
              <p style={{ color: 'var(--ink-2)' }}>
                Peer-reviewed publications, white papers, evidence reviews and essays. We
                distinguish established evidence from emerging research, interpretation and
                hypothesis.
              </p>
            </div>
            <span className="ul" style={{ alignSelf: 'flex-start' }}>
              Research &amp; evidence <span className="arr">→</span>
            </span>
          </HashLink>
        </div>
      </div>
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Start a conversation</p>
            <h2 className="d2">Better health begins with better conditions.</h2>
            <p>
              For leaders shaping places, services, institutions or ideas that influence how people
              live, learn, work, eat, heal or age.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-light">
                Start a conversation <span className="arr">→</span>
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
