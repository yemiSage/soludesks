import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../../components/onboarding/icons';
import { Button } from '../../components/ui/Button';

const steps = [
  { number: '01', title: 'Your goal', description: 'Tell us what you want to achieve' },
  { number: '02', title: 'Your interests', description: 'Choose what you want to learn' },
  { number: '03', title: 'Assessment', description: 'Help us understand your skills' },
  { number: '04', title: 'Suggestions', description: 'Get tailored courses & path' },
];

export const IntroStep = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Let's find the right course for you — Soludesk";
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full max-w-[684px] flex-col gap-5">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 self-start"
        >
          <span className="flex items-center justify-center rounded-full bg-primary-text p-1.5 text-white">
            <ArrowLeftIcon className="size-3.5" />
          </span>
          <span className="text-xl leading-[30px] font-medium text-ink">Go back</span>
        </button>

        <div className="flex flex-col gap-8">
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl bg-[#0796ee] sm:h-[302px]">
            <img
              src="/assets/assessment/find-course-hero.png"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <img
              src="/assets/assessment/find-course-illustration.jpg"
              alt="A learner comparing course paths to choose the right learning destination"
              className="absolute inset-0 z-10 size-full object-contain p-4 sm:p-5"
            />
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="heading-display text-[30px] leading-[38px] text-ink">Let's find the right course for you</h1>
            <p className="text-base leading-6 text-muted">
              Answer a few questions about what you want to achieve, the skills you're interested in, and what you
              already know. We'll use your answers to recommend courses and a learning path that fits you.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-[684px] flex-wrap gap-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex h-40 flex-1 min-w-[140px] flex-col gap-3 rounded-xl border border-line-soft bg-white p-3"
          >
            <span className="text-lg font-extrabold text-primary">{step.number}</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm leading-5 font-semibold text-ink">{step.title}</span>
              <span className="text-xs leading-[18px] text-muted">{step.description}</span>
            </div>
          </div>
        ))}
      </div>

      <Button size="lg" className="w-full max-w-[684px] sm:w-auto sm:px-16" onClick={() => navigate('/get-started/goal')}>
        Get started
      </Button>

      <p className="text-xs text-[var(--sematic-buttons-greysolid-1)]">
        Your answers are used only to improve your course recommendations.
      </p>
    </div>
  );
};
