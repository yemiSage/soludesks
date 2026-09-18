import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { OptionCard } from '../../components/onboarding/OptionCard';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { interestPathways } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

export const InterestsStep = () => {
  const navigate = useNavigate();
  const { interestId, setInterest } = useOnboarding();
  const { data } = useQuery({ queryKey: ['pathways'], queryFn: api.pathways });
  const pathways = data?.items?.length ? data.items : interestPathways;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <OnboardingHeader progress={0.5} onBack={() => navigate('/get-started/goal')} />

      <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
        <h1 className="heading-display text-display-sm text-ink">What are you interested in?</h1>
        <p className="text-base leading-6 text-muted">Choose the path you'd like to focus on for this assessment.</p>
      </div>

      <div className="grid w-full max-w-[684px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {pathways.map((pathway) => (
          <OptionCard
            key={pathway.id}
            variant="skill"
            icon={pathway.icon}
            title={pathway.name}
            description={pathway.blurb}
            selected={interestId === pathway.id}
            onSelect={() => setInterest(pathway.id)}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="w-full max-w-[684px] sm:w-auto sm:px-16"
        disabled={!interestId}
        onClick={() => navigate('/get-started/skill-level')}
      >
        Continue
      </Button>
    </div>
  );
};
