import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add, SearchNormal1 } from 'iconsax-react';
import { NewCourseDrawer } from '../../components/trainer/NewCourseDrawer';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { Pagination } from '../../components/ui/Pagination';
import { cx, formatPrice } from '../../lib/format';
import { trainerCourses, type TrainerCourseStatus } from '../../lib/trainerData';

const PAGE_SIZE = 6;

const statusStyle: Record<TrainerCourseStatus, string> = {
  Draft: 'text-muted',
  'In Review': 'text-[#b45309]',
  Published: 'text-[#15803d]',
  Rejected: 'text-[#b91c1c]',
};

const statusDot: Record<TrainerCourseStatus, string> = {
  Draft: 'bg-muted',
  'In Review': 'bg-[#f59e0b]',
  Published: 'bg-[#22c55e]',
  Rejected: 'bg-[#ef4444]',
};

export const TrainerCourses = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(
    () => trainerCourses.filter((course) => course.title.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalEnrollments = trainerCourses.reduce((sum, course) => sum + course.applicants, 0);
  const activeLearners = trainerCourses.reduce((sum, course) => sum + course.activeLearners, 0);
  const avgCompletion = Math.round(trainerCourses.reduce((sum, course) => sum + course.avgCompletion, 0) / trainerCourses.length);

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-ink sm:text-2xl">Course Management</h1>
            <p className="text-sm text-muted">Create, organize, and assign courses to teams and individuals</p>
          </div>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white"
          >
            <Add size={18} variant="Linear" color="currentColor" />
            New Course
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total courses', value: trainerCourses.length },
            { label: 'Total Enrollments', value: totalEnrollments },
            { label: 'Active Learners', value: activeLearners },
            { label: 'Avg Completion', value: `${avgCompletion}%` },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 rounded-xl border border-line-soft p-4">
              <span className="text-xs text-muted">{stat.label}</span>
              <span className="text-xl font-semibold text-ink">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 sm:w-[320px]">
          <SearchNormal1 size={18} variant="Linear" color="currentColor" className="text-muted" />
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

        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">No courses match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((course) => (
              <Link
                key={course.id}
                to={`/trainer/courses/${course.id}`}
                className="lift-hover flex flex-col overflow-hidden rounded-xl border border-line-soft"
              >
                <div className="h-[140px] w-full overflow-hidden">
                  <img src={course.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-sm font-semibold text-ink">{course.title}</p>
                  <p className="line-clamp-2 text-xs leading-5 text-muted">{course.summary}</p>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className={cx('flex items-center gap-1.5 font-medium', statusStyle[course.status])}>
                      <span className={cx('size-1.5 rounded-full', statusDot[course.status])} />
                      {course.status}
                    </span>
                    <span className="font-bold text-primary-text">{formatPrice(course.priceNgn)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>

      <NewCourseDrawer open={creating} onClose={() => setCreating(false)} />
    </PortalLayout>
  );
};
