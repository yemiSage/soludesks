import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown2 } from 'iconsax-react';
import { StarIcon } from '../course/icons';
import { Drawer } from '../ui/Drawer';
import { api } from '../../lib/api';
import { emptyCourseFilters, levels, PRICE_MAX, PRICE_MIN, type CourseFilters, type Level } from '../../lib/courseFilters';
import { cx, formatPrice } from '../../lib/format';

type Props = { open: boolean; onClose: () => void; filters: CourseFilters; onApply: (filters: CourseFilters) => void };

const levelLabels: Record<Level, string> = { Beginner: 'Beginners', Intermediate: 'Intermediate', Advanced: 'Expert' };
const ratingOptions = [5, 4, 3, 2, 1];

export const FilterCoursesModal = ({ open, onClose, filters, onApply }: Props) => {
  const [draft, setDraft] = useState<CourseFilters>(filters);
  const categories = useQuery({ queryKey: ['categories'], queryFn: api.categories, enabled: open });
  const pathways = useQuery({ queryKey: ['pathways'], queryFn: api.pathways, enabled: open });

  const pillClass = (active: boolean) =>
    cx(
      'flex h-10 min-w-[90px] flex-1 items-center justify-center rounded-lg border px-3 text-sm sm:min-w-[130px] sm:flex-none',
      active ? 'border-primary-text bg-[#eaf3ff] text-primary-text font-medium' : 'border-line-strong text-muted',
    );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      titleId="filter-courses-title"
      title="Filter Courses"
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              setDraft(emptyCourseFilters);
              onApply(emptyCourseFilters);
            }}
            className="flex h-12 w-full items-center justify-center rounded-lg border border-primary-text text-base text-primary-text sm:w-[187px]"
          >
            Clear Filter
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white sm:w-[187px]"
          >
            Apply Filters
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Category</span>
          <div className="relative">
            <select
              className="h-10 w-full appearance-none rounded-lg border border-line-strong bg-white px-4 pr-10 text-sm text-ink focus:border-primary-text focus:outline-none"
              value={draft.category ?? ''}
              onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value || null }))}
            >
              <option value="">Select category</option>
              {(categories.data?.items ?? []).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ArrowDown2 size={20} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Pathway</span>
          <div className="relative">
            <select
              className="h-10 w-full appearance-none rounded-lg border border-line-strong bg-white px-4 pr-10 text-sm text-ink focus:border-primary-text focus:outline-none"
              value={draft.pathway ?? ''}
              onChange={(event) => setDraft((current) => ({ ...current, pathway: event.target.value || null }))}
            >
              <option value="">Select pathway</option>
              {(pathways.data?.items ?? []).map((pathway) => (
                <option key={pathway.id} value={pathway.id}>
                  {pathway.name}
                </option>
              ))}
            </select>
            <ArrowDown2 size={20} variant="Linear" color="currentColor" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
          </div>
        </label>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Price Range</span>
          <p className="text-xs text-muted">
            {formatPrice(draft.minPrice)} - {draft.maxPrice >= PRICE_MAX ? `${formatPrice(PRICE_MAX)}+` : formatPrice(draft.maxPrice)}
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100_000}
              value={draft.minPrice}
              onChange={(event) => setDraft((current) => ({ ...current, minPrice: Math.min(Number(event.target.value), current.maxPrice) }))}
              className="w-full accent-primary-text"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100_000}
              value={draft.maxPrice}
              onChange={(event) => setDraft((current) => ({ ...current, maxPrice: Math.max(Number(event.target.value), current.minPrice) }))}
              className="w-full accent-primary-text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Level</span>
          <div className="flex flex-wrap gap-3">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDraft((current) => ({ ...current, level: current.level === level ? null : level }))}
                className={pillClass(draft.level === level)}
              >
                {levelLabels[level]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Practice Test</span>
          <div className="flex gap-3">
            {(['Yes', 'No'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDraft((current) => ({ ...current, practiceTest: current.practiceTest === option ? null : option }))}
                className={pillClass(draft.practiceTest === option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Rating</span>
          <div className="flex flex-col gap-3">
            {ratingOptions.map((rating) => (
              <label key={rating} className="flex items-center gap-2.5 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={draft.minRating === rating}
                  onChange={() => setDraft((current) => ({ ...current, minRating: current.minRating === rating ? null : rating }))}
                  className="size-4 accent-primary-text"
                />
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon key={index} className="size-[15px]" style={{ color: index < rating ? '#fa8500' : '#e5e5e5' }} />
                  ))}
                </span>
                {rating === 5 ? '5 stars only' : `${rating} stars and above`}
              </label>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
