import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { PageHero } from '../components/shared/PageHero';
import { SHOW_PENDING_CONTENT } from '../config/launch';
import { CONTACT_LINK, PRIMARY_NAV } from '../data/navigation';

const LEGAL_LINKS = [
  { label: 'Privacy Notice', to: 'privacy' },
  { label: 'Terms of Use', to: 'terms' },
  { label: 'Disclaimer', to: 'disclaimer' },
] as const;

/** Every page and section, generated from the navigation. */
export function SitemapPage() {
  return (
    <View name="sitemap">
      <PageHero label="Sitemap" title="Every page, in one place." compact />
      <div className="sec s" style={{ paddingTop: 0 }}>
        <div className="wrap sitemap">
          {PRIMARY_NAV.map(({ label, to, items }) => (
            <div key={label}>
              <h2 className="h4">
                <HashLink to={to}>{label}</HashLink>
              </h2>
              {items && items.length > 0 && (
                <ul>
                  {items.map((item) => (
                    <li key={item.label}>
                      <HashLink to={item.to} section={item.section} className="ul">
                        {item.label}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div>
            <h2 className="h4">
              <HashLink to={CONTACT_LINK.to}>{CONTACT_LINK.label}</HashLink>
            </h2>
            {SHOW_PENDING_CONTENT && (
              <ul>
                {LEGAL_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <HashLink to={to} className="ul">
                      {label}
                    </HashLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </View>
  );
}
