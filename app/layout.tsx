import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarcaLibro",
  description: "Tu biblioteca personal y tu punto de lectura, siempre contigo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
