import { notFound } from "next/navigation";

import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { formatBytes, formatDate, formatDateTime } from "@/lib/utils";
import { ExamDetailCard } from "./exam-detail-card";

type ExamDetailDataProps = {
  examId: string;
};

export const ExamDetailData = async ({ examId }: ExamDetailDataProps) => {
  const user = await verifyAuth();

  const exam = await prisma.exam.findUnique({ where: { id: examId } });

  if (!exam || exam.uploadedById !== user.id) notFound();

  return (
    <ExamDetailCard
      exam={{
        id: exam.id,
        patientName: exam.patientName,
        patientCpf: exam.patientCpf,
        patientPhone: exam.patientPhone,
        protocol: exam.protocol,
        examName: exam.examName,
        examDate: formatDate(exam.examDate),
        uploadDate: formatDateTime(exam.createdAt),
        originalFileName: exam.originalFileName,
        fileMimeType: exam.fileMimeType,
        fileSize: formatBytes(exam.fileSize),
        hasError: exam.whatsappFailed,
      }}
    />
  );
};
