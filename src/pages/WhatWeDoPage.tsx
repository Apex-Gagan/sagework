import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { PageHero } from '../components/shared/PageHero';
import { SectionBar } from '../components/shared/SectionBar';
import { sectionId } from '../routing/views';
import { EngagementSection } from '../sections/what-we-do/EngagementSection';
import { SectorsSection } from '../sections/what-we-do/SectorsSection';
import { ServicesSection } from '../sections/what-we-do/ServicesSection';

const SECTIONS = [
  { id: sectionId('what-we-do', 'services'), label: 'Services' },
  { id: sectionId('what-we-do', 'sectors'), label: 'Sectors We Serve' },
  { id: sectionId('what-we-do', 'engagement'), label: 'Engagement Models' },
];

/** Services, the sectors they serve and how an engagement works. */
export function WhatWeDoPage() {
  return (
    <View name="what-we-do">
      <PageHero
        label="What we do"
        title="Build health and performance into the way your organisation works."
        lede="Sagework helps leaders and institutions turn scientific evidence into practical decisions about people, places and everyday practices. We begin with your challenge, the people your organisation serves and what you want to improve."
        compact
      >
        <div className="row mt">
          <HashLink to="contact" className="btn btn-dark">
            Start a Conversation <span className="arr">→</span>
          </HashLink>
        </div>
      </PageHero>
      <div className="barred">
        <SectionBar items={SECTIONS} label="What we do" />
        <ServicesSection />
        <SectorsSection />
        <EngagementSection />
      </div>
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">Start with the challenge you want to address</p>
            <h2 className="d2">Tell us about your organisation and what you'd like to change.</h2>
            <p>
              We will review your enquiry and identify whether a further conversation would be
              useful. Where there is a fit, the next step is an agreed scope of work.
            </p>
            <div className="row mt">
              <HashLink to="contact" className="btn btn-light">
                Start a Conversation <span className="arr">→</span>
              </HashLink>
              <HashLink to="knowledge" className="btn btn-ghost-w">
                Knowledge
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
