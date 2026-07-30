"use client";

import Link from "next/link";
import Image from "next/image";
import {
  WhatsappLogo,
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Clock
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#24365C] px-5 lg:px-[80px] pt-10 pb-6 flex flex-col justify-between m-0 border-none mt-auto">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-start">
        
        {/* KOLOM 1: Branding & Deskripsi (Mentok Kiri) */}
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-4 mb-3">
            {/* Tambahan overflow-hidden dan text ukuran kecil agar kalau logo gagal load, teks alt-nya tidak meluber jelek */}
            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden text-[10px] text-gray-400 text-center">
              <Image
                src="/fisio_nobg.png"
                alt="Logo Hai Physio"
                width={60}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[#F5B301] text-[24px] font-semibold leading-tight">
                Hai Physio
              </h3>
              <p className="text-[#FFF4C6] text-[18px] font-normal">
                Efektif & Progresif
              </p>
            </div>
          </div>
          <p className="text-[#E5E5E5] text-[16px] leading-relaxed mt-1">
            Pilihan Terpercaya untuk Pemulihan yang Efektif dan Progresif
          </p>
        </div>

        {/* KOLOM 2: Menu Navigasi */}
        <div className="flex flex-col gap-4 mt-8 lg:mt-0">
          <h4 className="text-[#FFFFFF] text-[16px] font-semibold tracking-wide">
            MENU
          </h4>
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-[#D4D4D4] hover:text-[#F5B301] text-[16px] transition-colors">Beranda</Link>
            <Link href="/tentang-kami" className="text-[#D4D4D4] hover:text-[#F5B301] text-[16px] transition-colors">Tentang Kami</Link>
            <Link href="/layanan" className="text-[#D4D4D4] hover:text-[#F5B301] text-[16px] transition-colors">Layanan</Link>
            <Link href="/kontak" className="text-[#D4D4D4] hover:text-[#F5B301] text-[16px] transition-colors">Kontak Kami</Link>
          </div>
        </div>

        {/* KOLOM 3: Kontak Kami */}
        <div className="flex flex-col gap-4 mt-8 lg:mt-0">
          <h4 className="text-[#FFFFFF] text-[16px] font-semibold tracking-wide">
            KONTAK KAMI
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <WhatsappLogo size={24} weight="fill" color="#F5B301" className="shrink-0 mt-[2px]" />
              <div className="flex flex-col" style={{ fontFamily: 'Lato, sans-serif' }}>
                <span className="text-[#D4D4D4] text-[13px] leading-tight">Bambang Irawan</span>
                <span className="text-[#E5E5E5] text-[16px] leading-tight mt-1">+62 898 3050 149</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <EnvelopeSimple size={24} weight="fill" color="#F5B301" className="shrink-0 mt-[2px]" />
              <div className="flex flex-col" style={{ fontFamily: 'Lato, sans-serif' }}>
                <span className="text-[#D4D4D4] text-[13px] leading-tight">Hai Physio</span>
                <span className="text-[#E5E5E5] text-[16px] leading-tight mt-1">haiphysio@gmail.com</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InstagramLogo size={24} weight="fill" color="#F5B301" className="shrink-0 mt-[2px]" />
              <div className="flex flex-col" style={{ fontFamily: 'Lato, sans-serif' }}>
                <span className="text-[#D4D4D4] text-[13px] leading-tight">Instagram</span>
                <span className="text-[#E5E5E5] text-[16px] leading-tight mt-1">@fisioterapi_jakarta_timur</span>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM 4: Lokasi & Jam Operasional (Mentok Kanan) */}
        <div className="flex flex-col gap-4 w-full mt-8 lg:mt-0">
          <h4 className="text-[#FFFFFF] text-[16px] font-semibold tracking-wide uppercase">
            LOKASI & JAM OPERASIONAL KLINIK
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin size={24} weight="fill" color="#F5B301" className="shrink-0 mt-1" />
              <p className="text-[#E5E5E5] text-[16px] leading-relaxed">
                Klinik Pratama Condet Jaya, Jl. Condet Raya No. 18 Rt/Rw 003/04, RT.3/RW.4, Batu Ampar, Kec. Kramat Jati, Jakarta Timur 13520
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={24} weight="fill" color="#F5B301" className="shrink-0 mt-[2px]" />
              <div className="flex flex-col" style={{ fontFamily: 'Lato, sans-serif' }}>
                <span className="text-[#D4D4D4] text-[13px] leading-tight">Jam Operasional</span>
                <span className="text-[#E5E5E5] text-[16px] leading-tight mt-1">Senin - Sabtu, 08.00 - 16.00 WIB</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Bagian Bawah: Copyright */}
      <div className="w-full max-w-[1440px] mx-auto mt-10 pt-5 text-center text-[#FFFFFF] text-[14px] font-normal border-t border-[#FFFFFF]/10" style={{ fontFamily: 'Lato, sans-serif' }}>
        <p>© 2026 Hai Physio. All rights reserved.</p>
      </div>
    </footer>
  );
}