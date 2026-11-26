export interface Sector {
  name: string;
  description: string;
}

/** Sectors We Serve: names from the 26 Nov 2026 deck, descriptions from the existing site. */
export const SECTORS: Sector[] = [
  {
    name: 'Healthcare & care settings',
    description:
      'Supporting patient experience, staff wellbeing, recovery environments and healthier care systems.',
  },
  {
    name: 'Schools & universities',
    description:
      'Designing healthier conditions for attention, learning, movement, nourishment and everyday wellbeing.',
  },
  {
    name: 'Workplaces & leadership teams',
    description:
      'Examining how environments, rhythms and organisational practices influence stress, energy, focus and performance.',
  },
  {
    name: 'Architecture & built environment',
    description:
      'Bringing human biology and sensory experience into decisions about light, air, sound, movement, nature and space.',
  },
  {
    name: 'Food, hospitality & community',
    description:
      'Rethinking the conditions around how people eat, gather, connect and experience care.',
  },
  {
    name: 'Health founders & research partners',
    description:
      'Strengthening evidence, strategy and systems thinking around emerging products, services and models of health.',
  },
];

export interface EngagementModel {
  name: string;
  description: string;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: 'Focused project',
    description: 'Addresses a defined question, assessment or design brief.',
  },
  { name: 'Ongoing advisory', description: 'Supports decisions over time as they evolve.' },
  {
    name: 'Workshop / leadership session',
    description: 'Builds shared understanding around a specific need.',
  },
  {
    name: 'Strategic partnership',
    description: 'Shaped around an agreed purpose and contribution.',
  },
];
