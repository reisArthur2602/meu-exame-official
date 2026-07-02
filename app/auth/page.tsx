import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { redirectAuth } from "@/lib/auth/redirect-auth";
import { ClinicIntroPanel } from "./feature/clinic-intro-panel";
import { ClinicLoginForm } from "./feature/clinic-login-form";

export const metadata: Metadata = {
  title: "Portal da Clínica",
  description: "Acesse o Portal da Clínica MeuLaudo com seu usuário e senha.",
  robots: { index: false, follow: false },
};

const AuthPage = async () => {
  await redirectAuth({ mode: "guest" });

  return (
    <main className="grid flex-1 lg:grid-cols-[1.05fr_0.95fr]">
      <ClinicIntroPanel />

      <section
        className="flex min-h-screen items-center px-4 py-8 sm:px-8 lg:px-14 xl:px-20"
        aria-labelledby="login-title"
      >
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2"
            >
              <Logo subtitle="Portal da Clínica" />
            </Link>

            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
            >
              Voltar
            </Link>
          </div>

          <ClinicLoginForm />
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
