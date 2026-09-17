import { cx } from '../../lib/format';
import { Link } from 'react-router-dom';
import { learningPath } from '../../lib/onboarding';

export const LearningPathStep = () => (
  <div className="flex w-full flex-col items-center gap-10">
    <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
      <h1 className="heading-display text-[30px] leading-[38px] text-ink">Your suggested learning path</h1>
      <p className="text-base leading-6 text-muted">A step-by-step path based on where you are now and where you want to go.</p>
    </div>

    <div className="flex w-full max-w-[684px] flex-col">
      {learningPath.map((item, index) => {
        const isFirst = index === 0;
        return (
          <div
            key={item.step}
            className={cx('flex w-full flex-col items-start gap-3 sm:flex-row sm:gap-6', index < learningPath.length - 1 && 'pb-8')}
          >
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cx(
                  'text-sm leading-5 font-semibold sm:w-[52px] sm:text-right',
                  isFirst ? 'text-primary-text' : 'text-muted',
                )}
              >
                Step {item.step}
              </span>
              <span
                className={cx(
                  'flex size-6 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold',
                  isFirst ? 'bg-primary text-white' : 'border-2 border-[#dbeafe] bg-white text-muted',
                )}
              >
                {item.step}
              </span>
            </div>

            <Link
              to={`/courses/${item.slug}`}
              className={cx(
                'lift-hover flex w-full min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-row sm:gap-5',
                isFirst ? 'border-[1.5px] border-primary' : 'border-[#e2e8f0]',
              )}
            >
              <img
                src={item.image}
                alt=""
                className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-[90px] sm:w-[120px]"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base leading-6 font-semibold text-ink">{item.title}</p>
                  {isFirst ? (
                    <span className="shrink-0 rounded bg-[#eff6ff] px-2.5 py-1 text-[11px] font-bold text-primary">START HERE</span>
                  ) : null}
                </div>
                <p className="text-sm leading-5 text-muted">{item.description}</p>
                <p className="text-xs leading-[18px] font-medium text-[var(--sematic-buttons-greysolid-1)]">
                  Duration: {item.duration} • Level: {item.level}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  </div>
);
