"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { Prisma } from "@/app/generated/prisma/client";
import { verifyAuth } from "@/lib/auth/verify-auth";
import { sendWhatsappMessage } from "@/lib/evolution-api";
import { uploadExamFile } from "@/lib/ftp";
import prisma from "@/lib/prisma";
import {
  type CreateExamInput,
  createExamSchema,
} from "@/schema/create-exam-schema";

const ALLOWED_EXTENSIONS = ["pdf", "dcm"];
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export const createExam = async (input: CreateExamInput, file: File) => {
  try {
    const user = await verifyAuth();

    const parsed = createExamSchema.safeParse(input);

    if (!parsed.success) {
      return {
        ok: false,
        message: "Revise os campos destacados.",
      };
    }

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

    const exam = await prisma.exam.create({
      data: {
        patientName: parsed.data.patientName,
        patientCpf: parsed.data.patientCpf,
        patientPhone: parsed.data.patientPhone,
        protocol: parsed.data.protocol,
        examName: parsed.data.examName,
        examDate: new Date(parsed.data.examDate),
        filePath,
        originalFileName: file.name,
        fileMimeType: file.type,
        fileSize: file.size,
        uploadedById: user.id,
      },
    });

    try {
      await sendWhatsappMessage({
        phone: parsed.data.patientPhone,
        message: `Olá, ${parsed.data.patientName}! Seu exame "${parsed.data.examName}" já está disponível na MeuLaudo. Consulte com o protocolo ${parsed.data.protocol}.`,
      });
    } catch {
      await prisma.exam.update({
        where: { id: exam.id },
        data: { whatsappFailed: true },
      });
    }

    revalidatePath("/exams");

    return {
      ok: true,
      message: "Exame enviado com sucesso.",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        message: "Já existe um exame com este CPF e protocolo.",
      };
    }

    return {
      ok: false,
      message: "Não foi possível enviar o exame.",
    };
  }
};
