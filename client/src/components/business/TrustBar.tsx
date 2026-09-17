import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

export const TrustBar = () => {
  const { data } = useQuery({ queryKey: ['business', 'customers'], queryFn: api.businessCustomers });
  const customers = data?.items ?? [];

  return (
    <section className="relative flex flex-col gap-6 overflow-hidden bg-white py-8 lg:h-[126px] lg:flex-row lg:items-center lg:gap-0 lg:py-0">
      <p className="shell shrink-0 text-xl leading-[1.5] font-semibold text-ink lg:w-[371px] lg:pr-5">
        Join 100+ customers around the world who trust Soludesks
      </p>

      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-20 pr-20 opacity-40 motion-reduce:animate-none">
          {[...customers, ...customers].map((customer, index) => (
            <span
              key={`${customer}-${index}`}
              className="text-xl leading-7 font-bold tracking-[-1px] text-[#1e293b] uppercase"
            >
              {customer}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
