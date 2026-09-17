import { useState } from 'react';
import { useToast } from '../../lib/toast';
import type { Course, Review } from '../../lib/types';
import { LeaveReviewModal } from './LeaveReviewModal';
import { ReviewCard } from './ReviewCard';
import { StarRating } from './StarRating';

type Props = {
  course: Course;
  reviews: Review[];
};

export const CourseReviews = ({ course, reviews }: Props) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const { showToast } = useToast();
  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    return { stars, count, pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <div className="flex w-full flex-col gap-8 p-6 sm:p-8">
      <div className="flex flex-col gap-8 border-b border-line-soft pb-8 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center gap-2 sm:w-[180px] sm:shrink-0">
          <span className="text-[40px] leading-[48px] font-semibold text-ink">{course.rating.toFixed(1)}</span>
          <StarRating rating={course.rating} size={20} />
          <span className="text-sm leading-5 text-muted">{course.reviews.toLocaleString()} reviews</span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-xs leading-[18px] font-medium text-muted">{row.stars} star</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-line-soft">
                <span className="block h-full rounded-full bg-[#fa8500]" style={{ width: `${row.pct}%` }} />
              </span>
              <span className="w-8 shrink-0 text-right text-xs leading-[18px] text-muted">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      {reviews.length ? (
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-muted">Be the first to leave a review for this course.</p>
      )}

      <button
        type="button"
        onClick={() => setReviewOpen(true)}
        className="flex h-[38px] items-center justify-center self-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]"
      >
        Leave a review
      </button>

      <LeaveReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={() => {
          setReviewOpen(false);
          showToast('Thanks — your review has been submitted.');
        }}
      />
    </div>
  );
};
