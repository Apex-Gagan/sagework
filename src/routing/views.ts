import { SHOW_PENDING_CONTENT } from '../config/launch';

export const VIEWS = [
  'home',
  'about',
  'approach',
  'what-we-do',
  'knowledge',
  'dr-gutsy',
  'news',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
  'sitemap',
] as const;

export type ViewName = (typeof VIEWS)[number];

export interface Route {
  view: ViewName;
  /** A section within the page, from `#page/section`. */
  section?: string;
}

/** Addresses from the earlier site structure, so old links still land in the right place. */
const MOVED: Record<string, Route> = {
  discover: { view: 'about' },
  founder: { view: 'about', section: 'founder' },
  senses: { view: 'approach', section: 'five-senses' },
  gutsy: { view: 'dr-gutsy' },
  research: { view: 'knowledge' },
  work: { view: 'what-we-do' },
  initiatives: { view: 'dr-gutsy' },
};

/** Pages with no approved content yet. With pending content hidden, they lead home. */
export const UNRELEASED: readonly ViewName[] = ['news', 'privacy', 'terms', 'disclaimer'];

const isViewName = (value: string): value is ViewName =>
  (VIEWS as readonly string[]).includes(value) &&
  (SHOW_PENDING_CONTENT || !UNRELEASED.includes(value as ViewName));

export const routeHash = ({ view, section }: Route) => `#${view}${section ? `/${section}` : ''}`;

/** The DOM id of a section, e.g. `about-founder`. */
export const sectionId = (view: ViewName, section: string) => `${view}-${section}`;

/** Reads the address bar. Old addresses are rewritten in place; anything unknown is home. */
export function routeFromHash(): Route {
  const [page = '', section] = window.location.hash.slice(1).split('/');
  if (isViewName(page)) return { view: page, section: section || undefined };
  const moved = MOVED[page];
  if (moved) {
    window.history.replaceState(null, '', routeHash(moved));
    return moved;
  }
  return { view: 'home' };
}
