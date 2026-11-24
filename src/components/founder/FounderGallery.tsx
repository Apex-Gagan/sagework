import { useRef } from 'react';
import armchair from '../../assets/founder/armchair.webp';
import books from '../../assets/founder/books.webp';
import flowers from '../../assets/founder/flowers.webp';
import rain from '../../assets/founder/rain.webp';
import reading from '../../assets/founder/reading.webp';
import studio from '../../assets/founder/studio.webp';
import tree from '../../assets/founder/tree.webp';
import vegetables from '../../assets/founder/vegetables.webp';
import { scrollBehavior } from '../../lib/motion';

const PHOTOS = [
  { src: armchair, width: 1050, height: 1400, alt: 'Dr Shruti Pai seated in an armchair' },
  { src: vegetables, width: 1050, height: 1400, alt: 'Dr Shruti Pai in a vegetable garden' },
  { src: tree, width: 1400, height: 934, alt: 'Dr Shruti Pai embracing a large tree' },
  { src: books, width: 1050, height: 1400, alt: 'Dr Shruti Pai reading beside a stack of books' },
  { src: studio, width: 960, height: 1280, alt: 'Dr Shruti Pai viewing artwork in a studio' },
  { src: flowers, width: 1050, height: 1400, alt: 'Dr Shruti Pai among purple flowers' },
  {
    src: rain,
    width: 1400,
    height: 934,
    alt: 'Dr Shruti Pai walking in the rain with an umbrella',
  },
  { src: reading, width: 1050, height: 1400, alt: 'Dr Shruti Pai reading on an outdoor sofa' },
];

export function FounderGallery() {
  const stripRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const strip = stripRef.current!;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.6, behavior: scrollBehavior });
  };

  return (
    <div className="sec paper fgal">
      <div className="wrap fgal-head">
        <div>
          <p className="label">Gallery</p>
          <h2 className="d2">In pictures.</h2>
        </div>
        <div className="row">
          <button className="fgal-btn" aria-label="Previous photos" onClick={() => scroll(-1)}>
            ←
          </button>
          <button className="fgal-btn" aria-label="Next photos" onClick={() => scroll(1)}>
            →
          </button>
        </div>
      </div>
      <div
        className="fgal-strip"
        ref={stripRef}
        tabIndex={0}
        role="region"
        aria-label="Photos of Dr Shruti Pai"
      >
        {PHOTOS.map(({ src, width, height, alt }) => (
          <img
            key={src}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: `${width} / ${height}` }}
          />
        ))}
      </div>
    </div>
  );
}
