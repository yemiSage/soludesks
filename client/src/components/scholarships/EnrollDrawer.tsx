import { useEffect, useState, type ChangeEvent } from 'react';
import { useAuth } from '../../lib/auth';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import type { Course } from '../../lib/types';
import type { Scholarship } from '../../lib/scholarshipData';
import { Drawer } from '../ui/Drawer';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
  motivation: string;
};

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  country: '',
  state: '',
  address: '',
  motivation: '',
};

const genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} <span className="text-[#ff5025]">*</span>
    </span>
    {children}
  </div>
);

type Props = {
  scholarship: Scholarship | null;
  course: Course | null;
  onClose: () => void;
  onSubmitted: (email: string) => void;
};

export const EnrollDrawer = ({ scholarship, course, onClose, onSubmitted }: Props) => {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [display, setDisplay] = useState<{ scholarship: Scholarship; course: Course } | null>(
    scholarship && course ? { scholarship, course } : null,
  );
  const open = Boolean(scholarship && course);

  useEffect(() => {
    if (scholarship && course) setDisplay({ scholarship, course });
  }, [scholarship, course]);

  useEffect(() => {
    if (open) {
      setForm((previous) => ({
        ...previous,
        firstName: previous.firstName || user?.firstName || '',
        lastName: previous.lastName || user?.lastName || '',
        email: previous.email || user?.email || '',
      }));
    }
  }, [open, user]);

  const update = (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const isComplete = Object.values(form).every((value) => value.trim() !== '');

  const submit = () => {
    if (!isComplete) return;
    onSubmitted(form.email);
    setForm(emptyForm);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      titleId="enroll-drawer-title"
      title="Enroll for course"
      footer={
        <>
          <button type="button" onClick={onClose} className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]">
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!isComplete}
            className="flex h-[38px] w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white sm:h-[43px] transition-opacity disabled:opacity-50"
          >
            Continue
          </button>
        </>
      }
    >
      {display ? (
        <div className="mx-auto flex w-full max-w-[476px] flex-col gap-8">
          <p className="text-sm leading-5 text-muted">
            Applying for <span className="font-semibold text-ink">{display.course.title}</span> through the{' '}
            <span className="font-semibold text-ink">{display.scholarship.title}</span>.
          </p>

          <div className="flex flex-col gap-5">
            <p className="text-sm leading-5 font-medium text-ink">Basic Information</p>
            <Field label="First Name">
              <input className={inputClass} value={form.firstName} onChange={update('firstName')} placeholder="Enter your first name" />
            </Field>
            <Field label="Last Name">
              <input className={inputClass} value={form.lastName} onChange={update('lastName')} placeholder="Enter your last name" />
            </Field>
            <Field label="Email Address">
              <input type="email" className={inputClass} value={form.email} onChange={update('email')} placeholder="Enter your email address" />
            </Field>
            <Field label="Phone Number">
              <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-line bg-white focus-within:border-primary">
                <span className="flex items-center border-r border-line px-3 text-sm text-muted">+234</span>
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
                <select className={cx(inputClass, 'appearance-none')} value={form.gender} onChange={update('gender')}>
                  <option value="" disabled>
                    Select gender
                  </option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-sm leading-5 font-medium text-ink">Other Information</p>
            <div className="flex flex-col gap-5 sm:flex-row">
              <Field label="Country">
                <input className={inputClass} value={form.country} onChange={update('country')} placeholder="Enter your country" />
              </Field>
              <Field label="State">
                <input className={inputClass} value={form.state} onChange={update('state')} placeholder="Enter your state" />
              </Field>
            </div>
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={update('address')} placeholder="Enter your address" />
            </Field>
          </div>

          <Field label="Why should you be accepted?">
            <textarea
              rows={5}
              className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3 text-sm leading-5 text-ink placeholder:text-[var(--sematic-buttons-greysolid-1)] focus:border-primary focus:outline-none"
              value={form.motivation}
              onChange={update('motivation')}
              placeholder="Tell us why you should be accepted"
            />
          </Field>
        </div>
      ) : null}
    </Drawer>
  );
};
