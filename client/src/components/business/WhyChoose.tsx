import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { cx } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';

const spans: Record<string, string> = {
  third: 'lg:col-span-4',
  wide: 'lg:col-span-7',
  narrow: 'lg:col-span-5',
};

export const WhyChoose = () => {
  const { data } = useQuery({ queryKey: ['business', 'highlights'], queryFn: api.businessHighlights });

  return (
    <section className="bg-[#fcfaf8] py-[60px] lg:pt-20 lg:pb-[140px]">
      <div className="shell flex flex-col items-center gap-8">
        <SectionHeading
          title="Why leading organizations choose Soludesk"
          description="Four powerful modules. One unified ecosystem."
        />

        <div className="grid w-full gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {(data?.items ?? []).map((highlight) => (
            <article key={highlight.id} className={cx('flex flex-col gap-5', spans[highlight.span], highlight.id === 'dashboard' && 'lg:h-full')}>
              {highlight.id === 'dashboard' ? (
                <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-[#102a43] p-5 text-white lg:min-h-[430px] lg:p-7">
                  <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#2f80ed]/30 blur-2xl" />
                  <div className="absolute -bottom-24 -left-10 h-44 w-44 rounded-full bg-[#56ccf2]/20 blur-2xl" />
                  <div className="relative flex h-full flex-col justify-between gap-8">
                    <div>
                      <p className="text-sm font-semibold tracking-[0.04em] text-[#9ed8ff]">Soludesk Workspace</p>
                      <h3 className="mt-2 max-w-[300px] text-[32px] leading-10 font-bold">Every team, moving in sync.</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs text-[#b9d8ef]">Active learners</p>
                        <p className="mt-1 text-2xl font-bold">2,486+</p>
                        <p className="mt-1 text-xs text-[#8de1b2]">+18.4% this month</p>
                      </div>
                      <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs text-[#b9d8ef]">Modules live</p>
                        <p className="mt-1 text-2xl font-bold">10+</p>
                        <p className="mt-1 text-xs text-[#9ed8ff]">One connected view</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={cx(
                    'overflow-hidden rounded-2xl',
                    highlight.span === 'third' ? 'aspect-[413/430]' : 'aspect-[708/430]',
                  )}
                >
                  <img src={highlight.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              )}

              {highlight.description ? (
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg leading-[26px] font-bold text-ink">{highlight.title}</h3>
                  <p className="text-sm leading-5 text-muted">{highlight.description}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
