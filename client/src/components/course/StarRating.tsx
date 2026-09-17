import { cx } from '../../lib/format';
import { StarIcon } from './icons';

type Props = {
  rating: number;
  size?: number;
  className?: string;
};

/** Renders 5 stars, filled solid up to the given rating (rounded to the nearest whole star). */
export const StarRating = ({ rating, size = 16, className }: Props) => {
  const filled = Math.round(rating);

  return (
    <span className={cx('inline-flex items-center', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          style={{ width: size, height: size }}
          className={index < filled ? 'text-[#fa8500]' : 'text-[#e2e8f0]'}
        />
      ))}
    </span>
  );
};
