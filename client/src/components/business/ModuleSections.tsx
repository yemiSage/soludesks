import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { cx } from '../../lib/format';
import type { BusinessModule } from '../../lib/types';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

const ModuleRow = ({ module }: { module: BusinessModule }) => {
  const media = (
    <div className="relative h-[260px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[380px] lg:h-[611px] lg:w-[606px]">
      <img src={module.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      <div className="absolute inset-0 rounded-xl bg-black/10" />
    </div>
  );

  return (
    <article
      className={cx(
        'flex flex-col items-center gap-8 rounded-3xl border-[1.5px] p-5 lg:gap-[60px]',
        module.imageSide === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse',
        module.tone === 'warm' ? 'border-[#ffbb80] bg-[#fff7f0]' : 'border-line-strong bg-[#f7f7f7]',
      )}
    >
      {media}

      <div className="flex flex-1 self-stretch flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border border-[var(--sematic-interactivecomponents-primaryic-2)] bg-[var(--sematic-interactivecomponents-primaryic-1)] px-[17px] py-[5px] text-xs leading-[18px] font-bold text-primary-text">
              {module.eyebrow}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="heading-display text-[26px] leading-[34px] text-ink sm:text-display-sm sm:leading-[38px]">
                {module.name}
              </h3>
              <p className="text-base leading-6 font-medium text-muted">{module.summary}</p>
            </div>
          </div>

          <ul className="flex flex-col gap-[23px]">
            {module.features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <span className="mt-[5px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-text">
                  <img src="/assets/business/icon-check.svg" alt="" className="h-4 w-4" />
                </span>
                <span className="flex flex-col gap-[5px]">
                  <span className="text-base leading-6 font-semibold text-ink">{feature.title}</span>
                  <span className="text-sm leading-5 text-muted">{feature.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-5 sm:flex-row">
          <Button
            size="lg"
            className="sm:w-[260px]"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-text font-normal text-primary-text sm:w-[260px]"
            icon={<img src="/assets/business/icon-call.svg" alt="" className="h-6 w-6" />}
          >
            Request a Demo
          </Button>
        </div>
      </div>
    </article>
  );
};

export const ModuleSections = () => {
  const { data, isPending } = useQuery({ queryKey: ['business', 'modules'], queryFn: api.businessModules });

  return (
    <section id="solutions" className="shell flex flex-col items-center gap-[60px] py-[60px]">
      <SectionHeading title="Our Enterprise Suite" description="Four powerful modules. One unified ecosystem." />

      <div className="flex w-full flex-col gap-5 lg:gap-[120px]">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[653px] animate-pulse rounded-3xl bg-line-soft" />
            ))
          : (data?.items ?? []).map((module) => <ModuleRow key={module.id} module={module} />)}
      </div>
    </section>
  );
};
