"use client";

import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-rose-100 text-rose-600">
          <TriangleAlert
            className="size-8"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-rose-700">
          Algo deu errado
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
          Não foi possível carregar esta página
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Ocorreu um erro inesperado. Tente novamente ou volte para o início.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
