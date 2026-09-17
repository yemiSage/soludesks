import type { ComponentType, SVGProps } from 'react';
import { cx } from '../../lib/format';

type IconType = ComponentType<SVGProps<SVGSVGElement>> | string;

type Props = {
  icon: IconType;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  /** `goal`: compact card with a top-right radio indicator. `skill`: taller card with a centered icon badge. */
  variant?: 'goal' | 'skill';
};

const CardIcon = ({ icon, className }: { icon: IconType; className: string }) =>
  typeof icon === 'string' ? (
    <img src={icon} alt="" className={cx(className, 'object-contain')} />
  ) : (
    (() => {
      const Icon = icon;
      return <Icon className={className} />;
    })()
  );

export const OptionCard = ({ icon, title, description, selected, onSelect, variant = 'goal' }: Props) => {
  if (variant === 'skill') {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cx(
          'flex min-h-[176px] flex-1 flex-col items-center gap-3 rounded-xl border bg-white p-3 text-center transition-colors sm:h-[211px] sm:gap-5 sm:p-5',
          selected ? 'border-2 border-primary' : 'border-[#e2e8f0] hover:border-primary/40',
        )}
      >
        <span
          className={cx(
            'flex size-12 items-center justify-center rounded-full sm:size-16',
            selected ? 'bg-[#eff6ff]' : 'bg-[var(--global-background)]',
          )}
        >
          <CardIcon icon={icon} className={cx('size-6 sm:size-8', selected ? 'text-primary' : 'text-muted')} />
        </span>
        <span className="flex flex-col items-center gap-2">
          <span className={cx('text-sm leading-5 font-semibold', selected ? 'text-primary' : 'text-ink')}>{title}</span>
          <span className="text-[11px] leading-[15px] text-muted">{description}</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'flex h-40 flex-1 flex-col items-start gap-4 rounded-xl border bg-white p-5 text-left transition-colors',
        selected ? 'border-2 border-primary' : 'border-[#e2e8f0] hover:border-primary/40',
      )}
    >
      <span className="flex w-full items-center justify-between">
        <CardIcon icon={icon} className={cx('size-6', selected ? 'text-primary' : 'text-muted')} />
        {!selected ? <span className="size-5 rounded-full border-[1.5px] border-[#d9d9d9]" aria-hidden /> : null}
      </span>
      <span className="flex flex-col items-start gap-1">
        <span className="text-sm leading-5 font-semibold text-ink">{title}</span>
        <span className="text-xs leading-[normal] text-muted">{description}</span>
      </span>
    </button>
  );
};
