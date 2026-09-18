import { cx } from '../../lib/format';

type Props = { page: number; pageCount: number; onChange: (page: number) => void };

/** Numbered pager shared by My Courses and Notifications — collapses to `1 … n` once there's more than 5 pages. */
export const Pagination = ({ page, pageCount, onChange }: Props) => {
  if (pageCount <= 1) return null;

  const pages: Array<number | 'ellipsis'> = [];
  for (let index = 1; index <= pageCount; index += 1) {
    if (index === 1 || index === pageCount || Math.abs(index - page) <= 1) pages.push(index);
    else if (pages[pages.length - 1] !== 'ellipsis') pages.push('ellipsis');
  }

  return (
    <div className="flex max-w-full items-center gap-2 overflow-x-auto sm:gap-5">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-11 shrink-0 items-center rounded-md px-2 text-base font-medium text-[#8c8c8c] disabled:opacity-40 sm:px-3.5"
      >
        Prev
      </button>
      <div className="flex shrink-0 items-start gap-1.5 sm:gap-5">
        {pages.map((entry, index) =>
          entry === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="flex size-8 items-center justify-center text-sm font-medium text-primary-text">
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => onChange(entry)}
              aria-current={entry === page ? 'page' : undefined}
              className={cx(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors',
                entry === page ? 'bg-primary-text text-white' : 'text-primary-text opacity-30 hover:opacity-60',
              )}
            >
              {String(entry).padStart(2, '0')}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className="flex h-11 shrink-0 items-center rounded-md px-2 text-base font-semibold text-primary-text disabled:opacity-40 sm:px-3.5"
      >
        Next
      </button>
    </div>
  );
};
