import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDate, maskCpf } from "@/lib/utils";
import { PatientFooter } from "../feature/patient-footer";
import { PatientHeader } from "../feature/patient-header";
import { PatientExamResult } from "./feature/patient-exam-result";

export const metadata: Metadata = {
  title: "Resultado do exame",
  description: "Consulte, visualize e baixe o resultado do seu exame.",
  robots: { index: false, follow: false },
};

type PatientExamPageProps = {
  params: Promise<{ exam_id: string }>;
};

const PatientExamPage = async ({ params }: PatientExamPageProps) => {
  const { exam_id } = await params;

  const exam = await prisma.exam.findUnique({ where: { id: exam_id } });

  if (!exam) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <PatientHeader
        subtitle="Consulta de exame"
        linkHref="/patient"
        linkLabel="Nova consulta"
      />

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute -right-28 top-10 size-96 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-96 rounded-full bg-slate-200/70 blur-3xl" />

        <PatientExamResult
          exam={{
            id: exam.id,
            patientName: exam.patientName,
            patientCpfMasked: maskCpf(exam.patientCpf),
            protocol: exam.protocol,
            examName: exam.examName,
            examDate: formatDate(exam.examDate),
          }}
        />
      </main>

      <PatientFooter />
    </div>
  );
};

export default PatientExamPage;
