import { useEffect, useState } from 'react';
import { CourseOverview } from '../course/CourseOverview';
import { LessonsPanel } from '../course/LessonsPanel';
import { Drawer } from '../ui/Drawer';
import { cx } from '../../lib/format';
import type { Course } from '../../lib/types';

type Tab = 'overview' | 'lessons';

type Props = {
  course: Course | null;
  onClose: () => void;
  onContinue: () => void;
};

export const CourseDetailsDrawer = ({ course, onClose, onContinue }: Props) => {
  const [tab, setTab] = useState<Tab>('overview');
  const [displayCourse, setDisplayCourse] = useState<Course | null>(course);
  const open = Boolean(course);

  useEffect(() => {
    if (course) {
      setDisplayCourse(course);
      setTab('overview');
    }
  }, [course]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      titleId="course-details-title"
      title="Course details"
      headerExtra={
        <div className="flex items-center px-6">
          {(['overview', 'lessons'] as Tab[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              aria-selected={tab === item}
              className={cx(
                'flex-1 px-5 py-3 text-center text-base capitalize',
                tab === item ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted hover:text-ink',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      }
      footer={
        <>
          <button type="button" onClick={onClose} className="flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text">
            Cancel
          </button>
          <button type="button" onClick={onContinue} className="flex h-11 w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white">
            Continue
          </button>
        </>
      }
    >
      {displayCourse ? (
        <div className="-mx-6 -mt-5 flex flex-col">
          <div className="relative h-[206px] w-full shrink-0">
            <img src={displayCourse.image} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
          {tab === 'overview' ? (
            <CourseOverview course={displayCourse} />
          ) : (
            <div className="p-5 sm:p-8">
              <LessonsPanel course={displayCourse} />
            </div>
          )}
        </div>
      ) : null}
    </Drawer>
  );
};
