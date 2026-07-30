import Link from "next/link";
import { Clock, WhatsappLogo, EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react";
import { ReactNode } from "react";

// Mendefinisikan Props untuk kustomisasi teks dan elemen tambahan (children)
interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode; 
}

export default function ContactSection({ 
  title = "Hubungi Kami", 
  subtitle = "Punya pertanyaan atau ingin berkonsultasi? Silakan hubungi kami.",
  children 
}: ContactSectionProps) {
  return (
    <section className="w-full bg-[#F8F9FA] py-16 md:py-24">
     <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[80px] flex flex-col gap-10">
        
        {/* Header Judul Dinamis */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
            {title}
          </h2>
          <p className="text-[#585858] text-[16px] max-w-[600px]">
            {subtitle}
          </p>
        </div>

        {/* Grid Cards (Fix 3 Kolom) */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Card WhatsApp */}
          <Link href="https://wa.me/628983050149" target="_blank" className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <WhatsappLogo size={32} weight="fill" color="#1b2a4e" />
              <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold">+62 898-3050-149</span>
            </div>
            <p className="text-[#585858] text-[14px]">Chat langsung, respon cepat di jam operasional</p>
          </Link>

          {/* Card Email */}
          <Link href="mailto:haiphysio@gmail.com" className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 w-full justify-center">
              <EnvelopeSimple size={32} weight="fill" color="#1b2a4e" className="shrink-0" />
              <span className="text-[#1b2a4e] text-[20px] md:text-[22px] lg:text-[22px] font-bold">haiphysio@gmail.com</span>
            </div>
            <p className="text-[#585858] text-[14px]">Untuk pertanyaan yang butuh jawaban lebih detail</p>
          </Link>

          {/* Card Instagram */}
          <Link href="https://instagram.com/fisioterapi_jakarta_timur" target="_blank" className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <InstagramLogo size={32} weight="fill" color="#1b2a4e" />
              <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold">@fisioterapi_jakarta_timur</span>
            </div>
            <p className="text-[#585858] text-[14px]">Lihat kegiatan dan info terbaru dari klinik</p>
          </Link>

          {/* Card Jam Operasional */}
          <div className="md:col-span-2 xl:col-span-3 flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <Clock size={36} weight="fill" color="#1b2a4e" />
              <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold text-left leading-tight">
                Senin - Sabtu,<br/>08.00 - 16.00 WIB
              </span>
            </div>
            <p className="text-[#585858] text-[14px]">Hari minggu klinik tutup</p>
          </div>

        </div>

        {children}

      </div>
    </section>
  );
}