"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

type CopyPatientLinkButtonProps = {
  protocol: string;
};

export const CopyPatientLinkButton = ({
  protocol,
}: CopyPatientLinkButtonProps) => {
  const handleCopy = async () => {
    const link = `${window.location.origin}/patient?protocolo=${encodeURIComponent(protocol)}`;

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link do paciente copiado.");
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
    >
      <Copy className="size-4" strokeWidth={1.7} aria-hidden="true" />
      Copiar link do paciente
    </button>
  );
};
