import { useMemo } from 'react';
import { courseModules } from './courseModules';
import { createPersistedStore } from './persistedStore';

/** Every course currently plays the shared lesson outline, so this is the finish line for all of them. */
export const allLessons = courseModules.flatMap((module) => module.lessons);

/** Completed lesson names, keyed by course slug. */
type ProgressState = Record<string, string[]>;

const store = createPersistedStore<ProgressState>('soludesk.courseProgress.v1', {});

export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export const progressFor = (state: ProgressState, slug: string) => {
  const done = (state[slug] ?? []).filter((lesson) => allLessons.includes(lesson)).length;
  const percent = Math.round((done / allLessons.length) * 100);
  const status: CourseStatus = done === 0 ? 'not-started' : done >= allLessons.length ? 'completed' : 'in-progress';
  return { done, percent, status };
};

/** Read-only snapshot of every course's progress — for overview surfaces like the dashboard. */
export const useProgressMap = store.useStore;

/** Progress for one course plus the mutation the course player uses to advance it. */
export const useCourseProgress = (slug: string) => {
  const state = store.useStore();
  const completed = useMemo(() => new Set(state[slug] ?? []), [state, slug]);
  const { percent, status } = progressFor(state, slug);

  const markLessonComplete = (lesson: string) =>
    store.set((current) => {
      const list = current[slug] ?? [];
      return list.includes(lesson) ? current : { ...current, [slug]: [...list, lesson] };
    });

  return { completed, percent, status, isComplete: status === 'completed', markLessonComplete };
};
