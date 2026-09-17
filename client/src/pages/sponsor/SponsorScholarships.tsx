import { useState } from 'react';
import { Add, Book, Calendar, Profile2User, ProfileTick, TrendUp } from 'iconsax-react';
import { CreateScholarshipDrawer } from '../../components/sponsor/CreateScholarshipDrawer';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { Pagination } from '../../components/ui/Pagination';
import { cx } from '../../lib/format';
import { sponsorPrograms, type ScholarshipStatus } from '../../lib/sponsorData';

const PAGE_SIZE = 6;

const statusStyle: Record<ScholarshipStatus, string> = {
  Active: 'bg-[#f0fdf4] text-[#15803d]',
  Upcoming: 'bg-[#fffbeb] text-[#b45309]',
  Closed: 'bg-line-soft text-muted',
};

const money = (value: number) => `$${value.toLocaleString()}`;

export const SponsorScholarships = () => {
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);

  const pageCount = Math.max(1, Math.ceil(sponsorPrograms.length / PAGE_SIZE));
  const items = sponsorPrograms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalCourses = sponsorPrograms.reduce((sum, program) => sum + program.courses, 0);
  const totalLearners = sponsorPrograms.reduce((sum, program) => sum + program.participants, 0);
  const utilised = Math.round(
    (sponsorPrograms.reduce((sum, p) => sum + p.spent, 0) / sponsorPrograms.reduce((sum, p) => sum + p.budget, 0)) * 100,
  );

  return (
    <PortalLayout role="sponsor">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-ink sm:text-2xl">My Scholarship</h1>
            <p className="text-sm text-muted">Manage your scholarship programs and track learner progress</p>
          </div>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white sm:h-[43px]"
          >
            <Add size={18} variant="Linear" color="currentColor" />
            Create Scholarship
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Book, tint: '#e9e6ff', label: 'Total courses', value: String(totalCourses) },
            { icon: ProfileTick, tint: '#dff4ff', label: 'Total Learners', value: String(totalLearners) },
            { icon: TrendUp, tint: '#ffe9dd', label: 'Completion Rate', value: `${utilised}%` },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: stat.tint }}>
                <stat.icon size={20} variant="Bold" color="#202020" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-muted">{stat.label}</span>
                <span className="text-xl font-semibold text-ink">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((program) => {
            const used = Math.round((program.spent / program.budget) * 100);
            return (
              <article key={program.id} className="lift-hover flex flex-col gap-3 rounded-xl border border-line-soft p-4">
                <span className={cx('w-fit rounded-full px-2.5 py-1 text-xs font-medium', statusStyle[program.status])}>● {program.status}</span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold text-ink">{program.title}</h2>
                  <p className="text-xs text-muted">{program.summary}</p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-muted">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} variant="Linear" color="currentColor" />
                    {program.startDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Book size={14} variant="Linear" color="currentColor" />
                    {program.courses}
                  </span>
                  <span className="flex items-center gap-2">
                    <Profile2User size={14} variant="Linear" color="currentColor" />
                    {program.participants} participants
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-ink">
                    <span>
                      {money(program.spent)} / {money(program.budget)}
                    </span>
                    <span className="text-[#d54600]">{money(program.budget - program.spent)} remaining</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${used}%` }} />
                  </div>
                  <span className="text-[11px] text-muted">{used}% utilized</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>

      <CreateScholarshipDrawer open={creating} onClose={() => setCreating(false)} />
    </PortalLayout>
  );
};
