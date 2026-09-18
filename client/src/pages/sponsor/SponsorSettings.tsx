import { useState, type ChangeEvent } from 'react';
import { Add, Bank, More, Trash } from 'iconsax-react';
import { emptyProfileForm, ProfileFormFields, type ProfileFormState } from '../../components/auth/ProfileFormFields';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { Toggle } from '../../components/ui/Toggle';
import { useAuth } from '../../lib/auth';
import { cx } from '../../lib/format';
import { useToast } from '../../lib/toast';
import { trainerPayoutAccounts } from '../../lib/trainerData';

type Tab = 'profile' | 'payment' | 'notifications';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'profile', label: 'Profile' },
  { id: 'payment', label: 'Payment Settings' },
  { id: 'notifications', label: 'Notifications' },
];

const withdrawals = [
  { date: '15 Aug 2025', amount: 10000, status: 'Successful' },
  { date: '21 Sep 2025', amount: 5000, status: 'Failed' },
  { date: '03 Sep 2025', amount: 10000, status: 'Pending' },
  { date: '05 Oct 2025', amount: 10000, status: 'Successful' },
  { date: '27 Jul 2025', amount: 25000, status: 'Successful' },
];

const statusColor: Record<string, string> = { Successful: 'text-[#15803d]', Failed: 'text-[#b91c1c]', Pending: 'text-[#b45309]' };

export const SponsorSettings = () => {
  const { user, profile } = useAuth();
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
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const update = (key: keyof ProfileFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  return (
    <PortalLayout role="sponsor">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Settings</h1>
          <p className="text-sm text-muted">Track learners progress, performance, and engagement</p>
        </div>

        <div className="flex overflow-x-auto border-b border-line-soft scrollbar-none">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cx(
                'flex-1 shrink-0 px-6 py-3 text-sm whitespace-nowrap transition-colors',
                tab === item.id ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'profile' ? (
          <div className="flex flex-col gap-6 rounded-xl border border-line-soft p-5 sm:p-6">
            <ProfileFormFields form={form} email={user?.email ?? ''} update={update} showAvatar={false} />
            <button
              type="button"
              onClick={() => showToast('Profile changes saved.')}
              className="flex h-11 items-center justify-center self-end rounded-lg bg-primary px-8 text-sm font-medium text-white"
            >
              Save and Continue
            </button>
          </div>
        ) : null}

        {tab === 'payment' ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5 sm:p-6">
              <p className="text-base font-semibold text-ink">My Accounts</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {trainerPayoutAccounts.map((account) => (
                  <div key={account.id} className="flex flex-col gap-3 rounded-xl border border-line-soft p-4">
                    <div className="flex items-start justify-between">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text">
                        <Bank size={18} variant="Bold" color="currentColor" />
                      </span>
                      {account.isDefault ? (
                        <span className="rounded-full border border-line-strong px-2.5 py-1 text-[11px] text-muted">Default</span>
                      ) : (
                        <button type="button" className="text-[11px] text-muted hover:text-ink">
                          Set as default
                        </button>
                      )}
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-ink">{account.holder}</span>
                        <span className="text-xs text-muted">
                          {account.bank} | {account.number}
                        </span>
                      </div>
                      {account.isDefault ? null : (
                        <button type="button" aria-label="Remove account" className="text-[#ff5025]">
                          <Trash size={16} variant="Linear" color="currentColor" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => showToast('Add a payout account from the wallet page.')}
                  className="flex min-h-[104px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line-strong text-sm text-muted hover:border-primary hover:text-primary-text"
                >
                  <Add size={20} variant="Linear" color="currentColor" />
                  Add new bank
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5 sm:p-6">
              <p className="text-base font-semibold text-ink">Transaction History</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[#fafafa] text-xs text-muted">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((row, index) => (
                      <tr key={`${row.date}-${index}`} className="border-b border-line-soft last:border-0">
                        <td className="px-4 py-3 text-ink">{row.date}</td>
                        <td className="px-4 py-3 text-muted">Withdrawal</td>
                        <td className="px-4 py-3 font-medium text-primary-text">-₦{row.amount.toLocaleString()}</td>
                        <td className={cx('px-4 py-3 font-medium', statusColor[row.status])}>{row.status}</td>
                        <td className="px-4 py-3 text-muted">
                          <More size={18} variant="Linear" color="currentColor" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'notifications' ? (
          <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5 sm:p-6">
            {[
              { label: 'Email Notifications', hint: 'Receive notifications via email', value: emailNotifications, set: setEmailNotifications },
              { label: 'In-App Notifications', hint: 'Receive notifications within the platform', value: inAppNotifications, set: setInAppNotifications },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 rounded-xl bg-[#fafafa] px-4 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-ink">{row.label}</span>
                  <span className="text-xs text-muted">{row.hint}</span>
                </div>
                <Toggle checked={row.value} onChange={row.set} label={row.label} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </PortalLayout>
  );
};
