import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { CountUp } from '../ui/CountUp';

export const Stats = () => {
  const { data } = useQuery({ queryKey: ['stats'], queryFn: api.stats });

  return (
    <section className="border-b border-[var(--sematic-backgrounds-secondarybackground-2)] bg-[var(--sematic-backgrounds-secondarybackground-1)]">
      <div className="shell flex flex-col items-center justify-between gap-10 py-[60px] lg:flex-row lg:py-[120px]">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h2 className="heading-display text-[24px] leading-8 text-ink sm:text-display-md sm:leading-[44px]">
            Empowering learners globally
          </h2>
          <p className="text-sm leading-5 font-medium text-muted">
            Join a rapidly growing community of professionals upgrading their skills.
          </p>
        </div>

        <dl className="flex w-full items-center justify-between gap-6 lg:w-[716px]">
          {(data?.items ?? []).map((stat) => (
            <div key={stat.id} className="flex flex-1 flex-col items-center gap-2 text-center">
              <dt className="heading-display text-[32px] leading-[44px] text-secondary sm:text-display-lg sm:leading-[60px]">
                <CountUp value={stat.value} />
              </dt>
              <dd className="text-sm leading-5 font-bold text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
