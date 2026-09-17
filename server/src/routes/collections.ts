import { Router } from 'express';
import { z } from 'zod';
import { courses } from '../data/catalog.js';
import { HttpError, asyncHandler } from '../lib/http.js';

type Collections = { wishlist: Set<string>; cart: Set<string> };

const store = new Map<string, Collections>();

const collectionsFor = (sessionId: string): Collections => {
  const existing = store.get(sessionId);
  if (existing) return existing;
  const fresh: Collections = { wishlist: new Set(), cart: new Set() };
  store.set(sessionId, fresh);
  return fresh;
};

const body = z.object({ courseId: z.string().min(1) });

const snapshot = (collections: Collections) => ({
  wishlist: [...collections.wishlist],
  cart: [...collections.cart],
  cartTotalNgn: courses
    .filter((course) => collections.cart.has(course.id))
    .reduce((sum, course) => sum + course.priceNgn, 0),
});

export const collectionsRouter = Router();

collectionsRouter.get(
  '/',
  asyncHandler((req, res) => res.json(snapshot(collectionsFor(req.sessionId)))),
);

const toggle = (key: keyof Collections) =>
  asyncHandler((req, res) => {
    const parsed = body.safeParse(req.body);
    if (!parsed.success) throw new HttpError(400, 'courseId is required');
    if (!courses.some((course) => course.id === parsed.data.courseId)) {
      throw new HttpError(404, 'Course not found');
    }

    const collections = collectionsFor(req.sessionId);
    const set = collections[key];
    if (set.has(parsed.data.courseId)) set.delete(parsed.data.courseId);
    else set.add(parsed.data.courseId);

    res.json(snapshot(collections));
  });

collectionsRouter.post('/wishlist', toggle('wishlist'));
collectionsRouter.post('/cart', toggle('cart'));
