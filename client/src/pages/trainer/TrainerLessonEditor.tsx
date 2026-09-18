import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight2, Gallery, Video } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { cx } from '../../lib/format';
import { useToast } from '../../lib/toast';
import { courseSections } from '../../lib/trainerData';

/** Content blocks the trainer can drop into a lesson, mirroring the Figma palette. */
const blockTypes = [
  { label: 'Heading 1', hint: 'H1' },
  { label: 'Heading 2', hint: 'H2' },
  { label: 'Paragraph', hint: '¶' },
  { label: 'Number', hint: '1.' },
  { label: 'Bullet', hint: '•' },
  { label: 'Blockquote', hint: '❝' },
  { label: 'Divider', hint: '—' },
  { label: 'Image', hint: '🖼' },
  { label: 'Video', hint: '▶' },
  { label: 'Embed', hint: '</>' },
  { label: 'Quiz', hint: '?' },
];

const defaultBody = `🎯 Course Overview:
This course equips employees, team leads, and managers with the skills and strategies to communicate clearly, confidently, and professionally within the workplace.

🏆 Learning Objectives:
By the end of this course, participants will be able to:
1. Understand the fundamentals and importance of workplace communication.
2. Identify barriers to effective communication and learn how to overcome them.
3. Improve listening, speaking, and writing skills in professional settings.
4. Communicate effectively across teams, departments, and cultural contexts.
5. Handle workplace conflict with empathy and clarity.

📚 Course Modules:
Module 1: Introduction to Workplace Communication
• Definition and scope of workplace communication
• The role of communication in organizational success
• Types of communication (verbal, non-verbal, written, digital)`;

export const TrainerLessonEditor = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const lessons = courseSections.flatMap((section) => section.lessons);
  const index = Math.max(0, lessons.findIndex((lesson) => lesson.id === lessonId));
  const [body, setBody] = useState(defaultBody);
  const [media, setMedia] = useState(false);

  const goTo = (nextIndex: number) => {
    const lesson = lessons[nextIndex];
    if (lesson) navigate(`/trainer/courses/${id ?? 'new'}/lessons/${lesson.id}`);
  };

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-5 gutter page-y">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-3 text-left">
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-ink">
              <ArrowLeft size={18} variant="Linear" color="currentColor" />
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-semibold text-ink sm:text-2xl">Back to lesson</span>
              <span className="text-xs text-muted">No unsaved changes</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Lesson saved.')}
            className="flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-white"
          >
            Save
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Lesson {index + 1} of {lessons.length}
          </p>
          <div className="flex items-center gap-2 text-muted">
            <button type="button" aria-label="Previous lesson" disabled={index === 0} onClick={() => goTo(index - 1)} className="disabled:opacity-30">
              <ArrowLeft size={18} variant="Linear" color="currentColor" />
            </button>
            <button type="button" aria-label="Next lesson" disabled={index >= lessons.length - 1} onClick={() => goTo(index + 1)} className="disabled:opacity-30">
              <ArrowRight2 size={18} variant="Linear" color="currentColor" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[170px_1fr]">
          <aside className="flex h-fit flex-col gap-3 rounded-xl border border-line-soft p-4">
            <p className="text-xs font-semibold text-muted">General</p>
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-2">
              {blockTypes.map((block) => (
                <button
                  key={block.label}
                  type="button"
                  onClick={() => setBody((previous) => `${previous}\n\n${block.label}: `)}
                  className="flex flex-col items-center gap-1 rounded-lg border border-line-soft px-2 py-2.5 text-[10px] text-muted transition-colors hover:border-primary hover:text-primary-text"
                >
                  <span className="text-sm text-ink">{block.hint}</span>
                  {block.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setMedia((previous) => !previous)}
              className={cx(
                'flex h-[180px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-center transition-colors sm:h-[220px]',
                media ? 'border-primary bg-[var(--sematic-backgrounds-primarybackground-2)]' : 'border-line-strong',
              )}
            >
              {media ? <Video size={28} variant="Bold" color="currentColor" className="text-primary-text" /> : <Gallery size={28} variant="Linear" color="currentColor" className="text-muted" />}
              <span className="text-sm font-semibold text-ink">{media ? 'Media attached — tap to remove' : 'Lesson Media'}</span>
              <span className="max-w-[320px] text-xs text-muted">Drag your video/image file or embed from Vimeo, YouTube, Wistia, Typeform and more.</span>
            </button>

            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="min-h-[360px] w-full resize-y rounded-lg border border-line bg-white p-4 text-sm leading-6 whitespace-pre-wrap text-ink focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};
