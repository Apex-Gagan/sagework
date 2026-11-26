import { MEDIA, type MediaId, type MediaSlot } from '../../data/media';
import { LoopVideo } from './LoopVideo';
import { Placeholder } from './Placeholder';

interface MediaProps {
  id: MediaId;
  className?: string;
  /** Keep the slot's aspect ratio (off when the layout sets the size). */
  sized?: boolean;
  priority?: boolean;
}

/** A photo or video from the media register, or its placeholder until the file is supplied. */
export function Media({ id, className, sized = true, priority = false }: MediaProps) {
  const slot: MediaSlot = MEDIA[id];
  const style = sized && slot.ratio ? { aspectRatio: slot.ratio } : undefined;

  if (!slot.src) {
    return <Placeholder kind={slot.kind} label={slot.label} className={className} style={style} />;
  }
  if (slot.kind === 'video') {
    return (
      <LoopVideo
        className={className}
        src={slot.src}
        poster={slot.poster ?? ''}
        priority={priority}
      />
    );
  }
  return (
    <img
      className={className}
      src={slot.src}
      alt={slot.alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ ...style, objectFit: 'cover' }}
    />
  );
}
