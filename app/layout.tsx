import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';

import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AuthProvider from "./auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

//Meta tags estándar (para SEO y redes sociales)
export const metadata: Metadata = {
  title: "Tarjet - Tu tarjeta de presentación virtual",
  description: "Tu tarjeta de presentación digital con NFC",
  openGraph: {
    title: "Mi Tarjeta",
    description: "Agrega esta tarjeta a tu Wallet",
    url: "https://tarjet.site",
    siteName: "Tarjet",
    images: [
      {
        url: "/images/login-ilustracion.png", // Reemplaza con una imagen para redes sociales
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="es">
        <head>
          {/* 👇 Meta tags específicos para Apple Wallet */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
        <body className={inter.className}>
          <Header />
            {children}
          <Footer />
          <GoogleTagManager gtmId="GTM-KPRXGMP9" />
        </body>
      </html>
    </AuthProvider>
  );
}