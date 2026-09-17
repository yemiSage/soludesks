import { useMemo, useState } from 'react';
import { DocumentDownload, Profile2User, SearchNormal1, Star1 } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { Pagination } from '../../components/ui/Pagination';
import { cx } from '../../lib/format';
import { trainerLearners, type TrainerLearner } from '../../lib/trainerData';

const PAGE_SIZE = 10;

const statusStyle: Record<TrainerLearner['status'], string> = {
  Ongoing: 'text-[#0a60e1]',
  Completed: 'text-[#15803d]',
  'On Hold': 'text-[#b45309]',
  'Dropped Out': 'text-[#b91c1c]',
};

export const TrainerLearners = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => trainerLearners.filter((learner) => learner.name.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const completed = trainerLearners.filter((l) => l.status === 'Completed').length;
  const topPerformers = Math.round(trainerLearners.length * 0.47);
  const avgCompletion = trainerLearners.length ? Math.round((completed / trainerLearners.length) * 100) : 0;

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">My Learners</h1>
          <p className="text-sm text-muted">Track learners progress, performance, and engagement</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
            <span className="flex size-11 items-center justify-center rounded-lg bg-[#dcfce7]">
              <Profile2User size={20} variant="Bold" color="#15803d" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted">Total Learners</span>
              <span className="text-xl font-semibold text-ink">{trainerLearners.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
            <span className="flex size-11 items-center justify-center rounded-lg bg-[#ede9fe]">
              <Star1 size={20} variant="Bold" color="#7c3aed" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted">Top Performers</span>
              <span className="text-xl font-semibold text-ink">{topPerformers}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
            <span className="flex size-11 items-center justify-center rounded-lg bg-[#ede9fe]">
              <Star1 size={20} variant="Bold" color="#7c3aed" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted">Avg Completion</span>
              <span className="text-xl font-semibold text-ink">{avgCompletion}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 sm:w-[280px]">
            <SearchNormal1 size={18} variant="Linear" color="currentColor" className="text-muted" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="w-full text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
          <button type="button" className="flex items-center gap-2 text-sm font-medium text-primary-text">
            <DocumentDownload size={18} variant="Linear" color="currentColor" />
            Export Learners
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-line-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line-soft bg-[#fafafa] text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Progress</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((learner) => (
                <tr key={learner.id} className="border-b border-line-soft last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={learner.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="font-medium text-ink">{learner.name}</span>
                        <span className="text-xs text-muted">{learner.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink">{learner.course}</td>
                  <td className="px-4 py-3 text-ink">{learner.progress}</td>
                  <td className="px-4 py-3">
                    <span className={cx('flex items-center gap-1.5 font-medium', statusStyle[learner.status])}>
                      <span className="size-1.5 rounded-full bg-current" />
                      {learner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </PortalLayout>
  );
};
