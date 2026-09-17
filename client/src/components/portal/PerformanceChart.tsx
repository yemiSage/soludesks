import { trainerPerformanceBuckets } from '../../lib/trainerData';

const toneColor = { excellent: '#22c55e', good: '#f59e0b', 'needs-help': '#ef4444' } as const;

/** Student score distribution, shared by the trainer and sponsor dashboards. */
export const PerformanceChart = () => {
  const max = Math.max(...trainerPerformanceBuckets.map((bucket) => bucket.learners), 1);
  const totalFor = (tone: keyof typeof toneColor) =>
    trainerPerformanceBuckets.filter((bucket) => bucket.tone === tone).reduce((sum, bucket) => sum + bucket.learners, 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold text-ink sm:text-base">Student Performance Distribution</p>
        <span className="shrink-0 text-sm font-medium text-primary-text">View</span>
      </div>

      {/* Scrolls sideways on phones so the ten buckets never squeeze into slivers. */}
      <div className="-mx-1 overflow-x-auto px-1 scrollbar-none">
        <div className="flex h-[200px] min-w-[420px] items-end gap-2 sm:h-[220px] sm:min-w-0 sm:gap-3">
          {trainerPerformanceBuckets.map((bucket) => (
            <div key={bucket.range} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div className="pointer-events-none absolute -top-9 hidden rounded-md bg-ink px-2 py-1 text-[10px] whitespace-nowrap text-white group-hover:block">
                {bucket.range}: {bucket.learners} learners
              </div>
              <div
                className="w-full max-w-8 rounded-t-md transition-[height] duration-500"
                style={{ height: `${(bucket.learners / max) * 100}%`, backgroundColor: toneColor[bucket.tone], minHeight: 6 }}
              />
              <span className="text-[10px] whitespace-nowrap text-muted">{bucket.range}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        <span className="rounded-lg bg-[#f0fdf4] px-3 py-2 text-center text-xs font-medium text-[#15803d]">{totalFor('excellent')} learners Excellent(80+)</span>
        <span className="rounded-lg bg-[#fffbeb] px-3 py-2 text-center text-xs font-medium text-[#b45309]">{totalFor('good')} learners Good (50-79)</span>
        <span className="rounded-lg bg-[#fef2f2] px-3 py-2 text-center text-xs font-medium text-[#b91c1c]">{totalFor('needs-help')} learners Needs Help (&lt;30)</span>
      </div>
    </div>
  );
};
