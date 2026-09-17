export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  rating: number;
  reviews: number;
  priceNgn: number;
  categoryId: string;
  pathwayId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  hours: number;
  instructor: string;
  featured: boolean;
};

export type Category = { id: string; name: string };
export type Pathway = { id: string; name: string; blurb: string; icon: string };
export type Faq = { id: string; question: string; answer: string };
export type Stat = { id: string; value: string; label: string };
export type Review = { id: string; courseSlug: string; name: string; rating: number; date: string; comment: string };

export const categories: Category[] = [
  { id: 'data-analytics', name: 'Data Analytics' },
  { id: 'product-development', name: 'Product Development' },
  { id: 'applied-mathematics', name: 'Applied Mathematics' },
  { id: 'science-matter-energy', name: 'The Science of Matter and Energy' },
  { id: 'calculus', name: 'Calculus' },
  { id: 'statistics', name: 'Statistics' },
  { id: 'algebra', name: 'Algebra' },
];

export const pathways: Pathway[] = [
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

export const stats: Stat[] = [
  { id: 'courses', value: '500+', label: 'Courses' },
  { id: 'learners', value: '50k+', label: 'Learners' },
  { id: 'online', value: '100%', label: 'Online' },
];

export const faqs: Faq[] = [
  {
    id: 'free',
    question: 'Is Soludesk LearnHub really free?',
    answer:
      'Yes! The Personal plan gives individual learners access to a wide range of basic courses, progress tracking, and community features at no cost.',
  },
  {
    id: 'certificate',
    question: 'Do I get a certificate upon completion?',
    answer:
      'Every course ends with a verified certificate you can share on LinkedIn or attach to an application. Certificates carry a unique ID employers can validate.',
  },
  {
    id: 'mobile',
    question: 'Can I access courses on my mobile phone?',
    answer:
      'LearnHub works on any modern browser, and lessons are optimised for small screens so you can keep learning on the move.',
  },
  {
    id: 'self-paced',
    question: 'Are the courses self-paced?',
    answer:
      'Most courses are fully self-paced. Cohort-based programmes are clearly labelled with their start dates before you enrol.',
  },
];

const course = (
  slug: string,
  title: string,
  summary: string,
  rating: number,
  priceNgn: number,
  categoryId: string,
  pathwayId: string,
  extra: Partial<Course> = {},
): Course => ({
  id: slug,
  slug,
  title,
  summary,
  image: `/assets/courses/${slug}.png`,
  rating,
  reviews: Math.round(rating * 430 + slug.length * 37),
  priceNgn,
  categoryId,
  pathwayId,
  level: 'Beginner',
  lessons: 24,
  hours: 12,
  instructor: 'Soludesk Faculty',
  featured: false,
  ...extra,
});

export const courses: Course[] = [
  course(
    'digital-marketing-strategies',
    'Digital Marketing Strategies',
    'Learn effective techniques for online branding, social media engagement, and analytics to boost your business presence.',
    4.7,
    7_500_000,
    'data-analytics',
    'business',
    { level: 'Intermediate', lessons: 32, hours: 18, instructor: 'Amara Obi' },
  ),
  course(
    'data-science-for-beginners',
    'Data Science for Beginners',
    'Explore the fundamentals of data analysis, visualization, and machine learning in this introductory course.',
    4.9,
    9_800_000,
    'data-analytics',
    'data',
    { lessons: 40, hours: 26, instructor: 'Tunde Bakare' },
  ),
  course(
    'advanced-web-development',
    'Advanced Web Development',
    'Master the latest frameworks and technologies in web development to create seamless user experiences.',
    4.6,
    11_200_000,
    'product-development',
    'web-development',
    { level: 'Advanced', lessons: 48, hours: 34, instructor: 'Chidi Nwosu' },
  ),
  course(
    'introduction-to-graphic-design',
    'Introduction to Graphic Design',
    'Discover design principles, typography, and color theory to enhance your creative skills.',
    4.5,
    5_600_000,
    'product-development',
    'design',
    { lessons: 22, hours: 14, instructor: 'Ada Eze' },
  ),
  course(
    'agile-project-management',
    'Agile Project Management',
    'Gain insights into agile methodologies to effectively manage and deliver projects in dynamic environments.',
    4.8,
    10_000_000,
    'product-development',
    'business',
    { level: 'Intermediate', lessons: 30, hours: 20, instructor: 'Ngozi Ade' },
  ),
  course(
    'user-experience-research',
    'User Experience Research',
    'Learn how to conduct user research and apply findings to create compelling and intuitive user experiences.',
    4.7,
    8_300_000,
    'statistics',
    'design',
    { level: 'Intermediate', lessons: 26, hours: 16, instructor: 'Ifeoma Dike' },
  ),
  course(
    'content-writing-mastery',
    'Content Writing Mastery',
    'Enhance your writing skills with techniques for creating engaging content across various platforms.',
    4.4,
    4_500_000,
    'algebra',
    'business',
    { lessons: 18, hours: 10, instructor: 'Bola Martins' },
  ),
  course(
    'introduction-to-mobile-app-development',
    'Introduction to Mobile App Development',
    'Get started with building mobile applications using the latest tools and frameworks for iOS and Android.',
    4.6,
    12_000_000,
    'product-development',
    'web-development',
    { lessons: 44, hours: 30, instructor: 'Seyi Ogun' },
  ),
  course(
    'business-analytics-fundamentals',
    'Business Analytics Fundamentals',
    'Learn analytical skills to interpret data and make informed business decisions in this hands-on course.',
    4.7,
    9_000_000,
    'data-analytics',
    'business',
    { level: 'Intermediate', lessons: 28, hours: 19, instructor: 'Kelechi Umeh' },
  ),
  course(
    'cybersecurity-essentials',
    'Cybersecurity Essentials',
    'Understand the basic principles of cybersecurity and how to protect systems from vulnerabilities and threats.',
    4.8,
    6_700_000,
    'science-matter-energy',
    'engineering',
    {
      image: '/assets/courses/agile-project-management.png',
      level: 'Intermediate',
      lessons: 25,
      hours: 15,
      instructor: 'Chidi Nwosu',
    },
  ),
  course(
    'effective-communication-skills',
    'Effective Communication Skills',
    'Enhance your interpersonal skills to communicate clearly and effectively in various professional settings.',
    4.5,
    3_750_000,
    'algebra',
    'business',
    { image: '/assets/courses/agile-project-management.png', lessons: 16, hours: 8, instructor: 'Bola Martins' },
  ),
  course(
    'social-media-management',
    'Social Media Management',
    'Master the art of managing and growing social media accounts with strategic content and engagement.',
    4.6,
    7_200_000,
    'data-analytics',
    'business',
    { image: '/assets/courses/agile-project-management.png', lessons: 20, hours: 12, instructor: 'Amara Obi' },
  ),
  course(
    'ux-design-principles',
    'UX Design Principles',
    'Explore the core principles of UX design, including usability, accessibility, and user research methods.',
    4.7,
    9_500_000,
    'product-development',
    'design',
    { featured: true, lessons: 27, hours: 17, instructor: 'Ifeoma Dike' },
  ),
  course(
    'ai-driven-marketing',
    'AI-Driven Marketing',
    'Discover how artificial intelligence is transforming marketing strategies and enhancing customer engagement.',
    4.9,
    15_200_000,
    'data-analytics',
    'business',
    { featured: true, level: 'Advanced', lessons: 36, hours: 24, instructor: 'Amara Obi' },
  ),
  course(
    'financial-modeling-and-analysis',
    'Financial Modeling and Analysis',
    'Learn to build financial models and perform in-depth analysis for strategic decision-making in finance.',
    4.5,
    11_800_000,
    'statistics',
    'business',
    { featured: true, level: 'Intermediate', lessons: 33, hours: 22, instructor: 'Kelechi Umeh' },
  ),
  course(
    'cloud-computing-essentials',
    'Cloud Computing Essentials',
    'Understand the fundamentals of cloud computing and its applications in modern IT infrastructure and services.',
    4.8,
    8_700_000,
    'science-matter-energy',
    'engineering',
    { featured: true, lessons: 29, hours: 18, instructor: 'Chidi Nwosu' },
  ),
  course(
    'mobile-app-development-with-flutter',
    'Mobile App Development with Flutter',
    "Create cross-platform mobile apps using Flutter, Google's UI toolkit, and learn to build engaging user interfaces.",
    4.6,
    14_500_000,
    'product-development',
    'web-development',
    { featured: true, level: 'Intermediate', lessons: 41, hours: 28, instructor: 'Seyi Ogun' },
  ),
  course(
    'digital-art-and-illustration',
    'Digital Art and Illustration',
    'Explore digital art techniques and tools to create stunning illustrations and visual designs for various media.',
    4.4,
    6_300_000,
    'calculus',
    'design',
    { featured: true, lessons: 21, hours: 13, instructor: 'Ada Eze' },
  ),
  course(
    'blockchain-technology-and-applications',
    'Blockchain Technology and Applications',
    'Dive into blockchain technology and its applications in finance, supply chain, and other industries.',
    4.7,
    12_900_000,
    'applied-mathematics',
    'engineering',
    { featured: true, level: 'Advanced', lessons: 35, hours: 25, instructor: 'Tunde Bakare' },
  ),
  course(
    'data-visualization-with-tableau',
    'Data Visualization with Tableau',
    'Master data visualization techniques using Tableau to create interactive dashboards and insightful reports.',
    4.9,
    10_500_000,
    'data-analytics',
    'data',
    { featured: true, level: 'Intermediate', lessons: 31, hours: 21, instructor: 'Tunde Bakare' },
  ),
];

const reviewerNames = [
  'Adaeze Nwankwo',
  'Michael Chen',
  'Priya Sharma',
  'Tomiwa Alabi',
  'Grace Okafor',
  'Daniel Osei',
  'Fatima Bello',
  'James Okonkwo',
  'Linda Chukwu',
  'Samuel Mensah',
  'Aisha Yusuf',
  'Victor Eze',
];

const reviewComments = [
  'This course exceeded my expectations. The instructor explains every concept clearly and the pacing felt just right.',
  'Solid course overall. A few sections felt a bit rushed, but the practical exercises made up for it.',
  'Exactly what I needed to get started. I went from knowing nothing to feeling confident in a few weeks.',
  'Great structure and clear examples throughout. Would definitely recommend to a colleague.',
  'The content is up to date and genuinely useful for real work, not just theory.',
  'I appreciated the hands-on projects - they helped the concepts stick a lot better than just watching videos.',
  'Good course but I wish there were more quizzes to test understanding along the way.',
  'The instructor is engaging and clearly knows the subject inside out. Learned a ton.',
  'Well worth the price. The certificate alone was a nice bonus after finishing.',
  'A few videos had audio issues, but the material itself is excellent.',
  'This gave me the confidence to apply what I learned immediately at work.',
  'Clear, concise, and well organized. Exactly what a beginner course should be.',
];

/** Simple deterministic hash so each course gets a stable, varied-looking set of reviews. */
const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
};

const reviewsForCourse = (courseSlug: string, courseRating: number, count: number): Review[] => {
  const seed = hashString(courseSlug);
  const now = new Date('2026-09-15');

  return Array.from({ length: count }, (_, index) => {
    const pick = (pool: number, offset: number) => (seed + index * 7 + offset) % pool;
    const ratingWobble = [0, 0, 0, -1, 1][pick(5, 3)] ?? 0;
    const rating = Math.min(5, Math.max(3, Math.round(courseRating) + ratingWobble));
    const daysAgo = ((seed + index * 53) % 220) + 3;
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    return {
      id: `${courseSlug}-review-${index + 1}`,
      courseSlug,
      name: reviewerNames[pick(reviewerNames.length, 1)]!,
      rating,
      date: date.toISOString().slice(0, 10),
      comment: reviewComments[pick(reviewComments.length, 5)]!,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const reviews: Review[] = courses.flatMap((c) => reviewsForCourse(c.slug, c.rating, 6));
