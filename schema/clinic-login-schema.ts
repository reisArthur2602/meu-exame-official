import { z } from "zod";

export const clinicLoginSchema = z.object({
  username: z.string().min(1, "Informe seu usuário."),
  password: z.string().min(6, "Informe uma senha com pelo menos 6 caracteres."),
  remember: z.boolean(),
});

export type ClinicLoginInput = z.infer<typeof clinicLoginSchema>;
