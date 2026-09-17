import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { cx } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import { CourseCard } from './CourseCard';

type Props = {
  search: string;
  category: string | null;
  onCategoryChange: (category: string | null) => void;
  onClearSearch: () => void;
};

export const CourseCatalog = ({ search, category, onCategoryChange, onClearSearch }: Props) => {
  const categories = useQuery({ queryKey: ['categories'], queryFn: api.categories });
  const courses = useQuery({
    queryKey: ['courses', { category, search }],
    queryFn: () => api.courses({ category: category ?? undefined, q: search || undefined, limit: 12 }),
  });

  const items = courses.data?.items ?? [];

  return (
    <section id="catalogue" className="shell flex flex-col items-center gap-[60px] py-[60px]">
      <SectionHeading
        title="Master key skills for your career and life."
        description="Soludesk LarnHub empowers you to quickly acquire in-demand skills and elevate your career in today's evolving job landscape."
      />

      <div className="flex w-full flex-col gap-3 rounded-xl border-0 border-line-strong bg-[#fafafa] p-0 sm:gap-8 sm:rounded-3xl sm:border-[1.5px] sm:p-8">
        <div className="-mx-3 flex w-[calc(100%+24px)] max-w-none touch-pan-x gap-3 overflow-x-auto overscroll-x-contain px-3 pb-1 scroll-smooth scrollbar-none sm:mx-0 sm:w-full sm:max-w-full sm:px-0 lg:justify-between">
          {(categories.data?.items ?? []).map((chip) => {
            const active = chip.id === category;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onCategoryChange(active ? null : chip.id)}
                aria-pressed={active}
                className={cx(
                  'shrink-0 rounded-[32px] border px-5 py-2.5 text-sm leading-[1.5] font-semibold transition-colors sm:text-base',
                  active
                    ? 'border-[var(--sematic-interactivecomponents-primaryic-2)] bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text'
                    : 'border-[#d6d6d6] text-[#2c3e50] hover:border-primary hover:text-primary-text',
                )}
              >
                {chip.name}
              </button>
            );
          })}
        </div>

        {search ? (
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            Showing results for <span className="font-semibold text-ink">“{search}”</span>
            <button type="button" onClick={onClearSearch} className="font-semibold text-primary-text underline">
              clear
            </button>
          </p>
        ) : null}

        {courses.isPending ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[293px] animate-pulse rounded-xl border border-line bg-line-soft" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted sm:text-base">
            No courses match that search yet — try another skill or category.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-5">
            {items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
