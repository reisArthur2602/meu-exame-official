import Link from "next/link";

import { Logo } from "@/components/ui/logo";

const footerLinks = [
  { href: "/patient", label: "Área do Paciente" },
  { href: "/auth", label: "Portal da Clínica" },
  { href: "/design-system", label: "Design System" },
];

export const SiteFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
          >
            <Logo size="sm" showWordmark={false} />
            <span className="font-extrabold text-sky-900">MeuLaudo</span>
          </Link>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            Plataforma de entrega digital de exames para clínicas, laboratórios
            e pacientes.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-sky-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 MeuLaudo. Todos os direitos reservados.</p>
          <p>Privacidade e segurança em conformidade com a LGPD.</p>
        </div>
      </div>
    </footer>
  );
};
