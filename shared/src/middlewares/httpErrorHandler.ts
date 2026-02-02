import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../http-error";
import type { ErrorRequestHandler } from "express";
import { Logger } from "pino";

const GetErrorHandler = (logger: Logger): ErrorRequestHandler => {
  const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.error({ err }, "Unhandled error occurred");
    const error = err instanceof HttpError ? err : undefined;
    const statusCode = error?.statusCode ?? 500;
    const message =
      statusCode >= 500
        ? "Internal Server Error"
        : (error?.message ?? "Unknown Error");

    const payload = error?.details
      ? { message, details: error.details }
      : { message };

    res.status(statusCode).json(payload);

    next(err);
  };
  return errorHandler;
};

export { GetErrorHandler };
