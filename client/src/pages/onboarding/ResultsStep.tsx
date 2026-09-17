import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { learningProfileFocusAreas, learningProfileStrengths, scoreToProfile } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

export const ResultsStep = () => {
  const navigate = useNavigate();
  const { score, answers } = useOnboarding();
  const { level, blurb } = scoreToProfile(score, answers.length);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full max-w-[684px] flex-col items-center gap-3 text-center">
        <h1 className="heading-display text-[30px] leading-[38px] text-ink">Your learning profile is ready</h1>
        <p className="text-base leading-6 text-muted">
          Based on your response diagnostics, we've mapped out your baseline expertise profile.
        </p>
      </div>

      <div className="flex w-full max-w-[510px] flex-col items-center gap-2 rounded-xl bg-[#f7f7f7] p-5 text-center">
        <p className="text-sm leading-5 font-semibold text-muted">Your current level</p>
        <p className="heading-display text-[30px] leading-[38px] text-primary">{level}</p>
        <p className="text-sm leading-5 text-muted">{blurb}</p>
      </div>

      <div className="flex w-full max-w-[684px] flex-col gap-6 sm:flex-row">
        <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6">
          <p className="text-lg font-bold text-ink">Your strengths</p>
          <ul className="flex flex-col gap-3">
            {learningProfileStrengths.map((item) => (
              <li key={item} className="text-sm font-medium text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6">
          <p className="text-lg font-bold text-ink">Focus areas</p>
          <ul className="flex flex-col gap-3">
            {learningProfileFocusAreas.map((item) => (
              <li key={item} className="text-sm font-medium text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button variant="outline" size="md" className="h-11 px-6" onClick={() => navigate('/get-started/learning-path')}>
        View my learning path
      </Button>
    </div>
  );
};
