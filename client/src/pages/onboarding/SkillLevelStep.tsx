import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { OptionCard } from '../../components/onboarding/OptionCard';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { skillLevels } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

export const SkillLevelStep = () => {
  const navigate = useNavigate();
  const { interestId, skillLevelId, setSkillLevel } = useOnboarding();
  const { data } = useQuery({ queryKey: ['pathways'], queryFn: api.pathways });
  const topic = data?.items.find((pathway) => pathway.id === interestId)?.name ?? 'this topic';

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <OnboardingHeader progress={0.75} onBack={() => navigate('/get-started/interests')} />

      <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
        <h1 className="heading-display text-display-sm text-ink">How familiar are you with {topic}?</h1>
        <p className="text-base leading-6 text-muted">This helps us understand where you should start.</p>
      </div>

      <div className="flex w-full max-w-[684px] flex-col gap-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {skillLevels.map((level) => (
            <OptionCard
              key={level.id}
              variant="skill"
              icon={level.icon}
              title={level.title}
              description={level.description}
              selected={skillLevelId === level.id}
              onSelect={() => setSkillLevel(level.id)}
            />
          ))}
        </div>
        <p className="text-center text-[13px] text-muted">There's no wrong answer. Choose what feels closest to where you are now.</p>
      </div>

      <Button
        size="lg"
        className="w-full max-w-[684px] sm:w-auto sm:px-16"
        disabled={!skillLevelId}
        onClick={() => navigate('/get-started/assessment')}
      >
        Continue
      </Button>
    </div>
  );
};
