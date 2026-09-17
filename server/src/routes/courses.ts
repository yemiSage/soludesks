import { Router } from 'express';
import { z } from 'zod';
import { courses, reviews } from '../data/catalog.js';
import { HttpError, asyncHandler } from '../lib/http.js';

const query = z.object({
  category: z.string().optional(),
  pathway: z.string().optional(),
  q: z.string().trim().max(120).optional(),
  featured: z.enum(['true', 'false']).optional(),
  sort: z.enum(['rating', 'price-asc', 'price-desc', 'title']).default('rating'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(12),
});

const sorters = {
  rating: (a: (typeof courses)[number], b: (typeof courses)[number]) => b.rating - a.rating,
  'price-asc': (a: (typeof courses)[number], b: (typeof courses)[number]) => a.priceNgn - b.priceNgn,
  'price-desc': (a: (typeof courses)[number], b: (typeof courses)[number]) => b.priceNgn - a.priceNgn,
  title: (a: (typeof courses)[number], b: (typeof courses)[number]) => a.title.localeCompare(b.title),
};

export const coursesRouter = Router();

coursesRouter.get(
  '/',
  asyncHandler((req, res) => {
    const parsed = query.safeParse(req.query);
    if (!parsed.success) throw new HttpError(400, parsed.error.issues[0]?.message ?? 'Invalid query');
    const { category, pathway, q, featured, sort, page, limit } = parsed.data;

    const needle = q?.toLowerCase();
    const matches = courses.filter((course) => {
      if (category && course.categoryId !== category) return false;
      if (pathway && course.pathwayId !== pathway) return false;
      if (featured && course.featured !== (featured === 'true')) return false;
      if (!needle) return true;
      return `${course.title} ${course.summary} ${course.instructor}`.toLowerCase().includes(needle);
    });

    const sorted = [...matches].sort(sorters[sort]);
    const start = (page - 1) * limit;

    res.json({
      items: sorted.slice(start, start + limit),
      total: sorted.length,
      page,
      limit,
      pages: Math.max(1, Math.ceil(sorted.length / limit)),
    });
  }),
);

coursesRouter.get(
  '/:slug',
  asyncHandler((req, res) => {
    const course = courses.find((item) => item.slug === req.params.slug);
    if (!course) throw new HttpError(404, 'Course not found');
    const related = courses
      .filter((item) => item.slug !== course.slug && item.pathwayId === course.pathwayId)
      .slice(0, 4);
    const courseReviews = reviews.filter((item) => item.courseSlug === course.slug);
    res.json({ course, related, reviews: courseReviews });
  }),
);
