import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Hai Physio | Klinik Fisioterapi Efektif & Progresif",
  description: "Klinik Fisioterapi Hai Physio terpercaya di Jakarta Timur. Melayani fisioterapi muskuloskeletal, neuro, dan olahraga untuk pemulihan yang efektif dan progresif.",
  icons: {
    icon: "/fisio_nobg.png", // Ini bakal ngubah ikon bola dunia bawaan Vercel jadi logo klinik
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
  }