import { useState } from 'react';
import { Add, InfoCircle, Messages2 } from 'iconsax-react';
import { spacePosts, type SpacePost } from '../../lib/courseSpaceData';
import { cx } from '../../lib/format';
import { useToast } from '../../lib/toast';
import { MakePostModal } from './MakePostModal';

const filters = ['All Topics', 'Announcements', 'Discussions'] as const;
type Filter = (typeof filters)[number];

const matchesFilter = (post: SpacePost, filter: Filter) =>
  filter === 'All Topics' || (filter === 'Announcements' ? post.type === 'Announcement' : post.type === 'Discussion');

export const CourseSpace = () => {
  const [filter, setFilter] = useState<Filter>('Announcements');
  const [posts, setPosts] = useState(spacePosts);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const visible = posts.filter((post) => matchesFilter(post, filter));

  return (
    <div className="flex flex-col gap-8 rounded-xl border-[1.5px] border-line-strong bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="-mx-5 flex items-start gap-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setFilter(entry)}
              className={cx(
                'shrink-0 rounded-full px-6 py-2 text-sm',
                entry === filter ? 'border border-primary-text bg-[#f5f9ff] text-primary-text' : 'bg-line-strong text-muted',
              )}
            >
              {entry}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex h-9 items-center gap-2 rounded px-3 py-1.5 text-base font-medium text-white"
          style={{ backgroundColor: '#0063ef' }}
        >
          <Add size={24} variant="Linear" color="currentColor" />
          Make a post
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {visible.length ? (
          visible.map((post) => (
            <div key={post.id} className="flex flex-col gap-3 rounded-xl border-[1.5px] border-[#ffa189] bg-white p-4">
              <div className="flex flex-col gap-2.5 border-b-[1.5px] border-line-strong px-3 pb-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 rounded-[20px] bg-[#ff5025]/10 px-2 py-1 text-xs font-medium text-[#ff5025]">
                    <InfoCircle size={18} variant="Linear" color="currentColor" />
                    {post.type}
                  </span>
                  <span className="text-sm text-muted">{post.timestamp}</span>
                </div>
                <p className="text-base font-semibold text-muted">{post.title}</p>
                <p className="text-sm text-muted">{post.body}</p>
              </div>
              <div className="flex items-center gap-2.5 px-3">
                <Messages2 size={18} variant="Linear" color="#636363" />
                <span className="text-sm text-muted">{post.replies} Replies</span>
              </div>
            </div>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-muted">No posts in this topic yet.</p>
        )}
      </div>

      <MakePostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPost={({ title, body }) => {
          setPosts((current) => [{ id: `local-${Date.now()}`, type: 'Discussion', title, body, timestamp: 'Just now', replies: 0 }, ...current]);
          setModalOpen(false);
          setFilter('All Topics');
          showToast('Your post is live in Course Space.');
        }}
      />
    </div>
  );
};
