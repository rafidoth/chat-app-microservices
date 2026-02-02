import pino from "pino";
import type { Logger, LoggerOptions } from "pino";

type CreateLoggerOptions = LoggerOptions & {
  environment?: "development" | "production" | "test";
  name?: string;
};

export function createLogger(options: CreateLoggerOptions = {}): Logger {
  const { name, environment, ...pinoOptions } = options;

  const isDevelopment = environment?.trim() === "development";

  const transport = isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
        },
      }
    : undefined;

  return pino({
    name,
    level: process.env.LOG_LEVEL || "info",
    transport,
    ...pinoOptions,
  });
}
