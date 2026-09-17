import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { quizQuestions } from '../../lib/onboarding';

type OnboardingState = {
  goalId: string | null;
  interestId: string | null;
  skillLevelId: string | null;
  answers: Array<number | null>;
  setGoal: (id: string) => void;
  setInterest: (id: string) => void;
  setSkillLevel: (id: string) => void;
  setAnswer: (questionIndex: number, optionIndex: number) => void;
  score: number;
};

const OnboardingContext = createContext<OnboardingState | null>(null);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [goalId, setGoalId] = useState<string | null>(null);
  const [interestId, setInterestId] = useState<string | null>(null);
  const [skillLevelId, setSkillLevelId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Array<number | null>>(() => Array(quizQuestions.length).fill(null));

  const score = useMemo(
    () =>
      answers.reduce<number>(
        (total, answer, index) => (answer !== null && answer === quizQuestions[index]?.correctIndex ? total + 1 : total),
        0,
      ),
    [answers],
  );

  const value = useMemo<OnboardingState>(
    () => ({
      goalId,
      interestId,
      skillLevelId,
      answers,
      setGoal: setGoalId,
      setInterest: setInterestId,
      setSkillLevel: setSkillLevelId,
      setAnswer: (questionIndex, optionIndex) =>
        setAnswers((current) => current.map((value, index) => (index === questionIndex ? optionIndex : value))),
      score,
    }),
    [goalId, interestId, skillLevelId, answers, score],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
};
