import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ProfileCircle } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { useAuth } from '../../lib/auth';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { useToast } from '../../lib/toast';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} <span className="text-[#ff5025]">*</span>
    </span>
    {children}
  </div>
);

export const TrainerProfile = () => {
  const navigate = useNavigate();
  const { roleProfiles } = useAuth();
  const trainerProfile = roleProfiles.trainer;
  const { showToast } = useToast();
  const [form, setForm] = useState({
    nin: trainerProfile?.nin ?? '',
    organization: trainerProfile?.organization ?? '',
    yearsExperience: trainerProfile?.yearsExperience ?? '',
  });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-4 self-start">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
            <ArrowLeft size={20} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">My Profile</h1>
        </button>

        <div className="flex flex-col gap-6 rounded-xl border border-line-soft p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-line-soft text-muted">
              <ProfileCircle size={40} variant="Bold" color="currentColor" />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-ink">Profile picture</span>
                <span className="text-xs text-muted">Recommended size: 300 × 300</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-full bg-[#ffe9e2] px-3 py-1 text-xs font-medium text-[#d54600]">
                  Remove
                </button>
                <button type="button" className="rounded-full bg-[var(--sematic-backgrounds-primarybackground-2)] px-3 py-1 text-xs font-medium text-primary-text">
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium text-muted">Basic Information</p>
            <Field label="NIN">
              <input className={inputClass} value={form.nin} onChange={update('nin')} placeholder="Enter your NIN" />
            </Field>
            <Field label="Organization/Company Name">
              <input className={inputClass} value={form.organization} onChange={update('organization')} placeholder="Enter your organization" />
            </Field>
            <Field label="Years of experience">
              <input className={inputClass} value={form.yearsExperience} onChange={update('yearsExperience')} placeholder="e.g. 4 years" />
            </Field>

            <div className="flex flex-col gap-[6px]">
              <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
                Uploaded Documents <span className="text-[#ff5025]">*</span>
              </span>
              <div className={cx(inputClass, 'flex items-center justify-between')}>
                <span className="truncate text-muted">My TeachingCert.Pdf</span>
                <button type="button" className="shrink-0 text-sm font-medium text-primary-text">
                  View
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex h-[38px] items-center justify-center rounded-lg border border-line-strong px-8 text-sm text-muted sm:h-[43px]">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => showToast('Profile changes saved.')}
              className="flex h-[38px] items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-white sm:h-[43px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};
