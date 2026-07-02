"use server";

import { revalidatePath } from "next/cache";

import { verifyAuth } from "@/lib/auth/verify-auth";
import { sendWhatsappImage } from "@/lib/evolution-api";
import { generateExamNotificationImage } from "@/lib/generate-exam-notification-image";
import prisma from "@/lib/prisma";
import { getPatientExamUrl } from "@/lib/urls";

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
      const examLink = getPatientExamUrl(exam.id);

      const notificationImage = await generateExamNotificationImage({
        patientName: exam.patientName,
        examName: exam.examName,
        protocol: exam.protocol,
      });

      await sendWhatsappImage({
        phone: exam.patientPhone,
        caption: `Olá ${exam.patientName}! 👋\n\nSeu exame "${exam.examName}" está pronto e seguro na MeuLaudo.\n\n🔐 Acesse com:\n📋 Protocolo: ${exam.protocol}\n\n🔗 Link direto: ${examLink}\n\nEquipe MeuLaudo`,
        imageBase64: notificationImage,
        fileName: `exame-${exam.protocol}.png`,
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
