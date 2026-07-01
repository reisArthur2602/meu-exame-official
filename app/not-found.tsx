import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

const NotFound = () => {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center">
          <Logo size="xl" showWordmark={false} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
          Erro 404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          O endereço acessado não existe ou foi movido. Verifique o link ou
          volte para o início.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
