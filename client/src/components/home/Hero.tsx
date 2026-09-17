import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';

const avatars = [1, 2, 3, 4].map((index) => `/assets/hero/avatar-${index}.png`);

type Props = { onSearch: (term: string) => void };

export const Hero = ({ onSearch }: Props) => {
  const [term, setTerm] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(term.trim());
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <img src="/assets/hero/pattern.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[rgb(240_246_254_/_0.86)]" />

      <div className="shell relative flex min-h-[100dvh] flex-col justify-center gap-6 pt-[var(--nav-h)] pb-6">
        <div className="grid items-center gap-6 lg:grid-cols-[565px_1fr] lg:gap-8">
          <div className="flex flex-col gap-[14px] lg:col-start-1 lg:row-start-1">
            <h1 className="heading-display text-[26px] leading-[1.2] tracking-[-1px] text-ink sm:text-[38px] lg:text-[52px]">
              Acquire skills that will <span className="text-secondary">boost your career prospects.</span> Expand
              your opportunities.
            </h1>
            <p className="text-sm leading-[1.5] text-muted">
              Access thousands of courses, earn verified certificates, and connect with top employers using Soludesk
              LearnHub.
            </p>
          </div>

          {/* On phones the artwork drops below the search field and scales with its own aspect ratio. */}
          <div className="order-last relative lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:justify-self-end lg:self-center">
            {/* w-auto + max-h keeps width and height scaling together (no letterboxing) while
                the viewport-height cap keeps the whole hero above the fold on short phones. */}
            <img
              src="/assets/hero/dashboard.webp"
              alt="The Soludesk LearnHub learner dashboard"
              width={1210}
              height={1117}
              fetchPriority="high"
              className="mx-auto h-auto max-h-[34vh] w-auto max-w-full rounded-lg sm:max-h-[42vh] lg:max-h-none lg:w-[604px]"
            />
          </div>

          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <label className="flex h-11 flex-1 items-center gap-2.5 rounded-xl border border-line bg-white px-5 py-2">
                <img src="/assets/icons/search.svg" alt="" className="h-3.5 w-3.5 shrink-0" />
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="What are you learning today?"
                  aria-label="Search courses"
                  className="w-full bg-transparent text-xs leading-[18px] text-ink outline-none placeholder:text-[var(--sematic-buttons-greysolid-1)]"
                />
              </label>
              <Button type="submit" size="lg" className="sm:w-[140px]">
                Search
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {avatars.map((avatar, index) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt=""
                    className="h-[36px] w-[36px] rounded-full object-cover sm:h-[42px] sm:w-[42px]"
                    style={{ marginRight: index < avatars.length - 1 ? '-16.7px' : undefined }}
                  />
                ))}
              </div>
              <p className="max-w-[222px] text-sm leading-[1.5] font-semibold text-ink">
                Join 100+ learners around the world who trust LearnHub
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
