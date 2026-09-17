import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Medal, ProfileTick, TrendUp } from 'iconsax-react';
import { PerformanceChart } from '../../components/portal/PerformanceChart';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { useAuth } from '../../lib/auth';
import { trainerCourses, topPerformingStudents } from '../../lib/trainerData';

const StatCard = ({ icon: Icon, tint, label, value }: { icon: typeof Book; tint: string; label: string; value: string }) => (
  <div className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: tint }}>
      <Icon size={20} variant="Bold" color="#202020" />
    </span>
    <div className="flex flex-col">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xl font-semibold text-ink">{value}</span>
    </div>
  </div>
);

export const TrainerDashboard = () => {
  const { user } = useAuth();
  const active = trainerCourses.filter((course) => course.activeLearners > 0);
  const totalLearners = trainerCourses.reduce((sum, course) => sum + course.activeLearners, 0);
  const completionRate = active.length ? Math.round(active.reduce((sum, course) => sum + course.avgCompletion, 0) / active.length) : 0;

  useEffect(() => {
    document.title = 'Dashboard — Soludesk';
  }, []);

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Good morning {user?.firstName ?? 'there'}, 👋</h1>
          {/* Streak history is the same page for every role. */}
          <Link to="/streak" className="flex items-center gap-1 rounded-full bg-[#fff1e6] px-3 py-1 text-xs font-semibold text-[#d54600]">
            🔥 21 Day Streak
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Book} tint="#e9e6ff" label="Total courses" value={String(trainerCourses.length)} />
          <StatCard icon={ProfileTick} tint="#dff4ff" label="Total Learners" value={String(totalLearners)} />
          <StatCard icon={TrendUp} tint="#ffe9dd" label="Completion Rate" value={`${completionRate}%`} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <PerformanceChart />

          <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5">
            <div className="flex items-center gap-2">
              <Medal size={20} variant="Bold" color="#a855f7" />
              <p className="text-base font-semibold text-ink">Top Performing Students</p>
            </div>
            {totalLearners === 0 ? (
              <p className="text-sm text-muted">No data yet — this fills in once learners enroll.</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {topPerformingStudents.map((student, index) => (
                  <li key={student.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink">
                      <span className="text-muted">{index + 1}</span>
                      {student.name}
                    </span>
                    <span className="text-muted">{student.points}points</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};
