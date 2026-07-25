"use client";

import Image from "next/image";
import { Clock, Star, InstagramLogo } from "@phosphor-icons/react";
import HeroBanner from "../../components/HeroBanner";
import { reasonsData } from "../../constants/data";

export default function TentangKami() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER */}
      <HeroBanner title="Tentang Kami" imageSrc="/hero-tentang-kami.png" />

      {/* 2. SECTION TENTANG HAI PHYSIO */}
      <section className="w-full bg-white max-w-[1440px] mx-auto px-5 md:px-[80px] py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        
        {/* KOLOM KIRI: Gambar Utama & Floating Cards (Reuse dari Beranda) */}
        <div className="relative w-full max-w-[480px] mx-auto lg:mx-0">
          
          {/* Gambar Utama */}
          <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg">
            <Image
              src="/ruangan-klinik.png"
              alt="Fasilitas Klinik Hai Physio"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>

          {/* Floating Card 1: Jam Operasional */}
          <div className="absolute -top-6 -left-4 md:-left-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-8 flex items-start gap-3 z-10">
            <Clock size={24} color="#F5B301" weight="fill" className="mt-1" />
            <div className="flex flex-col">
              <span className="text-[#1b2a4e] font-bold text-[14px]">Jam operasional</span>
              <span className="text-[#585858] text-[12px] leading-tight mt-1">
                Senin-Sabtu, 08.00-16.00 WIB<br/>(Minggu tutup)
              </span>
            </div>
          </div>

          {/* Floating Card 2: Motto Klinik */}
          <div className="absolute bottom-16 -right-4 md:-right-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-6 flex items-start gap-3 z-10">
            <Star size={24} color="#F5B301" weight="fill" className="mt-1" />
            <div className="flex flex-col">
              <span className="text-[#1b2a4e] font-bold text-[14px]">Motto Klinik</span>
              <span className="text-[#585858] text-[12px] leading-tight mt-1">
                Efektif &<br/>Progresif
              </span>
            </div>
          </div>

          {/* Floating Card 3: Instagram */}
          <div className="absolute -bottom-6 -left-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-8 flex items-center gap-3 z-10">
            <InstagramLogo size={24} color="#F5B301" weight="fill" />
            <div className="flex flex-col">
              <span className="text-[#1b2a4e] font-bold text-[14px]">Instagram</span>
              <span className="text-[#585858] text-[12px]">@fisioterapi_jakarta_timur</span>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: Teks Deskripsi */}
        <div className="flex flex-col flex-1 max-w-[640px] gap-6">
          
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Tentang Hai Physio
            </h2>
            <div className="w-[80px] h-[3px] bg-[#1b2a4e]"></div>
          </div>

          <div className="flex flex-col gap-5 text-[15px] md:text-[16px] text-[#334155] leading-relaxed">
            <p>
              Fisioterapi adalah layanan kesehatan untuk memulihkan dan menjaga fungsi gerak tubuh. Hai Physio berada di bawah Klinik Pratama Condet Jaya, klinik yang sudah berdiri sejak 1985, dan fokus menangani tiga jenis kasus: <span className="font-bold text-[#1b2a4e]">neuro, olahraga, dan muskuloskeletal.</span>
            </p>
            <p>
              Motto kami <span className="font-bold text-[#1b2a4e]">"Efektif dan Progresif"</span> kami jalankan lewat pencatatan. Tiap sesi terapi ada datanya, sehingga progres pasien bisa dipantau dari waktu ke waktu.
            </p>
          </div>
          
          {/* Tidak ada tombol "Selengkapnya" di halaman ini sesuai desain */}

        </div>
      </section>
      {/* 3. SECTION KENAPA PILIH KAMI? */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex flex-col gap-12">
          
          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Kenapa Pilih Kami?
            </h2>
            <p className="text-[#585858] text-[15px] md:text-[16px] max-w-[600px]">
              Beberapa hal yang kami perhatikan dalam menangani setiap pasien.
            </p>
          </div>

          {/* Grid 3 Kartu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasonsData.map((reason) => (
              <div 
                key={reason.id} 
                className="flex flex-col items-center text-center bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-6"
              >
                {/* Kontainer Ilustrasi */}
                <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px]">
                  <Image
                    src={reason.imgSrc}
                    alt={reason.title}
                    fill
                    sizes="(max-width: 768px) 160px, 180px"
                    // Menggunakan object-contain agar ilustrasi tidak terpotong (crop)
                    className="object-contain" 
                  />
                </div>
                
                {/* Teks Konten */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[#1b2a4e] text-[20px] font-bold leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-[#585858] text-[14px] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}