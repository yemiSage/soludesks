import { useEffect, useRef, useState } from 'react';
import { Book, Setting2 } from 'iconsax-react';
import type { UpgradeRole } from '../../lib/auth';
import { cx } from '../../lib/format';
import { notificationsFor } from '../../lib/notificationsData';

type Props = { role: UpgradeRole; open: boolean; onClose: () => void };

/** Topbar bell dropdown — System / Courses tabs, closes on outside click or Escape. */
export const NotificationsPopover = ({ role, open, onClose }: Props) => {
  const [tab, setTab] = useState<'system' | 'courses'>('courses');
  const ref = useRef<HTMLDivElement>(null);
  const notes = notificationsFor(role);
  const visible = notes.filter((note) => note.category === tab);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute top-[calc(100%+12px)] right-0 z-30 flex w-[320px] max-w-[calc(100vw-40px)] flex-col rounded-xl border border-line-soft bg-white shadow-xl sm:w-[380px]">
      <div className="flex items-center justify-between border-b border-line-soft px-4">
        <div className="flex">
          {([
            { id: 'system', label: 'System', icon: Setting2 },
            { id: 'courses', label: role === 'sponsor' ? 'Programs' : 'Courses', icon: Book },
          ] as const).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cx(
                'flex items-center gap-1.5 px-3 py-3 text-sm transition-colors',
                tab === item.id ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted hover:text-ink',
              )}
            >
              <item.icon size={16} variant="Linear" color="currentColor" />
              {item.label}
              <span className="rounded-full bg-line-soft px-1.5 text-[10px] text-muted">{notes.filter((note) => note.category === item.id).length}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className="text-sm font-medium text-primary-text">
          View All
        </button>
      </div>

      <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto p-4">
        {visible.map((note) => (
          <div key={note.id} className={cx('flex flex-col gap-2 rounded-lg p-3', note.highlight && 'bg-[var(--sematic-backgrounds-primarybackground-2)]')}>
            <p className="text-sm leading-5 text-ink">{note.message}</p>
            {note.action ? (
              <button type="button" onClick={onClose} className="w-fit rounded-md border border-primary-text px-2.5 py-1 text-xs font-medium text-primary-text">
                {note.action}
              </button>
            ) : null}
            <span className="text-xs text-muted">{note.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
