import { Button } from '../ui/Button';
import { useAuth } from '../../lib/auth';

const ArrowRight = ({ variant }: { variant: 'orange' | 'blue' }) => (
  <img src={`/assets/icons/arrow-right-${variant}.svg`} alt="" className="h-6 w-6" />
);

export const TrainerAndBusiness = () => {
  const { becomeRole } = useAuth();

  return (
    <section className="shell flex flex-col justify-center gap-8 py-[60px] lg:flex-row lg:py-[120px]" id="trainer">
      <article className="flex flex-col overflow-hidden rounded-[20px] bg-cocoa lg:h-[578px] lg:w-[540px] lg:shrink-0">
        <div className="relative h-[220px] shrink-0 lg:h-[316px]">
          <img src="/assets/cta/trainer.jpg" alt="A trainer preparing a Soludesk course" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col items-center justify-center gap-2.5 p-5 text-center">
            <h3 className="text-display-xs leading-8 font-semibold text-[var(--global-white)]">
              Share your expertise on LearnHub.
            </h3>
            <p className="text-base leading-6 text-surface-muted">
              Capture a diverse audience with compelling content while educating individuals from various backgrounds,
              all while generating income.
            </p>
          </div>

          <div className="px-5 py-5 sm:px-8">
            <Button
              variant="white"
              size="xl"
              className="w-full text-secondary hover:bg-white/90"
              icon={<ArrowRight variant="orange" />}
              onClick={() => becomeRole('trainer')}
            >
              Sign up as a trainer for Free
            </Button>
          </div>
        </div>
      </article>

      <article
        id="business"
        className="flex flex-1 flex-col items-center justify-between gap-10 overflow-hidden rounded-[20px] bg-primary-text px-5 py-10 sm:px-8 lg:h-[578px]"
      >
        <div className="flex w-full flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <h3 className="heading-display text-[24px] leading-8 text-[var(--global-white)] sm:text-display-lg sm:leading-[60px]">
              Smooth operations and talent building? Try LearnHub for Business
            </h3>
            <p className="text-base leading-6 text-surface-muted">
              Equip Your Teams and streamline operations with LearnHub by Soludesk.
            </p>
          </div>

          <img
            src="/assets/brands/strip.png"
            alt="FedEx, Ferrari, IBM and Lacoste train their teams on LearnHub"
            className="w-full max-w-[700px] opacity-80"
          />
        </div>

        <Button variant="white" size="xl" className="w-full" icon={<ArrowRight variant="blue" />}>
          Get LearnHub for Business
        </Button>
      </article>
    </section>
  );
};
