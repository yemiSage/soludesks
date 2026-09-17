import { Router } from 'express';
import { businessFaqs, customers, highlights, modules, pricing } from '../data/business.js';

export const businessRouter = Router();

businessRouter.get('/customers', (_req, res) => res.json({ items: customers }));
businessRouter.get('/modules', (_req, res) => res.json({ items: modules }));
businessRouter.get('/highlights', (_req, res) => res.json({ items: highlights }));
businessRouter.get('/pricing', (_req, res) => res.json({ items: pricing }));
businessRouter.get('/faqs', (_req, res) => res.json({ items: businessFaqs }));
