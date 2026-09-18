import { Link } from 'react-router-dom';

export const AssessmentCta = () => (
  <section className="py-10 pb-[60px] lg:pt-10 lg:pb-[120px]">
    <div className="shell">
      <div className="relative h-[399px] overflow-hidden rounded-[20px] bg-gradient-to-r from-[#005de9] to-[#0462cc]">
        <img
          src="/assets/assessment/marquee-pattern.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <img
          src="/assets/assessment/cta-illustration.webp"
          alt=""
          className="pointer-events-none absolute top-1/2 right-[-40px] hidden h-[110%] max-w-none -translate-y-1/2 object-contain sm:right-6 sm:block lg:right-[60px]"
        />

        <div className="relative flex h-full max-w-[627px] flex-col justify-center gap-8 px-6 sm:gap-13 sm:px-10 lg:px-[60px]">
          <div className="flex flex-col gap-1">
            <p className="text-base leading-6 font-semibold text-white">Takes about 3 minutes</p>
            <div className="flex flex-col gap-1.5">
              <h2 className="heading-display text-[26px] leading-[1.2] text-white sm:text-display-md sm:leading-[44px]">
                Not sure what to learn next or where to start from?
              </h2>
              <p className="text-base leading-6 text-white">
                Take a short assessment to understand your current skill level and discover courses that match your
                goals.
              </p>
            </div>
          </div>

          <Link
            to="/get-started"
            className="flex h-11 w-fit items-center justify-center rounded-xl bg-white px-5 text-base font-medium text-primary-text"
          >
            Let's help you get started
          </Link>
        </div>
      </div>
    </div>
  </section>
);
