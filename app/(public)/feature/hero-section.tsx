import {
  ArrowRight,
  Check,
  Download,
  FileText,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="absolute -right-28 top-28 size-80 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute -left-40 bottom-0 size-96 rounded-full bg-slate-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
            <Check className="size-4" strokeWidth={2} aria-hidden="true" />
            Em conformidade com a LGPD
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tighter text-sky-900 sm:text-5xl lg:text-6xl">
            O laudo chega antes. O cuidado continua perto.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            O MeuLaudo conecta clínicas, laboratórios e pacientes em uma entrega
            digital simples, segura e sem papel. Menos espera no balcão, mais
            agilidade para quem precisa do resultado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/patient"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
            >
              Consultar meu exame
              <ArrowRight
                className="size-4"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/auth"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-700 hover:text-sky-900 hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
            >
              Entrar no Portal da Clínica
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Check
                className="size-4 text-emerald-600"
                strokeWidth={2}
                aria-hidden="true"
              />
              Acesso por CPF e protocolo
            </span>

            <span className="inline-flex items-center gap-2">
              <Check
                className="size-4 text-emerald-600"
                strokeWidth={2}
                aria-hidden="true"
              />
              Disponível em qualquer dispositivo
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2rem] border border-sky-100 bg-sky-50/60" />

          <div className="report-float relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-sky-900/10">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <Logo size="sm" showWordmark={false} />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Resultado disponível
                  </p>
                  <p className="text-xs text-slate-500">
                    Protocolo ML-2026-1048
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="size-2 rounded-full bg-emerald-600" />
                Disponível
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Paciente
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    Anderson Costa
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    CPF •••.•••.•••-00
                  </p>
                </div>

                <span className="grid size-12 place-items-center rounded-2xl bg-sky-50 text-sky-900">
                  <User
                    className="size-6"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </div>

              <div className="my-6 h-px bg-slate-100" />

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      Exame
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      Hemograma completo
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Realizado em 28/06/2026
                    </p>
                  </div>

                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-sky-900 shadow-sm">
                    <FileText
                      className="size-5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white shadow-sm"
                >
                  Baixar laudo em PDF
                  <Download
                    className="size-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div className="bg-sky-900 px-5 py-4 text-white">
              <svg
                viewBox="0 0 360 36"
                className="w-full opacity-90"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 20h67l9-11 14 21 12-16 9 6h55l10-14 16 26 13-19 9 7h142"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck
                  className="size-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Dados protegidos
                </p>
                <p className="text-xs text-slate-500">
                  Acesso individual e rastreável
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
