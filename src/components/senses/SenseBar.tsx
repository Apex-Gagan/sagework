import { useEffect, useState } from 'react';
import { SENSES, type SenseKey } from '../../data/senses';
import { scrollToElement } from '../../lib/scroll';
import { SENSE_SCROLL_OFFSET, senseSectionId } from './senseSections';

/** Sticky pill bar: jumps to a sense and highlights the one being read. */
export function SenseBar() {
  const [current, setCurrent] = useState<SenseKey | null>(null);

  useEffect(() => {
    const keyBySection = new Map<Element, SenseKey>();
    for (const { key } of SENSES) {
      const section = document.getElementById(senseSectionId(key));
      if (section) keyBySection.set(section, key);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(keyBySection.get(entry.target) ?? null);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    keyBySection.forEach((_, section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sense-bar glass" aria-label="Senses" id="senseBar">
      {SENSES.map(({ key, name }) => (
        <button
          key={key}
          className={current === key ? 'on' : undefined}
          onClick={() =>
            scrollToElement(document.getElementById(senseSectionId(key)), SENSE_SCROLL_OFFSET)
          }
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
