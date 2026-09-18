import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown2, Camera, TickCircle } from 'iconsax-react';
import { dashboardPathForRole, useAuth, type RoleProfile } from '../../lib/auth';
import { countryCodes } from '../../lib/countryCodes';
import { countries, genders } from '../auth/ProfileFormFields';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { Drawer } from '../ui/Drawer';

const expertiseAreas = [
  'UI/UX Design',
  'Digital Marketing',
  'Product Sales',
  'Customer Support',
  'Product Management',
  'Human Resources',
  'Business Finance',
  'IT Support',
  'Quality Assurance',
  'Research and Development',
  'Operations',
  'Legal',
];

const emptyForm: RoleProfile = {
  phone: '',
  dateOfBirth: '',
  gender: '',
  country: '',
  state: '',
  address: '',
  organization: '',
  nin: '',
  yearsExperience: '',
  expertise: '',
};

/** Splits a stored "+234 8012345678" into its dial code and local number. */
const splitPhone = (stored: string | undefined) => {
  const [dial, ...rest] = (stored ?? '').split(' ');
  return dial?.startsWith('+') ? { countryCode: dial, phone: rest.join(' ') } : { countryCode: '+234', phone: stored ?? '' };
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} <span className="text-[#ff5025]">*</span>
    </span>
    {children}
  </div>
);

const ProgressHeader = ({ label, step, total }: { label: string; step: number; total: number }) => (
  <div className="flex w-full flex-col gap-2">
    <div className="flex items-center justify-between text-sm leading-5">
      <span className="font-medium text-ink">{label}</span>
      <span className="text-muted">
        Step {step}/{total}
      </span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
      <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
    </div>
  </div>
);

const Select = ({ value, onChange, placeholder, options }: { value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>; placeholder: string; options: string[] }) => (
  <div className="relative">
    <select className={cx(inputClass, 'appearance-none pr-10')} value={value} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ArrowDown2 size={18} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
  </div>
);

/** Multi-step upgrade form: trainers finish with a face capture, sponsors with business details. */
export const RoleProfileDrawer = () => {
  const { onboarding, closeOnboarding, advanceOnboarding, completeOnboarding, profile } = useAuth();
  const navigate = useNavigate();
  // A learner upgrading already gave us the basics — only the role extras are new.
  const [form, setForm] = useState({
    ...emptyForm,
    ...splitPhone(profile?.phone),
    dateOfBirth: profile?.dateOfBirth ?? '',
    gender: profile?.gender ?? '',
    country: profile?.country ?? '',
  });
  const [captured, setCaptured] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const role = onboarding?.role;
  const step = onboarding?.step;
  const isTrainer = role === 'trainer';
  const totalSteps = isTrainer ? 3 : 2;
  const open = step === 'basic' || step === 'other' || step === 'face';
  const isLastStep = step === (isTrainer ? 'face' : 'other');

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const close = () => {
    closeOnboarding();
    setCaptured(false);
  };

  const startCapture = () => {
    setCapturing(true);
    window.setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
    }, 1400);
  };

  const finish = () => {
    if (!role) return;
    const { countryCode, ...rest } = form;
    completeOnboarding({ ...rest, phone: form.phone ? `${countryCode} ${form.phone}` : '' });
    navigate(dashboardPathForRole[role]);
  };

  return (
    <Drawer
      open={open}
      onClose={close}
      titleId="role-profile-title"
      title="Complete Your Profile"
      footer={
        <>
          <button type="button" onClick={close} className="flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text">
            Cancel
          </button>
          <button
            type="button"
            onClick={isLastStep ? finish : advanceOnboarding}
            disabled={isLastStep && isTrainer && !captured}
            className="flex h-11 w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-opacity disabled:opacity-50"
          >
            {isLastStep ? 'Complete' : 'Continue'}
          </button>
        </>
      }
    >
      {step === 'basic' ? (
        <div className="flex w-full flex-col gap-5">
          <ProgressHeader label="Basic Information" step={1} total={totalSteps} />

          <Field label="Phone Number">
            <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-line bg-white focus-within:border-primary">
              <div className="relative shrink-0 border-r border-line">
                {/* The open list keeps country names; the closed control shows only the dial code. */}
                <select
                  aria-label="Country code"
                  className="h-full w-[68px] appearance-none bg-transparent py-2 pr-5 pl-2.5 text-sm text-transparent focus:outline-none"
                  value={form.countryCode}
                  onChange={update('countryCode')}
                >
                  {countryCodes.map((entry) => (
                    <option key={entry.name} value={entry.dial} className="text-ink">
                      {entry.dial} {entry.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted">{form.countryCode}</span>
                <ArrowDown2 size={14} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-muted" />
              </div>
              <input
                className="w-full flex-1 px-4 text-sm leading-5 text-ink placeholder:text-[var(--sematic-buttons-greysolid-1)] focus:outline-none"
                value={form.phone}
                onChange={update('phone')}
                placeholder="Enter phone number"
                inputMode="tel"
              />
            </div>
          </Field>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Field label="Date of Birth">
              <input type="date" className={inputClass} value={form.dateOfBirth} onChange={update('dateOfBirth')} />
            </Field>
            <Field label="Gender">
              <Select value={form.gender} onChange={update('gender')} placeholder="Select gender" options={genders} />
            </Field>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Field label="Country">
              <Select value={form.country} onChange={update('country')} placeholder="Select country" options={countries} />
            </Field>
            <Field label="State">
              <input className={inputClass} value={form.state} onChange={update('state')} placeholder="Enter your state" />
            </Field>
          </div>

          <Field label="Address">
            <input className={inputClass} value={form.address} onChange={update('address')} placeholder="Enter your address" />
          </Field>
        </div>
      ) : null}

      {step === 'other' ? (
        <div className="flex w-full flex-col gap-5">
          <ProgressHeader label="Other Information" step={2} total={totalSteps} />

          {isTrainer ? (
            <>
              <Field label="Nin">
                <input className={inputClass} value={form.nin} onChange={update('nin')} placeholder="Enter your NIN" />
              </Field>
              <Field label="Organization/Company Name">
                <input className={inputClass} value={form.organization} onChange={update('organization')} placeholder="Enter the name of organization your work with" />
              </Field>
              <Field label="Years of experience">
                <input className={inputClass} value={form.yearsExperience} onChange={update('yearsExperience')} placeholder="e.g. 4 years" />
              </Field>
              <Field label="Area of Expertise">
                <Select value={form.expertise ?? ''} onChange={update('expertise')} placeholder="Select areas of expertise" options={expertiseAreas} />
              </Field>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line-strong px-4 py-6 text-center">
                <p className="text-base font-semibold text-ink">Certification</p>
                <p className="text-sm text-muted">Please upload any relevant certifications or supporting document.</p>
                <button type="button" className="mt-1 flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-sm font-medium text-primary-text">
                  Upload Media
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-muted">Business Information</p>
              <Field label="Organization/Company Name">
                <input className={inputClass} value={form.organization} onChange={update('organization')} placeholder="Enter the name of organization your work with" />
              </Field>
              <Field label="Country">
                <Select value={form.country} onChange={update('country')} placeholder="Select country" options={countries} />
              </Field>
              <Field label="State">
                <input className={inputClass} value={form.state} onChange={update('state')} placeholder="Enter your state" />
              </Field>
              <Field label="Address">
                <input className={inputClass} value={form.address} onChange={update('address')} placeholder="Enter your address" />
              </Field>
            </>
          )}
        </div>
      ) : null}

      {step === 'face' ? (
        <div className="flex w-full flex-col gap-5">
          <ProgressHeader label="Live Face Capture" step={3} total={totalSteps} />

          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#fff1e6] px-3 py-1 text-xs font-medium text-[#d54600]">
              <Camera size={14} variant="Linear" color="currentColor" />
              Face Forward
            </span>
          </div>

          {/* Fills the drawer width, capped by viewport height so the button below stays on screen. */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[min(100%,52vh)] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl bg-[#1f1f1f] px-6 text-center">
            <span className="absolute top-4 left-4 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-white/70" />
            <span className="absolute top-4 right-4 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-white/70" />
            <span className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-white/70" />
            <span className="absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-r-2 border-b-2 border-white/70" />
            {captured ? (
              <>
                <TickCircle size={48} variant="Bold" color="#22c55e" />
                <p className="text-sm font-semibold text-white">Face captured</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-white sm:text-base">{capturing ? 'Capturing…' : 'Capture Facial'}</p>
                <p className="text-xs text-white/70">Position your face in the frame</p>
                <span className="mt-1 h-[42%] w-[34%] rounded-[50%] border-2 border-white/70" />
              </>
            )}
          </div>

          {captured ? null : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm leading-5 font-medium text-ink">Position your face - looking straight</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Good lighting', 'Face visible', 'Hold steady'].map((tip) => (
                  <span key={tip} className="rounded-full bg-line-soft px-3 py-1 text-xs text-muted">
                    {tip}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={startCapture}
                disabled={capturing}
                className="flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-sm font-medium text-primary-text transition-opacity disabled:opacity-50"
              >
                {capturing ? 'Capturing…' : 'Start Capture'}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </Drawer>
  );
};
