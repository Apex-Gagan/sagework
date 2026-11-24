export const VIEWS = [
  'home',
  'founder',
  'discover',
  'senses',
  'gutsy',
  'research',
  'work',
  'contact',
] as const;

export type ViewName = (typeof VIEWS)[number];

const isViewName = (value: string): value is ViewName =>
  (VIEWS as readonly string[]).includes(value);

/** Unknown or empty hashes fall back to the home page. */
export function viewFromHash(): ViewName {
  const hash = window.location.hash.slice(1);
  return isViewName(hash) ? hash : 'home';
}
