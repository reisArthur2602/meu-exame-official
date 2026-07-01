import { z } from "zod";

import { isValidPhoneWithCountryCode } from "@/lib/utils";

export const createExamSchema = z.object({
  patientName: z.string().min(1, "Informe o nome do paciente."),
  patientCpf: z
    .string()
    .refine(
      (value) => value.replace(/\D/g, "").length === 11,
      "Informe um CPF com 11 dígitos.",
    ),
  patientPhone: z
    .string()
    .refine(
      isValidPhoneWithCountryCode,
      "Informe o telefone com o código do país (ex.: +55).",
    ),
  protocol: z.string().min(1, "Informe o protocolo do exame."),
  examName: z.string().min(1, "Informe o nome do exame."),
  examDate: z.string().min(1, "Informe a data de realização."),
});

export type CreateExamInput = z.infer<typeof createExamSchema>;
