import { Router } from 'express';
import { z } from 'zod';
import { HttpError, asyncHandler } from '../lib/http.js';

const lead = z.object({
  email: z.string().email(),
  intent: z.enum(['learner', 'trainer', 'business']).default('learner'),
});

const leads: Array<z.infer<typeof lead> & { createdAt: string }> = [];

export const leadsRouter = Router();

leadsRouter.post(
  '/',
  asyncHandler((req, res) => {
    const parsed = lead.safeParse(req.body);
    if (!parsed.success) throw new HttpError(400, 'A valid email address is required');
    const record = { ...parsed.data, createdAt: new Date().toISOString() };
    leads.push(record);
    res.status(201).json({ ok: true, intent: record.intent });
  }),
);
