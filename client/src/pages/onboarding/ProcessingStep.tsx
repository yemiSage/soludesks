import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProcessingStep = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/get-started/results'), 2200);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex w-full flex-col items-center gap-10 py-24">
      <svg viewBox="0 0 113.5 113.5" className="size-[113.5px]">
        <circle cx="56.75" cy="56.75" r="40.2" stroke="var(--color-primary)" strokeWidth="9.46" fill="none" />
        <circle
          cx="56.75"
          cy="56.75"
          r="9.46"
          fill="var(--color-primary)"
          style={{ transformOrigin: '56.75px 56.75px', animation: 'pulse-dot 1.1s ease-in-out infinite' }}
        />
      </svg>

      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm leading-5 font-semibold text-primary">Matching courses to your goals...</p>
        <h1 className="text-2xl leading-8 font-medium text-ink">You're all done</h1>
        <p className="max-w-[420px] text-base leading-[1.5] text-[#666]">
          We're putting together your personalised learning recommendations.
        </p>
      </div>
    </div>
  );
};
