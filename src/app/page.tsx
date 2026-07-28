"use client";

import Image from "next/image";
import Link from "next/link";
import FokusLayanan from "@/components/home/FokusLayanan";
import LocationMap from "@/components/home/LocationMap";
import ContactSection from "@/components/home/ContactSection";
import {
  Star,
  Clock,
  InstagramLogo,
  ArrowRight,
  EnvelopeSimple
} from "@phosphor-icons/react";

export default function Beranda() {
  const isLoggedIn = false;

  return (
    <div className="w-full flex flex-col min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="w-full bg-white max-w-[1440px] mx-auto px-5 md:px-[30px] pt-4 md:pt-6">
        <div className="relative w-full h-[500px] md:h-[737px] rounded-[20px] overflow-hidden flex items-center shadow-sm opacity-[0.92]">
          <Image
            src="/hero-bg.png"
            alt="Layanan Fisioterapi Hai Physio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay gradient transparan */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-3/4 lg:w-2/3"></div>

          {/* Kontainer Teks */}
          <div className="relative z-10 flex flex-col max-w-[650px] gap-5 px-8 md:px-12 lg:px-16">
            <h1 className="text-[32px] md:text-[44px] lg:text-[48px] font-bold text-[#1b2a4e] leading-[1.2] tracking-tight">
              Fisioterapi yang Efektif dan Progresif
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#334155] leading-relaxed pr-4 md:pr-0">
              Nyeri pinggang, cedera olahraga, atau kaku sendi bisa ditangani dengan tepat. Setiap sesi terapi di Hai Physio dicatat dan dievaluasi, jadi Anda tahu pasti progresnya.
            </p>
            <Link
              href={isLoggedIn ? "/booking" : "/login"}
              className="inline-flex items-center justify-center w-fit px-8 h-[48px] mt-2 bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[16px] rounded-[8px] transition-colors"
            >
              Buat Janji Temu
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION TENTANG KAMI ("Kenapa Pilih Hai Physio?") */}
      <section className="w-full bg-white max-w-[1440px] mx-auto px-5 md:px-[80px] py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">

        {/* KOLOM KIRI: Gambar Utama & Floating Cards */}
        <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 mt-8 lg:mt-0">
          <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg">
            {/* Gambar Utama (Ruangan Klinik) */}
            <Image
              src="/ruangan-klinik.png"
              alt="Fasilitas Klinik Hai Physio"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>

          {/* Floating Card 1: Jam Operasional (Kiri Atas) */}
          <div className="absolute -top-6 -left-4 md:-left-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-8 flex items-start gap-3 z-10">
            <Clock size={24} color="#F5B301" weight="fill" className="mt-1" />
            <div className="flex flex-col">
              <span className="text-[#1b2a4e] font-bold text-[14px]">Jam operasional</span>
              <span className="text-[#585858] text-[12px] leading-tight mt-1">
                Senin-Sabtu, 08.00-16.00 WIB<br />(Minggu tutup)
              </span>
            </div>
          </div>

          {/* Floating Card 2: Motto Klinik (Kanan bawah) */}
          <div className="absolute bottom-16 -right-4 md:-right-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-6 flex items-start gap-3 z-10">
            <Star size={24} color="#F5B301" weight="fill" className="mt-1" />
            <div className="flex flex-col">
              <span className="text-[#1b2a4e] font-bold text-[14px]">Motto Klinik</span>
              <span className="text-[#585858] text-[12px] leading-tight mt-1">
                Efektif &<br />Progresif
              </span>
            </div>
          </div>

          {/* Floating Card 3: Akun Instagram (kiri bawah) */}
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
              Kenapa Pilih Hai Physio?
            </h2>
            {/* Garis aksen biru di bawah judul */}
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
          <Link
            href="/tentang-kami"
            className="inline-flex items-center justify-center gap-2 w-fit px-8 h-[48px] mt-2 bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[16px] rounded-[8px] transition-colors shadow-sm"
          >
            Selengkapnya
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>
      </section>

      {/* 3. SECTION LAYANAN KAMI */}
      <FokusLayanan />

      {/* 4. SECTION HUBUNGI KAMI */}
      <ContactSection title="Hubungi Kami" subtitle="Jangan ragu untuk menghubungi kami jika ada pertanyaan lebih lanjut."/>


      {/* 5. SECTION LOKASI KLINIK */}
      <LocationMap />
    </div>
  );
}