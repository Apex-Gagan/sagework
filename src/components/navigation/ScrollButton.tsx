import type { ReactNode } from 'react';
import { scrollToElement } from '../../lib/scroll';

interface ScrollButtonProps {
  /** Id of the element to scroll to. */
  target: string;
  className?: string;
  children: ReactNode;
}

export function ScrollButton({ target, className, children }: ScrollButtonProps) {
  return (
    <button className={className} onClick={() => scrollToElement(document.getElementById(target))}>
      {children}
    </button>
  );
}
