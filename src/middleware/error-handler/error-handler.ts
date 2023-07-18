import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.json({
    status: err.statusCode,
    message: err.message,
  });
}
