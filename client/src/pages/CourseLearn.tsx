import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CourseLearnSidebar } from '../components/course/CourseLearnSidebar';
import { CourseOverview } from '../components/course/CourseOverview';
import { CourseSpace } from '../components/course/CourseSpace';
import { ArrowLeftIcon, PlayIcon } from '../components/course/icons';
import { api } from '../lib/api';
import { allLessons, useCourseProgress } from '../lib/courseProgress';
import { cx } from '../lib/format';
import { useToast } from '../lib/toast';

type Tab = 'overview' | 'content' | 'space';
const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'content', label: 'Course Content' },
  { id: 'space', label: 'Course Space' },
];

export const CourseLearn = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => api.course(slug as string),
    enabled: Boolean(slug),
  });

  const [tab, setTab] = useState<Tab>('overview');
  // Lesson completion persists per course, so the dashboard's learning path can track it —
  // and reopening the player resumes at the first lesson still to do.
  const { completed, markLessonComplete } = useCourseProgress(slug ?? '');
  const [activeLesson, setActiveLesson] = useState<string>(() => allLessons.find((lesson) => !completed.has(lesson)) ?? allLessons[0] ?? '');

  const lessonIndex = allLessons.indexOf(activeLesson);
  const lessonBody = useMemo(
    () =>
      data?.course
        ? `This lesson walks through ${activeLesson.toLowerCase()} for ${data.course.title}, taught by ${data.course.instructor}. Watch the video above, then work through the notes below at your own pace before marking the lesson complete.`
        : '',
    [activeLesson, data?.course],
  );

  if (!slug) return <Navigate to="/my-courses" replace />;
  if (isError) return <Navigate to="/my-courses" replace />;
  if (isLoading || !data) {
    return <div className="shell pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-24 text-center text-muted">Loading course…</div>;
  }

  const { course } = data;

  const markComplete = () => {
    const finishesCourse = !completed.has(activeLesson) && completed.size + 1 >= allLessons.length;
    markLessonComplete(activeLesson);
    showToast(finishesCourse ? 'Course completed! Your learning path has been updated.' : 'Lesson marked as complete.');
    const next = allLessons[lessonIndex + 1];
    if (next) setActiveLesson(next);
  };

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate('/my-courses')} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeftIcon className="size-6" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">{course.title}</h1>
        </button>

        <div className={cx('flex flex-col gap-5', tab !== 'overview' && 'lg:flex-row lg:items-start')}>
          <div className="flex flex-1 flex-col gap-5">
            <div className="relative h-[260px] w-full overflow-hidden rounded-xl sm:h-[450px]">
              <img src={course.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
              <button
                type="button"
                aria-label="Play lesson video"
                className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(124,124,124,0.4)] p-4 backdrop-blur-md"
              >
                <PlayIcon className="size-6 text-white" />
              </button>
            </div>

            <div className="flex items-center border-b border-line-strong">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={cx(
                    'px-5 py-3 text-base',
                    tab === id ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'overview' ? <CourseOverview course={course} /> : null}

            {tab === 'content' ? (
              <div className="flex flex-col gap-8 rounded-xl border-[1.5px] border-line-strong bg-white p-5">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-primary-text">
                    Lesson {lessonIndex + 1}: {activeLesson}
                  </p>
                  <p className="text-[15px] leading-6 text-muted">{lessonBody}</p>
                </div>
                <button
                  type="button"
                  onClick={markComplete}
                  disabled={completed.has(activeLesson)}
                  className="flex h-[38px] items-center justify-center self-start rounded-lg bg-primary-text px-6 text-base font-medium text-white transition-opacity disabled:opacity-40 sm:h-[43px]"
                >
                  {completed.has(activeLesson) ? 'Completed' : 'Mark as complete'}
                </button>
              </div>
            ) : null}

            {tab === 'space' ? <CourseSpace /> : null}
          </div>

          {tab !== 'overview' ? (
            <CourseLearnSidebar
              totalLessons={allLessons.length}
              activeLesson={activeLesson}
              completed={completed}
              onSelect={(lesson) => {
                setActiveLesson(lesson);
                setTab('content');
              }}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
};
