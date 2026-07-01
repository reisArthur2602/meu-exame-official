"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#seguranca", label: "Segurança" },
];

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Ir para o início"
          className="group inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
        >
          <Logo
            subtitle="Exames digitais, cuidado presente"
            subtitleClassName="hidden sm:block"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            Portal da Clínica
          </Link>

          <Link
            href="/patient"
            className="inline-flex items-center justify-center rounded-xl bg-sky-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            Área do Paciente
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-sky-700 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2 md:hidden"
        >
          {isMenuOpen ? (
            <X className="size-5" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu className="size-5" strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-2"
            aria-label="Navegação móvel"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 grid gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm"
              >
                Portal da Clínica
              </Link>
              <Link
                href="/patient"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-sky-900 px-4 py-3 text-sm font-bold text-white shadow-sm"
              >
                Área do Paciente
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
