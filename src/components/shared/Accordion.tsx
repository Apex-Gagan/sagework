import { useState, type ReactNode } from 'react';

interface AccordionItemProps {
  id: string;
  number: string;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function AccordionItem({
  id,
  number,
  title,
  defaultOpen = false,
  children,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={open ? 'acc-item open' : 'acc-item'}>
      <button
        className="acc-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="an">{number}</span>
        <span className="at">{title}</span>
        <span className="pm" aria-hidden="true"></span>
      </button>
      <div className="acc-panel" id={id}>
        <div>
          <div className="acc-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
