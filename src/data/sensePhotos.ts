import sightBinoculars from '../assets/senses/sight-binoculars.webp';
import sightBridge from '../assets/senses/sight-bridge.webp';
import sightSunlight from '../assets/senses/sight-sunlight.webp';
import smellBlossom from '../assets/senses/smell-blossom.webp';
import smellGreenhouse from '../assets/senses/smell-greenhouse.webp';
import smellHerbs from '../assets/senses/smell-herbs.webp';
import smellMimosa from '../assets/senses/smell-mimosa.webp';
import soundForest from '../assets/senses/sound-forest.webp';
import soundMeadow from '../assets/senses/sound-meadow.webp';
import tastePepper from '../assets/senses/taste-pepper.webp';
import tasteRaspberry from '../assets/senses/taste-raspberry.webp';
import tasteWater from '../assets/senses/taste-water.webp';
import touchDew from '../assets/senses/touch-dew.webp';
import touchDroplet from '../assets/senses/touch-droplet.webp';
import touchRain from '../assets/senses/touch-rain.webp';
import type { SenseKey } from './senses';

export interface SensePhoto {
  src: string;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
}

export const SENSE_PHOTOS: Record<SenseKey, SensePhoto[]> = {
  sight: [
    {
      src: sightSunlight,
      alt: 'Woman shading her eyes from bright sunlight by the sea',
      position: '42% 30%',
    },
    {
      src: sightBridge,
      alt: 'Hand holding up a lens that brings a distant bridge into focus',
      position: '58% 50%',
    },
    {
      src: sightBinoculars,
      alt: 'Man looking out to sea through a coin-operated viewer',
      position: '72% 45%',
    },
  ],
  sound: [
    {
      src: soundMeadow,
      alt: 'Woman in headphones relaxing among dandelions in a meadow',
      position: '35% 40%',
    },
    {
      src: soundForest,
      alt: 'Teenager in headphones sitting in a sunlit forest glade',
      position: '30% 45%',
    },
  ],
  smell: [
    {
      src: smellBlossom,
      alt: 'Woman with eyes closed smelling yellow blossom',
      position: '40% 45%',
    },
    { src: smellHerbs, alt: 'Man smelling a bunch of fresh green herbs', position: '50% 50%' },
    {
      src: smellGreenhouse,
      alt: 'Person with green hair smelling pink flowers in a greenhouse',
      position: '60% 45%',
    },
    { src: smellMimosa, alt: 'Young woman among yellow mimosa flowers', position: '55% 40%' },
  ],
  taste: [
    {
      src: tasteRaspberry,
      alt: 'Close-up of a raspberry with cream on a spoon being tasted',
      position: '45% 50%',
    },
    { src: tastePepper, alt: 'Young man biting into a red chilli pepper', position: '62% 45%' },
    {
      src: tasteWater,
      alt: 'Young woman in a pink sweater drinking a glass of water',
      position: '68% 45%',
    },
  ],
  touch: [
    {
      src: touchRain,
      alt: 'Woman with her face lifted and arms open in the rain',
      position: '55% 40%',
    },
    { src: touchDew, alt: 'Water droplets resting on a curved green stem', position: '45% 60%' },
    {
      src: touchDroplet,
      alt: 'Two water droplets colliding above a still blue surface',
      position: '50% 42%',
    },
  ],
};
