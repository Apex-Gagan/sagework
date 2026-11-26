import { SHOW_PENDING_CONTENT } from '../config/launch';
import type { ViewName } from '../routing/views';

export interface NavItem {
  label: string;
  to: ViewName;
  section?: string;
  /** No approved content yet: shown only while SHOW_PENDING_CONTENT is on. */
  pending?: boolean;
}

export interface NavGroup extends NavItem {
  items?: NavItem[];
  /** Pages that light up this menu entry. */
  views: ViewName[];
}

/** Primary navigation, as agreed in the 26 Nov 2026 website strategy deck. */
const NAVIGATION: NavGroup[] = [
  { label: 'Home', to: 'home', views: ['home'] },
  {
    label: 'About',
    to: 'about',
    views: ['about'],
    items: [
      { label: 'About Sagework', to: 'about', section: 'sagework' },
      { label: 'Vision & Philosophy', to: 'about', section: 'vision', pending: true },
      { label: 'Founder', to: 'about', section: 'founder' },
      { label: 'Our Expertise', to: 'about', section: 'expertise' },
    ],
  },
  {
    label: 'Our Approach',
    to: 'approach',
    views: ['approach'],
    items: [
      { label: 'Human Adaptation Gap', to: 'approach', section: 'adaptation-gap' },
      { label: 'SAGE Triad', to: 'approach', section: 'sage-triad' },
      { label: 'SAGE OS', to: 'approach', section: 'sage-os' },
      { label: 'Five Senses', to: 'approach', section: 'five-senses' },
    ],
  },
  {
    label: 'What We Do',
    to: 'what-we-do',
    views: ['what-we-do'],
    items: [
      { label: 'Services', to: 'what-we-do', section: 'services' },
      { label: 'Sectors We Serve', to: 'what-we-do', section: 'sectors' },
      { label: 'Engagement Models', to: 'what-we-do', section: 'engagement' },
    ],
  },
  {
    label: 'Knowledge',
    to: 'knowledge',
    views: ['knowledge'],
    items: [
      { label: 'Academic Research', to: 'knowledge', section: 'research' },
      { label: 'White Papers', to: 'knowledge', section: 'white-papers' },
      { label: 'Evidence Library', to: 'knowledge', section: 'evidence' },
      { label: 'Articles & Perspectives', to: 'knowledge', section: 'articles', pending: true },
      { label: 'Books & Publications', to: 'knowledge', section: 'books', pending: true },
    ],
  },
  {
    // Opens Dr Gutsy directly; further initiatives join the menu when ready.
    label: 'Our Initiatives',
    to: 'dr-gutsy',
    views: ['dr-gutsy'],
    items: [{ label: 'Dr Gutsy', to: 'dr-gutsy' }],
  },
  {
    label: 'News & Media',
    to: 'news',
    views: ['news'],
    pending: true,
    items: [{ label: 'Podcast', to: 'news', section: 'podcast', pending: true }],
  },
];

const shown = <T extends NavItem>(item: T) => SHOW_PENDING_CONTENT || !item.pending;

export const PRIMARY_NAV: NavGroup[] = NAVIGATION.filter(shown).map((group) => ({
  ...group,
  items: group.items?.filter(shown),
}));

export const CONTACT_LINK: NavItem = { label: 'Contact Us', to: 'contact' };
