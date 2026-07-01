import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Informe o nome completo."),
  username: z.string().min(1, "Informe o usuário."),
  password: z.string().min(6, "Informe uma senha com pelo menos 6 caracteres."),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
