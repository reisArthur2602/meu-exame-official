"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateExam } from "@/app/(protected)/exams/actions/update-exam";
import type { ExamRow } from "@/app/(protected)/exams/feature/exams-columns";
import { Input } from "@/components/ui/input";
import {
  type UpdateExamInput,
  updateExamSchema,
} from "@/schema/update-exam-schema";

type ExamEditModalProps = {
  exam: ExamRow | null;
  onClose: () => void;
};

export const ExamEditModal = ({ exam, onClose }: ExamEditModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateExamInput>({
    resolver: zodResolver(updateExamSchema),
  });

  useEffect(() => {
    if (exam) {
      reset({
        id: exam.id,
        patientName: exam.name,
        protocol: exam.protocol,
        examName: exam.exam,
      });
    }
  }, [exam, reset]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && exam) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [exam, onClose]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateExam(data);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onClose();
  });

  if (!exam) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: closes on backdrop click only; Escape is handled by the document-level listener above
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">
              Editar registro
            </p>
            <h2
              id="edit-title"
              className="mt-2 text-xl font-bold text-slate-900"
            >
              Dados do exame
            </h2>
          </div>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <Input
            label="Paciente"
            errorMessage={errors.patientName?.message}
            {...register("patientName")}
          />

          <Input
            label="Protocolo"
            className="uppercase"
            errorMessage={errors.protocol?.message}
            {...register("protocol")}
          />

          <Input
            label="Exame"
            errorMessage={errors.examName?.message}
            {...register("examName")}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-sky-900 px-5 py-3 text-sm font-bold text-white hover:bg-sky-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
