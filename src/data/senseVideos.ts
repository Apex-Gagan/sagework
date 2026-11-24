import sightVideo from '../assets/video/sense-sight.mp4';
import sightPoster from '../assets/video/sense-sight.webp';
import smellVideo from '../assets/video/sense-smell.mp4';
import smellPoster from '../assets/video/sense-smell.webp';
import soundVideo from '../assets/video/sense-sound.mp4';
import soundPoster from '../assets/video/sense-sound.webp';
import tasteVideo from '../assets/video/sense-taste.mp4';
import tastePoster from '../assets/video/sense-taste.webp';
import touchVideo from '../assets/video/sense-touch.mp4';
import touchPoster from '../assets/video/sense-touch.webp';
import type { SenseKey } from './senses';

/**
 * Two real clips per sense, looped. The footage has no sound of its own: separate recordings are
 * mixed in to match. Footage and sounds: Mixkit, marked Free License on 24 November 2026.
 */
export const SENSE_VIDEOS: Record<SenseKey, { src: string; poster: string }> = {
  /** Sunrise over the sea (waves), sunlight through leaves (wind). */
  sight: { src: sightVideo, poster: sightPoster },
  /** A singing bird (birdsong), a violinist's hand (violin). */
  sound: { src: soundVideo, poster: soundPoster },
  /** Steaming coffee (stirring), lavender (a bee). */
  smell: { src: smellVideo, poster: smellPoster },
  /** Honey, a squeezed orange (pouring). */
  taste: { src: tasteVideo, poster: tastePoster },
  /** Kneading dough, rain on pine needles (light rain). */
  touch: { src: touchVideo, poster: touchPoster },
};
