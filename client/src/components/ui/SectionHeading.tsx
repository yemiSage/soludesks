import { cx } from '../../lib/format';

type Props = {
  title: string;
  description?: string;
  tone?: 'dark' | 'light';
  className?: string;
};

export const SectionHeading = ({ title, description, tone = 'dark', className }: Props) => (
  <div className={cx('flex w-full max-w-[738px] flex-col items-center gap-2 text-center', className)}>
    <h2
      className={cx(
        'heading-display text-[24px] leading-8 sm:text-display-md sm:leading-[44px]',
        tone === 'dark' ? 'text-ink' : 'text-surface-muted',
      )}
    >
      {title}
    </h2>
    {description ? (
      <p className={cx('text-sm leading-5 sm:text-base sm:leading-6', tone === 'dark' ? 'text-muted' : 'text-surface-muted/90')}>
        {description}
      </p>
    ) : null}
  </div>
);
