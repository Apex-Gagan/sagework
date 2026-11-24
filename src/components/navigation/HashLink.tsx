import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavigation, type NavigationIntent } from '../../routing/NavigationContext';
import type { ViewName } from '../../routing/views';

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  to: ViewName;
  intent?: NavigationIntent;
}

export function HashLink({ to, intent, children, ...rest }: HashLinkProps) {
  const { revisit, setIntent } = useNavigation();
  const href = `#${to}`;

  const handleClick = (event: MouseEvent) => {
    if (intent) setIntent(intent);
    // The browser fires no hashchange when the link points at the current page.
    const { hash } = window.location;
    if (href === hash || (to === 'home' && !hash)) {
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
