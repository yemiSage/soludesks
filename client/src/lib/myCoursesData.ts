export type EnrolledCourse = { slug: string; progress: number; progressLabel: string; lastActivity: string; color: string };

export const enrolledCourses: EnrolledCourse[] = [
  { slug: 'ux-design-principles', progress: 40, progressLabel: '40% Done', lastActivity: 'Last viewed 2 hours ago', color: '#8da0fe' },
  { slug: 'introduction-to-graphic-design', progress: 40, progressLabel: '40% Progress', lastActivity: 'Last checked 2 hours ago', color: '#8da0fe' },
  { slug: 'digital-art-and-illustration', progress: 40, progressLabel: '40% Achieved', lastActivity: 'Last accessed 2 hours ago', color: '#8da0fe' },
  { slug: 'content-writing-mastery', progress: 40, progressLabel: '40% Complete', lastActivity: 'Last accessed 2 hours ago', color: '#8da0fe' },
  { slug: 'data-visualization-with-tableau', progress: 40, progressLabel: '40% Progress', lastActivity: 'Last accessed 2 hours ago', color: '#8da0fe' },
];
