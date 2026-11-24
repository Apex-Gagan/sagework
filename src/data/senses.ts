export type SenseKey = 'sight' | 'sound' | 'smell' | 'taste' | 'touch';

export interface Sense {
  key: SenseKey;
  name: string;
  background: string;
  summary: string;
}

export const SENSES: Sense[] = [
  {
    key: 'sight',
    name: 'Sight',
    background: '#EEF0F4',
    summary: 'Light affects circadian timing, alertness and cognitive function.',
  },
  {
    key: 'sound',
    name: 'Sound',
    background: '#ECEAF2',
    summary: 'Sound affects attention, stress and recovery.',
  },
  {
    key: 'smell',
    name: 'Smell',
    background: '#EEF3E0',
    summary: 'Closely connected to brain systems involved in memory and emotion.',
  },
  {
    key: 'taste',
    name: 'Taste',
    background: '#F1ECE0',
    summary: 'Both experience and biological signalling.',
  },
  {
    key: 'touch',
    name: 'Touch',
    background: '#F2EEEA',
    summary: 'Information about safety, connection and the physical environment.',
  },
];
