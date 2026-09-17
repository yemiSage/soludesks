import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Award,
  Book,
  HambergerMenu,
  Heart,
  HomeHashtag,
  Logout,
  MessageNotif,
  Notification,
  SearchNormal,
  Setting2,
  ShoppingCart,
  User,
  Wallet,
} from 'iconsax-react';
import { CartModal } from '../cart/CartModal';
import { NotificationsDropdown } from './NotificationsDropdown';
import { useCollections } from '../../hooks/useCollections';
import { dashboardPathForRole, useAuth, type AuthIntent } from '../../lib/auth';
import { avatarColorFor, cx, initialsFrom } from '../../lib/format';
import type { Audience } from '../../lib/types';
import { useBodyScrollLock } from '../../lib/useBodyScrollLock';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';

const loggedInLinks = [
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'My Dashboard', to: '/dashboard' },
  { label: 'My Courses', to: '/my-courses' },
];

const navigation: Record<Audience, Array<{ label: string; href: string; strong?: boolean; authIntent?: AuthIntent }>> = {
  individual: [
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Explore', href: '/explore' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Become a trainer', href: '#trainer', strong: true, authIntent: 'trainer' },
  ],
  business: [
    { label: 'Our Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact US', href: '#footer' },
  ],
};

const utilityLinks = [
  { label: 'Legal', to: '/legal' },
  { label: 'Privacy', to: '/legal/privacy-policy' },
  { label: 'Terms', to: '/legal/terms-of-service' },
];

const AudienceSwitch = ({ audience }: { audience: Audience }) => {
  const { pathname } = useLocation();
  const options: Array<{ label: string; to: string; key: Audience }> = [
    { label: 'Individual', to: '/', key: 'individual' },
    { label: 'Business', to: '/business', key: 'business' },
  ];

  return (
    <div className="flex items-center gap-2">
      {options.map((option, index) => {
        const active = option.key === audience;
        return (
          <span key={option.key} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="h-2 w-px rounded-[3px] bg-[var(--sematic-boder-and-seperator-greyborder-2)]" />
            ) : null}
            <Link
              to={option.to}
              aria-current={active ? 'page' : undefined}
              state={{ from: pathname }}
              className={cx(
                'flex w-[85px] items-center justify-center rounded-lg py-1 text-center text-sm leading-5 font-medium transition-colors duration-200',
                active
                  ? 'border border-[var(--sematic-interactivecomponents-primaryic-2)] bg-[var(--sematic-backgrounds-primarybackground-2)] px-2.5 text-primary-text'
                  : 'text-muted hover:text-ink',
              )}
            >
              {option.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

const UserMenu = () => {
  const { user, logout, openProfileDrawer, becomeRole, unlockedRoles, switchRole } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;
  const name = `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Account menu for ${name}`}
        aria-expanded={open}
        className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: avatarColorFor(name) }}
      >
        {initialsFrom(name)}
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Toggle account menu"
        aria-expanded={open}
        className="flex size-12 items-center justify-center rounded-lg border border-[var(--sematic-acents-primarytext-1)] bg-[var(--sematic-interactivecomponents-primaryic-2)] text-primary-text"
      >
        <HambergerMenu size={24} variant="Linear" color="currentColor" />
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} titleId="account-menu-title" title="Menu" maxWidthClassName="sm:max-w-[360px]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 border-b border-line-soft pb-5">
            <p className="px-2.5 py-1 text-sm font-semibold text-muted">Menus</p>
            <div className="flex flex-col gap-2">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
                <HomeHashtag size={16} variant="Linear" color="currentColor" />
                My Dashboard
              </Link>
              <Link to="/my-courses" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
                <Book size={20} variant="Linear" color="currentColor" />
                My Courses
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openProfileDrawer();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm text-muted hover:bg-line-soft hover:text-ink"
              >
                <User size={20} variant="Linear" color="currentColor" />
                Profile
              </button>
              {[
                { label: 'My Wallet', icon: Wallet, to: '/my-wallet' },
                { label: 'Certifications', icon: Award, to: '/my-certificates' },
                { label: 'Favorites', icon: Heart, to: '/my-favorites' },
                { label: 'Settings', icon: Setting2, to: '/settings' },
              ].map(({ label, icon: ItemIcon, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink"
                >
                  <ItemIcon size={20} variant="Linear" color="currentColor" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b border-line-soft pb-5">
            <p className="px-2.5 py-1 text-sm font-semibold text-muted">Help Center</p>
            <a href="/dashboard#faq" onClick={() => setOpen(false)} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
              FAQ&apos;s
            </a>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
              Contact US
            </Link>
            <Link to="/legal" onClick={() => setOpen(false)} className="rounded-lg px-2.5 py-2.5 text-sm text-muted hover:bg-line-soft hover:text-ink">
              Legal
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {/* Once the trainer profile exists this becomes a plain dashboard switch. */}
            {unlockedRoles.includes('trainer') ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  switchRole('trainer');
                  navigate(dashboardPathForRole.trainer);
                }}
                className="text-left text-base font-medium text-primary-text"
              >
                Switch to my trainer profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  becomeRole('trainer');
                }}
                className="text-left text-base font-medium text-primary-text"
              >
                Become a trainer
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
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
    </div>
  );
};

export const Navbar = ({ audience }: { audience: Audience }) => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { collections } = useCollections();
  const { openAuthModal, isAuthenticated, user, logout, openProfileDrawer, becomeRole } = useAuth();
  const navigate = useNavigate();
  const loggedIn = isAuthenticated && audience === 'individual';
  const links = navigation[audience];

  const signIn = () => {
    setOpen(false);
    openAuthModal('signin');
  };

  const viewCart = () => {
    setOpen(false);
    setCartOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!notificationsOpen) return;
    const onClick = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setNotificationsOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [notificationsOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {!loggedIn ? (
        <div className="hidden border-b border-line bg-white lg:block">
          <div className="shell flex items-center justify-between py-3">
            <AudienceSwitch audience={audience} />

            <nav className="flex items-center gap-3 text-sm leading-5 text-muted">
              {utilityLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span className="h-2 w-px rounded-[3px] bg-[var(--sematic-boder-and-seperator-greyborder-2)]" />
                  ) : null}
                  <Link to={link.to} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div
        className={cx(
          'transition-[background-color,backdrop-filter] duration-300',
          scrolled || open ? 'bg-white/65 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="shell flex items-center justify-between py-4 lg:py-5">
          <div className="flex flex-1 items-center gap-6">
            {/* The exported logo sits on a larger canvas — crop it back to the 140x36 frame from Figma. */}
            <Link to={audience === 'business' ? '/business' : '/'} className="relative h-9 w-[140px] shrink-0 overflow-hidden">
              <img
                src="/assets/brand/logo-dark.png"
                alt="Soludesk"
                className="absolute max-w-none"
                style={{ height: '257.44%', width: '115.41%', left: '-8.15%', top: '-77.75%' }}
              />
            </Link>

            {loggedIn ? (
              <div className="hidden flex-1 items-center gap-5 lg:flex">
                <a
                  href="#catalogue"
                  className="flex h-9 max-w-[240px] flex-1 items-center gap-2.5 rounded-full border border-line-strong px-3 text-sm text-muted transition-colors hover:border-primary-text hover:text-ink"
                >
                  <SearchNormal size={14} variant="Linear" color="currentColor" />
                  <span className="text-xs font-medium">What are you learning today?</span>
                </a>
                <nav className="flex items-center justify-start gap-5">
                  {loggedInLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="rounded-full px-2.5 py-[7px] text-sm leading-5 font-medium text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ) : (
              <nav className="hidden items-center gap-5 lg:flex">
                {links.map((link) => {
                  const className = cx(
                    'rounded-xl px-[11px] py-[7px] text-sm leading-5 transition-colors',
                    link.strong ? 'font-bold text-ink' : 'font-medium text-muted hover:text-ink',
                  );
                  if (link.authIntent) {
                    const onClick = link.authIntent === 'trainer' ? () => becomeRole('trainer') : () => openAuthModal(link.authIntent);
                    return (
                      <button key={link.label} type="button" onClick={onClick} className={className}>
                        {link.label}
                      </button>
                    );
                  }
                  return link.href.startsWith('#') ? (
                    <a key={link.label} href={link.href} className={className}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.href} className={className}>
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!loggedIn && audience === 'individual' ? (
              <button
                type="button"
                onClick={viewCart}
                aria-label={`Cart, ${collections.cart.length} items`}
                title="Cart"
                className="relative flex items-center justify-center rounded-lg border border-[var(--sematic-buttons-greysolid-2)] p-3 transition-colors hover:bg-line-soft"
              >
                <img src="/assets/icons/cart.svg" alt="" className="h-5 w-5" />
                {collections.cart.length > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-bold text-white">
                    {collections.cart.length}
                  </span>
                ) : null}
              </button>
            ) : null}

            {loggedIn ? (
              <div className="hidden items-center gap-5 md:flex">
                <Link to="/messages" onClick={() => setOpen(false)} aria-label="Messages" className="text-ink transition-opacity hover:opacity-70">
                  <MessageNotif size={24} variant="Linear" color="currentColor" />
                </Link>
                <div className="relative" ref={notificationsRef}>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen((value) => !value)}
                    aria-label="Notifications"
                    aria-expanded={notificationsOpen}
                    className="relative text-ink transition-opacity hover:opacity-70"
                  >
                    <Notification size={24} variant="Linear" color="currentColor" />
                    <span className="absolute -top-1 -right-1.5 flex size-[15px] items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                      3
                    </span>
                  </button>
                  {notificationsOpen ? (
                    <div className="absolute top-[calc(100%+12px)] right-0 z-10">
                      <NotificationsDropdown onNavigate={() => setNotificationsOpen(false)} />
                    </div>
                  ) : null}
                </div>
                <button type="button" onClick={viewCart} aria-label={`Cart, ${collections.cart.length} items`} title="Cart" className="relative text-ink transition-opacity hover:opacity-70">
                  <ShoppingCart size={24} variant="Linear" color="currentColor" />
                  {collections.cart.length > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                      {collections.cart.length}
                    </span>
                  ) : null}
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <Button variant="outline" className="w-[120px] font-normal lg:w-[186px]" onClick={signIn}>
                  Log In
                </Button>
                <Button className="w-[120px] lg:w-[186px]" onClick={signIn}>
                  Sign Up
                </Button>
              </div>
            )}

            {loggedIn ? (
              <div className="hidden md:block">
                <UserMenu />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-line lg:hidden"
            >
              <span className={cx('h-0.5 w-5 bg-ink transition-transform', open && 'translate-y-[7px] rotate-45')} />
              <span className={cx('h-0.5 w-5 bg-ink transition-opacity', open && 'opacity-0')} />
              <span className={cx('h-0.5 w-5 bg-ink transition-transform', open && '-translate-y-[7px] -rotate-45')} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cx(
          'fixed inset-y-0 right-0 z-40 flex w-full flex-col gap-4 border-l border-line-soft bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden',
          open ? 'visible translate-x-0' : 'invisible translate-x-full pointer-events-none',
        )}
        aria-hidden={!open}
      >
          <div className="flex items-center justify-between">
            <AudienceSwitch audience={audience} />
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-2xl leading-none text-ink"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="flex flex-col">
            {loggedIn
              ? loggedInLinks.map((link) => (
                  <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="py-2.5 text-base leading-6 font-medium text-ink">
                    {link.label}
                  </Link>
                ))
              : links.map((link) =>
                  link.authIntent ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        if (link.authIntent === 'trainer') becomeRole('trainer');
                        else openAuthModal(link.authIntent);
                      }}
                      className="py-2.5 text-left text-base leading-6 font-medium text-ink"
                    >
                      {link.label}
                    </button>
                  ) : link.href.startsWith('#') ? (
                    <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="py-2.5 text-base leading-6 font-medium text-ink">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.href} onClick={() => setOpen(false)} className="py-2.5 text-base leading-6 font-medium text-ink">
                      {link.label}
                    </Link>
                  ),
                )}
          </nav>
          {loggedIn ? (
            <div className="flex items-center gap-3 border-t border-line-soft py-4">
              <Link
                to="/messages"
                onClick={() => setOpen(false)}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-line-soft py-3 text-xs font-medium text-ink"
              >
                <MessageNotif size={22} variant="Linear" color="currentColor" />
                Messages
              </Link>
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-line-soft py-3 text-xs font-medium text-ink"
              >
                <Notification size={22} variant="Linear" color="currentColor" />
                Notifications
              </Link>
              <button
                type="button"
                onClick={viewCart}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-line-soft py-3 text-xs font-medium text-ink"
              >
                <ShoppingCart size={22} variant="Linear" color="currentColor" />
                Cart{collections.cart.length > 0 ? ` (${collections.cart.length})` : ''}
              </button>
            </div>
          ) : null}
          {loggedIn && user ? (
            <div className="mt-auto mb-10 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-line-soft p-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: avatarColorFor(`${user.firstName} ${user.lastName}`) }}
                >
                  {initialsFrom(`${user.firstName} ${user.lastName}`)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openProfileDrawer();
                }}
                className="self-start py-1 text-base leading-6 font-medium text-ink"
              >
                My Profile
              </button>
              <Button
                variant="outline"
                className="font-normal"
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate('/');
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="mt-auto mb-10 flex gap-3">
              <Button variant="outline" className="flex-1 font-normal" onClick={signIn}>
                Log In
              </Button>
              <Button className="flex-1" onClick={signIn}>
                Sign Up
              </Button>
            </div>
          )}
      </div>
      {open ? <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/10 lg:hidden" /> : null}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};
