import type { ReactNode } from 'react';
import { SHOW_PENDING_CONTENT } from '../../config/launch';

/** Content still waiting for approval: hidden everywhere once SHOW_PENDING_CONTENT is off. */
export function Pending({ children }: { children: ReactNode }) {
  return SHOW_PENDING_CONTENT ? children : null;
}

interface ContentToComeProps {
  /** What belongs here. */
  title: string;
  /** Who supplies it, per the deck. */
  owner: string;
  children?: ReactNode;
}

/** A clearly marked gap for copy that has not been written or approved yet. */
export function ContentToCome({ title, owner, children }: ContentToComeProps) {
  return (
    <div className="ctc">
      <span className="ctc-tag">Content to come · {owner}</span>
      <p className="ctc-title">{title}</p>
      {children && <div className="ctc-note">{children}</div>}
    </div>
  );
}
