import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/format';

type Props = {
  children: ReactNode;
  className?: string;
  /** ms delay before the transition starts, for staggering a row of cards. */
  delay?: number;
};

/** Fades + lifts content into place once it scrolls into view. Runs once, respects reduced motion. */
export const Reveal = ({ children, className, delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        'transition-[opacity,transform] duration-700 ease-[var(--ease-premium)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
};
