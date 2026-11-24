export interface Setting {
  name: string;
  description: string;
}

export const SETTINGS: Setting[] = [
  {
    name: 'Healthcare and care settings',
    description:
      'Supporting patient experience, staff wellbeing, recovery environments and healthier care systems.',
  },
  {
    name: 'Schools and universities',
    description:
      'Designing healthier conditions for attention, learning, movement, nourishment and everyday wellbeing.',
  },
  {
    name: 'Workplaces and leadership teams',
    description:
      'Examining how environments, rhythms and organisational practices influence stress, energy, focus and performance.',
  },
  {
    name: 'Architecture and the built environment',
    description:
      'Bringing human biology and sensory experience into decisions about light, air, sound, movement, nature and space.',
  },
  {
    name: 'Food, hospitality and community systems',
    description:
      'Rethinking the conditions around how people eat, gather, connect and experience care.',
  },
  {
    name: 'Health founders and organisations',
    description:
      'Strengthening evidence, strategy and systems thinking around emerging products, services and models of health.',
  },
];
