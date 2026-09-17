import { useCollections } from '../../hooks/useCollections';
import { formatPrice } from '../../lib/format';
import { useToast } from '../../lib/toast';
import type { Course } from '../../lib/types';
import { CertificateIcon, AssessmentIcon, FileIcon, LessonsIcon, VideoIcon } from './icons';

const includes = (course: Course) => [
  { icon: VideoIcon, label: `${course.hours} hours on-demand video` },
  { icon: FileIcon, label: `${Math.max(3, Math.round(course.lessons / 6))} Modules` },
  { icon: LessonsIcon, label: `${course.lessons} Lessons` },
  { icon: AssessmentIcon, label: `${Math.max(1, Math.round(course.lessons / 3))} Assessments` },
  { icon: CertificateIcon, label: 'Certificate of completion' },
];

export const PricingPanel = ({ course }: { course: Course }) => {
  const { collections, toggleCart } = useCollections();
  const { showToast } = useToast();
  const inCart = collections.cart.includes(course.id);

  const onToggleCart = () => {
    if (!inCart) showToast(`Added "${course.title}" to your cart`);
    toggleCart(course.id);
  };

  return (
    <div className="flex w-full flex-col gap-5 rounded-xl border-[1.5px] border-line p-5">
      <p className="text-[32px] leading-10 font-semibold text-ink">{formatPrice(course.priceNgn)}</p>

      <button
        type="button"
        onClick={onToggleCart}
        className="flex h-[38px] w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-colors hover:bg-primary-strong sm:h-[43px]"
      >
        {inCart ? 'In cart' : 'Add to cart'}
      </button>
      <a
        href="#lessons-panel"
        className="flex h-[38px] w-full items-center justify-center rounded-lg border border-primary text-base text-primary-text sm:h-[43px]"
      >
        Get Started
      </a>

      <div className="flex flex-col gap-3 border-t border-line-strong pt-4">
        <h3 className="text-base leading-6 font-semibold text-ink">This course includes:</h3>
        <ul className="flex flex-col gap-2">
          {includes(course).map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm leading-[21px] text-muted">
              <item.icon className="size-4 shrink-0 text-muted" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
