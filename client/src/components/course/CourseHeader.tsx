import { useNavigate } from 'react-router-dom';
import type { Course } from '../../lib/types';
import { ArrowLeftIcon, StarIcon } from './icons';

type Props = { course: Course; onReviewsClick: () => void };

export const CourseHeader = ({ course, onReviewsClick }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-text p-0 text-white sm:size-auto sm:p-2.5"
        >
          <ArrowLeftIcon className="size-4 sm:size-6" />
        </button>
        <h1 className="text-xl leading-7 font-medium text-ink sm:text-2xl sm:leading-8">{course.title}</h1>
      </div>

      <button
        type="button"
        onClick={onReviewsClick}
        className="flex shrink-0 items-center gap-3 rounded-full bg-line-strong px-3 py-1 transition-colors hover:bg-line-strong/70"
      >
        <span className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className="-mr-1.5 size-6 text-[#fa8500] last:mr-0"
              style={{ opacity: index < Math.round(course.rating) ? 1 : 0.35 }}
            />
          ))}
        </span>
        <span className="text-base leading-6 font-medium text-ink">{course.rating.toFixed(1)}</span>
        <span className="text-sm leading-5 font-normal text-muted">({course.reviews.toLocaleString()} Reviews)</span>
      </button>
    </div>
  );
};
