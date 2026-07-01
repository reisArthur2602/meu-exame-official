import Link from "next/link";

import { Logo } from "@/components/ui/logo";

const stats = [
  { value: "1", label: "Exame por acesso" },
  { value: "CPF", label: "Identificação segura" },
  { value: "LGPD", label: "Privacidade aplicada" },
];

export const ClinicIntroPanel = () => {
  return (
    <section
      className="relative hidden overflow-hidden bg-sky-900 p-12 text-white lg:flex lg:flex-col lg:justify-between"
      aria-labelledby="clinic-intro-title"
    >
      <div className="absolute -right-28 -top-28 size-80 rounded-full border border-white/10" />
      <div className="absolute -right-10 -top-10 size-80 rounded-full border border-white/10" />
      <div className="absolute -bottom-40 -left-40 size-[32rem] rounded-full bg-sky-700/30 blur-3xl" />

      <Link
        href="/"
        className="relative z-10 inline-flex w-fit items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900"
      >
        <Logo size="lg" inverted subtitle="Portal da Clínica" />
      </Link>

      <div className="relative z-10 max-w-xl">
        <h1
          id="clinic-intro-title"
          className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-tighter"
        >
          Entregue exames com mais segurança e menos trabalho manual.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-sky-100">
          Gerencie envios, acompanhe o processamento e controle quem pode
          acessar o painel da clínica.
        </p>

        <div className="mt-10 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
          <svg
            viewBox="0 0 520 54"
            className="w-full text-sky-200"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 30h83l12-19 17 35 16-27 14 11h76l13-20 21 40 17-31 13 11h238"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mt-6 grid grid-cols-3 gap-5 border-t border-white/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-sky-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
