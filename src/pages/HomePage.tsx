import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { ChallengeSection } from '../sections/home/ChallengeSection';
import { CredibilitySection } from '../sections/home/CredibilitySection';
import { FrameworksSection } from '../sections/home/FrameworksSection';
import { HomeHero } from '../sections/home/HomeHero';
import { SageworkEdit } from '../sections/home/SageworkEdit';
import { ServicesOverview } from '../sections/home/ServicesOverview';

/** Establishes the brand and guides visitors to the right destination. */
export function HomePage() {
  return (
    <View name="home">
      <HomeHero />
      <ChallengeSection />
      <FrameworksSection />
      <ServicesOverview />
      <CredibilitySection />
      <SageworkEdit />
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
                Start a Conversation <span className="arr">→</span>
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
