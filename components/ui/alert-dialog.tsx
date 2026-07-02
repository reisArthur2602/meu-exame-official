"use client";

import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type AlertDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  variant?: "primary" | "danger";
};

export const AlertDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isConfirming = false,
  variant = "primary",
}: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy="alert-dialog-title"
      describedBy={description ? "alert-dialog-description" : undefined}
      className="max-w-md"
    >
      <h2 id="alert-dialog-title" className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      {description ? (
        <p
          id="alert-dialog-description"
          className="mt-2 text-sm leading-6 text-slate-500"
        >
          {description}
        </p>
      ) : null}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isConfirming}
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          disabled={isConfirming}
          onClick={onConfirm}
          className={cn(
            "rounded-xl px-5 py-3 text-sm font-bold text-white shadow-sm transition disabled:cursor-wait disabled:opacity-70",
            variant === "danger"
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-sky-900 hover:bg-sky-800",
          )}
        >
          {isConfirming ? "Aguarde..." : confirmLabel}
        </button>
      </div>
    </Dialog>
  );
};
