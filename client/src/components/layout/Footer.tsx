import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import type { Audience } from '../../lib/types';

const businessMenu = ['Our Solutions', 'Pricing', 'Book a Demo', 'Customer Stories'];
const companyMenu = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Pricing', to: '#footer' },
];
const legalLinks = [
  { label: 'Legal', to: '/legal' },
  { label: 'Privacy', to: '/legal/privacy-policy' },
  { label: 'Terms', to: '/legal/terms-of-service' },
];

const socials = ['/assets/icons/social-1.svg', '/assets/icons/social-2.svg', '/assets/icons/social-3.svg'];

const IndividualMenu = () => {
  const { requireAuth, openProfileDrawer, becomeRole } = useAuth();
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-[19px]">
      <li>
        <button
          type="button"
          onClick={() => requireAuth('signin', () => navigate('/dashboard'))}
          className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white"
        >
          Dashboard
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => requireAuth('signin', openProfileDrawer)}
          className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white"
        >
          My Profile
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => becomeRole('trainer')}
          className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white"
        >
          Become a Trainer
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => becomeRole('sponsor')}
          className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white"
        >
          Become a Sponsor
        </button>
      </li>
    </ul>
  );
};

export const Footer = ({ audience = 'individual' }: { audience?: Audience }) => (
  <footer id="footer" className="rounded-t-3xl bg-ink text-white">
    <div className="shell flex flex-col gap-12 pt-16 pb-14 lg:flex-row lg:justify-between lg:pt-24 lg:pb-28">
      <div className="flex max-w-[310px] flex-col gap-[22px]">
        <div className="flex flex-col gap-[21px]">
          <div className="h-9 w-[164px]">
            <img src="/assets/brand/logo-footer.svg" alt="Soludesk" className="block h-full w-full object-contain" />
          </div>
          <p className="text-base leading-[26px] text-slate-quiet">
            The unified operating system for modern organizations and ambitious learners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((icon) => (
            <a
              key={icon}
              href="#footer"
              aria-label="Soludesk social profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors hover:bg-white/20"
            >
              <img src={icon} alt="" className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-16 sm:gap-24 lg:w-[294px] lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-6">
          <h3 className="text-base leading-6 font-bold tracking-[0.4px] text-[#eff6ff]">Menu</h3>
          {audience === 'individual' ? (
            <IndividualMenu />
          ) : (
            <ul className="flex flex-col gap-[19px]">
              {businessMenu.map((link) => (
                <li key={link}>
                  <a href="#footer" className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-base leading-6 font-bold tracking-[0.4px] text-[#eff6ff]">Company</h3>
          <ul className="flex flex-col gap-[19px]">
            {companyMenu.map((link) =>
              link.to.startsWith('#') ? (
                <li key={link.label}>
                  <a href={link.to} className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm leading-5 font-medium whitespace-nowrap text-slate-quiet transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 text-sm leading-5 text-[#94a3b8] sm:flex-row">
        <p>© {new Date().getFullYear()} Soludesk Inc.</p>
        <div className="flex items-center gap-8">
          {legalLinks.map((link) => (
            <Link key={link.label} to={link.to} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
