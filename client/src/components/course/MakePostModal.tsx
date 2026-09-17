import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import type { SpacePost } from '../../lib/courseSpaceData';

type Props = { open: boolean; onClose: () => void; onPost: (post: Pick<SpacePost, 'title' | 'body'>) => void };

export const MakePostModal = ({ open, onClose, onPost }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const canPost = title.trim() && body.trim();

  const submit = () => {
    if (!canPost) return;
    onPost({ title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      titleId="make-post-title"
      title="Make a post"
      footer={
        <>
          <button type="button" onClick={onClose} className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]">
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!canPost}
            className="flex h-[38px] w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white transition-opacity disabled:opacity-30 sm:h-[43px] sm:w-[212px]"
          >
            Post
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">
            Title <span className="text-[#ff5025]">*</span>
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a descriptive title"
            className="h-10 rounded-lg border border-line-strong px-4 text-sm text-ink placeholder:text-[#8c8c8c] focus:border-primary-text focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">
            Content <span className="text-[#ff5025]">*</span>
          </span>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Share an update, question, or announcement with the class"
            className="h-[240px] resize-none rounded-lg border border-line-strong px-4 py-3 text-sm text-ink placeholder:text-[#8c8c8c] focus:border-primary-text focus:outline-none"
          />
        </label>
      </div>
    </Drawer>
  );
};
