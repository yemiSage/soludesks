import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gallery, SearchNormal, Send2 } from 'iconsax-react';
import { avatarColorFor, cx, initialsFrom } from '../lib/format';
import { conversations, type ChatMessage } from '../lib/messagesData';

export const Messages = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<Record<string, ChatMessage[]>>({});

  const unreadCount = conversations.filter((conversation) => conversation.unread > 0).length;
  const visible = useMemo(
    () =>
      conversations
        .filter((conversation) => (tab === 'unread' ? conversation.unread > 0 : true))
        .filter((conversation) => conversation.name.toLowerCase().includes(search.toLowerCase())),
    [tab, search],
  );

  const active = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];
  const thread = active ? [...active.messages, ...(sent[active.id] ?? [])] : [];

  const openConversation = (id: string) => {
    setActiveId(id);
    setMobileThreadOpen(true);
  };

  const send = () => {
    if (!draft.trim() || !active) return;
    const message: ChatMessage = { id: `local-${Date.now()}`, from: 'me', text: draft.trim(), time: 'Now' };
    setSent((current) => ({ ...current, [active.id]: [...(current[active.id] ?? []), message] }));
    setDraft('');
  };

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">My Messages</h1>
        </button>

        <div className="flex h-[75dvh] min-h-[480px] gap-5 rounded-lg border border-[#e0f2f1] bg-white p-3 sm:p-5 lg:h-[788px]">
          <div className={cx('flex h-full w-full flex-col rounded-xl border border-[#e6e6e6] p-4 sm:p-5 lg:w-[380px] lg:shrink-0', mobileThreadOpen && 'hidden lg:flex')}>
            <div className="flex items-center gap-4">
              <div className="flex h-9 flex-1 items-center gap-2.5 rounded-xl border border-[#d6d6d6] px-2.5">
                <SearchNormal size={19} variant="Linear" color="#b3b3b3" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages"
                  className="w-full text-sm text-ink placeholder:text-[#b3b3b3] focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3 flex border-b border-[#e6e6e6]">
              <button
                type="button"
                onClick={() => setTab('all')}
                className={cx('h-10 px-3 text-sm', tab === 'all' ? 'border-b border-primary-text font-semibold text-primary-text' : 'text-muted')}
              >
                All
              </button>
              <button type="button" onClick={() => setTab('unread')} className={cx('flex h-10 items-center gap-2.5 px-3 text-sm', tab === 'unread' ? 'font-semibold text-ink' : 'text-muted')}>
                Unread
                <span className="flex size-6 items-center justify-center rounded-full bg-primary-text text-xs text-white">{unreadCount}</span>
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto pt-3">
              {visible.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => openConversation(conversation.id)}
                  className={cx(
                    'flex items-center gap-3 border-b border-[#e6e6e6] px-2.5 py-4 text-left',
                    conversation.id === active?.id && 'bg-line-soft',
                  )}
                >
                  <span
                    className="flex size-[46px] shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: avatarColorFor(conversation.name) }}
                  >
                    {initialsFrom(conversation.name)}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-base font-semibold text-[#666]">{conversation.name}</p>
                      <p className="shrink-0 text-sm text-[#999]">{conversation.timestamp}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm text-[#666]">{conversation.preview}</p>
                      {conversation.unread ? (
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-xs font-semibold text-primary-text">
                          {conversation.unread}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
              {!visible.length ? <p className="py-10 text-center text-sm text-muted">No conversations found.</p> : null}
            </div>
          </div>

          <div className={cx('flex h-full min-w-0 flex-1 flex-col justify-between overflow-hidden rounded-xl border border-[#e6e6e6] py-4 sm:py-5', !mobileThreadOpen && 'hidden lg:flex')}>
            {active ? (
              <>
                <div className="flex flex-col gap-3 overflow-y-auto">
                  <div className="flex items-center gap-3 border-b border-[#f0f0f0] px-3 pb-[19px]">
                    <button type="button" onClick={() => setMobileThreadOpen(false)} aria-label="Back to conversations" className="text-muted lg:hidden">
                      <ArrowLeft size={22} variant="Linear" color="currentColor" />
                    </button>
                    <span
                      className="flex size-[46px] shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: avatarColorFor(active.name) }}
                    >
                      {initialsFrom(active.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[#666]">{active.name}</p>
                      <p className="truncate text-xs text-[#999]">{active.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 px-3">
                    <p className="text-center text-sm text-[#999]">{active.day}</p>
                    {thread.map((message) => (
                      <div key={message.id} className={cx('flex flex-col gap-1.5', message.from === 'me' ? 'items-end' : 'items-start')}>
                        <div
                          className={cx(
                            'max-w-[85%] rounded-t-lg px-2.5 py-2.5 text-sm sm:max-w-[373px]',
                            message.from === 'me' ? 'rounded-bl-lg bg-primary-text/10 text-ink' : 'rounded-br-lg bg-[#f4f4f4] text-[#1e293b]',
                          )}
                        >
                          {message.text}
                        </div>
                        <p className="text-xs text-[#999]">{message.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#f0f0f0] px-3 pt-3 sm:gap-3">
                  <span className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-line-soft text-muted sm:flex">
                    <Gallery size={20} variant="Linear" color="currentColor" />
                  </span>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && send()}
                    placeholder="Ask a question..."
                    className="min-w-0 flex-1 rounded-lg bg-[#f8fafc] px-2.5 py-3.5 text-sm text-ink placeholder:text-[#b3b3b3] focus:outline-none"
                  />
                  <button type="button" onClick={send} aria-label="Send" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-text text-white sm:size-12">
                    <Send2 size={19} variant="Linear" color="currentColor" />
                  </button>
                </div>
              </>
            ) : (
              <p className="m-auto text-sm text-muted">Select a conversation to start messaging.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
