import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { SectionHeading } from '../ui/SectionHeading';

export const Pathways = () => {
  const { data } = useQuery({ queryKey: ['pathways'], queryFn: api.pathways });

  return (
    <section id="pathways" className="shell flex flex-col items-center gap-8 py-[60px] lg:py-[120px]">
      <SectionHeading title="Discover Through Pathways" description="Dive into the latest trends and insights" />

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-5 lg:gap-8">
        {(data?.items ?? []).map((pathway) => (
          <a
            key={pathway.id}
            href="#catalogue"
            className="flex h-auto min-h-[190px] min-w-0 flex-col items-start gap-4 rounded-xl border-[1.5px] border-primary-text bg-chip p-3 transition-transform duration-200 hover:-translate-y-1 sm:h-[183px] sm:min-h-0 sm:items-center sm:p-5"
          >
            <span className="flex h-[59px] w-[59px] shrink-0 items-center justify-center rounded-[14.75px] bg-primary-text/10">
              <img src={pathway.icon} alt="" className="h-[42px] w-[42px] object-contain" />
            </span>
            <span className="flex min-w-0 flex-col items-start gap-2 text-left sm:items-center sm:text-center">
              <span className="text-sm leading-5 font-semibold text-ink sm:text-base sm:leading-6">{pathway.name}</span>
              <span className="line-clamp-3 text-sm leading-5 text-muted sm:text-xs sm:leading-[18px]">{pathway.blurb}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
