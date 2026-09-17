import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Button } from '../ui/Button';

type Props = {
  badge?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryTarget?: string;
  intent?: 'learner' | 'business';
};

export const FinalCta = ({
  badge = 'Start your journey',
  description = 'Thousands of learners are already advancing their careers with Soludesk LearnHub.',
  primaryLabel = 'Get Started',
  secondaryLabel = 'Explore Courses',
  secondaryTarget = 'catalogue',
  intent = 'learner',
}: Props) => {
  const [email, setEmail] = useState('');
  const [capturing, setCapturing] = useState(false);
  const subscribe = useMutation({ mutationFn: (value: string) => api.subscribe(value, intent) });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    subscribe.mutate(email.trim());
  };

  return (
    <section className="border-b border-[var(--sematic-backgrounds-secondarybackground-2)] py-[60px] lg:py-[120px]">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[20px] bg-ink px-6 py-16 sm:rounded-[48px] lg:h-[552px] lg:px-0">
          <div className="absolute -right-5 -bottom-0.5 h-[500px] w-[500px] rounded-full bg-primary-text opacity-20 blur-[50px]" />
          <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#b7b7b7] opacity-20 blur-[50px]" />
          <img
            src="/assets/cta/lines.svg"
            alt=""
            className="pointer-events-none absolute -top-16 left-0 w-full scale-y-[-1] rotate-180 opacity-90"
          />

          <div className="relative mx-auto flex max-w-[666px] flex-col items-center gap-10 lg:h-full lg:justify-center">
            <div className="flex flex-col items-center gap-[18px]">
              <span className="rounded-full border border-[rgb(251_146_60_/_0.3)] bg-[rgb(249_115_22_/_0.2)] px-3 py-1.5 text-sm leading-5 font-semibold text-[#fed7aa] backdrop-blur-[6px]">
                {badge}
              </span>

              <div className="flex flex-col items-center gap-5 text-center">
                <h2 className="text-[38px] leading-[1.2] font-bold tracking-[-1.2px] text-[var(--global-white)] sm:text-display-xl sm:leading-[72px]">
                  Unlock your potential.{' '}
                  <span className="bg-gradient-to-r from-[#fed7aa] to-[#fecaca] bg-clip-text text-transparent">
                    Learn for free.
                  </span>
                </h2>
                <p className="text-base leading-6 text-slate-quiet">{description}</p>
              </div>
            </div>

            {subscribe.isSuccess ? (
              <p className="text-base leading-6 font-medium text-[#fed7aa]">
                You’re on the list — check your inbox for your first learning path.
              </p>
            ) : capturing ? (
              <form onSubmit={submit} className="flex w-full flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="h-13 flex-1 rounded-lg border border-white/20 bg-white/10 px-5 text-base text-white outline-none placeholder:text-white/50 focus:border-white/60"
                />
                <Button type="submit" size="lg" disabled={subscribe.isPending} className="sm:w-[180px]">
                  {subscribe.isPending ? 'Signing up…' : 'Create account'}
                </Button>
              </form>
            ) : (
              <div className="flex w-full flex-col gap-5 sm:flex-row">
                <Button size="lg" className="!h-11 w-full sm:!h-[43px] sm:flex-1" onClick={() => setCapturing(true)}>
                  {primaryLabel}
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  className="!h-11 w-full border border-surface-muted sm:!h-[43px] sm:flex-1"
                  onClick={() => document.getElementById(secondaryTarget)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {secondaryLabel}
                </Button>
              </div>
            )}

            {subscribe.isError ? (
              <p className="text-sm text-[#ffa189]">{(subscribe.error as Error).message}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
