import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, ArrowLeft, CloseCircle, Edit2, More, TickCircle, Trash } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { cx } from '../../lib/format';
import { useToast } from '../../lib/toast';
import { courseSections, trainerCourses, type CourseSection } from '../../lib/trainerData';

/** Identifies whichever row is currently being renamed inline. */
type Editing = { kind: 'section' | 'lesson'; id: string } | null;

const DeleteLessonDialog = ({ open, onCancel, onConfirm }: { open: boolean; onCancel: () => void; onConfirm: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-lesson-title">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6">
        <button type="button" onClick={onCancel} aria-label="Close" className="absolute top-5 right-5 text-muted hover:text-ink">
          <CloseCircle size={22} variant="Linear" color="currentColor" />
        </button>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-[#eef2ff] text-muted">
            <Trash size={32} variant="Bulk" color="currentColor" />
          </span>
          <h2 id="delete-lesson-title" className="text-lg font-semibold text-ink">
            Do you really want to delete this lesson?
          </h2>
          <p className="text-sm text-muted">This action is irreversible; the lesson will be permanently deleted.</p>
          <div className="mt-2 flex w-full gap-3">
            <button type="button" onClick={onConfirm} className="flex h-[38px] flex-1 items-center justify-center rounded-lg border border-[#ff5025] text-sm font-medium text-[#ff5025] sm:h-[43px]">
              Yes, Delete
            </button>
            <button type="button" onClick={onCancel} className="flex h-[38px] flex-1 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white sm:h-[43px]">
              No Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrainerCourseBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const course = trainerCourses.find((item) => item.id === id);
  const [sections, setSections] = useState<CourseSection[]>(courseSections);
  const [editing, setEditing] = useState<Editing>(null);
  const [draft, setDraft] = useState('');
  const [pendingDelete, setPendingDelete] = useState<{ sectionId: string; lessonId: string } | null>(null);

  const lessonCount = sections.reduce((sum, section) => sum + section.lessons.length, 0);

  const startEdit = (kind: 'section' | 'lesson', id: string, current: string) => {
    setEditing({ kind, id });
    setDraft(current);
  };

  const commitEdit = () => {
    if (!editing || !draft.trim()) return setEditing(null);
    setSections((previous) =>
      previous.map((section) =>
        editing.kind === 'section' && section.id === editing.id
          ? { ...section, title: draft.trim() }
          : { ...section, lessons: section.lessons.map((lesson) => (lesson.id === editing.id ? { ...lesson, title: draft.trim() } : lesson)) },
      ),
    );
    setEditing(null);
  };

  const addLesson = (sectionId: string) => {
    const lesson = { id: `l-${Date.now()}`, title: 'New lesson' };
    setSections((previous) => previous.map((section) => (section.id === sectionId ? { ...section, lessons: [...section.lessons, lesson] } : section)));
    startEdit('lesson', lesson.id, lesson.title);
  };

  const addSection = () => {
    const section = { id: `s-${Date.now()}`, title: `Section ${sections.length + 1}`, lessons: [] };
    setSections((previous) => [...previous, section]);
    startEdit('section', section.id, section.title);
  };

  const deleteLesson = () => {
    if (!pendingDelete) return;
    setSections((previous) =>
      previous.map((section) =>
        section.id === pendingDelete.sectionId ? { ...section, lessons: section.lessons.filter((lesson) => lesson.id !== pendingDelete.lessonId) } : section,
      ),
    );
    setPendingDelete(null);
    showToast('Lesson deleted.');
  };

  const editRow = (value: string) => (
    <span className="flex flex-1 items-center gap-2">
      <input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} className="flex-1 rounded-md border border-primary px-2 py-1 text-sm text-ink focus:outline-none" />
      <button type="button" onClick={commitEdit} aria-label={`Save ${value}`} className="text-primary-text">
        <TickCircle size={18} variant="Linear" color="currentColor" />
      </button>
      <button type="button" onClick={() => setEditing(null)} aria-label="Cancel rename" className="text-[#ff5025]">
        <CloseCircle size={18} variant="Linear" color="currentColor" />
      </button>
    </span>
  );

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink">
              <ArrowLeft size={18} variant="Linear" color="currentColor" />
            </button>
            <div className="flex min-w-0 flex-col">
              <h1 className="truncate text-xl font-semibold text-ink sm:text-2xl">{course?.title ?? 'Untitled course'}</h1>
              <p className="text-xs text-muted">Unsaved draft</p>
            </div>
          </div>
          <More size={20} variant="Linear" color="currentColor" className="mt-1 shrink-0 text-muted" />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-ink">Lessons</p>
              <p className="text-xs text-muted">
                {sections.length} sections • {lessonCount} lessons
              </p>
            </div>
            <button type="button" onClick={addSection} className="flex h-[38px] items-center gap-2 rounded-lg border border-primary-text px-4 text-sm font-medium text-primary-text sm:h-[43px]">
              <Add size={16} variant="Linear" color="currentColor" />
              Add Section
            </button>
          </div>

          <div className="flex flex-col divide-y divide-line-soft">
            {sections.map((section) => (
              <div key={section.id} className="flex flex-col gap-1 py-3">
                <div className="flex items-center justify-between gap-3 px-1">
                  {editing?.kind === 'section' && editing.id === section.id ? (
                    editRow(section.title)
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-ink">{section.title}</span>
                      <button type="button" onClick={() => startEdit('section', section.id, section.title)} className="text-sm font-medium text-primary-text">
                        Edit
                      </button>
                    </>
                  )}
                </div>

                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-2 hover:bg-line-soft/60">
                    {editing?.kind === 'lesson' && editing.id === lesson.id ? (
                      editRow(lesson.title)
                    ) : (
                      <>
                        <span className="truncate text-sm text-ink">{lesson.title}</span>
                        <span className="flex shrink-0 items-center gap-3">
                          <button type="button" aria-label={`Edit ${lesson.title}`} onClick={() => navigate(`/trainer/courses/${id ?? 'new'}/lessons/${lesson.id}`)} className="text-primary-text">
                            <Edit2 size={16} variant="Linear" color="currentColor" />
                          </button>
                          <button type="button" aria-label={`Delete ${lesson.title}`} onClick={() => setPendingDelete({ sectionId: section.id, lessonId: lesson.id })} className="text-[#ff5025]">
                            <Trash size={16} variant="Linear" color="currentColor" />
                          </button>
                        </span>
                      </>
                    )}
                  </div>
                ))}

                <button type="button" onClick={() => addLesson(section.id)} className="flex items-center gap-1.5 self-start px-1 py-1 text-sm font-medium text-primary-text">
                  <Add size={16} variant="Linear" color="currentColor" />
                  Add lesson
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            showToast('Your course is being published.');
            navigate('/trainer/courses');
          }}
          className={cx('flex h-[38px] items-center justify-center self-end rounded-lg bg-primary px-8 text-sm font-medium text-white sm:h-[43px]')}
        >
          Save and Publish
        </button>
      </div>

      <DeleteLessonDialog open={Boolean(pendingDelete)} onCancel={() => setPendingDelete(null)} onConfirm={deleteLesson} />
    </PortalLayout>
  );
};
