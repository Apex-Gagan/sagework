export type PublicationKind = 'peer' | 'pre';

export interface Publication {
  /** Preprints carry no year. */
  year: number | null;
  kind: PublicationKind;
  title: string;
  journal: string;
  summary: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    year: 2025,
    kind: 'peer',
    title:
      'Temporal burden of WHO Critical-priority Enterobacteriaceae in the infant gut during early life influenced by maternal postpartum antibiotic exposure',
    journal: 'Indian Journal of Medical Microbiology',
    summary:
      'Research examining the burden of critical-priority Enterobacteriaceae in the infant gut in relation to maternal postpartum antibiotic exposure.',
  },
  {
    year: 2025,
    kind: 'peer',
    title: 'Exclusive Breastfeeding and Body Composition in Indian Infants: A Prospective Study',
    journal: 'Indian Pediatrics',
    summary:
      'A prospective study examining exclusive breastfeeding and body composition in Indian infants.',
  },
  {
    year: 2024,
    kind: 'peer',
    title:
      'Comparison of growth patterns in the first year of life between term small for gestational age and appropriate for gestational age South Indian infants',
    journal: 'BMJ Paediatrics Open',
    summary:
      'Research comparing growth patterns during the first year of life in term infants born small or appropriate for gestational age.',
  },
  {
    year: 2023,
    kind: 'peer',
    title:
      'Comparison of Anthropometry and Body Composition Using Air Displacement Plethysmography in Term Small for Gestational Age and Appropriate for Gestational Age Neonates',
    journal: 'Indian Pediatrics',
    summary:
      'A study comparing anthropometry and body composition in term newborns using air displacement plethysmography.',
  },
  {
    year: 2022,
    kind: 'peer',
    title:
      'Intraindividual double burden of malnutrition: The contribution of the infant gut microbiome',
    journal: 'Asia Pacific Journal of Clinical Nutrition',
    summary:
      "A review examining the infant gut microbiome's potential contribution to the coexistence of different forms of malnutrition within an individual.",
  },
  {
    year: null,
    kind: 'pre',
    title:
      'The Gut Microbiome as a Metabolic Signalling Organ in Obesity: From Energy Harvest to Immune Regulation',
    journal: 'Preprints.org',
    summary:
      'A manuscript exploring the gut microbiome as a metabolic signalling organ in obesity.',
  },
  {
    year: null,
    kind: 'pre',
    title: 'Modulating the Gut Microbiome in Obesity',
    journal: 'Preprints.org',
    summary:
      'A narrative review examining microbiome-targeted interventions for obesity prevention and treatment.',
  },
  {
    year: null,
    kind: 'pre',
    title: 'The Gut Microbiome and Ocular Health',
    journal: 'Preprints.org',
    summary:
      'A manuscript exploring the relationship between the gut microbiome and ocular health through the gut–eye axis.',
  },
];
