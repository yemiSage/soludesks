import { useEffect, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LearningPathList, type PathListItem } from '../../components/onboarding/LearningPathList';
import { useAuth } from '../../lib/auth';
import { saveLearningPath } from '../../lib/learningPath';
import { learningPath, scoreToProfile } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

export const LearningPathStep = () => {
  const navigate = useNavigate();
  const { isAuthenticated, requireAuth } = useAuth();
  const { goalId, interestId, skillLevelId, score, answers } = useOnboarding();
  const { level } = scoreToProfile(score, answers.length);
  const tookAssessment = answers.some((answer) => answer !== null);

  // The recommendation is what the dashboard tracks, so it's saved as soon as it's shown —
  // a logged-out visitor finds it waiting on their dashboard once they sign in.
  useEffect(() => {
    if (tookAssessment) saveLearningPath({ level, goalId, interestId, skillLevelId });
  }, [tookAssessment, level, goalId, interestId, skillLevelId]);

  /** Signed-in learners follow the link directly; everyone else signs in first, then lands on it. */
  const gated = (to: string) => (event: SyntheticEvent) => {
    if (isAuthenticated) return;
    event.preventDefault();
    requireAuth('learning-path', () => navigate(to));
  };

  const items: PathListItem[] = learningPath.map((item, index) => ({
    ...item,
    status: index === 0 ? 'current' : 'upcoming',
    to: `/courses/${item.slug}`,
    onClick: gated(`/courses/${item.slug}`),
  }));

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
        <h1 className="heading-display text-display-sm text-ink">Your suggested learning path</h1>
        <p className="text-base leading-6 text-muted">A step-by-step path based on where you are now and where you want to go.</p>
      </div>

      <div className="flex w-full max-w-[684px] flex-col gap-6">
        <LearningPathList items={items} />

        <p className="text-center text-xs text-[var(--sematic-buttons-greysolid-1)]">
          {isAuthenticated ? (
            <>
              This path is saved to your account —{' '}
              <Link to="/dashboard" className="font-semibold text-primary-text">
                track your progress on your dashboard
              </Link>
              .
            </>
          ) : (
            <>
              <button type="button" onClick={gated('/dashboard')} className="font-semibold text-primary-text">
                Sign in
              </button>{' '}
              to save this path and track your progress from your dashboard.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
