import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { AboutGutsy } from '../sections/dr-gutsy/AboutGutsy';
import { GutHealth } from '../sections/dr-gutsy/GutHealth';
import { GutsyHero } from '../sections/dr-gutsy/GutsyHero';
import { GutsyMethod } from '../sections/dr-gutsy/GutsyMethod';
import { GutsyScientist } from '../sections/dr-gutsy/GutsyScientist';
import { MaternalHealth } from '../sections/dr-gutsy/MaternalHealth';
import { MidlifeHealth } from '../sections/dr-gutsy/MidlifeHealth';
import { QuestionsSection } from '../sections/dr-gutsy/QuestionsSection';

/** Dr Gutsy: Sagework's women's health education initiative. */
export function DrGutsyPage() {
  return (
    <View name="dr-gutsy">
      <GutsyHero />
      <AboutGutsy />
      <QuestionsSection />
      <MaternalHealth />
      <MidlifeHealth />
      <GutHealth />
      <GutsyMethod />
      <GutsyScientist />
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Keep questioning</p>
            <h2 className="d2">Stay curious. Stay evidence-led. Stay gutsy.</h2>
            <p>
              Good health education helps people recognise better questions, understand the evidence
              and see where context changes the interpretation.
            </p>
            <div className="row mt">
              <HashLink to="dr-gutsy" section="questions" className="btn btn-light">
                Explore the questions <span className="arr">↑</span>
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
