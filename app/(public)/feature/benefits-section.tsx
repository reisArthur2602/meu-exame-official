import { BellRing, Printer, ShieldCheck } from "lucide-react";

const benefits = [
  {
    id: "reducao-impressao",
    title: "Reduza impressão e retrabalho",
    description:
      "Centralize os laudos em um portal digital e diminua custos com papel, toner, armazenamento e reemissão.",
    icon: Printer,
  },
  {
    id: "seguranca",
    title: "Criptografia de ponta a ponta",
    description:
      "Proteja documentos e dados pessoais com acesso autenticado, transmissão segura e rastreabilidade de ações.",
    icon: ShieldCheck,
  },
  {
    id: "notificacao",
    title: "Notificação automatizada",
    description:
      "Avise o paciente por SMS ou e-mail assim que o laudo estiver disponível, sem ligações ou conferências manuais.",
    icon: BellRing,
  },
];

export const BenefitsSection = () => {
  return (
    <section id="beneficios" className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
            Da recepção ao resultado
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900 sm:text-4xl">
            Uma entrega mais leve para a clínica e para o paciente.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            O MeuLaudo elimina etapas manuais e cria uma experiência
            consistente, desde o envio do arquivo até o download do resultado.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.id}
              id={benefit.id === "seguranca" ? "seguranca" : undefined}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-sky-50 text-sky-900 transition group-hover:bg-sky-900 group-hover:text-white">
                <benefit.icon
                  className="size-6"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
