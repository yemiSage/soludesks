import { Link } from 'react-router-dom';
import { progressFor, useProgressMap } from '../../lib/courseProgress';
import { useSavedLearningPath } from '../../lib/learningPath';
import { LearningPathList, type PathListItem } from '../onboarding/LearningPathList';

/**
 * The learner's recommended path from the assessment, tracked live: finished courses get a
 * check, the next one is highlighted, and every step links straight into its course.
 */
export const LearningPathPanel = () => {
  const path = useSavedLearningPath();
  const progress = useProgressMap();

  if (!path) {
    return (
      <section className="flex flex-col gap-4 rounded-xl border-[1.5px] border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg leading-7 font-semibold text-ink">Not sure what to learn next?</h2>
          <p className="text-sm leading-5 text-muted">
            Take a short assessment and we&apos;ll map out a step-by-step learning path you can track from here.
          </p>
        </div>
        <Link
          to="/get-started"
          className="flex h-[38px] shrink-0 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-primary-strong sm:h-[43px]"
        >
          Find my learning path
        </Link>
      </section>
    );
  }

  const steps = path.steps.map((step) => ({ step, ...progressFor(progress, step.slug) }));
  const currentIndex = steps.findIndex((entry) => entry.status !== 'completed');
  const completedCount = steps.filter((entry) => entry.status === 'completed').length;
  const overall = Math.round(steps.reduce((total, entry) => total + entry.percent, 0) / steps.length);

  const items: PathListItem[] = steps.map((entry, index) => ({
    ...entry.step,
    status: entry.status === 'completed' ? 'done' : index === currentIndex ? 'current' : 'upcoming',
    progress: entry.percent,
    // Courses already under way open in the player; untouched ones start from the course page.
    to: entry.status === 'not-started' ? `/courses/${entry.step.slug}` : `/courses/${entry.step.slug}/learn`,
  }));

  return (
    <section className="flex flex-col gap-5 overflow-hidden rounded-xl border-[1.5px] border-line">
      <div className="flex flex-col gap-4 px-5 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg leading-7 font-semibold text-ink">Your learning path</h2>
            <p className="text-sm leading-5 text-muted">
              {completedCount === steps.length
                ? 'You’ve completed every course on this path — well done!'
                : `${completedCount} of ${steps.length} courses completed · ${path.level} level`}
            </p>
          </div>
          <Link to="/get-started" className="text-base leading-7 font-semibold text-primary-text">
            Retake assessment
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-line-strong">
            <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${overall}%` }} />
          </div>
          <span className="text-sm font-semibold text-primary-text">{overall}%</span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <LearningPathList items={items} />
      </div>
    </section>
  );
};
