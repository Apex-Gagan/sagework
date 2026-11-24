import { SENSE_PHOTOS } from '../../data/sensePhotos';
import type { SenseKey } from '../../data/senses';

/** Photo strip below a sense's text and interactive stage. */
export function SensePhotos({ sense }: { sense: SenseKey }) {
  return (
    <div className="sphotos">
      {SENSE_PHOTOS[sense].map(({ src, alt, position }) => (
        <figure key={src}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: position }}
          />
        </figure>
      ))}
    </div>
  );
}
