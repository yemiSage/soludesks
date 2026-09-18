import type { SVGProps } from 'react';

/**
 * Line icons used across the onboarding/assessment flow, redrawn from the Figma
 * export as inline SVGs (stroke="currentColor") so a single asset can render both
 * the default and selected states via Tailwind text-color utilities.
 */
type IconProps = SVGProps<SVGSVGElement>;

export const CirclePlusIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M8 12h8M12 8v8M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" />
  </svg>
);

export const ArrowUpIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M19 12 12 5 5 12M12 5v14" />
  </svg>
);

export const BriefcaseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
  </svg>
);

export const ArrowLeftRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M8 11 4 7l4-4M4 7h16M16 13l4 4-4 4M20 17H4" />
  </svg>
);

export const AwardIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="m15.48 12.89 1.51 8.53a.5.5 0 0 1-.74.53l-3.58-2.69a1 1 0 0 0-1.2 0l-3.59 2.69a.5.5 0 0 1-.74-.53l1.51-8.53M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
  </svg>
);

export const SproutIcon = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M18.67 12.71V9.33a5.33 5.33 0 0 1 5.33-5.33h2a.67.67 0 0 1 .67.67v2a5.33 5.33 0 0 1-5.33 5.33 5.33 5.33 0 0 0-5.33 5.33m0 0c0 2.67 1.33 4 1.33 6.67a5.33 5.33 0 0 1-1.33 3.67m0-10.34c0-3.11-2.53-5.63-5.63-5.63C6.67 12 5.33 13.24 5.33 13.24a8 8 0 0 0 10.67 4.09M6.67 28h18.67" />
  </svg>
);

export const TreeDeciduousIcon = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M16 25.33v4M10.67 25.33a5.33 5.33 0 0 1-1.98-10.29 4.67 4.67 0 0 1 3.6-7.15V8a4 4 0 0 1 8-.05 4.67 4.67 0 0 1 3.05 8.62 4.67 4.67 0 0 1-1.02 8.76H10.67Z" />
  </svg>
);

export const TreePineIcon = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M16 29.33v-4M22.67 18.67 26.67 23a1.33 1.33 0 0 1-1 2.33H6.27A1.33 1.33 0 0 1 5.33 23l4-4.33h-.4a1.33 1.33 0 0 1-.95-2.27L12 12h-.27a1.33 1.33 0 0 1-.94-2.27L16 4l5.33 5.73a1.33 1.33 0 0 1-.94 2.27H20l4 4.4a1.33 1.33 0 0 1-.95 2.27h-.4Z" />
  </svg>
);

export const TestTubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M17.5 5.83 5.68 17.65a2.36 2.36 0 0 1-3.33-3.34L14.17 2.5M13.33 1.67l5 5M10 13.33H3.33" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M10 5v5l3.33 1.67M18.33 10a8.33 8.33 0 1 1-16.67 0 8.33 8.33 0 0 1 16.67 0Z" />
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
    <path d="M2.47 5.32a5.5 5.5 0 0 0-.8 2.6c0 1.92 1.25 3.33 2.5 4.58l4.59 4.44c.31.35.75.55 1.21.56.48-.02.94-.22 1.28-.56l4.58-4.44c1.25-1.25 2.5-2.67 2.5-4.58a5.42 5.42 0 0 0-9.66-3.36 5.4 5.4 0 0 0-7.7 1.76Z" />
  </svg>
);

export const InfoCircleIcon = (props: IconProps) => (
  <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth={3.125} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M25 45.83c11.51 0 20.83-9.33 20.83-20.83S36.51 4.17 25 4.17 4.17 13.49 4.17 25 13.49 45.83 25 45.83Z" />
    <path d="M25 33.33V25" />
    <path d="M25.26 17.19h-.26m.52 0a.52.52 0 1 1-1.04 0 .52.52 0 0 1 1.04 0Z" />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);
