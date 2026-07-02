import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { Toaster } from "sonner";
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
  title: {
    default: "MeuLaudo",
    template: "%s · MeuLaudo",
  },
  description:
    "Plataforma MeuLaudo — entrega digital de exames com segurança, agilidade e conformidade com a LGPD.",
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
