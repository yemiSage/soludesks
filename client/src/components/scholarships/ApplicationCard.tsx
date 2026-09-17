import { Calendar, Heart } from 'iconsax-react';
import { Link } from 'react-router-dom';
import type { Application } from '../../lib/applications';
import { cx } from '../../lib/format';
import type { Scholarship } from '../../lib/scholarshipData';

const statusStyle: Record<Application['status'], string> = {
  Pending: 'bg-[#fff8ec] text-[#b45309]',
  Ongoing: 'bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text',
};

export const ApplicationCard = ({ application, scholarship }: { application: Application; scholarship: Scholarship }) => (
  <Link to={`/scholarships/${scholarship.id}`} className="flex w-full flex-col overflow-hidden rounded-xl border border-line sm:w-[calc(50%-10px)]">
    <div className="relative h-[139px] w-full">
      <img src={scholarship.image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
    <div className="flex flex-col gap-2 px-3 pt-3">
      <div className="flex items-center justify-between">
        <span className="text-sm leading-5 font-semibold text-muted">
          Provider: <span>{scholarship.provider}</span>
        </span>
        <Heart size={21} variant="Linear" color="currentColor" className="text-muted" />
      </div>
      <h3 className="text-base leading-6 font-semibold text-ink">{scholarship.title}</h3>
      <p className="line-clamp-2 h-[39px] text-xs leading-[18px] text-muted">{scholarship.summary}</p>
    </div>
    <div className="flex items-center justify-between border-t border-line-soft p-5">
      <span className={cx('rounded-full px-3 py-1 text-sm leading-5 font-medium', statusStyle[application.status])}>{application.status}</span>
      <span className="flex items-center gap-1 text-sm leading-5 text-muted">
        <Calendar size={20} variant="Linear" color="currentColor" />
        Until {scholarship.deadline}
      </span>
    </div>
  </Link>
);
