import type { Metadata } from "next";

import { BenefitsSection } from "./feature/benefits-section";
import { CtaSection } from "./feature/cta-section";
import { HeroSection } from "./feature/hero-section";
import { SiteFooter } from "./feature/site-footer";
import { SiteHeader } from "./feature/site-header";

export const metadata: Metadata = {
  title: "Entrega digital de exames",
  description:
    "O MeuLaudo conecta clínicas, laboratórios e pacientes em uma entrega digital simples, segura e sem papel.",
};

const HomePage = () => {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
};

export default HomePage;
