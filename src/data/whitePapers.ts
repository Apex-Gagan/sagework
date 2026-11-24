export interface WhitePaper {
  number: string;
  title: string;
  question?: string;
  summary: string;
}

export const HUMAN_ADAPTATION_SERIES: WhitePaper[] = [
  {
    number: '01',
    title: 'The Human Adaptation Gap',
    question: 'What has changed between human biology and contemporary life?',
    summary:
      'An introduction to the mismatch between modern conditions and human biological needs, establishing the wider Sagework systems perspective.',
  },
  {
    number: '02',
    title: 'The Biology of the Five Senses',
    question: 'What is the environment repeatedly communicating to the human system?',
    summary:
      'An examination of sensory inputs and the relationships between environmental conditions, biological responses and lived experience.',
  },
  {
    number: '03',
    title: 'The Gut–Brain Axis',
    question: 'How do external inputs and behaviour become internal biological signals?',
    summary:
      'An exploration of communication between the gut and brain, distinguishing biological mechanisms from claims about practical benefits.',
  },
  {
    number: '04',
    title: 'Circadian Biology',
    question: 'When are inputs occurring, and are biological and social time aligned?',
    summary:
      'An examination of biological timing and its relationship with environmental inputs, daily routines and contemporary schedules.',
  },
  {
    number: '05',
    title: 'Sleep by Design',
    question: 'Does the system permit sufficient and restorative recovery?',
    summary:
      'A focus on the environments, routines and demands surrounding sleep, and the questions they raise when designing for recovery.',
  },
  {
    number: '06',
    title: 'Stress, Safety & Human Regulation',
    question: 'Does repeated demand consume adaptive capacity or support resilient function?',
    summary:
      'A synthesis of repeated demand, recovery opportunities, adaptive capacity and resilience within the wider human system.',
  },
];

export const WISE_SERIES: WhitePaper[] = [
  {
    number: '01',
    title: 'The Perimenopause Gap',
    summary:
      'Understanding the transition and the gaps between women’s experiences, available information and appropriate support.',
  },
  {
    number: '02',
    title: 'Puberty, Periods & PCOS',
    summary:
      'Examining the questions facing girls and young women, with attention to development, menstrual health and the distinctions between different conditions and experiences.',
  },
  {
    number: '03',
    title: 'Fertility, Choice & the Reproductive Years',
    summary:
      'Exploring reproductive agency, fertility and infertility within the realities of individual lives and healthcare systems.',
  },
  {
    number: '04',
    title: 'Mother to Child',
    summary:
      'Considering maternal biology and the first human environment, connecting maternal health with the conditions surrounding early development.',
  },
  {
    number: '05',
    title: 'The First 1,000 Days',
    summary:
      'Examining early human development and the biological, nutritional and environmental conditions surrounding the beginning of life.',
  },
  {
    number: '06',
    title: 'Menopause & The Years Beyond',
    summary:
      'Examining what women can meaningfully act on: what works, what may work and what remains unsupported or overstated.',
  },
  {
    number: '07',
    title: 'Designing the Future of Women’s Health',
    summary:
      'Considering what science, healthcare systems, technology and capital should address next, and how evidence can inform those priorities.',
  },
];
