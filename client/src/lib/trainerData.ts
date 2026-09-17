export const courseCategories = [
  'UI/UX Design',
  'Digital Marketing',
  'Product Sales',
  'Customer Support',
  'Product Management',
  'Human Resources',
  'Business Finance',
  'IT Support',
  'Quality Assurance',
  'Research and Development',
  'Operations',
  'Legal',
];

export type TrainerCourseStatus = 'Draft' | 'In Review' | 'Published' | 'Rejected';

export type TrainerCourse = {
  id: string;
  title: string;
  summary: string;
  image: string;
  status: TrainerCourseStatus;
  priceNgn: number;
  category: string;
  applicants: number;
  activeLearners: number;
  avgCompletion: number;
};

const courseImage = (name: string) => `/assets/courses/${name}.png`;

export const trainerCourses: TrainerCourse[] = [
  {
    id: 'strengthening-team-cohesion',
    title: 'Strengthening Team Cohesion',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('agile-project-management'),
    status: 'Rejected',
    priceNgn: 6500000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'understanding-phyton',
    title: 'Understanding Phyton',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('ai-driven-marketing'),
    status: 'Draft',
    priceNgn: 7500000,
    category: 'IT Support',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'mastering-interpersonal-skills',
    title: 'Mastering Interpersonal Skills',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('ux-design-principles'),
    status: 'Draft',
    priceNgn: 6500000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'effective-workplace-communication',
    title: 'Effective Workplace Communication',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('digital-marketing-strategies'),
    status: 'Published',
    priceNgn: 7000000,
    category: 'Human Resources',
    applicants: 1223,
    activeLearners: 13,
    avgCompletion: 60,
  },
  {
    id: 'optimizing-group-dynamics',
    title: 'Optimizing Group Dynamics',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('business-analytics-fundamentals'),
    status: 'In Review',
    priceNgn: 6500000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'cultivating-open-communication',
    title: 'Cultivating Open Communication',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('content-writing-mastery'),
    status: 'Published',
    priceNgn: 7000000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'fostering-team-synergy',
    title: 'Fostering Team Synergy',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('cloud-computing-essentials'),
    status: 'Draft',
    priceNgn: 4500000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
  {
    id: 'building-stronger-teams',
    title: 'Building Stronger Teams',
    summary: 'Upon completion of this module, participants will implement practical communicative techniques,…',
    image: courseImage('data-visualization-with-tableau'),
    status: 'Published',
    priceNgn: 8000000,
    category: 'Human Resources',
    applicants: 0,
    activeLearners: 0,
    avgCompletion: 0,
  },
];

export type TrainerLearner = {
  id: string;
  name: string;
  email: string;
  city: string;
  course: string;
  progress: string;
  status: 'Ongoing' | 'Completed' | 'On Hold' | 'Dropped Out';
  avatar: string;
};

const cities = ['New York', 'Toronto', 'Paris', 'Tokyo', 'London', 'Berlin'];
const statuses: TrainerLearner['status'][] = ['Ongoing', 'Completed', 'On Hold', 'Dropped Out'];
const names = [
  'Nithya Menon',
  'Meera Gonzalez',
  'Monica Patel',
  'Dinesh Kumar',
  'Karthik Subramanian',
  'Jagathesh Narayanan',
];

export const trainerLearners: TrainerLearner[] = Array.from({ length: 24 }, (_, index) => {
  const name = names[index % names.length] ?? 'Learner';
  return {
    id: `learner-${index + 1}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    city: cities[index % cities.length] ?? 'New York',
    course: trainerCourses[index % trainerCourses.length]?.title ?? 'Course',
    progress: '4/5',
    status: statuses[index % statuses.length] ?? 'Ongoing',
    avatar: `/assets/scholarships/avatars/ellipse-${(index % 4) + 1}.png`,
  };
});

export type Lesson = { id: string; title: string };
export type CourseSection = { id: string; title: string; lessons: Lesson[] };

export const courseSections: CourseSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    lessons: [
      { id: 'l1', title: "Instructor's Message" },
      { id: 'l2', title: 'Using the Platform' },
      { id: 'l3', title: 'Team Dynamics' },
      { id: 'l4', title: 'Conflict Resolution' },
      { id: 'l5', title: 'Giving Feedback' },
    ],
  },
  {
    id: 'section-2',
    title: 'Section 2',
    lessons: [
      { id: 'l6', title: 'Starting the Course' },
      { id: 'l7', title: 'Navigating LearnHub' },
      { id: 'l8', title: 'Virtual Teams' },
      { id: 'l9', title: 'De-escalation Tactics' },
      { id: 'l10', title: 'Providing Useful Input' },
      { id: 'l11', title: 'Assessment 1' },
    ],
  },
];

export type CoursePost = {
  id: string;
  kind: 'Announcement' | 'Discussion';
  title: string;
  body: string;
  postedAt: string;
  replies: number;
  author?: string;
};

export const coursePosts: CoursePost[] = [
  { id: 'p1', kind: 'Announcement', title: 'Responses to Module 4, lesson 10', body: 'Several students have provided feedback on the changes made, expressing appreciation for the correction and noting that it enhances their understanding of the material.', postedAt: '3 days ago', replies: 3 },
  { id: 'p2', kind: 'Announcement', title: 'Upcoming Workshop on Design Thinking', body: 'Join us next Wednesday for a hands-on workshop where we will explore the principles of Design Thinking. This session is ideal for both beginners and experienced designers looking to enhance their skills.', postedAt: '1 week ago', replies: 5 },
  { id: 'p3', kind: 'Discussion', title: 'Question about Module 3 Quiz', body: 'I am stuck on question 4. Has anyone figured out the correct approach for the color contrast ratio calculation?', postedAt: '2 days ago', replies: 3, author: 'Bobby Alexander' },
  { id: 'p4', kind: 'Discussion', title: 'Clarification on Group Project Guidelines', body: 'Can someone confirm if we are allowed to use previous project materials for our current team?', postedAt: '2 days ago', replies: 2, author: 'Sarah Lane' },
  { id: 'p5', kind: 'Discussion', title: 'Clarification on Assignment', body: 'Can someone explain the requirements for the module 10 assignment? It is all confused about the opportunities.', postedAt: '3 days ago', replies: 2, author: 'Ada Eze' },
  { id: 'p6', kind: 'Discussion', title: 'Design Tools Preference', body: 'Most design tools companies prefer for wireframing and prototyping? I am looking at my current role and would appreciate your recommendations.', postedAt: '1 week ago', replies: 4, author: 'Dan Cole' },
];

export const trainerPayoutAccounts = [
  { id: 'acc-1', holder: 'John Doe', bank: 'GTB Bank', number: '2254434218', isDefault: true },
  { id: 'acc-2', holder: 'John Doe', bank: 'Access Bank', number: '2321112213', isDefault: false },
];

export const trainerPerformanceBuckets = [
  { range: '90-100', learners: 113, tone: 'excellent' as const },
  { range: '80-89', learners: 42, tone: 'excellent' as const },
  { range: '70-79', learners: 38, tone: 'excellent' as const },
  { range: '60-69', learners: 35, tone: 'excellent' as const },
  { range: '50-59', learners: 20, tone: 'good' as const },
  { range: '40-49', learners: 23, tone: 'good' as const },
  { range: '30-39', learners: 30, tone: 'needs-help' as const },
  { range: '20-29', learners: 27, tone: 'needs-help' as const },
  { range: '10-19', learners: 15, tone: 'needs-help' as const },
  { range: '0-9', learners: 8, tone: 'needs-help' as const },
];

export const topPerformingStudents = [
  { name: 'Sophia Carter', points: 1233 },
  { name: 'Emma Thompson', points: 1137 },
  { name: 'Liam Johnson', points: 940 },
  { name: 'Noah Williams', points: 900 },
  { name: 'Ethan Carter', points: 870 },
  { name: 'Mason Davis', points: 550 },
  { name: 'Oliver Brown', points: 320 },
  { name: 'Lucas Smith', points: 200 },
];
