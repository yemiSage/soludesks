import { CloseCircle, InfoCircle } from 'iconsax-react';
import { useAuth, type UpgradeRole } from '../../lib/auth';

const copy: Record<UpgradeRole, { title: string; body: string }> = {
  trainer: {
    title: 'Do you want to become a Trainer?',
    body: 'Becoming a trainer allows you to create and manage courses, learners and earn with your expertise. Additional information and verification may be necessary.',
  },
  sponsor: {
    title: 'Do you want to become a Sponsor?',
    body: 'Becoming a sponsor allows you to fund scholarship programs, pick the courses they cover and track learner progress. Additional information and verification may be necessary.',
  },
};

/** Shown once before either upgrade flow opens its profile drawer. */
export const BecomeRoleConfirm = () => {
  const { onboarding, closeOnboarding, advanceOnboarding } = useAuth();
  if (onboarding?.step !== 'confirm') return null;
  const { title, body } = copy[onboarding.role];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="become-role-title">
      <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-6">
        <button type="button" onClick={closeOnboarding} aria-label="Close" className="absolute top-5 right-5 text-muted hover:text-ink">
          <CloseCircle size={22} variant="Linear" color="currentColor" />
        </button>

        <div className="flex flex-col items-center gap-4 text-center">
          <InfoCircle size={40} variant="Linear" color="#fa8500" />
          <h2 id="become-role-title" className="text-xl leading-7 font-semibold text-ink">
            {title}
          </h2>
          <p className="text-sm leading-5 text-muted">{body}</p>
          <button
            type="button"
            onClick={advanceOnboarding}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
