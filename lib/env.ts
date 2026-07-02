import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "Informe a DATABASE_URL"),

  NEXT_PUBLIC_URL: z.string().url("Informe uma NEXT_PUBLIC_URL válida"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),

  EVOLUTION_API_URL: z
    .string()
    .url("Informe uma EVOLUTION_API_URL válida")
    .optional(),
  EVOLUTION_API_KEY: z.string().optional(),
  EVOLUTION_INSTANCE_NAME: z.string().optional(),

  FTP_HOST: z.string().optional(),
  FTP_PORT: z.coerce.number().int().positive().default(21),
  FTP_USER: z.string().optional(),
  FTP_PASSWORD: z.string().optional(),
  FTP_SECURE: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Variáveis de ambiente inválidas:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
