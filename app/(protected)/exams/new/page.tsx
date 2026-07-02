import type { Metadata } from "next";
import Link from "next/link";

import { NewExamForm } from "./feature/new-exam-form";

export const metadata: Metadata = {
  title: "Novo exame",
  description: "Cadastre e envie um novo exame para consulta do paciente.",
  robots: { index: false, follow: false },
};

const NewExamPage = () => {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
            Envio independente
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
            Cadastrar e enviar exame
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Não existe cadastro prévio do paciente. Informe os dados necessários
            para este exame e anexe o arquivo.
          </p>
        </div>

        <Link
          href="/exams"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          Ver exames enviados
        </Link>
      </div>

      <NewExamForm />
    </>
  );
};

export default NewExamPage;
