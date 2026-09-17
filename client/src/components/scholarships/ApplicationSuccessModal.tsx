import { createPortal } from 'react-dom';
import { CloseCircle, TickCircle } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useBodyScrollLock } from '../../lib/useBodyScrollLock';

type Props = {
  scholarshipTitle: string | null;
  onClose: () => void;
};

export const ApplicationSuccessModal = ({ scholarshipTitle, onClose }: Props) => {
  const navigate = useNavigate();
  const open = Boolean(scholarshipTitle);

  useBodyScrollLock(open);

  if (!scholarshipTitle) return null;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="application-success-title">
      <div className="flex w-full max-w-[514px] flex-col gap-10 rounded-lg bg-white p-8">
        <div className="flex flex-col gap-1">
          <div className="flex justify-end">
            <button type="button" onClick={onClose} aria-label="Close" className="text-[#2c3e50] hover:opacity-70">
              <CloseCircle size={24} variant="Linear" color="currentColor" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-[17px] text-center">
            <TickCircle size={50} variant="Bold" color="#16a34a" />
            <p id="application-success-title" className="text-2xl leading-[1.5] font-bold text-[#2c3e50]">
              Application Successful
            </p>
            <p className="text-base leading-[1.5] text-[#666]">
              You have successfully applied for the <span className="font-bold">{scholarshipTitle}</span>. You will be
              notified of updates and can track your progress on your scholarship page.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            navigate('/scholarships');
          }}
          className="flex h-[38px] items-center justify-center rounded-lg bg-primary-text px-3 text-base font-semibold text-white sm:h-[43px]"
        >
          Go to scholarships
        </button>
      </div>
    </div>,
    document.body,
  );
};
