"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logout } from "../actions/logout";

const navLinks = [
  { href: "/exams", label: "Exames enviados" },
  { href: "/exams/new", label: "Novo exame" },
];

type ProtectedNavProps = {
  variant: "desktop" | "mobile";
};

export const ProtectedNav = ({ variant }: ProtectedNavProps) => {
  const pathname = usePathname();

  if (variant === "desktop") {
    return (
      <nav
        className="hidden items-center gap-2 md:flex"
        aria-label="Navegação do portal"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-bold text-sky-900"
                  : "rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-sky-900"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      className="border-t border-slate-200 px-4 py-2 md:hidden"
      aria-label="Navegação móvel"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "shrink-0 rounded-xl bg-sky-50 px-3 py-2.5 text-sm font-bold text-sky-900"
                  : "shrink-0 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600"
              }
            >
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => logout()}
          className="ml-auto shrink-0 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};
