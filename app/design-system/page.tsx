import { User } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDetailRow,
  CardDetails,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const colorTokens = [
  {
    name: "Sky 900",
    hex: "#0c4a6e",
    usage: "Marca e ações",
    swatch: "bg-sky-900",
  },
  { name: "Sky 700", hex: "#0369a1", usage: "Destaques", swatch: "bg-sky-700" },
  { name: "Slate 50", hex: "#f8fafc", usage: "Fundos", swatch: "bg-slate-50" },
  {
    name: "Slate 100",
    hex: "#f1f5f9",
    usage: "Superfícies",
    swatch: "bg-slate-100",
  },
  {
    name: "Slate 300",
    hex: "#cbd5e1",
    usage: "Bordas",
    swatch: "bg-slate-300",
  },
  {
    name: "Slate 700",
    hex: "#334155",
    usage: "Textos",
    swatch: "bg-slate-700",
  },
  {
    name: "Emerald 600",
    hex: "#059669",
    usage: "Disponível",
    swatch: "bg-emerald-600",
  },
];

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-900">
        {title}
      </h2>
    </div>
    {description ? (
      <p className="max-w-xl text-sm leading-6 text-slate-500">{description}</p>
    ) : null}
  </div>
);

export const metadata: Metadata = {
  title: "Design System",
  description: "Tokens e componentes visuais usados pela plataforma MeuLaudo.",
};

const DesignSystemPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
          Fundação visual
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tighter text-sky-900 sm:text-5xl">
          Componentes de UI do MeuLaudo
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Variações reais dos componentes de <code>components/ui</code>, fiéis
          ao design system da plataforma.
        </p>
      </header>

      <section aria-labelledby="colors-title">
        <SectionHeading
          eyebrow="01 · Base"
          title="Tokens de cores"
          description="As cores primárias representam confiança clínica. As cores de estado devem ser usadas apenas para comunicar situação ou ação."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colorTokens.map((token) => (
            <article
              key={token.name}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className={`h-28 ${token.swatch}`} />
              <div className="p-4">
                <p className="font-bold text-slate-900">{token.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {token.hex} · {token.usage}
                </p>
              </div>
            </article>
          ))}

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid h-28 grid-cols-2">
              <div className="bg-amber-500" />
              <div className="bg-rose-600" />
            </div>
            <div className="p-4">
              <p className="font-bold text-slate-900">Estados críticos</p>
              <p className="mt-1 text-sm text-slate-500">Âmbar e vermelho</p>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="buttons-title">
        <SectionHeading eyebrow="02 · Ações" title="Botões" />

        <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <Button variant="primary">Botão primário</Button>
          <Button variant="secondary">Botão secundário</Button>
          <Button variant="danger">Ação de perigo</Button>
          <Button variant="primary" disabled>
            Desabilitado
          </Button>
        </div>
      </section>

      <section aria-labelledby="inputs-title">
        <SectionHeading
          eyebrow="03 · Entrada de dados"
          title="Inputs e validação"
        />

        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <Input
            label="Estado padrão"
            placeholder="Digite uma informação"
            helperText="Texto de apoio opcional."
          />

          <Input
            label="Estado de foco"
            defaultValue="Campo em edição"
            helperText="Use foco visível para navegação por teclado."
          />

          <Input
            label="Estado de sucesso"
            defaultValue="anderson@email.com"
            successMessage="Informação validada."
          />

          <Input
            label="Estado de erro"
            defaultValue="123"
            errorMessage="Informe um CPF válido com 11 dígitos."
          />
        </div>
      </section>

      <section aria-labelledby="badges-title">
        <SectionHeading eyebrow="04 · Situação" title="Badges de status" />

        <div className="flex flex-wrap gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <Badge variant="success">Disponível</Badge>
          <Badge variant="warning">Processando</Badge>
          <Badge variant="error">Erro no Arquivo</Badge>
        </div>
      </section>

      <section aria-labelledby="cards-title">
        <SectionHeading eyebrow="05 · Conteúdo clínico" title="Cards" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card accent>
            <CardHeader>
              <div>
                <CardEyebrow>Exame</CardEyebrow>
                <CardTitle>Hemograma completo</CardTitle>
              </div>
              <Badge variant="success">Disponível</Badge>
            </CardHeader>

            <CardDetails className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Realização
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-700">
                  28/06/2026
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Protocolo
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-700">
                  ML-2026-1048
                </dd>
              </div>
            </CardDetails>

            <CardFooter>
              <Button variant="primary" className="w-full">
                Baixar laudo
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-sky-50 text-sky-900">
                <User className="size-6" strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div>
                <CardEyebrow>Paciente</CardEyebrow>
                <CardTitle>Anderson Costa</CardTitle>
              </div>
            </div>

            <CardDetails className="space-y-1">
              <CardDetailRow label="CPF" value="123.456.789-00" />
              <CardDetailRow label="E-mail" value="anderson@email.com" />
              <CardDetailRow label="Telefone" value="(21) 99999-0000" />
            </CardDetails>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemPage;
