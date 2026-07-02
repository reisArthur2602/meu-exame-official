import { z } from "zod";

export const updateExamSchema = z.object({
  id: z.string().min(1),
  patientName: z.string().min(1, "Informe o paciente."),
  protocol: z.string().min(1, "Informe o protocolo."),
  examName: z.string().min(1, "Informe o exame."),
});

export type UpdateExamInput = z.infer<typeof updateExamSchema>;
