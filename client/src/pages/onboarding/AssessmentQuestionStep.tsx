import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CloseIcon } from '../../components/onboarding/icons';
import { LeaveConfirmationModal } from '../../components/onboarding/LeaveConfirmationModal';
import { ProgressBar } from '../../components/onboarding/ProgressBar';
import { cx } from '../../lib/format';
import { quizQuestions } from '../../lib/onboarding';
import { useOnboarding } from './OnboardingContext';

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

export const AssessmentQuestionStep = () => {
  const navigate = useNavigate();
  const { questionIndex } = useParams();
  const { answers, setAnswer } = useOnboarding();
  const [leaving, setLeaving] = useState(false);

  const total = quizQuestions.length;
  const position = Number(questionIndex);
  const progress = useMemo(() => position / total, [position, total]);

  if (!Number.isInteger(position) || position < 1 || position > total) {
    return <Navigate to="/get-started/assessment/1" replace />;
  }

  const zeroBased = position - 1;
  const question = quizQuestions[zeroBased];
  if (!question) {
    return <Navigate to="/get-started/assessment/1" replace />;
  }
  const selectedOption = answers[zeroBased] ?? null;
  const isLast = position === total;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full max-w-[684px] flex-col gap-3">
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            onClick={() => (position === 1 ? navigate('/get-started/assessment') : navigate(`/get-started/assessment/${position - 1}`))}
            className="flex flex-1 items-center gap-3"
          >
            <span className="flex shrink-0 items-center justify-center rounded-full bg-primary-text p-1.5 text-white">
              <ArrowLeftIcon className="size-3.5" />
            </span>
            <span className="text-xl leading-[30px] font-medium text-ink">Go back</span>
          </button>
          <span className="text-sm leading-5 font-medium text-ink">
            {position}/{total}
          </span>
          <button type="button" onClick={() => setLeaving(true)} aria-label="Close assessment" className="text-muted hover:text-ink">
            <CloseIcon className="size-5" />
          </button>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="flex w-full max-w-[684px] flex-col items-end gap-10">
        <div className="w-full rounded-[14px] border border-line-strong bg-[var(--sematic-backgrounds-backround-2)] p-[13px]">
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-5 font-medium text-ink">{question.prompt}</p>
            <span className="inline-flex w-fit items-center rounded-lg border border-black/10 px-2.5 py-[3px] text-xs text-ink">
              {question.format}
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {question.options.map((option, index) => {
              const selected = selectedOption === index;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswer(zeroBased, index)}
                  aria-pressed={selected}
                  className={cx(
                    'w-full rounded-[10px] border px-2.5 py-2 text-left text-xs leading-[18px] text-muted transition-colors',
                    selected
                      ? 'border-primary-text bg-[var(--sematic-backgrounds-primarybackground-1)]'
                      : 'border-line-strong bg-[var(--sematic-backgrounds-backround-1)] hover:border-primary-text/50',
                  )}
                >
                  {letters[index]}. {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={position === 1}
            onClick={() => navigate(`/get-started/assessment/${position - 1}`)}
            className="flex h-11 w-[186px] items-center justify-center rounded-lg border border-primary-text text-base text-primary-text disabled:opacity-30"
          >
            Go back
          </button>
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={() =>
              isLast ? navigate('/get-started/processing') : navigate(`/get-started/assessment/${position + 1}`)
            }
            className="flex h-11 w-[186px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white disabled:opacity-40"
          >
            {isLast ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>

      <LeaveConfirmationModal open={leaving} onContinue={() => setLeaving(false)} onLeave={() => navigate('/')} />
    </div>
  );
};
