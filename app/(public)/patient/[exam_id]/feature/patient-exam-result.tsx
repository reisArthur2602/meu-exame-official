import { Download, Eye, ShieldCheck } from "lucide-react";

export type PatientExamResult = {
  id: string;
  patientName: string;
  patientCpfMasked: string;
  protocol: string;
  examName: string;
  examDate: string;
};

type PatientExamResultProps = {
  exam: PatientExamResult;
};

export const PatientExamResult = ({ exam }: PatientExamResultProps) => {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-600" />
          Exame localizado
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-sky-900 sm:text-4xl">
          Seu resultado está disponível
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Esta consulta exibe somente o exame associado ao CPF e ao protocolo
          informados.
        </p>
      </div>

      <section
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-sky-900/5"
        aria-labelledby="exam-title"
      >
        <div className="border-b border-slate-200 bg-sky-900 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                Resultado consultado
              </p>
              <h2 id="exam-title" className="mt-3 text-2xl font-extrabold">
                {exam.examName}
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-white/20">
              <span className="size-2 rounded-full bg-emerald-400" />
              Disponível
            </span>
          </div>
          <svg
            viewBox="0 0 560 42"
            className="mt-7 w-full text-sky-300/80"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 24h95l10-13 14 25 13-19 10 7h86l11-16 16 30 13-22 10 8h278"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="p-6 sm:p-8">
          <dl className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Paciente
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.patientName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                CPF
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.patientCpfMasked}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Protocolo
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.protocol}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Realizado em
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">
                {exam.examDate}
              </dd>
            </div>
          </dl>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href={`/patient/${exam.id}/download?view=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
            >
              <Eye className="size-5" strokeWidth={1.8} aria-hidden="true" />
              Visualizar laudo
            </a>
            <a
              href={`/patient/${exam.id}/download`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
            >
              <Download
                className="size-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Baixar laudo em PDF
            </a>
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-900">
              <ShieldCheck
                className="size-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Proteção dos seus dados
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Não compartilhe seu CPF e protocolo. Ao terminar, feche esta
                página ou faça uma nova consulta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
