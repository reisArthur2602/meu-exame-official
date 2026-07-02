"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { replaceExamFile } from "@/app/(protected)/exams/[exam_id]/actions/replace-exam-file";
import { deleteExam } from "@/app/(protected)/exams/actions/delete-exam";
import { AlertDialog } from "@/components/ui/alert-dialog";

type ExamFileActionsProps = {
  examId: string;
  patientName: string;
  examName: string;
};

export const ExamFileActions = ({
  examId,
  patientName,
  examName,
}: ExamFileActionsProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleReplaceFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsReplacing(true);
    const result = await replaceExamFile(examId, file);
    setIsReplacing(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteExam(examId);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/exams");
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.dcm,application/pdf,application/dicom"
        onChange={handleReplaceFile}
      />

      <a
        href={`/exams/${examId}/download`}
        className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:text-sky-900"
      >
        Baixar
      </a>

      <button
        type="button"
        disabled={isReplacing}
        onClick={() => fileInputRef.current?.click()}
        className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:text-sky-900 disabled:cursor-wait disabled:opacity-70"
      >
        {isReplacing ? "Enviando..." : "Substituir"}
      </button>

      <button
        type="button"
        disabled={isDeleting}
        onClick={() => setIsDeleteDialogOpen(true)}
        className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-70"
      >
        {isDeleting ? "Excluindo..." : "Excluir"}
      </button>

      <AlertDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        variant="danger"
        title="Excluir exame"
        description={`Excluir o exame "${examName}" de ${patientName}? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
      />
    </div>
  );
};
