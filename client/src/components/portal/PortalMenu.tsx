import { Link, useNavigate } from 'react-router-dom';
import { Logout, User } from 'iconsax-react';
import { Drawer } from '../ui/Drawer';
import { dashboardPathForRole, useAuth, type Role, type UpgradeRole } from '../../lib/auth';
import { portalNav } from './portalNav';

type Props = { role: UpgradeRole; open: boolean; onClose: () => void };

/** Hamburger for a portal persona: its own pages, help links, then role switching. */
export const PortalMenu = ({ role, open, onClose }: Props) => {
  const { unlockedRoles, switchRole, becomeRole, logout } = useAuth();
  const navigate = useNavigate();
  const nav = portalNav[role];
  const otherRole: UpgradeRole = role === 'trainer' ? 'sponsor' : 'trainer';

  const goToRole = (next: Role) => {
    onClose();
    switchRole(next);
    navigate(dashboardPathForRole[next]);
  };

  return (
    <Drawer open={open} onClose={onClose} titleId="portal-menu-title" title="Menu" maxWidthClassName="sm:max-w-[360px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 border-b border-line-soft pb-5">
          <p className="px-2.5 py-1 text-sm font-semibold text-muted">Menus</p>
          <div className="flex flex-col gap-2">
            {nav.items.map(({ label, to, icon: ItemIcon }) => (
              <Link key={label} to={to} onClick={onClose} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
                <ItemIcon size={20} variant="Linear" color="currentColor" />
                {label === 'Dashboard' ? 'My Dashboard' : label}
              </Link>
            ))}
            <Link to={`/${role}/profile`} onClick={onClose} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
              <User size={20} variant="Linear" color="currentColor" />
              Profile
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b border-line-soft pb-5">
          <p className="px-2.5 py-1 text-sm font-semibold text-muted">Help Center</p>
          <a href="/dashboard#faq" onClick={onClose} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
            FAQ&apos;s
          </a>
          <Link to="/contact" onClick={onClose} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
            Contact US
          </Link>
          <Link to="/legal" onClick={onClose} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
            Legal
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {/* Completing any upgrade also unlocks the learner dashboard, so this is always a switch. */}
          <button type="button" onClick={() => goToRole('learner')} className="text-left text-base font-medium text-primary-text">
            Switch to my learner profile
          </button>
          {unlockedRoles.includes(otherRole) ? (
            <button type="button" onClick={() => goToRole(otherRole)} className="text-left text-base font-medium text-primary-text">
              Switch to my {otherRole} profile
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                becomeRole(otherRole);
              }}
              className="text-left text-base font-medium text-primary-text"
            >
              Become a {otherRole}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2.5 text-left text-base font-medium text-[#ff5025]"
          >
            <Logout size={24} variant="Linear" color="currentColor" />
            Log Out
          </button>
        </div>
      </div>
    </Drawer>
  );
};
