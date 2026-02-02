import z from "zod";
import type { ZodObject, ZodRawShape } from "zod";

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

export const createEnv = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  options: EnvOptions = {},
): z.infer<ZodObject<T>> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const formattedErrors = z.prettifyError(parsed.error);
    throw new Error(
      `[${serviceName}] Environment variable validation failed: ${JSON.stringify(formattedErrors)}`,
    );
  }
  return parsed.data;
};
