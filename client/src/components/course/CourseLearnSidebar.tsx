import { useState } from 'react';
import { courseModules } from '../../lib/courseModules';
import { cx } from '../../lib/format';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from './icons';

type Props = { totalLessons: number; activeLesson: string; completed: Set<string>; onSelect: (lesson: string) => void };

/** Interactive twin of LessonsPanel used inside the post-enrol course player — adds active/completed lesson state. */
export const CourseLearnSidebar = ({ totalLessons, activeLesson, completed, onSelect }: Props) => {
  const [openModule, setOpenModule] = useState(courseModules[0]?.name ?? null);

  return (
    <div className="flex h-full w-full shrink-0 flex-col overflow-hidden rounded-xl border-[1.5px] border-line-strong lg:w-[407px]">
      <div className="border-b-[1.5px] border-line-strong px-5 pt-2.5 pb-2.5">
        <span className="text-sm leading-5 font-medium text-muted">
          Lessons ({completed.size}/{totalLessons})
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto py-1">
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
                <span className="flex-1 text-base leading-6 font-medium text-ink">{module.name}</span>
                {open ? <ChevronUpIcon className="size-6 shrink-0 text-muted" /> : <ChevronDownIcon className="size-6 shrink-0 text-muted" />}
              </button>

              {open ? (
                <div className="flex flex-col gap-1 px-3 pb-2">
                  {module.lessons.map((lesson) => {
                    const active = lesson === activeLesson;
                    const done = completed.has(lesson);
                    return (
                      <button
                        key={lesson}
                        type="button"
                        onClick={() => onSelect(lesson)}
                        className={cx(
                          'flex items-center gap-2 rounded-xl px-2 py-2 text-left text-sm leading-5',
                          active ? 'bg-[#eaf3ff] font-medium text-primary-text' : 'text-muted hover:bg-line-soft',
                        )}
                      >
                        {done ? <CheckCircleIcon className="size-4 shrink-0 text-[#00ca0d]" /> : null}
                        {lesson}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
