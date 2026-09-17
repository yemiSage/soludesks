import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft } from 'iconsax-react';
import { MOCK_OTP } from '../../lib/auth';
import { cx } from '../../lib/format';
import { useBodyScrollLock } from '../../lib/useBodyScrollLock';
import { useCountdown } from '../../lib/useCountdown';

type Props = {
  email: string | null;
  onChangeEmail: () => void;
  onClose: () => void;
  onVerified: () => void;
};

export const VerifyEmailModal = ({ email, onChangeEmail, onClose, onVerified }: Props) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const open = Boolean(email);
  const { remaining, restart } = useCountdown(60);

  useEffect(() => {
    if (open) {
      setDigits(['', '', '', '']);
      setError(null);
      restart();
      inputs.current[0]?.focus();
    }
  }, [open, email]);

  useBodyScrollLock(open);

  if (!email) return null;

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < 3) inputs.current[index + 1]?.focus();

    if (next.every((digit) => digit !== '')) {
      if (next.join('') === MOCK_OTP) {
        onVerified();
      } else {
        setError('Code is incorrect, kindly check and retry');
        setDigits(['', '', '', '']);
        inputs.current[0]?.focus();
      }
    }
  };

  const onKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="verify-email-title">
      <div className="flex w-full max-w-[615px] flex-col gap-10 rounded-[20px] bg-white p-8">
        <div className="flex flex-col gap-3">
          <button type="button" onClick={onChangeEmail} className="flex items-center gap-2 self-start text-sm leading-5 font-medium text-primary-text">
            <ArrowLeft size={18} variant="Linear" color="currentColor" />
            Change email address
          </button>
          <div className="flex flex-col gap-[13px]">
            <h2 id="verify-email-title" className="heading-display text-2xl leading-8 text-ink">
              Kindly Check Your Mail
            </h2>
            <p className="text-base leading-6 text-muted">
              An OTP has been sent to <span className="font-bold text-ink">{email}</span>, kindly input the code below to
              continue your scholarship application
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-[13px]">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={onKeyDown(index)}
                className={cx(
                  'flex size-[47px] items-center justify-center rounded-xl border text-center text-base font-medium text-ink focus:outline-none',
                  error ? 'border-[#ff5025]' : 'border-muted focus:border-primary',
                )}
              />
            ))}
          </div>
          {error ? <p className="text-sm leading-5 text-[#ff5025]">{error}</p> : null}
          <p className="text-sm leading-5">
            Didn&apos;t receive code?{' '}
            {remaining > 0 ? (
              <span className="font-bold text-muted">Resend in {remaining}s</span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  restart();
                }}
                className="font-bold text-primary-text"
              >
                Resend
              </button>
            )}
          </p>
        </div>

        <button type="button" onClick={onClose} className="self-start text-sm leading-5 font-medium text-muted hover:text-ink">
          Cancel
        </button>
      </div>
    </div>,
    document.body,
  );
};
