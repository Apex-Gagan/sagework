import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { AboutSagework } from '../sections/about/AboutSagework';
import { ExpertiseSection } from '../sections/about/ExpertiseSection';
import { FounderSection } from '../sections/about/FounderSection';
import { VisionSection } from '../sections/about/VisionSection';

/** Identity, purpose and credibility. */
export function AboutPage() {
  return (
    <View name="about">
      <AboutSagework />
      <VisionSection />
      <FounderSection />
      <ExpertiseSection />
      <div className="sec s">
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
                Start a Conversation <span className="arr">→</span>
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
