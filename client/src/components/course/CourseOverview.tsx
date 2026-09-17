import type { Course } from '../../lib/types';
import { CheckCircleIcon } from './icons';

const learningPoints = [
  'Build real, portfolio-ready projects from start to finish',
  'Apply industry-standard tools and workflows used by professionals',
  'Understand the core concepts and terminology of the field',
  'Get practical, hands-on practice through guided exercises',
  'Learn how to evaluate your own work against real-world standards',
  "Walk away with a certificate you can share on LinkedIn",
];

const requirements = [
  'No prior experience required - this course starts from the basics',
  'A computer with internet access',
  'Enthusiasm to learn and put new skills into practice',
];

export const CourseOverview = ({ course }: { course: Course }) => (
  <div className="flex w-full flex-col gap-8 p-0 sm:p-8">
    <div className="flex flex-col gap-4 rounded-[10px] border-0 border-line-strong p-5 sm:border sm:p-6">
      <h2 className="text-xl leading-7 font-semibold text-ink">What you'll learn</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {learningPoints.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-ink" />
            <p className="text-sm leading-5 text-muted">{point}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <h2 className="text-xl leading-7 font-semibold text-ink">Requirements</h2>
      <ul className="flex flex-col gap-2">
        {requirements.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-5 text-muted">
            <span aria-hidden>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-4">
      <h2 className="text-xl leading-7 font-semibold text-ink">Description</h2>
      <p className="text-[15px] leading-6 text-muted">
        {course.summary} This {course.level.toLowerCase()}-level course is taught by {course.instructor} and covers{' '}
        {course.lessons} lessons across roughly {course.hours} hours of content, with practical exercises throughout
        so what you learn sticks.
      </p>
    </div>
  </div>
);
