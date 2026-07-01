import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { PatientFooter } from "./feature/patient-footer";
import { PatientHeader } from "./feature/patient-header";
import { PatientLoginForm } from "./feature/patient-login-form";

export const metadata: Metadata = {
  title: "Área do Paciente",
  description:
    "Consulte um exame usando o CPF do paciente e o protocolo do exame.",
};

const PatientPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PatientHeader
        subtitle="Área do Paciente"
        linkHref="/"
        linkLabel="Voltar ao início"
      />

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div className="absolute -right-32 top-16 size-96 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-96 rounded-full bg-slate-200/60 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <section
            className="hidden lg:block"
            aria-labelledby="login-intro-title"
          >
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                <ShieldCheck
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Acesso seguro
              </span>

              <h1
                id="login-intro-title"
                className="mt-6 text-4xl font-extrabold tracking-tighter text-sky-900"
              >
                Seus resultados, protegidos e disponíveis quando você precisar.
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Use o CPF do paciente e o protocolo informado no comprovante
                entregue pela clínica.
              </p>

              <div className="mt-8 rounded-3xl bg-sky-900 p-6 text-white shadow-sm">
                <svg
                  viewBox="0 0 360 42"
                  className="w-full text-sky-200"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 24h67l9-13 14 25 12-19 10 7h55l10-16 16 30 13-22 9 8h141"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">
                      Privacidade
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      Dados protegidos pela LGPD
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">
                      Disponibilidade
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      Acesso em celular ou computador
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="login-title">
            <PatientLoginForm />
          </section>
        </div>
      </main>

      <PatientFooter />
    </div>
  );
};

export default PatientPage;
