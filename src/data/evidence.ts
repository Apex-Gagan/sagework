import { REFERENCES } from './references';

export const EVIDENCE_TOPICS = [
  'Clinical nutrition and food systems',
  'Gut microbiome and gut–brain communication',
  'Maternal, infant and early-life biology',
  "Women's health across the life course",
  'Sensory biology and environmental conditions',
  'Circadian rhythms and sleep',
  'Stress, recovery and human regulation',
  'Behaviour and everyday practices',
] as const;

export type EvidenceTopic = (typeof EVIDENCE_TOPICS)[number];

export interface EvidenceSource {
  text: string;
  topics: EvidenceTopic[];
}

/**
 * Sources already cited on the site (the Five Senses references), filed by topic. Further sources
 * are to be catalogued by the content creator.
 */
export const EVIDENCE_SOURCES: EvidenceSource[] = [
  {
    text: REFERENCES[0],
    topics: ['Sensory biology and environmental conditions', 'Circadian rhythms and sleep'],
  },
  {
    text: REFERENCES[1],
    topics: [
      'Sensory biology and environmental conditions',
      'Stress, recovery and human regulation',
    ],
  },
  { text: REFERENCES[2], topics: ['Sensory biology and environmental conditions'] },
  {
    text: REFERENCES[3],
    topics: ['Clinical nutrition and food systems', 'Behaviour and everyday practices'],
  },
  { text: REFERENCES[4], topics: ['Sensory biology and environmental conditions'] },
  {
    text: REFERENCES[5],
    topics: [
      'Sensory biology and environmental conditions',
      'Stress, recovery and human regulation',
    ],
  },
];
