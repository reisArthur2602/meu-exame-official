import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ExamsSummary } from "./exams-summary";
import { ExamsTable } from "./exams-table";

export const ExamsData = async () => {
  const user = await verifyAuth();

  const exams = await prisma.exam.findMany({
    where: { uploadedById: user.id },
    orderBy: { createdAt: "desc" },
  });

  const total = exams.length;
  const available = exams.filter((exam) => !exam.whatsappFailed).length;
  const withError = exams.filter((exam) => exam.whatsappFailed).length;

  return (
    <>
      <ExamsSummary total={total} available={available} withError={withError} />
      <ExamsTable
        data={exams.map((exam) => ({
          id: exam.id,
          name: exam.patientName,
          cpf: exam.patientCpf,
          protocol: exam.protocol,
          exam: exam.examName,
          uploadDate: formatDate(exam.createdAt),
          hasError: exam.whatsappFailed,
        }))}
      />
    </>
  );
};
