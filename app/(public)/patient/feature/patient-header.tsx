import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";

type PatientHeaderProps = {
  subtitle: string;
  linkHref: string;
  linkLabel: string;
};

export const PatientHeader = ({
  subtitle,
  linkHref,
  linkLabel,
}: PatientHeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          <Logo subtitle={subtitle} />
        </Link>

        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          <ChevronLeft
            className="size-4"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          {linkLabel}
        </Link>
      </div>
    </header>
  );
};
