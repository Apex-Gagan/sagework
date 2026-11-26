import { useEffect, useState } from 'react';
import { scrollBehavior } from '../../lib/motion';

export interface SectionBarItem {
  /** DOM id of the section. */
  id: string;
  label: string;
}

interface SectionBarProps {
  items: SectionBarItem[];
  label: string;
  className?: string;
}

/** Sticky pill bar of a page's sections: jumps to one and highlights the one being read. */
export function SectionBar({ items, label, className }: SectionBarProps) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const { id } of items) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={className ? `sense-bar glass ${className}` : 'sense-bar glass'}
      aria-label={label}
    >
      {items.map(({ id, label: text }) => (
        <button
          key={id}
          className={current === id ? 'on' : undefined}
          onClick={() =>
            document
              .getElementById(id)
              ?.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
          }
        >
          {text}
        </button>
      ))}
    </nav>
  );
}
