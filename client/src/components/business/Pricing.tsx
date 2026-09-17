import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { cx } from '../../lib/format';
import { Button } from '../ui/Button';

const Check = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e]" aria-label="Included">
    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden="true">
      <path d="m4 10.5 4 4 8-9" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export const Pricing = () => {
  const { data } = useQuery({ queryKey: ['business', 'pricing'], queryFn: api.businessPricing });
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [yearly, setYearly] = useState(true);

  const modules = data?.items ?? [];
  const active = modules.find((module) => module.id === moduleId) ?? modules[0];

  return (
    <section id="pricing" className="py-[60px] lg:py-20">
      <div className="shell flex flex-col items-center gap-8">
        <h2 className="heading-display max-w-[584px] text-center text-[28px] leading-[36px] text-ink sm:text-display-md sm:leading-[44px]">
          Tailored Pricing Plans to Meet Your Organization Needs
        </h2>

        <div className="relative flex items-center gap-4">
          <span
            className={cx(
              'text-sm leading-5 transition-colors',
              yearly ? 'font-semibold text-muted' : 'font-bold text-ink',
            )}
          >
            Pay Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly and save 20%"
            onClick={() => setYearly((value) => !value)}
            className={cx('relative h-6 w-12 rounded-full transition-colors', yearly ? 'bg-[#2563eb]' : 'bg-[#cbd5e1]')}
          >
            <span
              className={cx(
                'absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200',
                yearly ? 'left-7' : 'left-1',
              )}
            />
          </button>
          <span
            className={cx(
              'text-sm leading-5 transition-colors',
              yearly ? 'font-bold text-ink' : 'font-semibold text-muted',
            )}
          >
            Pay Yearly
          </span>
          <span className="absolute -top-8 right-0 rounded-full border border-[#d1fae5] bg-[#ecfdf5] px-3 py-1 text-[10px] leading-[15px] font-bold text-[#059669]">
            Save 20%
          </span>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto rounded-[100px] border border-[var(--sematic-boder-and-seperator-greyborder-2)] p-1 scrollbar-none sm:gap-5">
          {modules.map((module) => {
            const selected = module.id === active?.id;
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => setModuleId(module.id)}
                aria-pressed={selected}
                className={cx(
                  'flex shrink-0 items-center gap-3 rounded-[20px] px-5 py-2 text-base leading-6 transition-colors',
                  selected
                    ? 'border border-[var(--sematic-boder-and-seperator-primaryborder-2)] bg-[var(--sematic-interactivecomponents-primaryic-2)] font-medium text-primary-text'
                    : 'text-muted hover:text-ink',
                )}
              >
                <img src={module.icon} alt="" className="h-5 w-5" />
                {module.name}
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="w-full overflow-x-auto rounded-3xl border border-line-soft">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[280px] p-6" />
                  {active.plans.map((plan) => (
                    <th key={plan.id} className="border-l border-line-soft p-6 text-center align-top">
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-2">
                          <span className="text-xs leading-[18px] text-muted">{plan.name}</span>
                          {plan.popular ? (
                            <span className="rounded px-1 text-[10px] leading-[15px] font-bold text-primary-text uppercase">
                              Popular
                            </span>
                          ) : null}
                        </span>
                        <span className="flex items-baseline gap-1">
                          <span className="heading-display text-[34px] leading-[42px] text-ink">
                            ${(yearly ? plan.yearlyUsd : plan.monthlyUsd).toLocaleString('en-US')}
                          </span>
                          <span className="text-xs font-medium text-primary-text">
                            /{yearly ? 'yearly' : 'monthly'}
                          </span>
                        </span>
                        <span className="text-xs leading-[18px] font-normal text-muted">{plan.blurb}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {active.features.map((feature) => (
                  <tr key={feature.id} className="border-t border-line-soft">
                    <th scope="row" className="p-4 pl-6 text-sm leading-5 font-normal text-muted">
                      {feature.label}
                    </th>
                    {active.plans.map((plan) => (
                      <td key={plan.id} className="border-l border-line-soft p-4">
                        <div className="flex justify-center">
                          {feature.included[plan.id] ? <Check /> : <span className="text-muted">—</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="border-t border-line-soft">
                  <td className="p-6" />
                  {active.plans.map((plan) => (
                    <td key={plan.id} className="border-l border-line-soft p-6">
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        className={cx('w-full', !plan.popular && 'border-primary-text text-primary-text')}
                        icon={
                          <img
                            src="/assets/icons/arrow-right-blue.svg"
                            alt=""
                            /* The exported arrow is blue; invert it to white on the filled button. */
                            className={cx('h-5 w-5', plan.popular && 'brightness-0 invert')}
                          />
                        }
                      >
                        Start Free Trial
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
};
