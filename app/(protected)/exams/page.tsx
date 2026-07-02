import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ExamsData } from "./feature/exams-data";
import { ExamsLoading } from "./feature/exams-loading";

export const metadata: Metadata = {
  title: "Exames enviados",
  description: "Acompanhe os exames enviados pela clínica.",
  robots: { index: false, follow: false },
};

const ExamsPage = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
            Controle de envios
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
            Exames enviados
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Cada linha representa um exame independente, acessível pelo paciente
            com CPF e protocolo.
          </p>
        </div>

        <Link
          href="/exams/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          <Plus className="size-4" strokeWidth={1.8} aria-hidden="true" />
          Novo exame
        </Link>
      </div>

      <Suspense fallback={<ExamsLoading />}>
        <ExamsData />
      </Suspense>
    </>
  );
};

export default ExamsPage;
