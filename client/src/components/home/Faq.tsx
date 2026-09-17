import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { cx } from '../../lib/format';

type Props = { audience?: 'individual' | 'business' };

export const Faq = ({ audience = 'individual' }: Props) => {
  const { data } = useQuery({
    queryKey: ['faqs', audience],
    queryFn: audience === 'business' ? api.businessFaqs : api.faqs,
  });
  const [openId, setOpenId] = useState<string | null>(null);
  const items = data?.items ?? [];
  const activeId = openId ?? items[0]?.id ?? null;

  return (
    <section
      id="faq"
      className="border-b border-[var(--sematic-backgrounds-secondarybackground-2)] py-[60px] lg:pt-20 lg:pb-[120px]"
    >
      <div className="shell flex flex-col items-center gap-8">
        <h2 className="heading-display text-[26px] leading-[34px] text-ink sm:text-display-sm sm:leading-[38px]">
          Frequently Asked Questions
        </h2>

        <div className="flex w-full max-w-[846px] flex-col gap-3 rounded-xl border border-line-strong p-3 sm:gap-5 sm:rounded-[32px] sm:p-8">
          {items.map((faq, index) => {
            const open = faq.id === activeId;
            return (
              <div
                key={faq.id}
                className={cx('flex flex-col gap-6', index < items.length - 1 && 'border-b border-line-soft')}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  aria-controls={`faq-${faq.id}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={cx(
                      'text-base leading-7 font-bold sm:text-xl sm:leading-7',
                      open ? 'text-primary-text' : 'text-ink',
                    )}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={cx(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                      open ? 'bg-primary-text' : 'bg-[#eff6ff]',
                    )}
                  >
                    <img
                      src={open ? '/assets/icons/chevron-open.svg' : '/assets/icons/chevron-closed.svg'}
                      alt=""
                      className={cx('h-5 w-5 transition-transform duration-200', open && 'rotate-180')}
                    />
                  </span>
                </button>

                <div
                  id={`faq-${faq.id}`}
                  hidden={!open}
                  className="pb-5 text-sm leading-5 text-[#475569] sm:-mt-2"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
