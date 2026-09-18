import { useNavigate } from 'react-router-dom';
import { ClockIcon, HeartIcon, TestTubeIcon } from '../../components/onboarding/icons';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { Button } from '../../components/ui/Button';
import { quizQuestions } from '../../lib/onboarding';

const stats = [
  { icon: TestTubeIcon, value: String(quizQuestions.length), label: 'Questions', hint: 'Multiple choice format' },
  { icon: ClockIcon, value: '~5 min', label: 'Duration', hint: 'Take it at your own pace' },
  { icon: HeartIcon, value: 'No pressure', label: 'No penalty', hint: "Wrong answers won't hurt" },
];

export const AssessmentIntroStep = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <OnboardingHeader progress={1} onBack={() => navigate('/get-started/skill-level')} />

      <div className="flex w-full max-w-[684px] flex-col items-center gap-10">
        <img
          src="/assets/assessment/skills-check-hero.png"
          alt=""
          className="h-[302px] w-full max-w-[672px] rounded-2xl object-cover"
        />
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="heading-display text-display-sm text-ink">Ready for a quick skills check?</h1>
          <p className="text-base leading-6 text-muted">
            A few questions will help us understand what you already know and where you might need more support.
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[672px] flex-col items-center gap-10">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[120px] flex-col items-center justify-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-5"
            >
              <span className="flex items-center gap-2">
                <stat.icon className="size-5 text-primary" />
                <span className="text-base leading-6 font-semibold text-ink">{stat.value}</span>
              </span>
              <span className="flex flex-col items-center gap-2">
                <span className="text-sm leading-5 font-medium text-muted">{stat.label}</span>
                <span className="text-xs leading-[18px] text-[var(--sematic-buttons-greysolid-1)]">{stat.hint}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-muted">This isn't an exam. Just choose the answer you think is best.</p>
      </div>

      <Button size="lg" className="w-full max-w-[684px] sm:w-auto sm:px-16" onClick={() => navigate('/get-started/assessment/1')}>
        Start assessment
      </Button>
    </div>
  );
};
