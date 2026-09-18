import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchNormal, Sort } from 'iconsax-react';
import { CourseCard } from '../components/home/CourseCard';
import { Faq } from '../components/home/Faq';
import { FilterCoursesModal } from '../components/home/FilterCoursesModal';
import { Pagination } from '../components/ui/Pagination';
import { api } from '../lib/api';
import { emptyCourseFilters, type CourseFilters } from '../lib/courseFilters';

const PAGE_SIZE = 12;

export const ExploreCourses = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<CourseFilters>(emptyCourseFilters);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const courses = useQuery({
    queryKey: ['courses', 'explore', { search, filters }],
    queryFn: () => api.courses({ q: search || undefined, category: filters.category ?? undefined, pathway: filters.pathway ?? undefined, limit: 48 }),
  });

  const filtered = (courses.data?.items ?? []).filter((course) => {
    if (course.priceNgn < filters.minPrice || course.priceNgn > filters.maxPrice) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.minRating && course.rating < filters.minRating) return false;
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.pathway ? 1 : 0) +
    (filters.level ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.minPrice > emptyCourseFilters.minPrice || filters.maxPrice < emptyCourseFilters.maxPrice ? 1 : 0);

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-3">
            <h1 className="heading-display text-3xl leading-[44px] text-ink sm:text-[48px] sm:leading-[60px]">Explore Courses</h1>
            <p className="text-base leading-6 text-muted">Browse our full catalogue and find the right course for your goals.</p>
          </div>

          <div className="flex w-full max-w-[900px] flex-col items-center gap-3 sm:flex-row">
            <div className="flex h-10 flex-1 items-center gap-2.5 rounded-lg border border-line-strong px-4">
              <SearchNormal size={14} variant="Linear" color="currentColor" className="text-muted" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search Course"
                className="w-full text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setFilterModalOpen(true)}
              className="flex h-11 shrink-0 items-center gap-2.5 rounded-lg border border-line-strong px-5 text-sm text-ink"
            >
              All Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
              <Sort size={20} variant="Linear" color="currentColor" />
            </button>
          </div>
        </div>

        {courses.isPending ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="h-[293px] animate-pulse rounded-xl border border-line bg-line-soft" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted sm:text-base">No courses match your filters — try widening your search.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {visible.map((course) => (
              <CourseCard key={course.id} course={course} size="wide" />
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between">
          <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted">Show {PAGE_SIZE}/page</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>

        <Faq />
      </div>

      <FilterCoursesModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApply={(next) => {
          setFilters(next);
          setFilterModalOpen(false);
          setPage(1);
        }}
      />
    </main>
  );
};
