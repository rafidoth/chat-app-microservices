import { createEnv } from "@chatapp/shared";
import { z } from "@chatapp/shared";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  AUTH_SERVICE_PORT: z.coerce.number().default(4001),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, {
  serviceName: "auth-service",
});
