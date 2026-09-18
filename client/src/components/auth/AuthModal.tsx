import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloseCircle } from 'iconsax-react';
import { Button } from '../ui/Button';
import { dashboardPathForRole, MOCK_EMAIL, MOCK_OTP, useAuth, type AuthIntent } from '../../lib/auth';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { useBodyScrollLock } from '../../lib/useBodyScrollLock';
import { useCountdown } from '../../lib/useCountdown';

const subtitleByIntent: Record<AuthIntent, string> = {
  signin: 'Enter your details below to continue',
  checkout: 'Sign in to your account to continue to checkout',
  scholarship: 'Sign in or create an account to apply for this scholarship',
  trainer: 'Enter your details address below to begin',
  sponsor: 'Enter your details address below to begin',
  'learning-path': 'Sign in to save your learning path and continue with this course',
};

const titleByIntent: Partial<Record<AuthIntent, string>> = {
  trainer: 'Login or Sign Up As Trainer',
  sponsor: 'Login or Sign Up As a Sponsor',
};

const panelByIntent: Partial<Record<AuthIntent, { image: string; tagline: string; year: number }>> = {
  trainer: {
    image: '/assets/auth/trainer-photo.jpg',
    tagline: 'Embark on your training adventure today! Share customized courses, monetize your expertise.',
    year: 2023,
  },
  sponsor: {
    image: '/assets/auth/sponsor-photo.png',
    tagline: 'Sponsor a Course. Elevate a Career.',
    year: 2024,
  },
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const EmailStep = () => {
  const { requestOtp, closeAuthModal, intent, pendingEmail } = useAuth();
  const [email, setEmail] = useState(pendingEmail);
  const [showGoogleNote, setShowGoogleNote] = useState(false);

  const submit = () => {
    if (!isValidEmail(email)) return;
    requestOtp(email);
  };

  return (
    <div className="flex w-full flex-col gap-5 sm:gap-8">
      <button
        type="button"
        onClick={closeAuthModal}
        className="flex h-[38px] items-center justify-center self-end rounded-xl border border-line-strong px-5 text-base font-medium text-muted transition-colors hover:bg-line-soft sm:h-[43px]"
      >
        Cancel
      </button>

      <div className="flex w-full flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-[13px]">
            <h2 className="heading-display text-xl leading-7 text-ink sm:text-2xl sm:leading-8">{titleByIntent[intent] ?? 'Sign Up or Login Into your Account'}</h2>
            <p className="text-base leading-6 text-muted">{subtitleByIntent[intent]}</p>
          </div>

          <form
            className="flex flex-col gap-[6px]"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label htmlFor="auth-email" className="flex gap-[2px] text-sm leading-5 font-medium text-ink">
              Email Address <span className="text-[#ff5025]">*</span>
            </label>
            <input
              id="auth-email"
              type="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className={inputClass}
            />

            <div className="mt-4 flex flex-col items-center gap-3">
              <Button type="submit" size="lg" className="w-full" disabled={!isValidEmail(email)}>
                Continue
              </Button>
              <p className="text-center text-sm leading-5 text-muted">
                By continuing you are confirming to have read and agree to soludesk{' '}
                <Link to="/legal/terms-of-service" onClick={closeAuthModal} className="font-bold text-primary-text">
                  terms and condition
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-sm leading-5 text-muted">0r</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={() => setShowGoogleNote(true)}
            className="flex h-[38px] w-full items-center justify-center gap-[15px] rounded-xl bg-ink px-[15px] text-white transition-opacity hover:opacity-90 sm:h-[43px]"
          >
            <img src="/assets/auth/google-logo.svg" alt="" className="size-5" />
            <span className="text-base leading-6 font-medium">Continue with Google</span>
          </button>
          {showGoogleNote ? (
            <p className="text-center text-sm leading-5 text-muted">Google sign-in isn’t wired up in this demo — use the email + OTP flow above.</p>
          ) : null}
        </div>

        <div className="rounded-xl border border-dashed border-line-strong bg-chip px-4 py-3 text-sm leading-5 text-muted opacity-20">
          Demo access — email <span className="font-bold text-ink">{MOCK_EMAIL}</span>, code <span className="font-bold text-ink">{MOCK_OTP}</span>
        </div>
      </div>
    </div>
  );
};

const OtpStep = () => {
  const { pendingEmail, otpError, otpBusy, verifyOtp, resendOtp, changeEmail, closeAuthModal, intent, activeRole } = useAuth();
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const { remaining, restart } = useCountdown(60);
  const navigate = useNavigate();

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const attempt = async (code: string) => {
    const ok = await verifyOtp(code);
    if (!ok) {
      setDigits(['', '', '', '']);
      inputs.current[0]?.focus();
      return;
    }
    // Plain "Log In" (no specific follow-up action) lands the user back on whichever
    // dashboard their account was last active in — new users default to the learner one.
    if (intent === 'signin') navigate(dashboardPathForRole[activeRole]);
  };

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (next.every((digit) => digit !== '')) {
      void attempt(next.join(''));
    }
  };

  const onKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 sm:gap-8">
      <button
        type="button"
        onClick={closeAuthModal}
        className="flex h-[38px] items-center justify-center self-end rounded-xl border border-line-strong px-5 text-base font-medium text-muted transition-colors hover:bg-line-soft sm:h-[43px]"
      >
        Cancel
      </button>

      <div className="flex w-full flex-col gap-5 sm:gap-[25px]">
        <div className="flex flex-col gap-[13px]">
          <h2 className="heading-display text-2xl leading-8 text-ink sm:text-[36px] sm:leading-[44px]">Verify your Email</h2>
          <p className="text-base leading-6 text-muted">
            An otp has been sent to <span className="font-bold text-ink">{pendingEmail}</span>, kindly input the code below to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
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
                disabled={otpBusy}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={onKeyDown(index)}
                className={cx(
                  'flex size-[47px] items-center justify-center rounded-xl border text-center text-base font-medium text-ink focus:outline-none',
                  otpError ? 'border-[#ff5025]' : 'border-muted focus:border-primary',
                )}
              />
            ))}
          </div>

          {otpError ? <p className="text-sm leading-5 text-[#ff5025]">{otpError}</p> : null}

          <div className="flex flex-col gap-2 text-sm leading-5">
            <p className="text-ink">
              Didn’t receive code?{' '}
              {remaining > 0 ? (
                <span className="font-bold text-muted">Resend in {remaining}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    resendOtp();
                    restart();
                  }}
                  className="font-bold text-primary-text"
                >
                  Resend
                </button>
              )}
            </p>
            <p className="text-ink">
              Incorrect email?{' '}
              <button type="button" onClick={changeEmail} className="font-bold text-primary-text">
                Change email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthModal = () => {
  const { modalStep, closeAuthModal, intent } = useAuth();
  const open = modalStep !== 'closed';
  const panel = panelByIntent[intent];

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, closeAuthModal]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      {/* Phones get an edge-to-edge sheet (full height, square corners, safe-area aware); sm+ keeps the floating card. */}
      <div className="relative grid h-[100dvh] w-full max-w-none grid-cols-1 gap-6 overflow-hidden bg-white px-4 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))] sm:h-[80vh] sm:w-[80vw] sm:rounded-[40px] sm:p-5 lg:grid-cols-2 lg:gap-10">
        <button
          type="button"
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute top-7 right-7 hidden text-muted hover:text-ink sm:block lg:hidden"
        >
          <CloseCircle size={24} variant="Linear" color="currentColor" />
        </button>

        <div className="relative hidden h-full w-full overflow-hidden rounded-3xl lg:block">
          <img src={panel?.image ?? '/assets/auth/library-photo.png'} alt="" className="absolute inset-0 size-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(184.34deg, rgba(10,96,225,0) 54.85%, rgb(0,58,145) 89.56%)',
            }}
          />
          <img src="/assets/auth/hex-1.svg" alt="" className="pointer-events-none absolute bottom-3 -left-1 size-[152px] opacity-80" />
          <img src="/assets/auth/hex-3.svg" alt="" className="pointer-events-none absolute -right-13 -bottom-6 size-[152px] opacity-80" />
          <img src="/assets/auth/hex-2.svg" alt="" className="pointer-events-none absolute -bottom-4 -left-7 size-[147px] opacity-80" />

          <div className="absolute bottom-5 flex w-full flex-col gap-[42px] px-5">
            <div className="flex flex-col gap-5">
              <img src="/assets/brand/logo-footer.svg" alt="Soludesk" className="h-9 w-[126px] object-contain" />
              <p id="auth-modal-title" className="heading-display text-2xl leading-8 text-white">
                {panel?.tagline ??
                  'Your learning journey starts here. Discover courses, build new skills, and track your progress. All in one place.'}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-5 text-sm leading-5 text-white/60">
              <span>{panel?.year ?? new Date().getFullYear()} Soludesks Inc.</span>
              <div className="flex gap-[27px]">
                <Link to="/legal/privacy-policy" onClick={closeAuthModal} className="hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="/legal/terms-of-service" onClick={closeAuthModal} className="hover:text-white">
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[420px] flex-col">
            {modalStep === 'email' ? <EmailStep /> : <OtpStep />}
          </div>
        </div>
      </div>
    </div>
  );
};
