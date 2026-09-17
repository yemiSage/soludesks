export type ScholarshipStatus = 'Active' | 'Upcoming' | 'Closed';

export type SponsorProgram = {
  id: string;
  title: string;
  summary: string;
  status: ScholarshipStatus;
  startDate: string;
  courses: number;
  participants: number;
  spent: number;
  budget: number;
};

export const sponsorPrograms: SponsorProgram[] = [
  { id: 'girl-child-initiative', title: "Reach out to the girl child initiative 25'", summary: 'Innovating for a sustainable future', status: 'Active', startDate: '10 June, 2024', courses: 30, participants: 50, spent: 20000, budget: 40000 },
  { id: 'leadership-2024', title: '2024 Leadership Scholarship Program', summary: 'Enhancing leadership skills and team dynamics', status: 'Active', startDate: '15 March, 2024', courses: 10, participants: 20, spent: 8000, budget: 15000 },
  { id: 'badms-july', title: 'BADMS Foundation July Edition', summary: 'Building connections through service projects', status: 'Upcoming', startDate: '5 June, 2024', courses: 20, participants: 40, spent: 5000, budget: 10000 },
  { id: 'badms-august', title: 'BADMS Foundation August Edition', summary: 'Building connections through service projects', status: 'Upcoming', startDate: '5 August, 2024', courses: 20, participants: 40, spent: 5000, budget: 10000 },
];

export const scholarshipTypes = ['Open to all', 'Invite only', 'Merit based', 'Need based'];
export const validityPeriods = ['3 months', '6 months', '1 year', '2 years'];

/** Catalogue a sponsor picks from when funding a program. */
export const sponsorableCourses = [
  { id: 'building-stronger-teams', title: 'Building Stronger Teams', summary: 'Upon completion of this module, participants will: Implement practical communication techniques, adjust communication for diverse teams, leverage…', price: 300, tag: 'Soft Skill' },
  { id: 'enhancing-project-management', title: 'Enhancing Project Management Skills', summary: 'Upon completion of this module, participants will: Master project planning strategies, utilize Agile methodologies, identify and mitigate risks, optimize res…', price: 250, tag: 'Soft Skill' },
  { id: 'creative-problem-solving', title: 'Creative Problem Solving', summary: 'Upon completion of this module, participants will: Employ critical thinking techniques, brainstorm innovative solutions, analyze problems from multiple a…', price: 200, tag: 'Soft Skill' },
  { id: 'data-driven-decision-making', title: 'Data-Driven Decision Making', summary: 'Upon completion of this module, participants will: Analyze data analytics tools, recognize actionable insights, integrate data into business strategies, and eval…', price: 320, tag: 'Soft Skill' },
  { id: 'strategic-marketing', title: 'Strategic Marketing Fundamentals', summary: 'Upon completion of this module, participants will: Understand market analysis techniques, create targeted marketing campaigns, measure campaign effectiv…', price: 275, tag: 'Soft Skill' },
  { id: 'effective-leadership', title: 'Effective Leadership Practices', summary: 'Upon completion of this module, participants will: Develop leadership presence, coach team members, and lead through organisational change.', price: 350, tag: 'Soft Skill' },
];
