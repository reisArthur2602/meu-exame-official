"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteExam } from "@/app/(protected)/exams/actions/delete-exam";
import { AlertDialog } from "@/components/ui/alert-dialog";

type DeleteExamButtonProps = {
  examId: string;
  examName: string;
  patientName: string;
};

export const DeleteExamButton = ({
  examId,
  examName,
  patientName,
}: DeleteExamButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-bold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
      >
        <Trash2 className="size-4" strokeWidth={1.7} aria-hidden="true" />
        Excluir exame
      </button>

      <AlertDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        variant="danger"
        title="Excluir exame"
        description={`Excluir o exame "${examName}" de ${patientName}? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
      />
    </>
  );
};
