import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

const COOKIE = 'learnhub_sid';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sessionId: string;
    }
  }
}

/** Anonymous visitor identity so wishlist and cart survive a page reload. */
export const session: RequestHandler = (req, res, next) => {
  const existing = req.cookies?.[COOKIE] as string | undefined;
  const id = existing ?? randomUUID();
  if (!existing) {
    res.cookie(COOKIE, id, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }
  req.sessionId = id;
  next();
};
