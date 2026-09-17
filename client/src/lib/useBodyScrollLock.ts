import { useEffect } from 'react';

/**
 * Locks page scroll while a modal/drawer is open without letting the page "bounce" —
 * compensates for the scrollbar that disappears by padding the body by the same width.
 */
export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [active]);
};
