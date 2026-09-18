import { ArrowDown2, Filter } from 'iconsax-react';
import { Faq } from '../components/home/Faq';
import { FinalCta } from '../components/home/FinalCta';
import { MyApplications } from '../components/scholarships/MyApplications';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { Reveal } from '../components/ui/Reveal';
import { useAuth } from '../lib/auth';
import { scholarships, sponsors } from '../lib/scholarshipData';

export const Scholarships = () => {
  const { becomeRole } = useAuth();

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="shell flex flex-col items-center gap-10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-20">
        <div className="flex w-full max-w-[564px] flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h1 className="heading-display text-[34px] leading-[1.15] text-ink sm:text-[52px] sm:leading-[1.2]">
              <span className="text-secondary">Fund</span> your future. Take opportunity expand your knowledge.
            </h1>
            <p className="text-sm leading-[1.5] text-muted">
              Explore a range of fully-funded courses offered by esteemed institutions globally. Seize the chance to
              pursue your dream course without the burden of financial concerns.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => becomeRole('sponsor')}
              className="flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white"
            >
              Become a Sponsor
            </button>
            <a
              href="#open-scholarships"
              className="flex h-11 flex-1 items-center justify-center rounded-lg border border-primary px-6 text-base text-primary-text"
            >
              Explore Scholarships
            </a>
          </div>
        </div>

        <div className="relative h-[280px] w-full max-w-[520px] shrink-0 sm:h-[360px] lg:h-[444px] lg:w-[520px]">
          <img src="/assets/scholarships/hero.webp" alt="" className="absolute inset-0 size-full object-contain" />
          <img src="/assets/scholarships/avatars/ellipse-2.png" alt="" className="absolute top-[6%] left-[22%] size-[19%] rounded-full object-cover shadow-lg" />
          <img src="/assets/scholarships/avatars/ellipse-3.png" alt="" className="absolute top-[19%] right-0 size-[20%] rounded-full object-cover shadow-lg" />
          <img src="/assets/scholarships/avatars/ellipse-1.png" alt="" className="absolute bottom-[8%] left-[9%] size-[17%] rounded-full object-cover shadow-lg" />
          <img src="/assets/scholarships/avatars/ellipse-4.png" alt="" className="absolute bottom-[2%] right-[16%] size-[15%] rounded-full object-cover shadow-lg" />
        </div>
      </section>

      <Reveal>
        <MyApplications />
      </Reveal>

      <section id="open-scholarships" className="border-b border-[var(--sematic-backgrounds-secondarybackground-2)] gutter bg-[var(--sematic-backgrounds-secondarybackground-1)] py-10">
        <div className="mx-auto flex max-w-[1336px] flex-col gap-8 rounded-[32px] border-[1.5px] border-line-strong bg-[var(--sematic-acents-primarytext-2)] p-6 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <h2 className="heading-display text-3xl leading-[44px] text-white">Open Scholarships</h2>
              <p className="text-base leading-6 text-[#f6f7f6]">Select a course to view scholarship details and apply.</p>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" className="flex h-11 w-[116px] items-center justify-between rounded-full border border-[#d6d6d6] px-5 text-base text-[#f6f7f6]">
                Filter
                <Filter size={18} variant="Linear" color="currentColor" />
              </button>
              <button type="button" className="flex h-11 w-[238px] items-center justify-between rounded-full border border-[#d6d6d6] px-5 text-base text-[#f6f7f6]">
                <span>Date: Recently added</span>
                <ArrowDown2 size={18} variant="Linear" color="currentColor" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <section id="sponsor-a-course" className="shell flex flex-col gap-8 py-16 lg:flex-row lg:py-[120px]">
          <div className="flex flex-1 flex-col justify-between gap-8 rounded-[20px] bg-primary-text p-8">
            <div className="flex flex-col items-center gap-8">
              <h2 className="heading-display text-center text-3xl leading-[1.2] text-[#f2f2f2] sm:text-[48px] sm:leading-[60px]">
                Our Scholarship Sponsors
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
                {sponsors.map((sponsor) => (
                  <span key={sponsor} className="text-lg leading-7 font-bold tracking-[-0.5px] text-white uppercase">
                    {sponsor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-xl leading-[30px] font-bold text-white">Structured Sponsorship</p>
                <p className="text-sm leading-5 font-medium text-white">
                  Scholarships on LearnHub is transparent and configurable. Choose the course, define eligibility, and
                  control how applicants are selected.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl leading-[30px] font-bold text-white">Measurable Impact</p>
                <p className="text-sm leading-5 font-medium text-white">
                  Track every sponsored learner, monitor progress, completion rates, and outcomes. See exactly how your
                  support translates into growth.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-line bg-[#fafafa]">
            <img src="/assets/scholarships/sponsor-cta.webp" alt="" className="h-[220px] w-full object-cover sm:h-[289px]" />
            <div className="flex flex-1 flex-col items-center justify-between gap-8 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-xl leading-8 font-semibold text-ink sm:text-2xl">Sponsor a Course. Change a Career.</h3>
                <p className="text-base leading-6 text-muted">
                  Support motivated learners by funding seats in the courses that matter most. Empower talent through
                  structured, transparent course sponsorship.
                </p>
              </div>
              <button
                type="button"
                onClick={() => becomeRole('sponsor')}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white"
              >
                Become a sponsor
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      <Faq />
      <FinalCta />
    </main>
  );
};
