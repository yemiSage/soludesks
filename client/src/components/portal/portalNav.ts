import { Book, Home2, People, Wallet } from 'iconsax-react';
import type { UpgradeRole } from '../../lib/auth';

export type PortalNavItem = { label: string; to: string; icon: typeof Home2 };

/** Sidebar + hamburger entries for each portal persona. Settings always sits on its own at the base. */
export const portalNav: Record<UpgradeRole, { home: string; items: PortalNavItem[]; settings: string }> = {
  trainer: {
    home: '/trainer/dashboard',
    settings: '/trainer/settings',
    items: [
      { label: 'Dashboard', to: '/trainer/dashboard', icon: Home2 },
      { label: 'Courses', to: '/trainer/courses', icon: Book },
      { label: 'Learners', to: '/trainer/learners', icon: People },
      { label: 'Wallet', to: '/trainer/wallet', icon: Wallet },
    ],
  },
  sponsor: {
    home: '/sponsor/dashboard',
    settings: '/sponsor/settings',
    items: [
      { label: 'Dashboard', to: '/sponsor/dashboard', icon: Home2 },
      { label: 'Scholarships', to: '/sponsor/scholarships', icon: Book },
      { label: 'Learners', to: '/sponsor/learners', icon: People },
      { label: 'Wallet', to: '/sponsor/wallet', icon: Wallet },
    ],
  },
};
