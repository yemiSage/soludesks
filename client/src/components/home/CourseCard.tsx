import { Link } from 'react-router-dom';
import { useCollections } from '../../hooks/useCollections';
import { cx, formatPrice } from '../../lib/format';
import type { Course } from '../../lib/types';

type Props = {
  course: Course;
  /** `wide` matches the 376px popular-courses card, `compact` the 293px catalogue card. */
  size?: 'compact' | 'wide';
};

export const CourseCard = ({ course, size = 'compact' }: Props) => {
  const { isSaved, toggleWishlist } = useCollections();
  const saved = isSaved(course.id);

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="lift-hover group flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className={cx('relative w-full overflow-hidden', size === 'wide' ? 'h-32 sm:h-[205px]' : 'h-32')}>
        <img
          src={course.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            toggleWishlist(course.id);
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${course.title} from saved courses` : `Save ${course.title}`}
          className="absolute top-3 left-3 flex w-[26px] items-center justify-center rounded p-1 transition-colors"
          style={{ backgroundColor: saved ? 'rgb(213 72 0 / 0.85)' : 'rgb(32 32 32 / 0.4)' }}
        >
          <img src="/assets/icons/heart.svg" alt="" className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-0 sm:gap-6">
        <div className="flex flex-col px-3 py-2 sm:p-3">
          <h3 className="truncate text-sm leading-5 font-semibold text-ink sm:text-base sm:leading-6">{course.title}</h3>
          <p className="line-clamp-2 h-[41px] text-sm leading-5 text-muted">{course.summary}</p>
        </div>

        <div className="flex flex-col items-start gap-2 border-t border-line-soft p-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-line-strong px-1 py-0.5 sm:px-2 sm:py-1">
            <img src="/assets/icons/star.svg" alt="" className="h-[18px] w-[18px]" />
            <span className="text-sm leading-5 font-medium text-muted">{course.rating.toFixed(1)}</span>
          </span>
          <span className="text-sm leading-5 font-bold whitespace-nowrap text-primary-text">
            {formatPrice(course.priceNgn)}
          </span>
        </div>
      </div>
    </Link>
  );
};
