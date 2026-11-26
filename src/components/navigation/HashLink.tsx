import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavigation, type NavigationIntent } from '../../routing/NavigationContext';
import { routeHash, type ViewName } from '../../routing/views';

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  to: ViewName;
  /** A section within the page. */
  section?: string;
  intent?: NavigationIntent;
  onNavigate?: () => void;
}

export function HashLink({ to, section, intent, onNavigate, children, ...rest }: HashLinkProps) {
  const { revisit, setIntent } = useNavigation();
  const href = routeHash({ view: to, section });

  const handleClick = (event: MouseEvent) => {
    if (intent) setIntent(intent);
    onNavigate?.();
    // The browser fires no hashchange when the link points at the current address.
    const { hash } = window.location;
    if (href === hash || (to === 'home' && !section && !hash)) {
      event.preventDefault();
      revisit();
    }
  };

  return (
    <a {...rest} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
