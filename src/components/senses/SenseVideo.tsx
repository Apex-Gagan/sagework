import type { SenseKey } from '../../data/senses';
import { SENSE_VIDEOS } from '../../data/senseVideos';
import { LoopVideo } from '../shared/LoopVideo';

export function SenseVideo({ sense }: { sense: SenseKey }) {
  const { src, poster } = SENSE_VIDEOS[sense];
  return <LoopVideo className="svid" src={src} poster={poster} sound />;
}
