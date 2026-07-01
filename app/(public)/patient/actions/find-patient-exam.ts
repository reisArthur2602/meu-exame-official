"use server";

import prisma from "@/lib/prisma";
import {
  type FindPatientExamInput,
  findPatientExamSchema,
} from "@/schema/find-patient-exam-schema";

export const findPatientExam = async (input: FindPatientExamInput) => {
  const parsed = findPatientExamSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Informe o CPF completo e o protocolo para continuar.",
    };
  }

  const exam = await prisma.exam.findFirst({
    where: {
      patientCpf: parsed.data.cpf,
      protocol: parsed.data.protocol.trim().toUpperCase(),
    },
    select: { id: true },
  });

  if (!exam) {
    return {
      ok: false,
      message:
        "Não encontramos nenhum exame com esses dados. Confira o CPF e o protocolo.",
    };
  }

  return {
    ok: true,
    message: "Exame localizado. Abrindo seu exame...",
    data: { examId: exam.id },
  };
};
