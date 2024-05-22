import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';

import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AuthProvider from "./auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarjet - Tu tarjeta de presentación virtual",
  description: "Tu tarjeta de presentación digital con NFC",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="es">
        <body className={inter.className}>
          <Header />
            {children}
          <Footer />
          <GoogleTagManager gtmId="GTM-KPRXGMP9"/>
        </body>
      </html>
    </AuthProvider>
  );
}
