import { logger } from "@/utils/logger";
import { env } from "@/config/env";
import app from "./app";

const main = async () => {
  try {
    app.listen(env.AUTH_SERVICE_PORT, () => {
      logger.info(
        `Auth service is running on port ${env.AUTH_SERVICE_PORT} in ${env.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    logger.error({ error }, "Failed to start the auth-service.");
    process.exit(1);
  }
};

void main();
