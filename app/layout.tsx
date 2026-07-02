import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { Toaster } from "sonner";

import { env } from "@/lib/env";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: {
    default: "MeuLaudo",
    template: "%s · MeuLaudo",
  },
  description:
    "Plataforma MeuLaudo — entrega digital de exames com segurança, agilidade e conformidade com a LGPD.",
  keywords: [
    "exames online",
    "laudo médico digital",
    "entrega de exames",
    "resultado de exame",
    "clínica",
    "LGPD",
  ],
  authors: [{ name: "MeuLaudo" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "MeuLaudo",
    title: "MeuLaudo",
    description:
      "Plataforma MeuLaudo — entrega digital de exames com segurança, agilidade e conformidade com a LGPD.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "MeuLaudo",
    description:
      "Plataforma MeuLaudo — entrega digital de exames com segurança, agilidade e conformidade com a LGPD.",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
