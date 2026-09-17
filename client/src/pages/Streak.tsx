import { ArrowLeft, Award, Book, Cup } from 'iconsax-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Faq } from '../components/home/Faq';
import { useAuth } from '../lib/auth';
import { cx } from '../lib/format';
import { STREAK_DAYS } from '../lib/dashboardData';

const LONGEST_STREAK = 28;
const TOTAL_DAYS_LEARNED = 153;
const MONTH_GOAL_DAYS = 15;

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type CalendarCell = { date: Date; inMonth: boolean; isToday: boolean; isActive: boolean };

const buildCalendar = (): CalendarCell[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const streakStart = new Date(today);
  streakStart.setDate(today.getDate() - (STREAK_DAYS - 1));

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const leadingEmpty = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - leadingEmpty);

  const trailingEmpty = (7 - ((monthEnd.getDay() + 6) % 7) - 1) % 7;
  const gridEnd = new Date(monthEnd);
  gridEnd.setDate(monthEnd.getDate() + trailingEmpty);

  const cells: CalendarCell[] = [];
  for (let cursor = new Date(gridStart); cursor <= gridEnd; cursor.setDate(cursor.getDate() + 1)) {
    const date = new Date(cursor);
    cells.push({
      date,
      inMonth: date.getMonth() === today.getMonth(),
      isToday: date.getTime() === today.getTime(),
      isActive: date >= streakStart && date <= today,
    });
  }
  return cells;
};

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

export const Streak = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cells = useMemo(buildCalendar, []);
  const monthLabel = monthFormatter.format(new Date());

  const stats = [
    { label: 'Current Streak', value: `${STREAK_DAYS} Days`, hint: 'Personal streak active', icon: 'flame' as const, bg: '#ffedd5' },
    { label: 'Longest Streak', value: `${LONGEST_STREAK} Days`, hint: 'Achieved in August', icon: Award, bg: '#e0f2fe' },
    { label: 'Total Days Learned', value: `${TOTAL_DAYS_LEARNED} Days`, hint: 'Lifetime knowledge built', icon: Book, bg: '#dcfce7' },
    { label: 'This Month', value: `${STREAK_DAYS} / ${MONTH_GOAL_DAYS} Days`, hint: '', icon: Cup, bg: '#f3e8ff' },
  ];

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)]">
      <div className="shell flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to dashboard"
            className="flex items-center justify-center rounded-full bg-primary p-2.5 text-white"
          >
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </button>
          <h1 className="text-2xl leading-8 font-medium text-ink">My streak</h1>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-line py-2">
          <div className="flex flex-col items-start gap-6 rounded-[20px] border-2 border-line-strong p-6 sm:flex-row sm:items-center sm:p-10">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#ffedd5]">
              <img src="/assets/dashboard/flame.svg" alt="" className="size-12" />
            </span>
            <div className="flex flex-col gap-2">
              <p className="heading-display text-2xl leading-9 text-ink sm:text-[30px] sm:leading-[38px]">{STREAK_DAYS} Day Streak! 🔥</p>
              <p className="text-base leading-6 text-muted">
                {user?.firstName ?? 'You'}, your learning fire is burning bright. Keep it up!
              </p>
              <p className="text-sm leading-5 font-semibold text-[#d97706]">You&apos;re in the top 5% of learners this week.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 rounded-xl border-[1.5px] border-line-strong p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full" style={{ background: stat.bg }}>
                  {stat.icon === 'flame' ? (
                    <img src="/assets/dashboard/flame.svg" alt="" className="size-6" />
                  ) : (
                    <stat.icon size={24} variant="Linear" color="#202020" />
                  )}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm leading-5 text-muted">{stat.label}</p>
                  <p className="text-2xl leading-8 text-ink">{stat.value}</p>
                  {stat.hint ? <p className="text-xs leading-[18px] text-muted">{stat.hint}</p> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-6 flex flex-col gap-6 rounded-2xl border-[1.5px] border-line-strong p-6 sm:mx-10 sm:mb-4 sm:p-8">
            <p className="text-lg leading-7 font-semibold text-ink">{monthLabel}</p>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-7 gap-2">
                {weekdayLabels.map((day) => (
                  <div key={day} className="flex h-9 items-center justify-center text-sm leading-5 font-semibold text-muted">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {cells.map((cell) => (
                  <div
                    key={cell.date.toISOString()}
                    className={cx(
                      'flex h-14 flex-col items-center justify-center gap-1 rounded-lg',
                      cell.isActive ? 'bg-[#fff7ed]' : '',
                    )}
                  >
                    <p
                      className={cx(
                        'text-base leading-6 font-bold',
                        cell.isActive ? 'text-[#f59e0b]' : cell.inMonth ? 'text-ink font-medium' : 'text-muted font-medium',
                      )}
                    >
                      {cell.date.getDate()}
                    </p>
                    {cell.isActive ? <img src="/assets/dashboard/flame.svg" alt="" className="size-3.5" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <Faq audience="individual" />
      </div>
    </main>
  );
};
