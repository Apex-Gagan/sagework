import { createContext, useContext } from 'react';
import type { ViewName } from './views';

/** Something the destination page should do on arrival. */
export interface NavigationIntent {
  /** Service to preselect in the contact form. */
  enquiry?: string;
}

export interface Navigation {
  view: ViewName;
  /** Increments on every navigation, including re-selecting the current page. */
  visit: number;
  /** Re-runs arrival behaviour (scroll to top, close menu) for the current page. */
  revisit: () => void;
  setIntent: (intent: NavigationIntent) => void;
  /** Reads an intent once, clearing it. */
  takeIntent: <K extends keyof NavigationIntent>(key: K) => NavigationIntent[K];
}

export const NavigationContext = createContext<Navigation | null>(null);

export function useNavigation(): Navigation {
  const navigation = useContext(NavigationContext);
  if (!navigation) throw new Error('useNavigation must be used inside NavigationProvider');
  return navigation;
}
