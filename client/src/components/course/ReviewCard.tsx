import { avatarColorFor, formatReviewDate, initialsFrom } from '../../lib/format';
import type { Review } from '../../lib/types';
import { StarRating } from './StarRating';

export const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex flex-col gap-3 border-b border-line-soft py-6 last:border-b-0 last:pb-0">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: avatarColorFor(review.name) }}
          aria-hidden
        >
          {initialsFrom(review.name)}
        </span>
        <div className="flex flex-col">
          <span className="text-sm leading-5 font-semibold text-ink">{review.name}</span>
          <span className="text-xs leading-[18px] text-[var(--sematic-buttons-greysolid-1)]">
            {formatReviewDate(review.date)}
          </span>
        </div>
      </div>
      <StarRating rating={review.rating} size={16} />
    </div>
    <p className="text-sm leading-6 text-muted">{review.comment}</p>
  </div>
);
