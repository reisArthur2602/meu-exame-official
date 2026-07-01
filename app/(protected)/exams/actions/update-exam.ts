"use server";

import { revalidatePath } from "next/cache";

import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import {
  type UpdateExamInput,
  updateExamSchema,
} from "@/schema/update-exam-schema";

export const updateExam = async (input: UpdateExamInput) => {
  try {
    const user = await verifyAuth();

    const parsed = updateExamSchema.safeParse(input);

    if (!parsed.success) {
      return {
        ok: false,
        message: "Dados inválidos.",
      };
    }

    const { id, ...data } = parsed.data;

    await prisma.exam.update({
      where: { id, uploadedById: user.id },
      data,
    });

    revalidatePath("/exams");

    return {
      ok: true,
      message: "Exame atualizado com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível atualizar o exame.",
    };
  }
};
