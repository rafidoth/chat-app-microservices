import { type Logger, createLogger } from "@chatapp/shared";
import { env } from "@/config/env";

export const logger: Logger = createLogger({
  name: "auth-service",
  environment: env.NODE_ENV,
});
