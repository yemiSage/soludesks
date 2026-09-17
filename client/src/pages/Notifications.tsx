import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Notification, SearchNormal, TickCircle } from 'iconsax-react';
import { Pagination } from '../components/ui/Pagination';
import { cx } from '../lib/format';
import { courseNotifications, systemNotifications, type Notification as NotificationItem } from '../lib/notificationsData';

const PAGE_SIZE = 7;

const tabs = [
  { id: 'all', label: 'All', icon: Notification, items: [...systemNotifications, ...courseNotifications] },
  { id: 'courses', label: 'Courses', icon: Book, items: courseNotifications },
] as const;

export const Notifications = () => {
  const navigate = useNavigate();
  const [tabId, setTabId] = useState<(typeof tabs)[number]['id']>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const tab = tabs.find((entry) => entry.id === tabId) ?? tabs[0];
  const filtered = useMemo<NotificationItem[]>(
    () => tab.items.filter((item) => item.message.toLowerCase().includes(search.toLowerCase())),
    [tab, search],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5">
            <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
              <ArrowLeft size={24} variant="Linear" color="currentColor" />
            </span>
            <h1 className="text-2xl leading-8 font-medium text-ink">Notification</h1>
          </button>
        </div>

        <div className="flex flex-col gap-5 rounded-lg border border-[#e0f2f1] bg-white p-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-1 sm:gap-3">
              {tabs.map(({ id, label, icon: Icon, items }) => {
                const active = id === tabId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setTabId(id);
                      setPage(1);
                    }}
                    className={cx(
                      'flex items-center justify-center gap-1 px-2 pt-2 pb-3 sm:w-[169px]',
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

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center gap-3 rounded-lg border border-[#e0f2f1] px-3 py-2 sm:w-[408px]">
                <SearchNormal size={19} variant="Linear" color="#666" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search notification"
                  className="w-full text-sm text-ink placeholder:text-muted focus:outline-none"
                />
              </div>
              <button type="button" className="flex shrink-0 items-center gap-2 text-sm text-primary-text">
                <TickCircle size={20} variant="Linear" color="currentColor" />
                Mark all as read
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {visible.length ? (
              visible.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 rounded-xl px-3 py-2.5">
                  <p className="text-sm leading-[1.7] text-muted">{item.message}</p>
                  <p className="text-xs leading-[1.5] text-[#999]">{item.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-muted">No notifications match your search.</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between">
            <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted">Show {PAGE_SIZE}/page</span>
            <Pagination page={page} pageCount={pageCount} onChange={setPage} />
          </div>
        </div>
      </div>
    </main>
  );
};
