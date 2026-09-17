export type CourseModule = { name: string; lessons: string[] };

/** Shared lesson outline used by the pre-enrol LessonsPanel preview and the post-enrol course player. */
export const courseModules: CourseModule[] = [
  { name: 'Introduction', lessons: ['Welcome Message', 'A Note on Style', "What You'll Learn", 'Meet Your Instructor'] },
  { name: 'Setting Up Your Workspace', lessons: ['Installing the Tools', 'Workspace Walkthrough'] },
  { name: 'Core Concepts', lessons: ['Foundations', 'Working Through Examples', 'Common Pitfalls'] },
  { name: 'Practical Application', lessons: ['Guided Project', 'Building on Your Own'] },
  { name: 'Assessments & Wrap-up', lessons: ['Knowledge Check', 'Final Project', 'Certificate of Completion'] },
];
