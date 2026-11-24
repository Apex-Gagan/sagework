export interface Question {
  topic: string;
  question: string;
  answer: string;
}

export const QUESTIONS: Question[] = [
  {
    topic: 'Hormonal health',
    question: 'What do hormones actually do across a month, and across a lifetime?',
    answer:
      'Explore how hormones relate to energy, mood, sleep, appetite and metabolism, and why individual experiences can differ so much.',
  },
  {
    topic: 'Periods, puberty & PCOS',
    question: 'What is typical, and when is a pattern worth asking about?',
    answer:
      'Explore menstrual health and development, with attention to the distinctions between different conditions and experiences.',
  },
  {
    topic: 'Fertility & the reproductive years',
    question: 'What shapes fertility, and what remains uncertain?',
    answer:
      'Explore reproductive health, choice and infertility within the realities of individual lives and healthcare systems.',
  },
  {
    topic: 'Perimenopause',
    question: 'Why can the transition begin years before periods stop?',
    answer:
      'Explore the changes of perimenopause, the gap between what women experience and the information available, and when to seek support.',
  },
  {
    topic: 'Menopause & beyond',
    question: 'What can women meaningfully act on?',
    answer:
      'Explore what the evidence supports, what may help and what remains unsupported or overstated.',
  },
  {
    topic: 'The gut–hormone connection',
    question: 'How do nutrition, the gut microbiome and hormones interact?',
    answer:
      'Explore emerging research, with established findings clearly separated from hypotheses.',
  },
];
