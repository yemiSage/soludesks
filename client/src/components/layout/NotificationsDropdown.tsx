import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Setting2 } from 'iconsax-react';
import { cx } from '../../lib/format';
import { courseNotifications, systemNotifications } from '../../lib/notificationsData';

const tabs = [
  { id: 'system', label: 'System', icon: Setting2, items: systemNotifications },
  { id: 'courses', label: 'Courses', icon: Book, items: courseNotifications },
] as const;

export const NotificationsDropdown = ({ onNavigate }: { onNavigate: () => void }) => {
  const [tabId, setTabId] = useState<(typeof tabs)[number]['id']>('system');
  const tab = tabs.find((entry) => entry.id === tabId) ?? tabs[0];

  return (
    <div className="flex w-[380px] flex-col gap-5 rounded-xl bg-white p-5 shadow-xl sm:w-[554px]">
      <div className="flex w-full items-center justify-between border-b border-[#b3b3b3]">
        <div className="flex items-center gap-3">
          {tabs.map(({ id, label, icon: Icon, items }) => {
            const active = id === tabId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTabId(id)}
                className={cx(
                  'flex items-center gap-1 px-3 pt-2 pb-3 text-sm',
                  active ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted',
                )}
              >
                <Icon size={20} variant="Linear" color="currentColor" />
                {label}
                <span
                  className={cx(
                    'flex size-[18px] items-center justify-center rounded-full text-[11px]',
                    active ? 'bg-primary-text/10 text-primary-text' : 'bg-line-strong text-muted',
                  )}
                >
                  {items.length}
                </span>
              </button>
            );
          })}
        </div>
        <Link to="/notifications" onClick={onNavigate} className="px-3 py-2 text-sm text-primary-text">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {tab.items.slice(0, 5).map((item, index) => (
          <div key={item.id} className={cx('flex flex-col gap-1 rounded-xl px-5 py-2.5', index === 0 && 'bg-primary-text/[0.08]')}>
            <p className="text-sm leading-[1.7] text-muted">{item.message}</p>
            <p className="text-xs leading-[1.5] text-[#999]">{item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
