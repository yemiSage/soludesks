import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { CourseHeader } from '../components/course/CourseHeader';
import { CourseOverview } from '../components/course/CourseOverview';
import { CourseReviews } from '../components/course/CourseReviews';
import { PlayIcon } from '../components/course/icons';
import { LessonsPanel } from '../components/course/LessonsPanel';
import { PricingPanel } from '../components/course/PricingPanel';
import { Faq } from '../components/home/Faq';
import { FinalCta } from '../components/home/FinalCta';
import { api } from '../lib/api';
import { cx } from '../lib/format';

type Tab = 'overview' | 'reviews';

export const CourseDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => api.course(slug as string),
    enabled: Boolean(slug),
  });
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    if (data?.course) document.title = `${data.course.title} — Soludesk LearnHub`;
  }, [data?.course]);

  if (!slug) return <Navigate to="/" replace />;
  if (isError) return <Navigate to="/" replace />;

  if (isLoading || !data) {
    return <div className="shell pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-24 text-center text-muted">Loading course…</div>;
  }

  const { course, reviews } = data;

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: 'feedback and review' },
  ];

  return (
    <main className="flex flex-col gap-x-10 gap-y-0 pt-[var(--nav-h)] pb-16 sm:gap-16">
      <div className="sticky top-[var(--nav-h)] z-20 border-b border-line-soft bg-white/65 backdrop-blur-xl transition-[background-color,backdrop-filter] duration-300">
        <div className="shell py-4">
          <CourseHeader course={course} onReviewsClick={() => setTab('reviews')} />
        </div>
      </div>

      <div className="shell flex flex-col gap-5 pt-5">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="relative h-[240px] w-full overflow-hidden rounded-xl sm:h-[320px] lg:h-[418px]">
              <img src={course.image} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <button
                type="button"
                aria-label="Play course preview"
                className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(124,124,124,0.4)] p-4 backdrop-blur-md"
              >
                <PlayIcon className="size-6 text-white" />
              </button>
            </div>

            <div className="flex items-center overflow-x-auto border-b border-line-strong scrollbar-none">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-selected={tab === item.id}
                  className={cx(
                    'flex shrink-0 items-center justify-center px-5 py-3 text-base whitespace-nowrap',
                    tab === item.id
                      ? 'border-b-2 border-primary-text font-semibold text-primary-text'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="w-full rounded-xl border-0 border-line bg-white sm:border-[1.5px]">
              {tab === 'overview' ? <CourseOverview course={course} /> : null}
              {tab === 'reviews' ? <CourseReviews course={course} reviews={reviews} /> : null}
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[380px] lg:shrink-0 xl:w-[421px]">
            <LessonsPanel course={course} />
            <div className="lg:flex-1">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+92px)]">
                <PricingPanel course={course} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Faq />
        <FinalCta />
      </div>
    </main>
  );
};
