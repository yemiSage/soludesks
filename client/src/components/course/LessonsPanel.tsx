import { useState } from 'react';
import { courseModules } from '../../lib/courseModules';
import { cx } from '../../lib/format';
import type { Course } from '../../lib/types';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

export const LessonsPanel = ({ course }: { course: Course }) => {
  const [openModule, setOpenModule] = useState(courseModules[0]?.name ?? null);

  return (
    <div id="lessons-panel" className="flex w-full scroll-mt-[calc(var(--nav-h)+20px)] flex-col overflow-hidden rounded-xl border-[1.5px] border-line py-1">
      <div className="border-b-[1.5px] border-line px-5 pt-2.5 pb-2.5">
        <span className="text-sm leading-5 font-medium text-muted">Lessons (0/{course.lessons})</span>
      </div>

      <div className="flex max-h-[420px] flex-col overflow-y-auto py-1">
        {courseModules.map((module) => {
          const open = module.name === openModule;
          return (
            <div key={module.name} className="border-b border-line-soft last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenModule(open ? null : module.name)}
                aria-expanded={open}
                className="flex w-full items-center gap-5 px-5 py-3 text-left"
              >
                <span className="flex-1 text-base leading-6 font-semibold text-ink">{module.name}</span>
                {open ? (
                  <ChevronUpIcon className="size-6 shrink-0 text-muted" />
                ) : (
                  <ChevronDownIcon className="size-6 shrink-0 text-muted" />
                )}
              </button>

              {open ? (
                <div className="flex flex-col gap-1 pb-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson} className={cx('mx-3 flex items-center rounded-lg px-2 py-2 text-sm leading-5 text-muted')}>
                      {lesson}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
