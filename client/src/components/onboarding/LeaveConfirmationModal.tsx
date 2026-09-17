import { CloseIcon, InfoCircleIcon } from './icons';

type Props = {
  open: boolean;
  onContinue: () => void;
  onLeave: () => void;
};

export const LeaveConfirmationModal = ({ open, onContinue, onLeave }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-labelledby="leave-assessment-title">
      <div className="flex w-full max-w-[724px] flex-col overflow-hidden rounded-[20px] bg-white">
        <div className="flex items-center justify-between border-b border-line-strong px-8 py-5">
          <span className="text-xl leading-[30px] font-semibold text-ink">Close</span>
          <button type="button" onClick={onContinue} aria-label="Close" className="text-muted hover:text-ink">
            <CloseIcon className="size-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 px-8 py-16 text-center">
          <InfoCircleIcon className="size-[50px] text-[#ff5025]" />
          <h2 id="leave-assessment-title" className="text-2xl leading-8 font-medium text-ink">
            Leave the assessment
          </h2>
          <p className="max-w-[369px] text-base leading-[1.5] text-[#666]">
            Your progress will be lost, are you sure you want to close the assessment?
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-line-soft px-8 py-5">
          <button
            type="button"
            onClick={onLeave}
            className="flex h-12 items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text"
          >
            Yes, leave
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="flex h-12 w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
