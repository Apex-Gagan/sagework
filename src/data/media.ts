/**
 * Every photograph and video on the site, by section. Until Jyoti supplies the approved files, each
 * slot shows a labelled placeholder. To fill a slot, add the file under src/assets, import it here
 * and set `src` (and `poster` for a video).
 */
export interface MediaSlot {
  kind: 'image' | 'video';
  /** What the slot is for, shown on the placeholder. */
  label: string;
  /** Width / height, used by the placeholder before a file exists. */
  ratio?: string;
  src?: string;
  poster?: string;
  alt?: string;
}

const image = (label: string, ratio?: string): MediaSlot => ({ kind: 'image', label, ratio });
const video = (label: string, ratio?: string): MediaSlot => ({ kind: 'video', label, ratio });

export const MEDIA = {
  // Home
  'home-hero': video('Home · hero, full width'),
  'home-founder': image('Home · Dr Shruti Pai portrait', '4 / 5'),
  'edit-reel-1': video('Sagework Edit · Sagework reel', '9 / 16'),
  'edit-reel-2': video('Sagework Edit · Dr Gutsy reel', '9 / 16'),
  'edit-reel-3': video('Sagework Edit · Sagework reel', '9 / 16'),
  'edit-reel-4': video('Sagework Edit · Dr Gutsy reel', '9 / 16'),
  'edit-reel-5': video('Sagework Edit · Sagework reel', '9 / 16'),
  'edit-reel-6': video('Sagework Edit · Dr Gutsy reel', '9 / 16'),

  // About
  'founder-hero': video('Founder · hero, full width'),
  'founder-portrait': image('Founder · portrait', '4 / 5'),
  'founder-gallery-1': image('Founder · gallery 1', '3 / 4'),
  'founder-gallery-2': image('Founder · gallery 2', '3 / 4'),
  'founder-gallery-3': image('Founder · gallery 3', '3 / 2'),
  'founder-gallery-4': image('Founder · gallery 4', '3 / 4'),
  'founder-gallery-5': image('Founder · gallery 5', '3 / 4'),
  'founder-gallery-6': image('Founder · gallery 6', '3 / 2'),

  // Our Approach
  'triad-biology': image('SAGE Triad · Biology', '4 / 3'),
  'triad-environment': image('SAGE Triad · Environment', '4 / 3'),
  'triad-behaviour': image('SAGE Triad · Behaviour', '4 / 3'),
  'sight-1': image('Five Senses · Sight 1'),
  'sight-2': image('Five Senses · Sight 2'),
  'sight-3': image('Five Senses · Sight 3'),
  'sound-1': image('Five Senses · Sound 1'),
  'sound-2': image('Five Senses · Sound 2'),
  'sound-3': image('Five Senses · Sound 3'),
  'smell-1': image('Five Senses · Smell 1'),
  'smell-2': image('Five Senses · Smell 2'),
  'smell-3': image('Five Senses · Smell 3'),
  'taste-1': image('Five Senses · Taste 1'),
  'taste-2': image('Five Senses · Taste 2'),
  'taste-3': image('Five Senses · Taste 3'),
  'touch-1': image('Five Senses · Touch 1'),
  'touch-2': image('Five Senses · Touch 2'),
  'touch-3': image('Five Senses · Touch 3'),

  // Dr Gutsy
  'gutsy-character': image('Dr Gutsy · character artwork', '1 / 1'),

  // News & Media
  'podcast-cover': image('Podcast · cover / thumbnail', '1 / 1'),
} satisfies Record<string, MediaSlot>;

export type MediaId = keyof typeof MEDIA;
