import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HambergerMenu, Notification, Refresh, SearchNormal, Setting2, ShoppingCart } from 'iconsax-react';
import { CartModal } from '../cart/CartModal';
import { Footer } from '../layout/Footer';
import { NotificationsPopover } from './NotificationsPopover';
import { PortalMenu } from './PortalMenu';
import { portalNav } from './portalNav';
import { useCollections } from '../../hooks/useCollections';
import { useAuth, type UpgradeRole } from '../../lib/auth';
import { avatarColorFor, cx, initialsFrom } from '../../lib/format';
import { notificationsFor } from '../../lib/notificationsData';

/** Topbar + sidebar chrome shared by the trainer and sponsor portals. */
export const PortalLayout = ({ role, children }: { role: UpgradeRole; children: ReactNode }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { collections } = useCollections();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const nav = portalNav[role];
  const name = user ? `${user.firstName} ${user.lastName}` : role;

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const navLinkClass = (to: string) =>
    cx(
      'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
      isActive(to) ? 'bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text' : 'text-muted hover:bg-line-soft hover:text-ink',
    );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="sticky top-0 z-20 border-b border-line-soft bg-white">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-8">
          <Link to={nav.home} className="relative h-8 w-[112px] shrink-0 overflow-hidden sm:h-9 sm:w-[140px]">
            <img
              src="/assets/brand/logo-dark.png"
              alt="Soludesk"
              className="absolute max-w-none"
              style={{ height: '257.44%', width: '115.41%', left: '-8.15%', top: '-77.75%' }}
            />
          </Link>
          {/* Shrinks its type rather than wrapping as the viewport narrows. */}
          <label className="flex min-w-[104px] max-w-[254px] flex-1 items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-2 text-[10px] text-muted focus-within:border-primary sm:gap-2 sm:px-3 sm:text-xs">
            <SearchNormal size={14} variant="Linear" color="currentColor" className="shrink-0" />
            <input
              placeholder="Search Soludesk"
              aria-label="Search Soludesk"
              className="w-full min-w-0 bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <button type="button" aria-label="Refresh" onClick={() => window.location.reload()} className="hidden text-muted hover:text-ink sm:block">
            <Refresh size={20} variant="Linear" color="currentColor" />
          </button>
          <div className="relative">
            <button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)} className="relative block text-muted hover:text-ink">
              <Notification size={22} variant="Linear" color="currentColor" />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#ff5025] text-[9px] font-bold text-white">
                {notificationsFor(role).length}
              </span>
            </button>
            <NotificationsPopover role={role} open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
          </div>
          <button type="button" aria-label="Cart" onClick={() => setCartOpen(true)} className="relative text-muted hover:text-ink">
            <ShoppingCart size={22} variant="Linear" color="currentColor" />
            {collections.cart.length > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[#ff5025] text-[9px] font-bold text-white">
                {collections.cart.length}
              </span>
            ) : null}
          </button>
          {/* The hamburger already fronts the account on phones, so the avatar yields that space. */}
          <span className="hidden size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:flex" style={{ backgroundColor: avatarColorFor(name) }}>
            {initialsFrom(name)}
          </span>
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-lg border border-line text-ink">
            <HambergerMenu size={20} variant="Linear" color="currentColor" />
          </button>
        </div>
        </div>
      </div>

      <div className="flex flex-1 items-stretch">
        <aside className="hidden w-[220px] shrink-0 flex-col justify-between border-r border-line-soft py-6 lg:flex">
          <nav className="flex flex-col gap-1 px-3">
            {nav.items.map((item) => (
              <Link key={item.label} to={item.to} className={navLinkClass(item.to)}>
                <item.icon size={20} variant="Linear" color="currentColor" />
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-1 px-3">
            <Link to={nav.settings} className={navLinkClass(nav.settings)}>
              <Setting2 size={20} variant="Linear" color="currentColor" />
              Settings
            </Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <Footer />

      <PortalMenu role={role} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
