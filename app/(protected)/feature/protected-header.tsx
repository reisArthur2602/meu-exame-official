import { LogOut } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { getInitials } from "@/lib/utils";
import { logout } from "../actions/logout";
import { ProtectedNav } from "./protected-nav";

type ProtectedHeaderProps = {
  user: {
    name: string;
    isAdmin: boolean;
  };
};

export const ProtectedHeader = ({ user }: ProtectedHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/exams"
          className="inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          <Logo
            subtitle="Portal da Clínica"
            subtitleClassName="hidden sm:block"
          />
        </Link>

        <ProtectedNav variant="desktop" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">
              {user.isAdmin ? "Administrador" : "Operador"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Abrir opções do usuário"
            className="grid size-10 place-items-center rounded-full bg-sky-100 text-sm font-extrabold text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            {getInitials(user.name)}
          </button>

          <form action={logout}>
            <button
              type="submit"
              title="Sair"
              aria-label="Sair do portal"
              className="hidden size-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-rose-600 sm:grid"
            >
              <LogOut className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <ProtectedNav variant="mobile" />
    </header>
  );
};
