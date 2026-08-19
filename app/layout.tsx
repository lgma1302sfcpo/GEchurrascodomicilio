import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G&E | Churrasco a Domicílio",
  description: "Churrasco a domicílio para festas, eventos e bons momentos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
