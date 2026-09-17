export type ModuleFeature = { title: string; description: string };

export type BusinessModule = {
  id: string;
  eyebrow: string;
  name: string;
  summary: string;
  image: string;
  imageSide: 'left' | 'right';
  tone: 'neutral' | 'warm';
  features: ModuleFeature[];
};

export type Highlight = {
  id: string;
  title: string;
  description?: string;
  image: string;
  span: 'third' | 'wide' | 'narrow';
};

export type Plan = {
  id: string;
  name: string;
  popular: boolean;
  blurb: string;
  monthlyUsd: number;
  yearlyUsd: number;
};

export type PricingModule = {
  id: string;
  name: string;
  icon: string;
  plans: Plan[];
  features: Array<{ id: string; label: string; included: Record<string, boolean> }>;
};

export const customers = [
  'Dynata',
  'Bodybuilding',
  'eBay',
  'Michelin',
  'Samsung',
  'Spotify',
  'Dynata',
  'Bodybuilding',
];

export const modules: BusinessModule[] = [
  {
    id: 'learnhub',
    eyebrow: 'Enterprise Training & Certification',
    name: 'LearnHub',
    summary:
      'A complete LMS solution for employee onboarding, continuous skill development, and compliance certification.',
    image: '/assets/business/module-learnhub.png',
    imageSide: 'left',
    tone: 'neutral',
    features: [
      {
        title: 'Team training and Assessment',
        description:
          'Evaluate workforce readiness with customizable assessments. Identify skill gaps and measure training effectiveness with detailed reports.',
      },
      {
        title: 'Custom Learning Paths',
        description:
          'Design tailored curriculums for different roles. Drag and drop courses to create the perfect progression',
      },
      {
        title: 'Learning in the Flow of Work (Live Class Integration)',
        description:
          'Live class integration ensures learning happens where your team works. Seamlessly schedule and launch synchronous sessions within the platform.',
      },
      {
        title: 'Automated Certification',
        description:
          'Issue and renew certificates automatically. Set expiration dates and auto-enroll employees in refresher courses',
      },
    ],
  },
  {
    id: 'call-center',
    eyebrow: 'Omnichannel Customer Support',
    name: 'Call Center',
    summary: 'Unified dashboard for managing customer interactions across voice, chat, and email.',
    image: '/assets/business/module-call-center.jpg',
    imageSide: 'right',
    tone: 'warm',
    features: [
      {
        title: 'Intelligent Routing and Assigning',
        description:
          'Route calls to the best available agent based on skill set, language, and availability to ensure first-contact resolution.',
      },
      {
        title: 'Live Monitoring',
        description:
          'Supervisors can listen, whisper, and barge in on live calls to provide real-time coaching and quality assurance.',
      },
      {
        title: 'CRM Integration',
        description:
          'Seamlessly connects with Salesforce and HubSpot. View customer history and tickets instantly when a call comes in.',
      },
    ],
  },
  {
    id: 'time-attendance',
    eyebrow: 'Workforce Management Simplified',
    name: 'Time & Attendance',
    summary: 'Accurate tracking of employee hours, shifts, and leaves with geofencing capabilities.',
    image: '/assets/business/module-time-attendance.jpg',
    imageSide: 'left',
    tone: 'neutral',
    features: [
      {
        title: 'Geofencing Clock-in',
        description:
          'Ensure employees are on-site when clocking in. Define GPS boundaries for job sites and office locations.',
      },
      {
        title: 'Shift Scheduling',
        description:
          'Drag-and-drop shift planner with conflict detection. Automatically handle swap requests and availability.',
      },
      {
        title: 'Payroll Export',
        description:
          'One-click export to major payroll providers. Eliminate manual data entry errors and speed up processing time.',
      },
    ],
  },
];

export const highlights: Highlight[] = [
  {
    id: 'onboarding',
    title: 'Streamline your onboarding process with Soludesk.',
    description:
      "Explore our platform's features that enhance communication and collaboration, keeping your team connected and engaged.",
    image: '/assets/business/bento-onboarding.png',
    span: 'third',
  },
  {
    id: 'team-skills',
    title: 'Enhance team skills and foster a productive workplace environment.',
    description:
      'Discover powerful tools for project management and team coordination that help keep your projects on track.',
    image: '/assets/business/bento-team.jpg',
    span: 'third',
  },
  {
    id: 'tickets',
    title: 'Efficiently manage customer tickets and improve service quality.',
    description:
      'Check out our innovative solutions designed to boost productivity and streamline workflows for greater efficiency.',
    image: '/assets/business/bento-tickets.png',
    span: 'third',
  },
  {
    id: 'platform',
    title: 'A comprehensive platform designed to meet all your organizational needs.',
    description:
      'Simplify task management, track progress, and keep your team aligned, all from one platform with built-in training and attendance tools.',
    image: '/assets/business/bento-platform.png',
    span: 'wide',
  },
  {
    id: 'dashboard',
    title: 'One dashboard for every module.',
    image: '/assets/business/bento-dashboard.png',
    span: 'narrow',
  },
];

const featureLabels = [
  'Module Access',
  'Core Features',
  'Advanced Analytics',
  'API Integrations',
  'White Labeling',
];

const planSet = (prices: Array<[string, number, number, string, boolean]>): Plan[] =>
  prices.map(([name, yearlyUsd, monthlyUsd, blurb, popular]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    popular,
    blurb,
    monthlyUsd,
    yearlyUsd,
  }));

const featureMatrix = (planIds: string[]) =>
  featureLabels.map((label) => ({
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    included: Object.fromEntries(planIds.map((id) => [id, true])),
  }));

const buildModule = (
  id: string,
  name: string,
  icon: string,
  prices: Array<[string, number, number, string, boolean]>,
): PricingModule => {
  const plans = planSet(prices);
  return { id, name, icon, plans, features: featureMatrix(plans.map((plan) => plan.id)) };
};

export const pricing: PricingModule[] = [
  buildModule('learnhub', 'LearnHub', '/assets/business/icon-teacher.svg', [
    ['Standard', 325, 34, 'Pay-for 10 license for small team', true],
    ['Enterprise', 910, 95, 'Unlimited license for Agency', false],
    ['Enterprise Plus', 1450, 151, 'Unlimited license plus dedicated success team', false],
  ]),
  buildModule('call-center', 'Call Center', '/assets/business/icon-call-calling.svg', [
    ['Standard', 420, 44, 'Pay-for 10 agent seats for small team', true],
    ['Enterprise', 1150, 120, 'Unlimited agent seats for Agency', false],
    ['Enterprise Plus', 1780, 185, 'Unlimited seats plus live quality assurance', false],
  ]),
  buildModule('time-attendance', 'Time & Attendance', '/assets/business/icon-calendar-tick.svg', [
    ['Standard', 260, 27, 'Pay-for 10 license for small team', true],
    ['Enterprise', 780, 81, 'Unlimited license for Agency', false],
    ['Enterprise Plus', 1220, 127, 'Unlimited license plus payroll concierge', false],
  ]),
];

export const businessFaqs = [
  {
    id: 'modules',
    question: 'Can we start with a single module?',
    answer:
      'Yes. Every module — LearnHub, Call Center, and Time & Attendance — can be licensed on its own, and the others switch on later without migrating your data.',
  },
  {
    id: 'onboarding',
    question: 'How long does onboarding take?',
    answer:
      'Most teams are live within two weeks. Your success manager handles workspace setup, SSO, and the first round of role-based learning paths.',
  },
  {
    id: 'integrations',
    question: 'Does Soludesk integrate with our existing tools?',
    answer:
      'Soludesk connects to Salesforce, HubSpot, and the major payroll providers out of the box, and everything else through the REST API.',
  },
  {
    id: 'security',
    question: 'Where is our company data stored?',
    answer:
      'Data is encrypted in transit and at rest, with regional hosting options and role-based access control for every workspace.',
  },
];
