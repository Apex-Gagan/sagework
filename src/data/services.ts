export interface Service {
  name: string;
  /** Short description: home page overview. */
  summary: string;
  /** Longer description: What We Do. */
  detail: string;
  outputs: string;
}

/**
 * The five services agreed in the 26 Nov 2026 deck. Copy is the existing wording, merged where two
 * former services became one (Strategic Advisory + Board Strategy). For the content creator to
 * tighten.
 */
export const SERVICES: Service[] = [
  {
    name: 'Consulting & Systems Design',
    summary:
      'Evidence-led consulting for healthcare, workplaces, schools, hospitality, buildings and other settings responsible for the health and experience of the people they serve.',
    detail:
      'For a defined project that needs practical solutions. We help shape programmes, environments, food systems and operating practices, translating evidence into a clear design brief and plan for action.',
    outputs:
      'A project brief, design recommendations, a programme or environment strategy, or an implementation roadmap.',
  },
  {
    name: 'Strategic & Board Advisory',
    summary:
      'Direct, ongoing counsel for leaders and boards making complex decisions across health, wellbeing, human performance, responsible growth and long-term organisational resilience.',
    detail:
      'For leaders who need ongoing advice as decisions evolve, and for boards deciding on organisational direction, oversight and long-term resilience. We act as an independent sounding board, bringing a human-health and evidence perspective to strategy, innovation and responsible growth.',
    outputs:
      'Regular advisory discussions, decision briefs, evidence reviews, a phased strategic plan, a board briefing or a facilitated board strategy discussion.',
  },
  {
    name: 'Assessment, Evaluation & Audit',
    summary:
      'Independent assessment of environments, services and practices through the connected lenses of biology, environment and behaviour, identifying gaps, risks and priorities for action.',
    detail:
      'For organisations that need to understand what is working and where gaps remain. We assess an existing environment, service or programme through biology, environment and behaviour, identifying priorities for improvement.',
    outputs:
      'A current-state assessment, gap analysis, prioritised action plan or evaluation framework.',
  },
  {
    name: 'Education & Knowledge Translation',
    summary:
      'Evidence reviews, white papers, leadership briefings and learning programmes that turn complex science into informed decisions and practical action.',
    detail:
      'For teams that need to understand and use the science. We translate relevant research into learning and evidence resources for leadership teams, staff and professional audiences.',
    outputs:
      'Workshops, talks, leadership briefings, evidence reviews, white papers or learning programmes.',
  },
  {
    name: 'Strategic Partnerships & Innovation',
    summary:
      'Selective strategic collaboration with founders, researchers and organisations developing evidence-led approaches to health, wellbeing and human performance.',
    detail:
      'For founders, researchers and organisations exploring a shared opportunity. We assess strategic fit and potential contributions to evidence-led health ideas, including advisory, research and other collaborative relationships.',
    outputs:
      'An exploration of strategic fit, an evidence review or a proposed advisory or research collaboration. Any investment is considered separately and selectively.',
  },
];
