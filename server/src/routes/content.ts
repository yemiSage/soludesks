import { Router } from 'express';
import { categories, faqs, pathways, stats } from '../data/catalog.js';

export const contentRouter = Router();

contentRouter.get('/categories', (_req, res) => res.json({ items: categories }));
contentRouter.get('/pathways', (_req, res) => res.json({ items: pathways }));
contentRouter.get('/stats', (_req, res) => res.json({ items: stats }));
contentRouter.get('/faqs', (_req, res) => res.json({ items: faqs }));
