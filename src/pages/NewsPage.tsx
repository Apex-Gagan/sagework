import { View } from '../components/layout/View';
import { PageHero } from '../components/shared/PageHero';
import { ContentToCome } from '../components/shared/Pending';
import { PodcastSection } from '../sections/news/PodcastSection';

/** News & Media. Unreleased: reachable only while SHOW_PENDING_CONTENT is on. */
export function NewsPage() {
  return (
    <View name="news">
      <PageHero label="News & Media" title="News & Media" compact />
      <div className="wrap" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <ContentToCome title="News, media coverage and announcements" owner="Jyoti">
          Items to publish, with dates, outlets and links.
        </ContentToCome>
      </div>
      <PodcastSection />
    </View>
  );
}
