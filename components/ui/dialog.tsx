"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
  children: ReactNode;
};

export const Dialog = ({
  open,
  onClose,
  labelledBy,
  describedBy,
  className,
  children,
}: DialogProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: closes on backdrop click only; Escape is handled by the document-level listener above
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
