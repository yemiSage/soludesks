import type { Role } from './auth';

export type Notification = {
  id: string;
  message: string;
  timestamp: string;
  category: 'system' | 'courses';
  /** Optional call-to-action shown under the message. */
  action?: string;
  /** Highlighted as the newest/most important item. */
  highlight?: boolean;
};

/**
 * Each persona sees different traffic: learners get study updates, while trainers and
 * sponsors get business-side messages (approvals, applications, payouts) from Soludesk.
 */
const byRole: Record<Role, Notification[]> = {
  learner: [
    { id: 'l-1', category: 'courses', timestamp: 'Just now.', message: 'Enrollment confirmed: You now have access to "Effective Workplace Communication".', action: 'Start learning', highlight: true },
    { id: 'l-2', category: 'courses', timestamp: '2 hours ago.', message: 'New lesson unlocked: "Conflict Resolution" is ready in your Communication course.' },
    { id: 'l-3', category: 'courses', timestamp: 'Yesterday.', message: 'Certificate ready: Your "Data Science for Beginners" certificate can be downloaded.' },
    { id: 'l-4', category: 'courses', timestamp: '2 days ago.', message: 'Scholarship update: Your application to the Global Leaders Scholarship is under review.' },
    { id: 'l-5', category: 'system', timestamp: '10 minutes ago.', message: 'Streak reminder: Complete one lesson today to keep your 21-day streak alive.' },
    { id: 'l-6', category: 'system', timestamp: '1 hour ago.', message: 'Wallet: ₦5,000 was added to your Soludesk wallet.' },
    { id: 'l-7', category: 'system', timestamp: 'Yesterday.', message: 'Security: A new sign-in to your account was detected from Lagos, Nigeria.' },
  ],
  trainer: [
    { id: 't-1', category: 'courses', timestamp: 'Just now.', message: 'Course Review: Your course "Effective Workplace Communication" has been sent back for review.', action: 'Review Changes', highlight: true },
    { id: 't-2', category: 'courses', timestamp: '3 hours ago.', message: 'Course Approved: "Cultivating Open Communication" is now live on Soludesk.' },
    { id: 't-3', category: 'courses', timestamp: 'Yesterday.', message: 'New enrollment: 4 learners joined "Building Stronger Teams" today.' },
    { id: 't-4', category: 'courses', timestamp: '2 days ago.', message: 'Course completed: Nithya Menon finished "Effective Workplace Communication" with 92%.' },
    { id: 't-5', category: 'system', timestamp: '25 minutes ago.', message: 'Payout processed: ₦140,000 has been sent to your GTB Bank account.' },
    { id: 't-6', category: 'system', timestamp: '1 hour ago.', message: 'Verification: Your trainer identity check was approved by the Soludesk team.' },
    { id: 't-7', category: 'system', timestamp: 'Yesterday.', message: 'Maintenance: Soludesk will undergo scheduled server maintenance on March 5th.' },
  ],
  sponsor: [
    { id: 's-1', category: 'courses', timestamp: 'Just now.', message: 'Program Approved: "2024 Leadership Scholarship Program" is now open for applications.', action: 'View program', highlight: true },
    { id: 's-2', category: 'courses', timestamp: '2 hours ago.', message: 'New applications: 12 learners applied to "Reach out to the girl child initiative".' },
    { id: 's-3', category: 'courses', timestamp: 'Yesterday.', message: 'Course request: The Soludesk team has scheduled a call about your "Advanced Excel" request.' },
    { id: 's-4', category: 'courses', timestamp: '3 days ago.', message: 'Milestone: 50 sponsored learners have completed their courses this month.' },
    { id: 's-5', category: 'system', timestamp: '30 minutes ago.', message: 'Budget alert: "BADMS Foundation July Edition" has used 80% of its funding.' },
    { id: 's-6', category: 'system', timestamp: '1 hour ago.', message: 'Verification: Your organisation details were approved by the Soludesk team.' },
    { id: 's-7', category: 'system', timestamp: 'Yesterday.', message: 'Withdrawal completed: ₦25,000 has been sent to your default payout account.' },
  ],
};

export const notificationsFor = (role: Role) => byRole[role];

/** Learner views (dropdown + page) split the feed by category. */
export const systemNotifications = byRole.learner.filter((note) => note.category === 'system');
export const courseNotifications = byRole.learner.filter((note) => note.category === 'courses');
export const allNotifications = byRole.learner;
