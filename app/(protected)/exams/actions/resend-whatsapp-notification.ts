"use server";

import { revalidatePath } from "next/cache";

import { verifyAuth } from "@/lib/auth/verify-auth";
import { sendWhatsappMessage } from "@/lib/evolution-api";
import prisma from "@/lib/prisma";

export const resendWhatsappNotification = async (examId: string) => {
  try {
    const user = await verifyAuth();

    const exam = await prisma.exam.findUnique({ where: { id: examId } });

    if (!exam || exam.uploadedById !== user.id) {
      return {
        ok: false,
        message: "Exame não encontrado.",
      };
    }

    try {
      await sendWhatsappMessage({
        phone: exam.patientPhone,
        message: `Olá, ${exam.patientName}! Seu exame "${exam.examName}" está disponível na MeuLaudo. Consulte com o protocolo ${exam.protocol}.`,
      });
    } catch {
      return {
        ok: false,
        message: "Não foi possível reenviar a notificação. Tente novamente.",
      };
    }

    await prisma.exam.update({
      where: { id: exam.id },
      data: { whatsappFailed: false },
    });

    revalidatePath("/exams");
    revalidatePath(`/exams/${exam.id}`);

    return {
      ok: true,
      message: "Notificação reenviada com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível reenviar a notificação.",
    };
  }
};
