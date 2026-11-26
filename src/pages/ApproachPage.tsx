import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { PageHero } from '../components/shared/PageHero';
import { AdaptationGap } from '../sections/approach/AdaptationGap';
import { FiveSensesSection } from '../sections/approach/FiveSensesSection';
import { SageOsSection } from '../sections/approach/SageOsSection';
import { SageTriadSection } from '../sections/approach/SageTriadSection';

/** The methodology: the gap, the triad, the operating system and the senses. */
export function ApproachPage() {
  return (
    <View name="approach">
      <PageHero
        label="Our approach"
        title="One human system. Three connected forces."
        lede="Human health is shaped by the ongoing relationship between what happens within us, what happens around us and what becomes possible in everyday life."
      >
        <div className="row mt">
          <HashLink to="approach" section="sage-triad" className="btn btn-dark">
            The SAGE Triad <span className="arr">↓</span>
          </HashLink>
          <HashLink to="approach" section="five-senses" className="ul">
            The Five Senses <span className="arr">↓</span>
          </HashLink>
        </div>
      </PageHero>
      <AdaptationGap />
      <SageTriadSection />
      <SageOsSection />
      <FiveSensesSection />
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Work with Sagework</p>
            <h2 className="d2">
              What are the conditions in your organisation asking of the people within it?
            </h2>
            <p>
              Explore how sensory conditions can be assessed within your workplace, healthcare
              setting, educational institution or hospitality environment.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-light">
                Start a Conversation <span className="arr">→</span>
              </HashLink>
              <HashLink to="what-we-do" className="btn btn-ghost-w">
                What we do
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
