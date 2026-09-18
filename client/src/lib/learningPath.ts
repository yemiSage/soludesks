import { learningPath, type LearningPathStep } from './onboarding';
import { createPersistedStore } from './persistedStore';

/**
 * The path recommended at the end of the "find the right course" assessment. It's saved the
 * moment it's shown — logged-out visitors carry it into their dashboard once they sign in.
 */
export type SavedLearningPath = {
  savedAt: string;
  level: string;
  goalId: string | null;
  interestId: string | null;
  skillLevelId: string | null;
  steps: LearningPathStep[];
};

const store = createPersistedStore<SavedLearningPath | null>('soludesk.learningPath.v1', null);

export const useSavedLearningPath = store.useStore;

export const saveLearningPath = (result: Omit<SavedLearningPath, 'savedAt' | 'steps'>) =>
  store.set({ ...result, steps: learningPath, savedAt: new Date().toISOString() });
