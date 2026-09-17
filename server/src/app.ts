import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './lib/http.js';
import { session } from './lib/session.js';
import { businessRouter } from './routes/business.js';
import { collectionsRouter } from './routes/collections.js';
import { contentRouter } from './routes/content.js';
import { coursesRouter } from './routes/courses.js';
import { leadsRouter } from './routes/leads.js';

const clientDist = path.resolve(fileURLToPath(import.meta.url), '../../../client/dist');

export const createApp = () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(compression());
  app.use(express.json({ limit: '64kb' }));
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN?.split(',') ?? ['http://localhost:5173'],
      credentials: true,
    }),
  );
  app.use(session);

  app.get('/api/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
  app.use('/api/courses', coursesRouter);
  app.use('/api/business', businessRouter);
  app.use('/api/collections', collectionsRouter);
  app.use('/api/leads', leadsRouter);
  app.use('/api', contentRouter);

  // Serve the built SPA when it exists (production single-process deploy).
  if (existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  }

  app.use('/api', notFound);
  app.use(errorHandler);

  return app;
};
