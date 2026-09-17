import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import { emptyProfileForm, ProfileFormFields, type ProfileFormState } from '../components/auth/ProfileFormFields';
import { Toggle } from '../components/ui/Toggle';
import { useAuth } from '../lib/auth';
import { cx } from '../lib/format';
import { useToast } from '../lib/toast';

type Tab = 'profile' | 'notifications';
const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
];

const SettingsShell = ({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) => (
  <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-line-strong pt-8">
    <div className="flex flex-col px-8">{children}</div>
    <div className="flex h-[91px] items-center justify-end border-t border-line-soft px-8">{footer}</div>
  </div>
);

const SaveButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-[38px] w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-white sm:h-[43px] sm:w-[343px]"
  >
    Save Changes
  </button>
);

export const Settings = () => {
  const navigate = useNavigate();
  const { user, profile, markProfileComplete } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>('profile');

  const [form, setForm] = useState<ProfileFormState>({
    ...emptyProfileForm,
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: profile?.phone ?? '',
    dateOfBirth: profile?.dateOfBirth ?? '',
    gender: profile?.gender ?? '',
    country: profile?.country ?? '',
  });
  const update = (key: keyof ProfileFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const saveProfile = () => {
    markProfileComplete({
      phone: form.phone ? `${form.countryCode} ${form.phone}` : '',
      dateOfBirth: form.dateOfBirth,
      country: form.country,
      gender: form.gender,
      bio: form.address,
    });
    showToast('Profile changes saved.');
  };

  const saveNotifications = () => showToast('Notification preferences saved.');

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">Settings</h1>
        </button>

        <div className="flex flex-col overflow-hidden rounded-xl border-[1.5px] border-line-strong bg-white pb-10">
          <div className="flex items-center border-b border-line-strong px-5">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cx(
                  'flex-1 py-5 text-center text-base',
                  tab === id ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="px-5 pt-8">
            {tab === 'profile' ? (
              <SettingsShell footer={<SaveButton onClick={saveProfile} />}>
                <ProfileFormFields form={form} email={user?.email ?? ''} update={update} showAvatar={false} />
              </SettingsShell>
            ) : (
              <SettingsShell footer={<SaveButton onClick={saveNotifications} />}>
                <div className="flex flex-col gap-8">
                  <div className="flex h-[75px] items-center justify-between rounded-[10px] bg-[var(--sematic-backgrounds-card-bg,#f6f7f6)] px-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-base text-ink">Email Notifications</p>
                      <p className="text-sm text-muted">Receive notifications via email</p>
                    </div>
                    <Toggle checked={emailNotifications} onChange={setEmailNotifications} label="Email Notifications" />
                  </div>
                  <div className="flex h-[75px] items-center justify-between rounded-[10px] bg-[var(--sematic-backgrounds-card-bg,#f6f7f6)] px-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-base text-ink">In-App Notifications</p>
                      <p className="text-sm text-muted">Receive notifications within the platform</p>
                    </div>
                    <Toggle checked={inAppNotifications} onChange={setInAppNotifications} label="In-App Notifications" />
                  </div>
                </div>
              </SettingsShell>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
