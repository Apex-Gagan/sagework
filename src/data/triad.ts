export interface TriadDomain {
  name: string;
  question: string;
  short: string;
  long: string;
}

export const TRIAD: TriadDomain[] = [
  {
    name: 'Biology',
    question: 'What is happening within us',
    short:
      'We use evidence from clinical nutrition, gut microbiome research and preventive health to understand the biological factors influencing health and performance.',
    long: "The body's internal systems shape how we feel and function. Sagework draws on clinical nutrition, gut microbiome science, metabolism, sleep, circadian rhythms, stress physiology and preventive health to understand how the body responds and functions.",
  },
  {
    name: 'Environment',
    question: 'What is happening around us',
    short:
      'We examine how light, air, sound, food, space, nature and movement shape the conditions in which people function, recover and perform.',
    long: 'The body is constantly responding to light, sound, air, food, space, nature, movement and sensory experience. These conditions can influence attention, stress, appetite, sleep, behaviour, recovery and the way people experience a place or system.',
  },
  {
    name: 'Behaviour',
    question: 'What people are enabled to do repeatedly',
    short:
      'We translate knowledge into behaviours, routines and operating practices that people and organisations can sustain.',
    long: 'Knowledge becomes meaningful when it can be lived. Habits do not develop in isolation. Relationships, culture, routines, incentives, purpose and the environment around us influence what becomes possible, practical and repeatable in everyday life.',
  },
];
