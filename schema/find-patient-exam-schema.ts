import { z } from "zod";

export const findPatientExamSchema = z.object({
  cpf: z
    .string()
    .refine(
      (value) => value.replace(/\D/g, "").length === 11,
      "Informe um CPF com 11 dígitos.",
    ),
  protocol: z.string().min(1, "Informe o protocolo do exame."),
});

export type FindPatientExamInput = z.infer<typeof findPatientExamSchema>;
