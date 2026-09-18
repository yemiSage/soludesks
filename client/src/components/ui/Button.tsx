import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/format';

type Variant = 'primary' | 'outline' | 'white' | 'quiet';
type Size = 'md' | 'lg' | 'xl';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white font-medium hover:bg-primary-strong',
  outline: 'border border-primary text-primary bg-transparent hover:bg-primary/5',
  white: 'bg-white text-primary-text font-medium hover:bg-white/90',
  quiet: 'border border-[var(--sematic-buttons-greysolid-2)] text-ink hover:bg-line-soft',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-base',
  lg: 'h-11 px-6 text-base',
  xl: 'h-11 px-6 text-base',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export const Button = ({ variant = 'primary', size = 'md', icon, className, children, ...props }: Props) => (
  <button
    className={cx(
      'inline-flex items-center justify-center gap-2.5 rounded-lg leading-6 transition-[color,background-color,border-color] duration-300 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-60',
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  >
    {children}
    {icon}
  </button>
);
