import { scrollBehavior } from './motion';

/** Scrolls so the element sits `offset` px below the top, clear of the sticky header. */
export function scrollToElement(element: HTMLElement | null, offset = 90) {
  if (!element) return;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - offset,
    behavior: scrollBehavior,
  });
}
