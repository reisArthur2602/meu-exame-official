"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, HelpCircle, Loader2, ScanLine, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { findPatientExam } from "@/app/(public)/patient/actions/find-patient-exam";
import { Input } from "@/components/ui/input";
import { formatCpf } from "@/lib/utils";
import {
  type FindPatientExamInput,
  findPatientExamSchema,
} from "@/schema/find-patient-exam-schema";

export const PatientLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FindPatientExamInput>({
    resolver: zodResolver(findPatientExamSchema),
    defaultValues: { cpf: "", protocol: "" },
  });

  const cpfField = register("cpf");
  const protocolField = register("protocol");

  const onSubmit = handleSubmit(async (data) => {
    const result = await findPatientExam(data);

    if (!result.ok || !result.data) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push(`/patient/${result.data.examId}`);
  });

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-sky-900/5 sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
          Consulta de exames
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
          Consulte seu exame
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Preencha os dados exatamente como foram informados no atendimento.
        </p>
      </div>

      <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
        <Input
          label="CPF do paciente"
          inputMode="numeric"
          maxLength={14}
          placeholder="000.000.000-00"
          icon={
            <User className="size-5" strokeWidth={1.8} aria-hidden="true" />
          }
          helperText="Digite apenas os números; a máscara será aplicada automaticamente."
          errorMessage={errors.cpf?.message}
          {...cpfField}
          onChange={(event) => {
            event.target.value = formatCpf(event.target.value);
            cpfField.onChange(event);
          }}
        />

        <Input
          label="Protocolo do exame"
          autoComplete="off"
          placeholder="Ex.: ML-2026-1048"
          className="uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal"
          icon={
            <ScanLine className="size-5" strokeWidth={1.8} aria-hidden="true" />
          }
          helperText="O protocolo está no comprovante entregue pela clínica."
          errorMessage={errors.protocol?.message}
          {...protocolField}
          onChange={(event) => {
            event.target.value = event.target.value.toUpperCase();
            protocolField.onChange(event);
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-wait disabled:opacity-90"
        >
          {isSubmitting ? "Validando acesso" : "Consultar exame"}
          {isSubmitting ? (
            <Loader2
              className="size-5 animate-spin"
              strokeWidth={3}
              aria-hidden="true"
            />
          ) : (
            <ArrowRight
              className="size-4"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </button>
      </form>

      <div className="mt-7 border-t border-slate-200 pt-6">
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-sky-900 shadow-sm">
            <HelpCircle
              className="size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>

          <div>
            <p className="text-sm font-bold text-slate-800">
              Não encontrou o protocolo?
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Entre em contato com a clínica onde realizou o exame para
              confirmar o protocolo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
