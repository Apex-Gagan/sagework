import { SENSES } from '../../data/senses';
import { SectionBar } from '../shared/SectionBar';
import { senseSectionId } from './senseSections';

const ITEMS = SENSES.map(({ key, name }) => ({ id: senseSectionId(key), label: name }));

/** Sticky pill bar for the five senses. */
export function SenseBar() {
  return <SectionBar items={ITEMS} label="Senses" />;
}
