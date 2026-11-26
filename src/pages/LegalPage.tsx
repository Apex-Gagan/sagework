import { View } from '../components/layout/View';
import { PageHero } from '../components/shared/PageHero';
import { ContentToCome } from '../components/shared/Pending';

const LEGAL = {
  privacy: {
    title: 'Privacy Notice',
    needs: 'How enquiry and contact details are collected, used, stored and deleted.',
  },
  terms: { title: 'Terms of Use', needs: 'The terms that govern use of this website.' },
  disclaimer: {
    title: 'Disclaimer',
    needs:
      'Including the health-education boundary: content does not diagnose, prescribe or replace individual medical care.',
  },
};

/** Privacy, terms and disclaimer: one layout, awaiting approved legal text. */
export function LegalPage({ page }: { page: keyof typeof LEGAL }) {
  const { title, needs } = LEGAL[page];
  return (
    <View name={page}>
      <PageHero label="Legal" title={title} compact />
      <div className="sec s" style={{ paddingTop: 0 }}>
        <div className="wrap legal-body">
          <ContentToCome title={`${title}: approved legal text`} owner="Jyoti">
            {needs}
          </ContentToCome>
        </div>
      </div>
    </View>
  );
}
