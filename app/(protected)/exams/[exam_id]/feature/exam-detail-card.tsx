import { ChevronLeft, Eye, FileText } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { CopyPatientLinkButton } from "./copy-patient-link-button";
import { ExamEditTrigger } from "./exam-edit-trigger";
import { ExamFileActions } from "./exam-file-actions";
import { WhatsappStatus } from "./whatsapp-status";

export type ExamDetail = {
  id: string;
  patientName: string;
  patientCpf: string;
  patientPhone: string;
  protocol: string;
  examName: string;
  examDate: string;
  uploadDate: string;
  originalFileName: string;
  fileMimeType: string;
  fileSize: string;
  hasError: boolean;
};

type ExamDetailCardProps = {
  exam: ExamDetail;
};

export const ExamDetailCard = ({ exam }: ExamDetailCardProps) => {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 rounded-xl text-sm font-bold text-sky-700 transition hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            <ChevronLeft
              className="size-4"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Voltar para exames enviados
          </Link>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
            Detalhes do registro
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-sky-900">
              {exam.examName}
            </h1>
            {exam.hasError ? (
              <Badge variant="error">Erro de envio</Badge>
            ) : (
              <Badge variant="success">Disponível</Badge>
            )}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Confira os dados do exame, arquivo anexado e situação do envio via
            WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CopyPatientLinkButton protocol={exam.protocol} />
          <a
            href={`/exams/${exam.id}/download?view=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            <Eye className="size-4" strokeWidth={1.7} aria-hidden="true" />
            Visualizar arquivo
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <WhatsappStatus examId={exam.id} hasError={exam.hasError} />

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Informações do exame
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Registro independente gerado pelo envio da clínica.
              </p>
            </div>

            <ExamEditTrigger
              exam={{
                id: exam.id,
                name: exam.patientName,
                cpf: exam.patientCpf,
                protocol: exam.protocol,
                exam: exam.examName,
                uploadDate: exam.uploadDate,
                hasError: exam.hasError,
              }}
            />
          </div>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Nome do exame
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.examName}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Protocolo
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.protocol}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Data do exame
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.examDate}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Enviado em
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.uploadDate}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Paciente vinculado
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Esses dados não criam cadastro permanente. Servem apenas para
            localizar este exame.
          </p>
          <dl className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Paciente
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.patientName}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                CPF
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.patientCpf}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                WhatsApp
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.patientPhone}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Arquivo anexado
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Arquivo que será disponibilizado para consulta por CPF e
                protocolo.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-rose-600 shadow-sm">
                  <FileText
                    className="size-7"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    {exam.originalFileName}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {exam.fileMimeType} · {exam.fileSize}
                  </p>
                </div>
              </div>

              <ExamFileActions
                examId={exam.id}
                patientName={exam.patientName}
                examName={exam.examName}
              />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};
