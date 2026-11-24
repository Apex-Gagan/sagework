export type SageOsVariant = 'discover' | 'senses' | 'work';

export interface SageOsStage {
  name: string;
  tagline: string;
  /** Stage copy, worded for the page it appears on. */
  detail: Record<SageOsVariant, string>;
}

export const SAGE_OS: SageOsStage[] = [
  {
    name: 'Scan',
    tagline: 'Observe the system',
    detail: {
      discover:
        'Examine the people, purpose, setting, experience and conditions shaping everyday life.',
      senses: 'Scan the people, tasks, sensory conditions and existing operating practices.',
      work: 'Understand the people, setting, purpose and current conditions.',
    },
  },
  {
    name: 'Analyse',
    tagline: 'Understand what is influencing the system',
    detail: {
      discover:
        'Identify patterns, relationships and gaps across biology, environment and behaviour, and understand what may be driving the problem.',
      senses:
        'Analyse where the conditions conflict with human needs and what the evidence supports.',
      work: 'Examine the evidence and identify the relationships and gaps that matter.',
    },
  },
  {
    name: 'Generate',
    tagline: 'Design integrated possibilities',
    detail: {
      discover:
        'Develop practical ideas and strategies, grounded in evidence, that respond to the system as a whole.',
      senses:
        'Generate feasible changes with the teams responsible for the environment and its operation.',
      work: 'Develop feasible options and agree priorities with the people responsible for delivery.',
    },
  },
  {
    name: 'Execute',
    tagline: 'Translate insight into practice',
    detail: {
      discover: 'Implement, test and refine decisions in real-world settings.',
      senses:
        'Execute a focused pilot, evaluate the results and refine the approach before wider implementation.',
      work: 'Support implementation within the agreed scope, review progress and refine the approach.',
    },
  },
];
