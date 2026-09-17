import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseCircle } from 'iconsax-react';
import { cx } from '../../lib/format';
import { useBodyScrollLock } from '../../lib/useBodyScrollLock';

type Props = {
  open: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Escape hatch for a drawer that needs a header accessory below the title row (e.g. tabs). */
  headerExtra?: ReactNode;
  /** Override the default 600px cap for drawers with wider multi-column content (e.g. the cart). */
  maxWidthClassName?: string;
};

/**
 * Shared right-hand slide-over shell. Every drawer in the app renders through this so width,
 * padding, and the slide transition stay identical — only the middle content differs.
 */
export const Drawer = ({ open, onClose, titleId, title, children, footer, headerExtra, maxWidthClassName = 'sm:max-w-[600px]' }: Props) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Two rAFs guarantee the browser paints the off-screen position first, so the
      // transition to on-screen is always observed instead of occasionally being skipped.
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useBodyScrollLock(mounted);

  useEffect(() => {
    if (!mounted) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cx('fixed inset-0 z-[95] flex justify-end bg-black/60 transition-opacity duration-300 ease-linear', visible ? 'opacity-100' : 'opacity-0')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default" />

      <div
        className={cx(
          'relative flex h-[100dvh] w-full max-w-none flex-col bg-white shadow-2xl transition-transform duration-300 ease-linear will-change-transform',
          maxWidthClassName,
          visible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex shrink-0 flex-col border-b border-line-soft">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
            <h2 id={titleId} className="text-xl leading-[30px] font-semibold text-ink">
              {title}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
              <CloseCircle size={24} variant="Linear" color="currentColor" />
            </button>
          </div>
          {headerExtra}
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">{children}</div>

        {footer ? <div className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-line-soft px-4 pt-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-6 sm:py-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};
