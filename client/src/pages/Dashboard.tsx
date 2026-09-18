import { Award, Book, Book1, Cup } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { LearningPathPanel } from '../components/dashboard/LearningPathPanel';
import { Faq } from '../components/home/Faq';
import { useAuth } from '../lib/auth';
import { avatarColorFor, cx, initialsFrom } from '../lib/format';
import { STREAK_DAYS, continueLearning, dashboardStats, leaderboard } from '../lib/dashboardData';

const statIcons = { enrolled: Book, ongoing: Book1, certificates: Award } as const;
const statStyles = {
  violet: { border: '#6f57db', tile: '#f8f7fd', icon: 'linear-gradient(177deg, #f3f1fc 84%, #fbeefe 9%, #ece2fe 70%, #dcd5fd 122%)' },
  cyan: { border: '#2ccdf1', tile: '#f5fdff', icon: 'linear-gradient(180deg, #cff4fc 0%, #cff5fc 50%, #bbf0fa 75%, #d2f6fe 100%)' },
  purple: { border: '#a83af8', tile: 'var(--sematic-backgrounds-card-bg,#f6f7f6)', icon: 'linear-gradient(180deg, #e2befd 40%, #e9cefd 34%, #e2befd 88%)' },
} as const;

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.firstName ?? 'there';

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="gutter border-b border-[var(--sematic-backgrounds-secondarybackground-2)] pt-5 pb-10 sm:pt-8 sm:pb-[60px]">
        <div className="mx-auto flex max-w-[1336px] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-[30px]">
              <h1 className="text-xl leading-8 font-medium text-muted sm:text-2xl">
                {greeting()} {firstName}, 👋
              </h1>
              <Link
                to="/streak"
                className="flex items-center gap-2 rounded-full border-[1.5px] border-[#f59e0b] bg-white px-3 py-2 transition-colors hover:bg-[#fff8ec]"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-[#ffedd5]">
                  <img src="/assets/dashboard/flame.svg" alt="" className="size-4" />
                </span>
                <span className="text-sm leading-5 font-semibold text-ink">{STREAK_DAYS} Day Streak</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {dashboardStats.map((stat) => {
                const Icon = statIcons[stat.id as keyof typeof statIcons];
                const style = statStyles[stat.tone];
                return (
                  <div key={stat.id} className="flex h-[131px] flex-col overflow-hidden rounded-lg border-[1.5px] p-1" style={{ borderColor: style.border, background: '#f9f9f9' }}>
                    <div className="flex h-full items-center gap-3 rounded p-3" style={{ background: style.tile }}>
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundImage: style.icon }}>
                        <Icon size={24} variant="Linear" color="#202020" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-muted">{stat.label}</p>
                        <p className="text-2xl leading-8 text-ink">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <LearningPathPanel />

          <div id="my-courses" className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_383px]">
            <div className="flex flex-col gap-5 overflow-hidden rounded-xl border-[1.5px] border-line">
              <div className="flex items-center justify-between px-5 pt-5">
                <h2 className="text-lg leading-7 font-semibold text-ink">Continue learning</h2>
                <Link to="/my-courses" className="text-lg leading-7 font-semibold text-primary-text">
                  View
                </Link>
              </div>
              <div className="flex flex-col gap-5 px-5 pb-10">
                {continueLearning.map((course) => (
                  <div key={course.id} className="flex flex-col gap-3 rounded-xl border border-line-soft p-3 sm:flex-row">
                    <img src={course.image} alt="" className="h-[140px] w-full shrink-0 rounded object-cover sm:h-auto sm:w-[121px]" />
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-bold text-ink">{course.title}</p>
                        <p className="line-clamp-2 text-sm text-muted">{course.summary}</p>
                      </div>
                      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex w-full flex-col gap-1">
                          <span className="text-sm font-semibold" style={{ color: course.color }}>
                            {course.progress}%
                          </span>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-line-strong">
                            <div className="h-full rounded-full" style={{ width: `${course.progress}%`, background: course.color }} />
                          </div>
                        </div>
                        <Link to="/my-courses" className="w-full shrink-0 rounded-lg border border-primary-text px-4 py-2 text-center text-base text-primary-text sm:w-auto">
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 overflow-hidden rounded-xl border-[1.5px] border-line">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-[#e7ccfc]">
                    <Cup size={24} variant="Linear" color="#202020" />
                  </span>
                  <h2 className="text-lg leading-7 font-semibold text-ink">Leaderboard</h2>
                </div>
                <p className="text-sm text-muted">
                  Your Rank <span className="text-lg font-semibold text-ink">#5</span>
                </p>
              </div>
              <div className="flex flex-col gap-6 px-5 pb-6">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-2">
                    <span className="w-4 text-base font-semibold text-muted">{entry.rank}</span>
                    <div className="flex flex-1 items-end justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex size-5 items-center justify-center rounded-full text-[9px] font-semibold text-white"
                          style={{ backgroundColor: avatarColorFor(entry.name) }}
                        >
                          {initialsFrom(entry.name)}
                        </span>
                        <span className={cx('text-sm', entry.isYou ? 'font-semibold text-ink' : 'text-muted')}>
                          {entry.name}
                          {entry.isYou ? ' (You)' : ''}
                        </span>
                      </div>
                      <span className="text-xs text-muted">{entry.points}points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq audience="individual" />
    </main>
  );
};
