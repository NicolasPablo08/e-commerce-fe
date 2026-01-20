import "./globals.css";
import type { Metadata } from "next";

// 1. SEO: Usamos el objeto Metadata (la forma oficial de Next.js)
// Esto reemplaza la etiqueta <title> manual y es lo que Google lee.
export const metadata: Metadata = {
  title: {
    default: "Mi e-commerce",
    template: "%s | Mi e-commerce", // Esto permite que otras páginas cambien el título automáticamente
  },
  description: "Encuentra los mejores productos en nuestra tienda online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
