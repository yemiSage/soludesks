import type { NextFunction, Request, RequestHandler, Response } from 'express';

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export const asyncHandler =
  (handler: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);

export const notFound = (_req: Request, _res: Response, next: NextFunction) =>
  next(new HttpError(404, 'Resource not found'));

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof Error && status < 500 ? error.message : 'Something went wrong';
  if (status >= 500) console.error(error);
  res.status(status).json({ error: message });
};
