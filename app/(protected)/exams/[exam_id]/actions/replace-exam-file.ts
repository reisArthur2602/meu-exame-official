"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { verifyAuth } from "@/lib/auth/verify-auth";
import { uploadExamFile } from "@/lib/ftp";
import prisma from "@/lib/prisma";

const ALLOWED_EXTENSIONS = ["pdf", "dcm"];
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export const replaceExamFile = async (examId: string, file: File) => {
  try {
    const user = await verifyAuth();

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (
      !extension ||
      !ALLOWED_EXTENSIONS.includes(extension) ||
      file.size > MAX_FILE_SIZE
    ) {
      return {
        ok: false,
        message: "Selecione um arquivo PDF ou DICOM de até 100 MB.",
      };
    }

    const exam = await prisma.exam.findUnique({ where: { id: examId } });

    if (!exam || exam.uploadedById !== user.id) {
      return {
        ok: false,
        message: "Exame não encontrado.",
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const remoteFileName = `${randomUUID()}.${extension}`;

    let filePath: string;

    try {
      filePath = await uploadExamFile(buffer, remoteFileName);
    } catch {
      return {
        ok: false,
        message: "Não foi possível enviar o arquivo. Tente novamente.",
      };
    }

    await prisma.exam.update({
      where: { id: examId },
      data: {
        filePath,
        originalFileName: file.name,
        fileMimeType: file.type,
        fileSize: file.size,
      },
    });

    revalidatePath("/exams");
    revalidatePath(`/exams/${examId}`);

    return {
      ok: true,
      message: "Arquivo substituído com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível substituir o arquivo.",
    };
  }
};
