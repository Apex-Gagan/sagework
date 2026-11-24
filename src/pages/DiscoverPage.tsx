import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { ScrollButton } from '../components/navigation/ScrollButton';
import { CtaPanel } from '../components/shared/CtaPanel';
import { SageOs } from '../components/shared/SageOs';
import { TriadColumns } from '../components/shared/TriadColumns';
import { SERVICES } from '../data/services';
import { SETTINGS } from '../data/settings';

export function DiscoverPage() {
  return (
    <View name="discover">
      <div className="hero">
        <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
          <div style={{ gridColumn: '1 / span 9' }}>
            <p className="label">Discover Sagework</p>
            <h1 className="d1">
              The conditions around us become part of the conditions within us.
            </h1>
          </div>
          <div style={{ gridColumn: '1 / span 6' }}>
            <p className="lede">
              Sagework advises leaders, institutions and organisations on how environments, systems
              and everyday practices influence how people feel, function, recover and perform, then
              translates that understanding into strategy, design and action.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-dark">
                Start a conversation <span className="arr">→</span>
              </HashLink>
              <ScrollButton target="d-triad" className="ul">
                Explore our approach <span className="arr">↓</span>
              </ScrollButton>
            </div>
          </div>
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">The present need</p>
            <h2 className="d2">Modern systems are changing faster than human biology.</h2>
            <div className="chart-card">
              <svg
                viewBox="0 0 420 240"
                role="img"
                aria-label="Conceptual diagram: modern demands rise while human biology stays nearly level, opening the Human Adaptation Gap"
              >
                <line x1="20" y1="210" x2="410" y2="210" stroke="#E3E4DE"></line>
                <path
                  d="M20 170 C 150 166 240 150 310 104 S 390 30 410 22 L410 152 C 300 156 200 162 20 170 Z"
                  fill="#C7D99E"
                  fillOpacity=".55"
                ></path>
                <path
                  d="M20 170 C 150 166 240 150 310 104 S 390 30 410 22"
                  fill="none"
                  stroke="#59750B"
                  strokeWidth="2"
                ></path>
                <path
                  d="M20 170 C 200 162 300 156 410 152"
                  fill="none"
                  stroke="#76786F"
                  strokeWidth="2"
                  strokeDasharray="5 6"
                ></path>
                <text x="226" y="62">
                  Modern demands
                </text>
                <text x="250" y="178">
                  Human biology
                </text>
                <text x="336" y="118" style={{ fill: '#59750B', fontWeight: '600' }}>
                  The gap
                </text>
                <text x="20" y="230">
                  Past
                </text>
                <text x="380" y="230">
                  Today
                </text>
              </svg>
              <p className="small grey" style={{ margin: '8px 0 0' }}>
                Conceptual illustration, not plotted data.
              </p>
            </div>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Artificial light extends the day. Digital systems compete for attention. Food
              environments prioritise convenience. Buildings can disconnect people from movement,
              nature and restorative rhythms.
            </p>
            <p>
              Work and education often demand continuous performance without creating the conditions
              that sustain it. This mismatch is associated with disrupted sleep, fatigue, persistent
              stress, reduced concentration, poorer metabolic health and slower recovery.
            </p>
            <p>
              <strong style={{ fontWeight: '600' }}>
                Sagework examines this as the Human Adaptation Gap:
              </strong>
              {
                ' the distance between what modern systems demand from people and what human biology needs to function well.'
              }
            </p>
            <p className="grey">
              Many health solutions focus on the individual after the effects appear. Sagework
              begins with the system itself. People do not live in silos. Nutrition cannot be
              separated from the environment in which people eat. Behaviour cannot be separated from
              the biological, social and structural conditions that make it possible. Space is not
              simply a backdrop. It is an active input into how people feel, behave and recover.
            </p>
            <p className="pull">
              Sagework reconnects these parts through science, systems thinking and design.
            </p>
          </div>
        </div>
      </div>
      <div className="sec" id="d-triad">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Our approach · The SAGE Triad</p>
              <h2 className="d2">One human system. Three connected forces.</h2>
            </div>
            <p>
              Human health is shaped by the ongoing relationship between what happens within us,
              what happens around us and what becomes possible in everyday life.
            </p>
          </div>
          <TriadColumns variant="long" />
          <p className="quote" style={{ marginTop: '64px', maxWidth: '26ch' }}>
            Biology responds to its environment. Behaviour shapes what we repeat. Health emerges
            from their interaction.
          </p>
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">What we do</p>
              <h2 className="d2">Turning evidence into systems change.</h2>
            </div>
            <p>
              Sagework advises leaders who recognise that health, resilience and performance are
              shaped by systems, not information alone.
            </p>
          </div>
          <div className="grid g3">
            {SERVICES.map(({ name, summary }) => (
              <div className="tile" key={name}>
                <span className="k">Service</span>
                <h3 className="d3" style={{ margin: 0 }}>
                  {name}
                </h3>
                <p>{summary}</p>
              </div>
            ))}
          </div>
          <HashLink to="work" className="btn btn-dark mt">
            Explore ways to work together <span className="arr">→</span>
          </HashLink>
        </div>
      </div>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">SAGE OS</p>
              <h2 className="d2">A disciplined framework from diagnosis to action.</h2>
            </div>
            <p>
              SAGE OS connects biology, environment and behaviour in a disciplined process that
              moves from observation to execution.
            </p>
          </div>
          <SageOs variant="discover" />
          <p className="muted mt" style={{ maxWidth: '60ch' }}>
            Learning runs through every stage. Measurement, feedback, reflection and evolving
            evidence inform the next scan of the system.
          </p>
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">Where Sagework applies</p>
              <h2 className="d2">Health is shaped wherever people spend their lives.</h2>
            </div>
            <p>
              The context changes, but the principle remains the same: design for people as whole
              human systems.
            </p>
          </div>
          <div className="grid g3">
            {SETTINGS.map(({ name, description }) => (
              <div className="tile" key={name}>
                <h3 className="h4" style={{ margin: 0 }}>
                  {name}
                </h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sec paper">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">Why Sagework</p>
            <h2 className="d2">Scientific authority backed by cross-sector execution.</h2>
          </div>
          <div className="c-r">
            <p className="lede" style={{ color: 'var(--ink)' }}>
              Sagework is founded and led by Dr Shruti Pai, a clinical nutrition and gut microbiome
              scientist, entrepreneur and human systems designer whose work spans healthcare,
              education, food, hospitality and the built environment.
            </p>
            <p className="grey">
              The practice brings together peer-reviewed research, preventive health, design
              expertise and more than two decades of experience leading and shaping real-world
              organisations and environments, moving from evidence to execution.
            </p>
            <HashLink to="founder" className="ul">
              Meet the founder <span className="arr">→</span>
            </HashLink>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap">
          <p className="label">Evidence and public knowledge</p>
          <h2 className="d2" style={{ marginBottom: '48px' }}>
            Research, evidence and public education.
          </h2>
          <div className="grid g3">
            <HashLink to="research" className="tile">
              <span className="k">Research</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Research &amp; evidence
              </h3>
              <p className="grow">
                Peer-reviewed research, evidence reviews, white papers and perspectives connecting
                biology, environment and behaviour.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Research &amp; evidence <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="senses" className="tile">
              <span className="k">Sensory science</span>
              <h3 className="d3" style={{ margin: 0 }}>
                The Five Senses
              </h3>
              <p className="grow">
                Light, sound, smell, taste and touch as biological pathways through which the
                environment communicates with the body.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Explore the Five Senses <span className="arr">→</span>
              </span>
            </HashLink>
            <HashLink to="gutsy" className="tile">
              <span className="k">Public education</span>
              <h3 className="d3" style={{ margin: 0 }}>
                Dr Gutsy
              </h3>
              <p className="grow">
                Evidence-led women's health education across hormonal health, perimenopause and
                menopause.
              </p>
              <span className="ul" style={{ alignSelf: 'flex-start' }}>
                Explore Dr Gutsy <span className="arr">→</span>
              </span>
            </HashLink>
          </div>
        </div>
      </div>
      <div className="sec s" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CtaPanel>
            <p className="label">Start a conversation</p>
            <h2 className="d2">Build healthier systems with Sagework.</h2>
            <p>
              For leaders shaping places, services, institutions or ideas that influence how people
              live, learn, work, eat, heal or age, Sagework provides the evidence, framework and
              strategic direction to design what comes next.
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
