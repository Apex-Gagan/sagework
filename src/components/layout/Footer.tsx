import { SHOW_PENDING_CONTENT } from '../../config/launch';
import type { ViewName } from '../../routing/views';
import { HashLink } from '../navigation/HashLink';

interface FooterLink {
  label: string;
  to: ViewName;
  section?: string;
  pending?: boolean;
}

/** Quick links, as set out in the 26 Nov 2026 deck. */
const QUICK_LINKS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Sagework',
    links: [
      { label: 'About', to: 'about' },
      { label: 'Founder', to: 'about', section: 'founder' },
      { label: 'Our Approach', to: 'approach' },
    ],
  },
  {
    title: 'What we do',
    links: [
      { label: 'Services', to: 'what-we-do', section: 'services' },
      { label: 'Sectors', to: 'what-we-do', section: 'sectors' },
      { label: 'Partnerships', to: 'what-we-do', section: 'engagement' },
    ],
  },
  {
    title: 'Knowledge',
    links: [
      { label: 'Research', to: 'knowledge', section: 'research' },
      { label: 'White Papers', to: 'knowledge', section: 'white-papers' },
      { label: 'Dr Gutsy', to: 'dr-gutsy' },
    ],
  },
];

const LEGAL: FooterLink[] = [
  { label: 'Privacy', to: 'privacy', pending: true },
  { label: 'Terms', to: 'terms', pending: true },
  { label: 'Disclaimer', to: 'disclaimer', pending: true },
  { label: 'Sitemap', to: 'sitemap' },
];

const shown = (link: FooterLink) => SHOW_PENDING_CONTENT || !link.pending;

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid fgrid-5">
          <div>
            <p className="d3" style={{ maxWidth: '18ch' }}>
              Built on Biology. Integrated Through Systems. Scaled for Human Potential.
            </p>
          </div>
          {QUICK_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h5>{title}</h5>
              <ul>
                {links.map(({ label, to, section }) => (
                  <li key={label}>
                    <HashLink to={to} section={section}>
                      {label}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5>Connect</h5>
            <ul>
              <li>
                <a href="mailto:connect@sagework.in">connect@sagework.in</a>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/profile/Shruti-Pai-3"
                  target="_blank"
                  rel="noopener"
                >
                  ResearchGate ↗
                </a>
              </li>
              <li>
                <HashLink to="contact">Contact Us</HashLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="bigmark brand-logo" role="img" aria-label="sagework"></div>
        <div className="copy">
          <span>© 2026 Sagework. All rights reserved.</span>
          <nav className="legal" aria-label="Legal">
            {LEGAL.filter(shown).map(({ label, to }) => (
              <HashLink key={label} to={to}>
                {label}
              </HashLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
