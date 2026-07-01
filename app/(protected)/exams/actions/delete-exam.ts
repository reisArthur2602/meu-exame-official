"use server";

import { revalidatePath } from "next/cache";

import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";

export const deleteExam = async (id: string) => {
  try {
    const user = await verifyAuth();

    await prisma.exam.delete({ where: { id, uploadedById: user.id } });

    revalidatePath("/exams");

    return {
      ok: true,
      message: "Exame excluído da listagem.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível excluir o exame.",
    };
  }
};
