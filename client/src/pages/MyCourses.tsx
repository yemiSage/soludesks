import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star1 } from 'iconsax-react';
import { Faq } from '../components/home/Faq';
import { Pagination } from '../components/ui/Pagination';
import { api } from '../lib/api';
import { formatPrice } from '../lib/format';
import { enrolledCourses } from '../lib/myCoursesData';

const RECOMMENDED_PAGE_SIZE = 12;

export const MyCourses = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const catalog = useQuery({ queryKey: ['courses', 'all'], queryFn: () => api.courses({ limit: 48 }) });
  const recommended = useQuery({
    queryKey: ['courses', 'recommended', page],
    queryFn: () => api.courses({ page, limit: RECOMMENDED_PAGE_SIZE }),
  });

  const bySlug = new Map((catalog.data?.items ?? []).map((course) => [course.slug, course]));
  const continueLearning = enrolledCourses.map((entry) => ({ entry, course: bySlug.get(entry.slug) })).filter((row) => row.course);

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-8">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">My Courses</h1>
        </button>

        <section className="flex flex-col gap-5">
          <h2 className="text-2xl leading-8 font-semibold text-ink">Continue Learning</h2>
          {continueLearning.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {continueLearning.map(({ entry, course }) => (
                <Link
                  key={entry.slug}
                  to={`/courses/${entry.slug}/learn`}
                  className="flex flex-col overflow-hidden rounded-xl border border-line-strong bg-[#f8f8f8]"
                >
                  <div className="relative h-32 w-full">
                    <img src={course!.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="flex flex-col gap-6 p-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold text-ink">{course!.title}</p>
                      <p className="line-clamp-2 h-[41px] text-sm text-muted">{course!.summary}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-t border-[#f3f3f3] pt-2">
                      <div className="h-[7px] w-full overflow-hidden rounded-full bg-[#ebebeb]">
                        <div className="h-full rounded-full" style={{ width: `${entry.progress}%`, background: entry.color }} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#666]">
                        <span>{entry.progressLabel}</span>
                        <span>{entry.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-line-strong bg-[#f8f8f8] py-16 text-center">
              <p className="text-base text-muted">You haven&apos;t enrolled in any course yet.</p>
              <Link
                to="/explore"
                className="flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white"
              >
                Explore courses
              </Link>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl leading-8 font-semibold text-ink">Recommended Courses</h2>
            <p className="text-sm text-muted">Explore courses recommended to you based on your recent activity.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-5">
            {(recommended.data?.items ?? []).map((course) => (
              <Link key={course.id} to={`/courses/${course.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface">
                <div className="relative h-32 w-full overflow-hidden">
                  <img src={course.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-0">
                  <div className="flex flex-col px-3 py-2">
                    <h3 className="truncate text-sm font-semibold text-ink">{course.title}</h3>
                    <p className="line-clamp-2 h-[41px] text-sm text-muted">{course.summary}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-line-soft p-3">
                    <span className="flex items-center gap-1 rounded-full bg-line-strong px-2 py-1">
                      <Star1 size={16} variant="Bold" color="#fa8500" />
                      <span className="text-sm font-medium text-muted">{course.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-sm font-bold text-primary-text">{formatPrice(course.priceNgn)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between">
            <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted">Show {RECOMMENDED_PAGE_SIZE}/page</span>
            <Pagination page={page} pageCount={recommended.data?.pages ?? 1} onChange={setPage} />
          </div>
        </section>

        <Faq />
      </div>
    </main>
  );
};
