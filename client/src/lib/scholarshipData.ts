export type Scholarship = {
  id: string;
  title: string;
  provider: string;
  summary: string;
  image: string;
  filledSlots: number;
  totalSlots: number;
  courseCount: number;
  deadline: string;
  fullyFunded: boolean;
  eligibility: string[];
  courseSlugs: string[];
};

export const scholarships: Scholarship[] = [
  {
    id: 'global-leaders-scholarship',
    title: 'Global Leaders Scholarship Initiative',
    provider: 'Bloomfield Foundation',
    summary:
      'A comprehensive program designed to cultivate the next generation of global leaders through education and cross-cultural exchange.',
    image: '/assets/scholarships/card-1.png',
    filledSlots: 24,
    totalSlots: 30,
    courseCount: 10,
    deadline: '12 March 2026',
    fullyFunded: true,
    eligibility: [
      'Open to learners anywhere in the world, no prior professional experience required',
      'A computer with internet access to complete coursework and assessments',
      'A genuine interest in completing the full course and putting new skills into practice',
    ],
    courseSlugs: ['ux-design-principles', 'user-experience-research', 'digital-marketing-strategies'],
  },
  {
    id: 'women-in-tech-fellowship',
    title: 'Women in Tech Fellowship',
    provider: 'Horizon Trust',
    summary:
      'Fully-funded seats for women pursuing careers in software, data, and product — with mentorship from industry practitioners.',
    image: '/assets/scholarships/card-2.png',
    filledSlots: 41,
    totalSlots: 60,
    courseCount: 6,
    deadline: '5 April 2026',
    fullyFunded: true,
    eligibility: [
      'Applicants must identify as women and be at least 18 years old',
      'A computer with internet access to use the course tools',
      'Willingness to commit at least 4 hours a week to coursework',
    ],
    courseSlugs: ['advanced-web-development', 'data-science-for-beginners', 'cloud-computing-essentials'],
  },
  {
    id: 'first-gen-tech-grant',
    title: 'First-Generation Tech Grant',
    provider: 'Carter Family Fund',
    summary:
      'Covers tuition for first-generation college students entering tech, business, and design career pathways.',
    image: '/assets/courses/data-visualization-with-tableau.png',
    filledSlots: 12,
    totalSlots: 25,
    courseCount: 8,
    deadline: '30 April 2026',
    fullyFunded: true,
    eligibility: [
      'Must be the first in your immediate family to pursue tertiary education',
      'A computer with internet access to use design and data tools',
      'Enthusiasm to learn and complete guided, hands-on projects',
    ],
    courseSlugs: ['business-analytics-fundamentals', 'financial-modeling-and-analysis', 'agile-project-management'],
  },
  {
    id: 'creative-futures-award',
    title: 'Creative Futures Award',
    provider: 'Meridian Group',
    summary:
      'Supports emerging designers and content creators with fully-funded access to Soludesk’s creative course library.',
    image: '/assets/courses/introduction-to-graphic-design.png',
    filledSlots: 33,
    totalSlots: 40,
    courseCount: 5,
    deadline: '18 May 2026',
    fullyFunded: false,
    eligibility: [
      'Open to aspiring designers, illustrators, and content creators',
      'A computer with internet access to use design tools like Figma',
      'A short portfolio or writing sample submitted with your application',
    ],
    courseSlugs: ['introduction-to-graphic-design', 'digital-art-and-illustration', 'content-writing-mastery'],
  },
];

export const getScholarship = (id: string | undefined) => scholarships.find((item) => item.id === id);

export const sponsors = ['Bloomfield Foundation', 'Horizon Trust', 'Carter Family Fund', 'Meridian Group', 'Lacoste Africa', 'FedEx Forward'];
