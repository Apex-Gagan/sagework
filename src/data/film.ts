export interface FilmChapter {
  name: string;
  /** Seconds. */
  duration: number;
  /** [start time in seconds, line] */
  captions: [number, string][];
}

export const FILM_CHAPTERS: FilmChapter[] = [
  {
    name: 'You are a superorganism',
    duration: 11.41,
    captions: [
      [0.4, "Your body isn't yours alone."],
      [
        2.64,
        "It's home to around thirty-eight trillion bacteria, living in and on you, most of them in your gut.",
      ],
      [8.26, 'In many ways, you are more than human.'],
    ],
  },
  {
    name: 'Meet your microbiome',
    duration: 16.68,
    captions: [
      [0.4, 'Together, these microbes form your microbiome.'],
      [4.07, 'Rods, spheres, chains and spirals.'],
      [
        7.44,
        'Each community is as individual as you are, shaped by what you eat, where you live, the medicines you take, and how your life began.',
      ],
    ],
  },
  {
    name: 'What they do',
    duration: 12.1,
    captions: [
      [0.4, 'They do real work.'],
      [1.99, "They help break down food your body can't digest alone."],
      [5.51, 'They help train your immune system.'],
      [7.93, 'And they make some vitamins, such as vitamin K.'],
    ],
  },
  {
    name: 'Feed the community',
    duration: 10.36,
    captions: [
      [0.4, 'Many of them feed on fibre.'],
      [2.83, 'As they ferment it, they release short-chain fatty acids,'],
      [6.53, 'which help nourish the cells that line your colon.'],
    ],
  },
  {
    name: 'Talking to the brain',
    duration: 15.82,
    captions: [
      [0.4, "And the conversation doesn't stop in the gut."],
      [
        3.04,
        'Through the vagus nerve, hormones and immune signals, your gut and brain talk to each other, in both directions.',
      ],
      [9.46, 'Scientists are still learning what this means for mood and behaviour.'],
      [13.54, 'Stay curious.'],
    ],
  },
];
