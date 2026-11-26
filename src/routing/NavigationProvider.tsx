import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { scrollBehavior } from '../lib/motion';
import { NavigationContext, type Navigation, type NavigationIntent } from './NavigationContext';
import { routeFromHash, sectionId, type ViewName } from './views';

/** Hash router: `#about` opens a page, `#about/founder` a section within it. */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [{ view, section, visit }, setRoute] = useState(() => ({ ...routeFromHash(), visit: 0 }));
  const intent = useRef<NavigationIntent>({});
  const previousView = useRef<ViewName | null>(null);

  const revisit = useCallback(
    () => setRoute((route) => ({ ...routeFromHash(), visit: route.visit + 1 })),
    [],
  );

  useEffect(() => {
    window.addEventListener('hashchange', revisit);
    return () => window.removeEventListener('hashchange', revisit);
  }, [revisit]);

  // A new page opens at its top, or at the section asked for. Within the same page, glide there.
  useLayoutEffect(() => {
    const samePage = previousView.current === view;
    previousView.current = view;
    const target = section ? document.getElementById(sectionId(view, section)) : null;
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    if (!samePage) window.scrollTo(0, 0);
    // Wait a frame so the newly shown page has its final layout.
    const raf = requestAnimationFrame(() =>
      target.scrollIntoView({ behavior: samePage ? scrollBehavior : 'auto', block: 'start' }),
    );
    return () => cancelAnimationFrame(raf);
  }, [view, section, visit]);

  const setIntent = useCallback((next: NavigationIntent) => {
    Object.assign(intent.current, next);
  }, []);

  const takeIntent = useCallback<Navigation['takeIntent']>((key) => {
    const value = intent.current[key];
    delete intent.current[key];
    return value;
  }, []);

  const navigation = useMemo(
    () => ({ view, section, visit, revisit, setIntent, takeIntent }),
    [view, section, visit, revisit, setIntent, takeIntent],
  );

  return <NavigationContext value={navigation}>{children}</NavigationContext>;
}
