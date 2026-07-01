import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="bg-sky-900 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-200">
            Resultado sem espera desnecessária
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Seu exame pode estar a poucos cliques.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-sky-100">
            Tenha em mãos o CPF e o protocolo do exame para consultar seu
            resultado.
          </p>
        </div>

        <Link
          href="/patient"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900"
        >
          Consultar meu exame
          <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
