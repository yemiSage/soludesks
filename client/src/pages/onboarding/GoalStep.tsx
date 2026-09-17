import { useNavigate } from 'react-router-dom';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { OptionCard } from '../../components/onboarding/OptionCard';
import { Button } from '../../components/ui/Button';
import { learningGoals } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

export const GoalStep = () => {
  const navigate = useNavigate();
  const { goalId, setGoal } = useOnboarding();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <OnboardingHeader progress={0.25} onBack={() => navigate('/get-started')} />

      <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
        <h1 className="heading-display text-[30px] leading-[38px] text-ink">What would you like to achieve?</h1>
        <p className="text-base leading-6 text-muted">Choose what best describes your learning goal.</p>
      </div>

      <div className="grid w-full max-w-[684px] grid-cols-2 gap-4 sm:grid-cols-3">
        {learningGoals.map((goal) => (
          <OptionCard
            key={goal.id}
            icon={goal.icon}
            title={goal.title}
            description={goal.description}
            selected={goalId === goal.id}
            onSelect={() => setGoal(goal.id)}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="w-full max-w-[684px] sm:w-auto sm:px-16"
        disabled={!goalId}
        onClick={() => navigate('/get-started/interests')}
      >
        Continue
      </Button>
    </div>
  );
};
