import type { MediaId } from '../../data/media';
import type { SenseKey } from '../../data/senses';
import { Media } from '../shared/Media';

const PHOTOS = [1, 2, 3] as const;

/** Photo strip below a sense's text and interactive panel. */
export function SensePhotos({ sense }: { sense: SenseKey }) {
  return (
    <div className="sphotos">
      {PHOTOS.map((n) => (
        <figure key={n}>
          <Media id={`${sense}-${n}` as MediaId} sized={false} />
        </figure>
      ))}
    </div>
  );
}
