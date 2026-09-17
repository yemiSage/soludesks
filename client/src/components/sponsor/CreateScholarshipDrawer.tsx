import { useState } from 'react';
import { ArrowDown2, Book, Gallery, SearchNormal1, TickCircle } from 'iconsax-react';
import { Drawer } from '../ui/Drawer';
import { RequestCourseDialog } from './RequestCourseDialog';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { useToast } from '../../lib/toast';
import { courseCategories } from '../../lib/trainerData';
import { scholarshipTypes, sponsorableCourses, validityPeriods } from '../../lib/sponsorData';

const steps = ['Program Details', 'Select Courses', 'Review & Launch'] as const;

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} <span className="text-[#ff5025]">*</span>
    </span>
    {children}
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

/** Three-step wizard: program details → pick funded courses → review and launch. */
export const CreateScholarshipDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    startsOn: '',
    endsOn: '',
    validity: '',
    type: '',
    funding: 'Partially Funded' as 'Fully Funded' | 'Partially Funded',
    percentage: '80',
    budget: '',
  });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const courses = sponsorableCourses.filter((course) => course.title.toLowerCase().includes(search.trim().toLowerCase()));
  const chosen = sponsorableCourses.filter((course) => selected.includes(course.id));
  const detailsValid = form.name.trim() && form.description.trim() && form.budget.trim();
  const canContinue = step === 0 ? detailsValid : step === 1 ? selected.length > 0 : true;

  const close = () => {
    onClose();
    window.setTimeout(() => setStep(0), 300);
  };

  const next = () => {
    if (step < steps.length - 1) return setStep((current) => current + 1);
    showToast('Scholarship program launched.');
    close();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={close}
        titleId="create-scholarship-title"
        title="Create Scholarship"
        footer={
          <>
            {step === 1 ? (
              <button type="button" onClick={() => setRequesting(true)} className="flex flex-col text-left text-xs text-muted">
                Can&apos;t find course of interest?
                <span className="font-medium text-primary-text">Request a course</span>
              </button>
            ) : (
              <button type="button" onClick={close} className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]">
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="flex h-[38px] w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-opacity disabled:opacity-40 sm:h-[43px]"
            >
              {step === steps.length - 1 ? 'Launch' : 'Continue'}
            </button>
          </>
        }
      >
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center">
            {steps.map((label, index) => (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={cx('flex size-7 items-center justify-center rounded-full text-xs', index <= step ? 'bg-primary text-white' : 'border border-line-strong text-muted')}>
                    {index < step ? <TickCircle size={16} variant="Bold" color="currentColor" /> : index + 1}
                  </span>
                  <span className={cx('text-[10px] whitespace-nowrap', index <= step ? 'font-medium text-primary-text' : 'text-muted')}>{label}</span>
                </div>
                {index < steps.length - 1 ? <span className={cx('mx-1 mb-4 h-px flex-1', index < step ? 'bg-primary' : 'bg-line-strong')} /> : null}
              </div>
            ))}
          </div>

          {step === 0 ? (
            <div className="flex w-full flex-col gap-5">
              <Field label="Cover Image">
                <button type="button" className="flex h-[140px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong text-sm text-muted">
                  <Gallery size={24} variant="Linear" color="currentColor" />
                  Upload Image
                </button>
              </Field>
              <Field label="Program Name">
                <input className={inputClass} value={form.name} onChange={update('name')} placeholder="e.g., 2026 Technical Skills Initiative" />
              </Field>
              <Field label="Program Description">
                <textarea className={cx(inputClass, 'h-24 resize-none py-3')} value={form.description} onChange={update('description')} placeholder="Describe the goals and objectives of this sponsorship program..." />
              </Field>
              <div className="flex flex-col gap-5 sm:flex-row">
                <Field label="Registration Starts">
                  <input type="date" className={inputClass} value={form.startsOn} onChange={update('startsOn')} />
                </Field>
                <Field label="Registration Ends">
                  <input type="date" className={inputClass} value={form.endsOn} onChange={update('endsOn')} />
                </Field>
              </div>
              <Field label="Course Validity Period">
                <Select value={form.validity} onChange={update('validity')} placeholder="Select preferred course validity duration" options={validityPeriods} />
              </Field>
              <Field label="Scholarship Type">
                <Select value={form.type} onChange={update('type')} placeholder="Select type" options={scholarshipTypes} />
              </Field>
              <Field label="Funding Type">
                <div className="flex gap-2">
                  {(['Fully Funded', 'Partially Funded'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setForm((previous) => ({ ...previous, funding: option }))}
                      className={cx(
                        'h-10 flex-1 rounded-lg border text-sm transition-colors',
                        form.funding === option
                          ? 'border-[var(--sematic-interactivecomponents-primaryic-2)] bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text'
                          : 'border-line-strong text-muted',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>
              {form.funding === 'Partially Funded' ? (
                <Field label="Percentage">
                  <input className={inputClass} value={form.percentage} onChange={update('percentage')} inputMode="numeric" />
                </Field>
              ) : null}
              <Field label="Budget">
                <input className={inputClass} value={form.budget} onChange={update('budget')} placeholder="Set budget" inputMode="numeric" />
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-5 sm:flex-row">
                <Field label="Search Course">
                  <div className="flex h-10 items-center gap-2 rounded-lg border border-line px-4 focus-within:border-primary">
                    <SearchNormal1 size={16} variant="Linear" color="currentColor" className="shrink-0 text-muted" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for course" className="w-full text-sm text-ink placeholder:text-muted focus:outline-none" />
                  </div>
                </Field>
                <Field label="Category">
                  <Select value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Select category" options={courseCategories} />
                </Field>
              </div>

              <div className="flex flex-col gap-2">
                {courses.map((course) => {
                  const isSelected = selected.includes(course.id);
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => setSelected((previous) => (isSelected ? previous.filter((id) => id !== course.id) : [...previous, course.id]))}
                      className={cx('flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', isSelected ? 'border-primary bg-[var(--sematic-backgrounds-primarybackground-2)]' : 'border-line-soft hover:border-primary')}
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-line-soft text-muted">
                        <Book size={20} variant="Linear" color="currentColor" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-sm font-semibold text-ink">{course.title}</span>
                        <span className="line-clamp-2 text-xs leading-5 text-muted">{course.summary}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-primary-text">${course.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-3 rounded-xl border border-line-soft p-4">
                <p className="text-sm font-semibold text-ink">Scholarship Details</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    ['Program Name:', form.name || '—'],
                    ['Deadline:', form.endsOn || '—'],
                    ['Status:', 'Active'],
                    ['Funding:', form.funding],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-muted">{label}</span>
                      <span className="text-ink">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="text-muted">Description</span>
                  <span className="text-ink">{form.description || '—'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-line-soft p-4">
                <p className="text-sm font-semibold text-ink">Selected Courses</p>
                {chosen.map((course) => (
                  <div key={course.id} className="flex items-start justify-between gap-3 rounded-lg border border-line-soft p-3">
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                        {course.title}
                        <span className="rounded-full bg-line-soft px-2 py-0.5 text-[10px] font-medium text-muted">{course.tag}</span>
                      </span>
                      <span className="line-clamp-2 text-xs leading-5 text-muted">{course.summary}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-primary-text">${course.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Drawer>

      <RequestCourseDialog open={requesting} onClose={() => setRequesting(false)} />
    </>
  );
};
