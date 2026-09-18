import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { cx } from '../../lib/format';
import { StarIcon } from './icons';

type Props = { open: boolean; onClose: () => void; onSubmit: (review: { rating: number; comment: string }) => void };

export const LeaveReviewModal = ({ open, onClose, onSubmit }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submit = () => {
    if (!rating) return;
    onSubmit({ rating, comment: comment.trim() });
    setRating(0);
    setComment('');
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      titleId="leave-review-title"
      title="Leave a review"
      footer={
        <>
          <button type="button" onClick={onClose} className="flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text">
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!rating}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white transition-opacity disabled:opacity-30 sm:w-[212px]"
          >
            Rate
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">
            How will you rate the course? <span className="text-[#ff5025]">*</span>
          </span>
          <div className="flex items-center gap-4">
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              return (
                <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} star${value > 1 ? 's' : ''}`}>
                  <StarIcon className={cx('size-6', value <= rating ? 'text-[#fa8500]' : 'text-line-strong')} />
                </button>
              );
            })}
          </div>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Other Observation/Feedback</span>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Describe your experience (optional)"
            className="h-[185px] resize-none rounded-lg border border-line-strong px-3 py-4 text-sm text-ink placeholder:text-[#b3b3b3] focus:border-primary-text focus:outline-none"
          />
        </label>
      </div>
    </Drawer>
  );
};
