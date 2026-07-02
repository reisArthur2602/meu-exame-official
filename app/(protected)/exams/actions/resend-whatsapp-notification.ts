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
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      const examLink = `${baseUrl}/patient/${exam.id}`;

      await sendWhatsappMessage({
        phone: exam.patientPhone,
        message: `Olá ${exam.patientName}! 👋\n\nSeu exame "${exam.examName}" está pronto e seguro na MeuLaudo.\n\n🔐 Acesse com:\n📋 Protocolo: ${exam.protocol}\n\n🔗 Link direto: ${examLink}\n\nEquipe MeuLaudo`,
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
