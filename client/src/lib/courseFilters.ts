export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseFilters = {
  category: string | null;
  pathway: string | null;
  minPrice: number;
  maxPrice: number;
  level: Level | null;
  practiceTest: 'Yes' | 'No' | null;
  minRating: number | null;
};

export const PRICE_MIN = 0;
export const PRICE_MAX = 20_000_000;

export const emptyCourseFilters: CourseFilters = {
  category: null,
  pathway: null,
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  level: null,
  practiceTest: null,
  minRating: null,
};

export const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];
