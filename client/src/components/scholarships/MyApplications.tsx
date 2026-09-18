import { Book } from 'iconsax-react';
import { ApplicationCard } from './ApplicationCard';
import { useApplications } from '../../lib/applications';
import { useAuth } from '../../lib/auth';
import { getScholarship } from '../../lib/scholarshipData';

export const MyApplications = () => {
  const { isAuthenticated } = useAuth();
  const { applications } = useApplications();
  if (!isAuthenticated) return null;

  return (
    <section className="shell flex flex-col gap-8 py-16 lg:py-20">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl leading-9 font-bold text-ink sm:text-[28px]">My Applications</h2>
        <p className="text-base text-muted">Track and monitor your applications status</p>
      </div>

      {applications.length === 0 ? (
        <div className="mx-auto flex w-full max-w-[381px] flex-col items-center gap-8 text-center">
          <span className="flex size-[74px] items-center justify-center rounded-full bg-[var(--sematic-backgrounds-primarybackground-2)]">
            <Book size={40} variant="Linear" color="currentColor" className="text-primary-text" />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl leading-8 font-semibold text-ink">No applications yet</h3>
            <p className="text-base text-muted">Unlock your potential with the right course</p>
          </div>
          <a href="#open-scholarships" className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white">
            Explore Scholarships
          </a>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {applications.map((application) => {
            const scholarship = getScholarship(application.scholarshipId);
            return scholarship ? <ApplicationCard key={application.scholarshipId} application={application} scholarship={scholarship} /> : null;
          })}
        </div>
      )}
    </section>
  );
};
