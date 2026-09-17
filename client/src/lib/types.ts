export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  rating: number;
  reviews: number;
  priceNgn: number;
  categoryId: string;
  pathwayId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  hours: number;
  instructor: string;
  featured: boolean;
};

export type Review = { id: string; courseSlug: string; name: string; rating: number; date: string; comment: string };

export type Category = { id: string; name: string };
export type Pathway = { id: string; name: string; blurb: string; icon: string };
export type Faq = { id: string; question: string; answer: string };
export type Stat = { id: string; value: string; label: string };

export type Audience = 'individual' | 'business';

export type ModuleFeature = { title: string; description: string };

export type BusinessModule = {
  id: string;
  eyebrow: string;
  name: string;
  summary: string;
  image: string;
  imageSide: 'left' | 'right';
  tone: 'neutral' | 'warm';
  features: ModuleFeature[];
};

export type Highlight = {
  id: string;
  title: string;
  description?: string;
  image: string;
  span: 'third' | 'wide' | 'narrow';
};

export type Plan = {
  id: string;
  name: string;
  popular: boolean;
  blurb: string;
  monthlyUsd: number;
  yearlyUsd: number;
};

export type PricingModule = {
  id: string;
  name: string;
  icon: string;
  plans: Plan[];
  features: Array<{ id: string; label: string; included: Record<string, boolean> }>;
};

export type Paged<T> = { items: T[]; total: number; page: number; limit: number; pages: number };
export type Collections = { wishlist: string[]; cart: string[]; cartTotalNgn: number };
