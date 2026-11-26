import { useRef } from 'react';
import { ContentToCome, Pending } from '../../components/shared/Pending';
import { Media } from '../../components/shared/Media';
import type { MediaId } from '../../data/media';
import { scrollBehavior } from '../../lib/motion';

const REELS: MediaId[] = [
  'edit-reel-1',
  'edit-reel-2',
  'edit-reel-3',
  'edit-reel-4',
  'edit-reel-5',
  'edit-reel-6',
];

/**
 * The Sagework Edit: a curated reel of short videos from the Sagework and Dr Gutsy Instagram
 * accounts (and TikTok, when available). Reels play muted, on demand.
 */
export function SageworkEdit() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) =>
    stripRef.current?.scrollBy({
      left: direction * stripRef.current.clientWidth * 0.6,
      behavior: scrollBehavior,
    });

  return (
    <Pending>
      <div className="sec s edit">
        <div className="wrap fgal-head">
          <div>
            <p className="label">The Sagework Edit</p>
            <h2 className="d2">Short films from Sagework and Dr Gutsy.</h2>
          </div>
          <div className="row">
            <button className="fgal-btn" aria-label="Previous reels" onClick={() => scroll(-1)}>
              ←
            </button>
            <button className="fgal-btn" aria-label="Next reels" onClick={() => scroll(1)}>
              →
            </button>
          </div>
        </div>
        <div
          className="fgal-strip edit-strip"
          ref={stripRef}
          tabIndex={0}
          role="region"
          aria-label="Reels"
        >
          {REELS.map((id) => (
            <Media key={id} id={id} className="edit-reel" />
          ))}
        </div>
        <div className="wrap" style={{ marginTop: '24px' }}>
          <ContentToCome
            title="Reel selection, account links and covers"
            owner="Founder / Advisor and content creator"
          >
            Instagram handles for Sagework and Dr Gutsy, the reels to feature, and cover images.
          </ContentToCome>
        </div>
      </div>
    </Pending>
  );
}
