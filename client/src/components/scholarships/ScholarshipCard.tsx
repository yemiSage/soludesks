import { Calendar, Heart } from 'iconsax-react';
import { Link } from 'react-router-dom';
import type { Scholarship } from '../../lib/scholarshipData';

export const ScholarshipCard = ({ scholarship }: { scholarship: Scholarship }) => {
  const progressPct = Math.round((scholarship.filledSlots / scholarship.totalSlots) * 100);

  return (
    <Link
      to={`/scholarships/${scholarship.id}`}
      className="lift-hover group flex w-full flex-col justify-between overflow-hidden rounded-xl border border-line bg-[var(--global-background)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
    >
      <div className="flex flex-col gap-3">
        <div className="relative h-[139px] w-full overflow-hidden">
          <img
            src={scholarship.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex items-center justify-between px-3">
          <span className="flex items-center gap-2 text-sm leading-5 font-semibold text-muted">
            Provider: <span>{scholarship.provider}</span>
          </span>
          <Heart size={21} variant="Linear" color="currentColor" className="text-muted" />
        </div>

        <div className="flex flex-col gap-2 px-3">
          <h3 className="text-base leading-6 font-semibold text-ink">{scholarship.title}</h3>
          <p className="line-clamp-2 h-[39px] text-xs leading-[18px] text-muted">{scholarship.summary}</p>
        </div>

        <div className="flex flex-col gap-2 px-5 py-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e2e2]">
            <div className="h-full rounded-full bg-primary-text" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="flex items-center justify-between text-sm leading-5 text-muted">
            <span>
              {scholarship.filledSlots}/{scholarship.totalSlots}
            </span>
            <span>{scholarship.courseCount} Courses</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line-soft p-5">
        <span className="flex items-center gap-1 text-sm leading-5 text-muted">
          <Calendar size={20} variant="Linear" color="currentColor" />
          {scholarship.deadline}
        </span>
        <span className="text-sm leading-5 font-bold text-primary-text">Apply Now</span>
      </div>
    </Link>
  );
};
