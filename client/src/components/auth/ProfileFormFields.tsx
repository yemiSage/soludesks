import type { ChangeEvent, ReactNode } from 'react';
import { ArrowDown2, Calendar, Camera, ProfileCircle } from 'iconsax-react';
import { countryCodes } from '../../lib/countryCodes';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';

export const countries = countryCodes.map((entry) => entry.name);
export const genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

export type ProfileFormState = {
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
};

export const emptyProfileForm: ProfileFormState = {
  firstName: '',
  lastName: '',
  phone: '',
  countryCode: '+234',
  dateOfBirth: '',
  gender: '',
  country: '',
  state: '',
  address: '',
};

const Field = ({ label, required = true, children }: { label: string; required?: boolean; children: ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} {required ? <span className="text-[#ff5025]">*</span> : null}
    </span>
    {children}
  </div>
);

type Props = {
  form: ProfileFormState;
  email: string;
  update: (key: keyof ProfileFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showAvatar?: boolean;
};

/** Shared Basic/Other Information fields rendered by both the Complete-Profile drawer and the Settings page. */
export const ProfileFormFields = ({ form, email, update, showAvatar = true }: Props) => (
  <div className="flex w-full flex-col gap-5">
    {showAvatar ? (
      <div className="flex items-end justify-center">
        <div className="relative size-[108px] overflow-hidden rounded-full bg-line-soft">
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            <ProfileCircle size={64} variant="Bold" color="currentColor" />
          </div>
          <button
            type="button"
            aria-label="Upload photo"
            className="absolute bottom-[6px] left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white"
          >
            <Camera size={18} variant="Linear" color="currentColor" />
          </button>
        </div>
      </div>
    ) : null}

    <p className="text-sm leading-5 font-medium text-ink">Basic Information</p>

    <Field label="First Name">
      <input className={inputClass} value={form.firstName} onChange={update('firstName')} placeholder="Enter your first name" />
    </Field>
    <Field label="Last Name">
      <input className={inputClass} value={form.lastName} onChange={update('lastName')} placeholder="Enter your last name" />
    </Field>
    <Field label="Email Address">
      <input className={cx(inputClass, 'bg-line-soft text-muted')} value={email} disabled readOnly />
    </Field>
    <Field label="Phone Number" required={false}>
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
          <ArrowDown2
            size={14}
            variant="Linear"
            color="currentColor"
            className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-muted"
          />
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
      <Field label="Date of Birth" required={false}>
        <div className="relative">
          <input
            type="date"
            className={cx(
              inputClass,
              'pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0',
            )}
            value={form.dateOfBirth}
            onChange={update('dateOfBirth')}
          />
          <Calendar size={20} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>
      <Field label="Gender" required={false}>
        <div className="relative">
          <select className={cx(inputClass, 'appearance-none pr-10')} value={form.gender} onChange={update('gender')}>
            <option value="" disabled>
              Select gender
            </option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <ArrowDown2 size={18} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>
    </div>

    <p className="pt-2 text-sm leading-5 font-medium text-ink">Other Information</p>

    <div className="flex flex-col gap-5 sm:flex-row">
      <Field label="Country" required={false}>
        <div className="relative">
          <select className={cx(inputClass, 'appearance-none pr-10')} value={form.country} onChange={update('country')}>
            <option value="" disabled>
              Select country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <ArrowDown2 size={18} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>
      <Field label="State" required={false}>
        <input className={inputClass} value={form.state} onChange={update('state')} placeholder="Enter your state" />
      </Field>
    </div>

    <Field label="Address" required={false}>
      <input className={inputClass} value={form.address} onChange={update('address')} placeholder="Enter your address" />
    </Field>
  </div>
);
