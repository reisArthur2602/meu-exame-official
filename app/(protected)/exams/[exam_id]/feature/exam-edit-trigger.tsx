"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { ExamEditModal } from "@/app/(protected)/exams/feature/exam-edit-modal";
import type { ExamRow } from "@/app/(protected)/exams/feature/exams-columns";

type ExamEditTriggerProps = {
  exam: ExamRow;
};

export const ExamEditTrigger = ({ exam }: ExamEditTriggerProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-sky-700 hover:text-sky-900"
      >
        <Pencil className="size-4" strokeWidth={1.7} aria-hidden="true" />
        Editar
      </button>

      <ExamEditModal
        exam={isEditing ? exam : null}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};
