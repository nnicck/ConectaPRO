import "bootstrap/dist/css/bootstrap.min.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "ConectaPRO",
  description: "ConectaPro é um site de contratação de profissionais autônomos que conecta clientes a prestadores de serviços de forma rápida, prática e segura. A plataforma permite buscar profissionais, visualizar perfis, contratar serviços, agendar atendimentos e acompanhar solicitações em um só lugar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
