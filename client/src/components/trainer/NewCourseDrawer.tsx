import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown2, DocumentUpload, Edit2, Magicpen } from 'iconsax-react';
import { Drawer } from '../ui/Drawer';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { courseCategories } from '../../lib/trainerData';

type Mode = 'choose' | 'ai-form' | 'ai-loading' | 'import';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex w-full flex-col gap-[6px]">
    <span className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
      {label} <span className="text-[#ff5025]">*</span>
    </span>
    {children}
  </div>
);

export const NewCourseDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('choose');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setMode('choose');
      setName('');
      setDescription('');
      setCategory('');
    }, 300);
  };

  const startManualBuild = () => {
    close();
    navigate(`/trainer/courses/new/builder`);
  };

  const submitAi = () => {
    if (!name.trim() || !description.trim() || !category) return;
    setMode('ai-loading');
    window.setTimeout(() => {
      close();
      navigate('/trainer/courses/new/builder');
    }, 1800);
  };

  return (
    <Drawer open={open} onClose={close} titleId="new-course-title" title={mode === 'ai-form' || mode === 'ai-loading' ? 'Craft new course with AI' : 'Create a new course'}>
      {mode === 'choose' ? (
        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => setMode('ai-form')}
            className="flex items-center gap-3 rounded-xl border border-line-soft p-4 text-left hover:border-primary"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--sematic-backgrounds-primarybackground-2)]">
              <Magicpen size={20} variant="Bold" color="currentColor" className="text-primary-text" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-ink">Generate with AI</span>
              <span className="text-xs text-muted">AI builds a custom course with modules, lessons, and quizzes based on your topic.</span>
            </span>
          </button>
          <button type="button" onClick={startManualBuild} className="flex items-center gap-3 rounded-xl border border-line-soft p-4 text-left hover:border-primary">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-line-soft">
              <Edit2 size={20} variant="Bold" color="currentColor" className="text-ink" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-ink">Manual Course Builder</span>
              <span className="text-xs text-muted">Create your course from scratch with custom modules, lessons, and content.</span>
            </span>
          </button>
          <button type="button" onClick={() => setMode('import')} className="flex items-center gap-3 rounded-xl border border-line-soft p-4 text-left hover:border-primary">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-line-soft">
              <DocumentUpload size={20} variant="Bold" color="currentColor" className="text-ink" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-ink">Import from Document</span>
              <span className="text-xs text-muted">Quickly convert existing course content from PDFs, Docs, into interactive course with automatic content extraction.</span>
            </span>
          </button>
        </div>
      ) : null}

      {mode === 'ai-form' ? (
        <div className="flex w-full flex-col gap-5">
          <p className="text-sm text-muted">Unleash your teaching potential with AI-assisted course creation.</p>
          <Field label="Course Name">
            <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter course name/title" />
          </Field>
          <Field label="Description">
            <textarea
              className={cx(inputClass, 'h-[110px] resize-none py-3')}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what the student will learn in this course"
            />
          </Field>
          <Field label="Category">
            <div className="relative">
              <select className={cx(inputClass, 'appearance-none pr-10')} value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="" disabled>
                  Select course category
                </option>
                {courseCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ArrowDown2 size={18} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
            </div>
          </Field>
          <button
            type="button"
            onClick={submitAi}
            disabled={!name.trim() || !description.trim() || !category}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-opacity disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      ) : null}

      {mode === 'ai-loading' ? (
        <div className="flex w-full flex-col items-center gap-3 py-10 text-center">
          <div className="size-10 animate-spin rounded-full border-4 border-line-soft border-t-primary" />
          <p className="text-base font-semibold text-ink">Crafting your tailored course content</p>
          <p className="text-sm text-muted">Identifying key milestones…..</p>
        </div>
      ) : null}

      {mode === 'import' ? (
        <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-dashed border-line-strong px-4 py-10 text-center">
          <DocumentUpload size={32} variant="Bulk" color="currentColor" className="text-muted" />
          <p className="text-base font-semibold text-ink">Import from Document</p>
          <p className="text-sm text-muted">Drag and drop a PDF or Doc file, and we&apos;ll turn it into an interactive course.</p>
          <button type="button" onClick={startManualBuild} className="mt-1 flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-sm font-medium text-primary-text">
            Choose File
          </button>
        </div>
      ) : null}
    </Drawer>
  );
};
