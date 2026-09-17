import type {
  BusinessModule,
  Category,
  Collections,
  Course,
  Faq,
  Highlight,
  Paged,
  Pathway,
  PricingModule,
  Review,
  Stat,
} from './types';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    ...init,
  });

  if (!response.ok) {
    const problem = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(problem?.error ?? `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export type CourseQuery = {
  category?: string;
  pathway?: string;
  q?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
};

export const api = {
  courses: (params: CourseQuery = {}) => {
    const search = new URLSearchParams();
    if (params.category) search.set('category', params.category);
    if (params.pathway) search.set('pathway', params.pathway);
    if (params.q) search.set('q', params.q);
    if (params.featured !== undefined) search.set('featured', String(params.featured));
    if (params.limit) search.set('limit', String(params.limit));
    if (params.page) search.set('page', String(params.page));
    const query = search.toString();
    return request<Paged<Course>>(`/courses${query ? `?${query}` : ''}`);
  },
  course: (slug: string) => request<{ course: Course; related: Course[]; reviews: Review[] }>(`/courses/${slug}`),
  categories: () => request<{ items: Category[] }>('/categories'),
  pathways: () => request<{ items: Pathway[] }>('/pathways'),
  stats: () => request<{ items: Stat[] }>('/stats'),
  faqs: () => request<{ items: Faq[] }>('/faqs'),
  businessCustomers: () => request<{ items: string[] }>('/business/customers'),
  businessModules: () => request<{ items: BusinessModule[] }>('/business/modules'),
  businessHighlights: () => request<{ items: Highlight[] }>('/business/highlights'),
  businessPricing: () => request<{ items: PricingModule[] }>('/business/pricing'),
  businessFaqs: () => request<{ items: Faq[] }>('/business/faqs'),
  collections: () => request<Collections>('/collections'),
  toggleWishlist: (courseId: string) =>
    request<Collections>('/collections/wishlist', { method: 'POST', body: JSON.stringify({ courseId }) }),
  toggleCart: (courseId: string) =>
    request<Collections>('/collections/cart', { method: 'POST', body: JSON.stringify({ courseId }) }),
  subscribe: (email: string, intent: 'learner' | 'trainer' | 'business') =>
    request<{ ok: true }>('/leads', { method: 'POST', body: JSON.stringify({ email, intent }) }),
};
