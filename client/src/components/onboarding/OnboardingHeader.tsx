import { ArrowLeftIcon } from './icons';
import { ProgressBar } from './ProgressBar';

type Props = {
  onBack: () => void;
  progress: number;
  counter?: string;
};

export const OnboardingHeader = ({ onBack, progress, counter }: Props) => (
  <div className="flex w-full max-w-[684px] flex-col gap-3">
    <div className="flex w-full items-center gap-3">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex shrink-0 items-center justify-center rounded-full bg-primary-text p-1.5 text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeftIcon className="size-3.5" />
        </button>
        <span className="text-xl leading-[30px] font-medium text-ink">Go back</span>
      </div>
      {counter ? <span className="text-sm leading-5 font-medium text-ink">{counter}</span> : null}
    </div>
    <ProgressBar value={progress} />
  </div>
);
