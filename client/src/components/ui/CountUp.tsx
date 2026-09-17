import { useEffect, useRef, useState } from 'react';

const parseValue = (raw: string) => {
  const match = raw.match(/^([\d,.]+)(.*)$/);
  if (!match?.[1]) return null;
  const number = Number(match[1].replace(/,/g, ''));
  if (Number.isNaN(number)) return null;
  return { number, suffix: match[2] ?? '' };
};

/** Counts a stat like "500+" or "50k+" up from 0 once it scrolls into view. */
export const CountUp = ({ value, duration = 1400 }: { value: string; duration?: number }) => {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(parsed ? '0' + parsed.suffix : value);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parsed) return;

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(parsed.number * eased).toString() + parsed.suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{parsed ? display : value}</span>;
};
