import { cx } from '../../lib/format';

type Props = { checked: boolean; onChange: (checked: boolean) => void; label: string };

export const Toggle = ({ checked, onChange, label }: Props) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={cx('relative h-[18px] w-8 shrink-0 rounded-full transition-colors', checked ? 'bg-primary-text' : 'bg-[#cecece]')}
  >
    <span
      className={cx(
        'absolute top-px block size-4 rounded-full bg-white transition-transform',
        checked ? 'translate-x-[15px]' : 'translate-x-px',
      )}
    />
  </button>
);
