import type { SenseKey } from '../../data/senses';

export const senseSectionId = (key: SenseKey) => `s-${key}`;

/** Clears the sticky header plus the sense bar. */
export const SENSE_SCROLL_OFFSET = 130;
