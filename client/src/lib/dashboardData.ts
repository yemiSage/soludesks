export const STREAK_DAYS = 12;

export const dashboardStats = [
  { id: 'enrolled', label: 'Enrolled courses', value: 123, tone: 'violet' as const },
  { id: 'ongoing', label: 'Ongoing Course', value: 22, tone: 'cyan' as const },
  { id: 'certificates', label: 'Total Certificate', value: 153, tone: 'purple' as const },
];

export type ContinueLearningCourse = {
  id: string;
  title: string;
  summary: string;
  image: string;
  progress: number;
  color: string;
};

export const continueLearning: ContinueLearningCourse[] = [
  {
    id: 'time-management',
    title: 'Time Management Techniques',
    summary: 'Strategies to prioritize tasks, minimize procrastination, and enhance productivity in the workplace.',
    image: '/assets/dashboard/course-1.png',
    progress: 80,
    color: '#00ca0d',
  },
  {
    id: 'employee-feedback',
    title: 'Employee Feedback Mechanisms',
    summary: 'Systems to gather input from staff, fostering a culture of open communication and continuous improvement.',
    image: '/assets/dashboard/course-2.png',
    progress: 65,
    color: '#dd9700',
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration Tools',
    summary: 'Utilizing technology to enhance communication and promote teamwork across departments.',
    image: '/assets/dashboard/course-3.png',
    progress: 30,
    color: '#ff4141',
  },
];

export const leaderboard = [
  { rank: 1, name: 'Sophia Carter', points: 2331 },
  { rank: 2, name: 'Emma Thompson', points: 1331 },
  { rank: 3, name: 'Liam Johnson', points: 900 },
  { rank: 4, name: 'Noah Williams', points: 600 },
  { rank: 5, name: 'Ethan Carter', points: 670, isYou: true },
  { rank: 6, name: 'Mason Davis', points: 550 },
  { rank: 7, name: 'Oliver Brown', points: 320 },
  { rank: 8, name: 'Lucas Smith', points: 200 },
];
