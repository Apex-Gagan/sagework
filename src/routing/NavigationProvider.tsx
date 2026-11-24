import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { NavigationContext, type Navigation, type NavigationIntent } from './NavigationContext';
import { viewFromHash } from './views';

/** Hash router: `#discover`, `#founder`, … map to one page each. */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [{ view, visit }, setRoute] = useState(() => ({ view: viewFromHash(), visit: 0 }));
  const intent = useRef<NavigationIntent>({});

  const revisit = useCallback(
    () => setRoute((route) => ({ view: viewFromHash(), visit: route.visit + 1 })),
    [],
  );

  useEffect(() => {
    window.addEventListener('hashchange', revisit);
    return () => window.removeEventListener('hashchange', revisit);
  }, [revisit]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [visit]);

  const setIntent = useCallback((next: NavigationIntent) => {
    Object.assign(intent.current, next);
  }, []);

  const takeIntent = useCallback<Navigation['takeIntent']>((key) => {
    const value = intent.current[key];
    delete intent.current[key];
    return value;
  }, []);

  const navigation = useMemo(
    () => ({ view, visit, revisit, setIntent, takeIntent }),
    [view, visit, revisit, setIntent, takeIntent],
  );

  return <NavigationContext value={navigation}>{children}</NavigationContext>;
}
