import { logger } from "@/utils/logger";
import { env } from "@/config/env";
import createApp from "./app";

const main = async () => {
  try {
    const port = env.AUTH_SERVICE_PORT;
    const envType = env.NODE_ENV;
    const app = createApp();
    app.listen(env.AUTH_SERVICE_PORT, () => {
      logger.info(
        {
          PORT: port,
          ENVIRONMENT: envType,
        },
        `Auth service is running`,
      );
    });
  } catch (error) {
    logger.error({ error }, "Failed to start the auth-service.");
    process.exit(1);
  }
};

void main();
