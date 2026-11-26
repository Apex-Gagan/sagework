import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CtaPanel } from '../components/shared/CtaPanel';
import { PageHero } from '../components/shared/PageHero';
import { ArticlesSection } from '../sections/knowledge/ArticlesSection';
import { BooksSection } from '../sections/knowledge/BooksSection';
import { EvidenceLibrary } from '../sections/knowledge/EvidenceLibrary';
import { EvidencePrinciples } from '../sections/knowledge/EvidencePrinciples';
import { ExplainersSection } from '../sections/knowledge/ExplainersSection';
import { ResearchSection } from '../sections/knowledge/ResearchSection';
import { WhitePapersSection } from '../sections/knowledge/WhitePapersSection';

/** Research, white papers, explainers and the evidence behind the work. */
export function KnowledgePage() {
  return (
    <View name="knowledge">
      <PageHero
        label="Knowledge"
        title="The research behind the perspective."
        lede="Sagework brings together academic research, evidence synthesis and systems thinking to examine the conditions that shape human health, resilience and performance."
      />
      <ResearchSection />
      <WhitePapersSection />
      <ExplainersSection />
      <EvidenceLibrary />
      <ArticlesSection />
      <BooksSection />
      <EvidencePrinciples />
      <div className="sec s">
        <div className="wrap">
          <CtaPanel>
            <p className="label">From research to application</p>
            <h2 className="d2">Scientific understanding, connected with context.</h2>
            <p>
              Research can inform a decision without providing a ready-made solution. Sagework
              considers how evidence relates to the people involved, the setting, available
              resources and the practical requirements of implementation and evaluation.
            </p>
            <div className="row mt">
              <HashLink to="what-we-do" className="btn btn-light">
                Work with Sagework <span className="arr">→</span>
              </HashLink>
              <HashLink to="approach" section="five-senses" className="btn btn-ghost-w">
                Explore the Five Senses
              </HashLink>
            </div>
          </CtaPanel>
        </div>
      </div>
    </View>
  );
}
