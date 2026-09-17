import { useState } from 'react';
import { CloseCircle, TickCircle } from 'iconsax-react';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';

/** Sponsors ask Soludesk to build a course that isn't in the catalogue yet. */
export const RequestCourseDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setSent(false);
      setTitle('');
      setDescription('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="request-course-title">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6">
        <button type="button" onClick={close} aria-label="Close" className="absolute top-5 right-5 text-muted hover:text-ink">
          <CloseCircle size={22} variant="Linear" color="currentColor" />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <TickCircle size={48} variant="Bold" color="#00b884" />
            <h2 id="request-course-title" className="text-lg font-semibold text-ink">
              Request Sent
            </h2>
            <p className="text-sm text-muted">Our team will review your request and get back to you shortly.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <h2 id="request-course-title" className="text-lg font-semibold text-ink">
              Request a course
            </h2>
            <label className="flex flex-col gap-[6px]">
              <span className="flex gap-[2px] text-sm font-medium text-ink">
                Course Title <span className="text-[#ff5025]">*</span>
              </span>
              <input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., 2026 Technical Skills Initiative" />
            </label>
            <label className="flex flex-col gap-[6px]">
              <span className="flex gap-[2px] text-sm font-medium text-ink">
                Course Description <span className="text-[#ff5025]">*</span>
              </span>
              <textarea
                className={cx(inputClass, 'h-24 resize-none py-3')}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Write brief description of the course and what it should contain"
              />
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={close} className="flex h-[38px] flex-1 items-center justify-center rounded-lg border border-primary-text text-sm font-medium text-primary-text sm:h-[43px]">
                Schedule a meeting
              </button>
              <button
                type="button"
                disabled={!title.trim() || !description.trim()}
                onClick={() => setSent(true)}
                className="flex h-[38px] flex-1 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white transition-opacity disabled:opacity-40 sm:h-[43px]"
              >
                Send Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
