import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3, "Informe o nome completo."),
  username: z.string().min(1, "Informe o usuário."),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
