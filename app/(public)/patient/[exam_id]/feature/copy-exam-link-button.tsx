"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CopyExamLinkButtonProps = {
  examId: string;
};

export const CopyExamLinkButton = ({ examId }: CopyExamLinkButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}/patient/${examId}`;

    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      toast.success("Link do resultado copiado!");

      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
    >
      <Copy className="size-5" strokeWidth={1.8} aria-hidden="true" />
      {isCopied ? "Link copiado!" : "Copiar e compartilhar"}
    </button>
  );
};
