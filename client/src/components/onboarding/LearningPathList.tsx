import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/format';
import type { LearningPathStep } from '../../lib/onboarding';
import { CheckIcon } from './icons';

export type PathStepStatus = 'done' | 'current' | 'upcoming';

export type PathListItem = LearningPathStep & {
  status: PathStepStatus;
  /** Lesson completion for the step's course (0–100); only the current step shows it once under way. */
  progress?: number;
  to: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const tagFor = (item: PathListItem) => {
  if (item.status === 'done') return { label: 'COMPLETED', className: 'bg-[#e9f9ea] text-[#00a80b]' };
  if (item.status === 'current') {
    return item.progress ? { label: 'IN PROGRESS', className: 'bg-[#eff6ff] text-primary' } : { label: 'START HERE', className: 'bg-[#eff6ff] text-primary' };
  }
  return null;
};

/**
 * The numbered step-by-step course list from the assessment's "Your suggested learning path"
 * screen. The dashboard reuses it with live statuses so both surfaces stay visually identical.
 */
export const LearningPathList = ({ items }: { items: PathListItem[] }) => (
  <div className="flex w-full flex-col">
    {items.map((item, index) => {
      const current = item.status === 'current';
      const done = item.status === 'done';
      const tag = tagFor(item);
      return (
        <div key={item.step} className={cx('flex w-full flex-col items-start gap-3 sm:flex-row sm:gap-6', index < items.length - 1 && 'pb-8')}>
          <div className="flex shrink-0 items-center gap-3">
            <span className={cx('text-sm leading-5 font-semibold sm:w-[52px] sm:text-right', current ? 'text-primary-text' : done ? 'text-ink' : 'text-muted')}>
              Step {item.step}
            </span>
            <span
              className={cx(
                'flex size-6 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold',
                done ? 'bg-[#00ca0d] text-white' : current ? 'bg-primary text-white' : 'border-2 border-[#dbeafe] bg-white text-muted',
              )}
              aria-label={done ? 'Completed' : undefined}
            >
              {done ? <CheckIcon className="size-3.5" /> : item.step}
            </span>
          </div>

          <Link
            to={item.to}
            onClick={item.onClick}
            className={cx(
              'lift-hover flex w-full min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-row sm:gap-5',
              current ? 'border-[1.5px] border-primary' : 'border-[#e2e8f0]',
            )}
          >
            <img src={item.image} alt="" className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-[90px] sm:w-[120px]" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base leading-6 font-semibold text-ink">{item.title}</p>
                {tag ? <span className={cx('shrink-0 rounded px-2.5 py-1 text-[11px] font-bold', tag.className)}>{tag.label}</span> : null}
              </div>
              <p className="text-sm leading-5 text-muted">{item.description}</p>
              <p className="text-xs leading-[18px] font-medium text-[var(--sematic-buttons-greysolid-1)]">
                Duration: {item.duration} • Level: {item.level}
              </p>
              {current && item.progress ? (
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-strong">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-primary-text">{item.progress}%</span>
                </div>
              ) : null}
            </div>
          </Link>
        </div>
      );
    })}
  </div>
);
