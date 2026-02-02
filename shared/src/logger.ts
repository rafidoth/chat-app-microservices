import pino from "pino";
import type { Logger, LoggerOptions } from "pino";

type CreateLoggerOptions = LoggerOptions & {
  name?: string;
};

export function createLogger(options: CreateLoggerOptions = {}): Logger {
  const { name, ...pinoOptions } = options;

  const transport =
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined;

  const logger = pino({
    name,
    level: process.env.LOG_LEVEL || "info",
    transport,
    ...pinoOptions,
  });

  return logger;
}
