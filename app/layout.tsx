import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
