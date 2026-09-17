import type { ComponentType, SVGProps } from 'react';
import {
  ArrowLeftRightIcon,
  ArrowUpIcon,
  AwardIcon,
  BriefcaseIcon,
  CirclePlusIcon,
  SearchIcon,
  SproutIcon,
  TreeDeciduousIcon,
  TreePineIcon,
} from '../components/onboarding/icons';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type LearningGoal = {
  id: string;
  title: string;
  description: string;
  icon: Icon;
};

export const learningGoals: LearningGoal[] = [
  { id: 'new-skill', title: 'Learn a new skill', description: 'Start something completely new.', icon: CirclePlusIcon },
  {
    id: 'improve-skills',
    title: 'Improve my current skills',
    description: 'Build on what I already know.',
    icon: ArrowUpIcon,
  },
  { id: 'job-ready', title: 'Prepare for a job', description: 'Develop practical, job-ready skills.', icon: BriefcaseIcon },
  {
    id: 'switch-careers',
    title: 'Switch career paths',
    description: 'Prepare for a different career direction.',
    icon: ArrowLeftRightIcon,
  },
  {
    id: 'certification',
    title: 'Earn a certification',
    description: 'Work towards completing a certified course.',
    icon: AwardIcon,
  },
  {
    id: 'explore',
    title: 'Explore my interests',
    description: 'Discover what might be right for me.',
    icon: SearchIcon,
  },
];

export const interestPathways = [
  {
    id: 'data',
    name: 'Data',
    blurb: 'Data analyst, Data Science, Python development, Power BI',
    icon: '/assets/pathways/data.png',
  },
  {
    id: 'business',
    name: 'Business',
    blurb: 'Business analyst, Business technologist, Economics, Finance',
    icon: '/assets/pathways/business.png',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    blurb: 'Mathematics, Physics, Civil Engineering, Electrical Engineering',
    icon: '/assets/pathways/engineering.png',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    blurb: 'Front-end development, back-end development, mobile app development',
    icon: '/assets/pathways/web-development.png',
  },
  {
    id: 'design',
    name: 'Design',
    blurb: 'UX design, UI design, Product design, UX research',
    icon: '/assets/pathways/design.png',
  },
];

export type SkillLevelOption = {
  id: string;
  title: string;
  description: string;
  icon: Icon;
};

export const skillLevels: SkillLevelOption[] = [
  { id: 'beginner', title: 'I am a complete beginner', description: 'I have little or no experience.', icon: SproutIcon },
  {
    id: 'basics',
    title: 'I know only the basics',
    description: 'I understand some key concepts.',
    icon: SproutIcon,
  },
  {
    id: 'practical',
    title: 'I have practical experience',
    description: "I've used some of the skills or tools before.",
    icon: TreeDeciduousIcon,
  },
  {
    id: 'experienced',
    title: 'I am highly experienced',
    description: 'I already use these skills confidently.',
    icon: TreePineIcon,
  },
];

export type QuizQuestion = {
  id: string;
  prompt: string;
  format: 'Multiple Choice';
  options: string[];
  correctIndex: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'hooks',
    prompt: 'What is the purpose of React Hooks?',
    format: 'Multiple Choice',
    options: [
      'To use state and other React features in functional components',
      'To create class components',
      'To style React components',
      'To handle routing in React applications',
    ],
    correctIndex: 0,
  },
  {
    id: 'ucd',
    prompt: "Which of these best describes 'user-centered design'?",
    format: 'Multiple Choice',
    options: [
      'Designing primarily around business goals',
      'Designing based on continuous understanding of user needs and feedback',
      'Designing without testing until launch',
      'Designing to match competitor products',
    ],
    correctIndex: 1,
  },
  {
    id: 'process',
    prompt: 'In a typical design process, what usually comes right after user research?',
    format: 'Multiple Choice',
    options: [
      'Visual polish',
      'Defining problem statements and synthesizing insights',
      'Development handoff',
      'Marketing launch',
    ],
    correctIndex: 1,
  },
  {
    id: 'responsive',
    prompt: "What does 'responsive design' primarily ensure?",
    format: 'Multiple Choice',
    options: [
      'Fast server response times',
      'A layout that adapts well across different screen sizes',
      'Automatic color adjustments for accessibility',
      'Reduced file sizes for images',
    ],
    correctIndex: 1,
  },
  {
    id: 'prototyping',
    prompt: 'Which tool is most commonly used for creating interactive prototypes?',
    format: 'Multiple Choice',
    options: ['Spreadsheet software', 'Figma', 'Text editors', 'Email clients'],
    correctIndex: 1,
  },
  {
    id: 'usability',
    prompt: 'What is the main goal of usability testing?',
    format: 'Multiple Choice',
    options: [
      'To see how real users interact with a product and uncover friction points',
      'To calculate development costs',
      'To design a marketing campaign',
      'To write technical documentation',
    ],
    correctIndex: 0,
  },
  {
    id: 'ia',
    prompt: 'Which of the following is an example of information architecture?',
    format: 'Multiple Choice',
    options: [
      'Choosing a font pairing',
      'Structuring how content and navigation are organized',
      'Picking a color palette',
      'Writing button copy',
    ],
    correctIndex: 1,
  },
  {
    id: 'mvp',
    prompt: 'What best describes an MVP (Minimum Viable Product)?',
    format: 'Multiple Choice',
    options: [
      'The most expensive version of a product',
      'A version with just enough features to test with real users',
      'The final, fully polished release',
      'A product with no features at all',
    ],
    correctIndex: 1,
  },
];

export type LearningPathStep = {
  step: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
};

export const learningPath: LearningPathStep[] = [
  {
    step: 1,
    slug: 'ux-design-principles',
    title: 'UI/UX Design Fundamentals',
    description: 'Build your foundation in design principles, visual hierarchy, and basic layout tools.',
    duration: '6 weeks',
    level: 'Beginner',
    image: '/assets/assessment/path/step-1-ui-ux.png',
  },
  {
    step: 2,
    slug: 'user-experience-research',
    title: 'UX Research Essentials',
    description: 'Learn how to understand users and validate problems through interviews and personas.',
    duration: '4 weeks',
    level: 'Intermediate',
    image: '/assets/assessment/path/step-2-ux-research.png',
  },
  {
    step: 3,
    slug: 'introduction-to-graphic-design',
    title: 'Figma & Prototyping',
    description: 'Develop practical interface and prototyping skills using components and autolayout.',
    duration: '5 weeks',
    level: 'Intermediate',
    image: '/assets/assessment/path/step-3-figma.png',
  },
  {
    step: 4,
    slug: 'digital-art-and-illustration',
    title: 'Product Design Projects',
    description: 'Apply your skills to realistic product challenges and build a comprehensive design portfolio.',
    duration: '8 weeks',
    level: 'Advanced',
    image: '/assets/assessment/path/step-4-projects.png',
  },
];

export const scoreToProfile = (score: number, total: number) => {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio >= 1) return { level: 'Advanced', blurb: "You've got a strong grasp of these fundamentals already — you're ready for more advanced, hands-on work." };
  if (ratio >= 0.75) return { level: 'Intermediate', blurb: 'You have a solid handle on the fundamentals and are ready to build more advanced, practical skills.' };
  if (ratio >= 0.4) {
    return {
      level: 'Beginner+',
      blurb:
        'You already understand some of the fundamentals. Strengthening a few key areas will help you move confidently into more advanced topics.',
    };
  }
  return { level: 'Beginner', blurb: "You're just getting started — we'll build your path from the fundamentals up." };
};

export const learningProfileStrengths = ['Product design fundamentals', 'Understanding user needs', 'Visual design basics'];

export const learningProfileFocusAreas = ['User research', 'Information architecture', 'Prototyping & Usability testing'];
