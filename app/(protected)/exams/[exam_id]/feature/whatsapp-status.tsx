"use client";

import { CheckCircle2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { resendWhatsappNotification } from "@/app/(protected)/exams/actions/resend-whatsapp-notification";

type WhatsappStatusProps = {
  examId: string;
  hasError: boolean;
};

export const WhatsappStatus = ({ examId, hasError }: WhatsappStatusProps) => {
  const router = useRouter();
  const [isResolved, setIsResolved] = useState(!hasError);
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    const result = await resendWhatsappNotification(examId);
    setIsResending(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setIsResolved(true);
    router.refresh();
  };

  if (isResolved) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-emerald-600">
            <CheckCircle2
              className="size-6"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              WhatsApp enviado
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              O paciente já recebeu o link para consultar o exame com CPF e
              protocolo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-rose-600">
          <TriangleAlert
            className="size-6"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            WhatsApp não enviado
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Não foi possível notificar o paciente sobre este exame.
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isResending}
        onClick={handleResend}
        className="mt-5 w-full rounded-xl bg-sky-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {isResending ? "Reenviando..." : "Reenviar WhatsApp"}
      </button>
    </section>
  );
};
