import type { SVGProps } from 'react';

/** Line icons for the course detail page, redrawn from Figma as inline SVGs (stroke="currentColor"). */
type IconProps = SVGProps<SVGSVGElement>;

export const ArrowLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67" />
  </svg>
);

export const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 12V8.44c0-4.42 3.13-6.23 6.96-4.02l3.09 1.78 3.09 1.78c3.83 2.21 3.83 5.83 0 8.04l-3.09 1.78-3.09 1.78C7.13 21.79 4 19.98 4 15.56V12Z" />
  </svg>
);

export const ChevronUpIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19.92 15.05 13.4 8.53a1.41 1.41 0 0 0-2 0l-6.52 6.52" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19.92 8.95 13.4 15.47a1.41 1.41 0 0 1-2 0L4.88 8.95" />
  </svg>
);

export const CheckCircleIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.54 6.67a6.67 6.67 0 1 1-3.86-5.44" />
    <path d="m6 7.33 2 2 6.67-6.66" />
  </svg>
);

export const VideoIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="10.67" height="12" rx="1.33" />
    <path d="M4.67 2v12M2 5h2.67M2 8h12M2 11h2.67M11.33 2v12M11.33 5H14M11.33 11H14" />
  </svg>
);

export const FileIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 1.33H4a1.33 1.33 0 0 0-1.33 1.34v10.66A1.33 1.33 0 0 0 4 14.67h8a1.33 1.33 0 0 0 1.33-1.34V4.67L10 1.33Z" />
    <path d="M9.33 1.33V4a1.33 1.33 0 0 0 1.34 1.33h2.66M6.67 6H5.33M10.67 8.67H5.33M10.67 11.33H5.33" />
  </svg>
);

export const LessonsIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 4.67v9.33" />
    <path d="M2 12a.67.67 0 0 1-.67-.67V2.67A.67.67 0 0 1 2 2h3.33a2.67 2.67 0 0 1 2.67 2.67A2.67 2.67 0 0 1 10.67 2H14a.67.67 0 0 1 .67.67v8.66a.67.67 0 0 1-.67.67h-4a2 2 0 0 0-2 2 2 2 0 0 0-2-2H2Z" />
  </svg>
);

export const AssessmentIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.33 1.33H4.67a1.33 1.33 0 0 0-1.33 1.34v10.66a1.33 1.33 0 0 0 1.33 1.34h6.66a1.33 1.33 0 0 0 1.34-1.34V2.67a1.33 1.33 0 0 0-1.34-1.34Z" />
    <path d="M8 12h.007" />
  </svg>
);

export const CertificateIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m10.32 8.59 1.01 5.68a.32.32 0 0 1-.47.35l-2.39-1.79a.68.68 0 0 0-.81 0l-2.4 1.79a.32.32 0 0 1-.46-.35l1-5.68" />
    <circle cx="8" cy="5.33" r="4" />
  </svg>
);

export const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 18 18" fill="currentColor" {...props}>
    <path d="M9 12.08 6.28 13.72a.7.7 0 0 1-.58.05.66.66 0 0 1-.35-.28.6.6 0 0 1-.02-.24l.72-3.08-2.4-2.08a.6.6 0 0 1-.16-.19.55.55 0 0 1 .04-.5.6.6 0 0 1 .38-.24l3.16-.28 1.23-2.92a.5.5 0 0 1 .18-.18.5.5 0 0 1 .5 0 .5.5 0 0 1 .18.18l1.23 2.92 3.16.28a.6.6 0 0 1 .38.24.55.55 0 0 1 .04.5.6.6 0 0 1-.16.19l-2.4 2.08.73 3.08a.55.55 0 0 1-.03.24.66.66 0 0 1-.35.28.7.7 0 0 1-.58-.05L9 12.08Z" />
  </svg>
);
