import { Button } from '../ui/Button';

export const BusinessHero = () => (
  <section id="top" className="relative overflow-hidden">
    <img src="/assets/business/hero-pattern.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[rgb(240_246_254_/_0.86)]" />

    <div className="shell relative grid items-center gap-12 pt-[calc(var(--nav-h)+64px)] pb-0 lg:h-[820px] lg:max-w-none lg:grid-cols-[553px_minmax(0,1fr)] lg:gap-8 lg:pt-[140px] lg:pr-0 lg:pb-0 lg:pl-[max(clamp(20px,3.6vw,52px),calc((100vw-1440px)/2+52px))]">
      <div className="relative z-10 flex flex-col gap-[34px]">
        <div className="flex flex-col gap-[19px]">
          <h1 className="heading-display text-[36px] leading-[1.2] tracking-[-1px] text-ink sm:text-[44px] lg:text-[52px]">
            Train your team, <span className="text-secondary">streamline operations</span>, and scale your business.
          </h1>
          <p className="text-sm leading-[1.5] text-muted">
            Introducing a groundbreaking all-in-one operating system that connects business operations with workforce
            development. This platform boosts productivity and encourages collaboration for employee growth,
            streamlining processes while enhancing skills.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:max-w-[512px]">
          <Button
            size="lg"
            className="flex-1 rounded-xl"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 rounded-xl border-primary-text text-primary-text"
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book A Demo
          </Button>
        </div>
      </div>

      <div className="relative -mx-[clamp(20px,3.6vw,52px)] mt-2 w-[calc(100%+2*clamp(20px,3.6vw,52px))] overflow-hidden lg:mx-0 lg:mt-0 lg:aspect-[706/621] lg:w-full lg:max-w-[706px] lg:self-end lg:justify-self-end">
        <img
          src="/assets/business/hero-dashboard-platform.webp"
          alt="The Soludesk business operations dashboard"
          className="block h-auto w-full max-w-none origin-bottom-left -translate-x-[2.4%] -translate-y-[2.7%] scale-[1.025] object-contain object-left-bottom lg:translate-x-0 lg:translate-y-0 lg:scale-100"
        />
      </div>
    </div>
  </section>
);
