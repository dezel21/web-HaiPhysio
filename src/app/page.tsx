"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Star,
  InstagramLogo,
  ArrowRight,
  Bandaids,
  Brain,
  Barbell,
  WhatsappLogo,
  EnvelopeSimple
} from "@phosphor-icons/react";

// Data Layanan 
const servicesData = [
  {
    id: "muskuloskeletal",
    title: "Fisioterapi",
    titleBold: "Muskuloskeletal",
    subtitle: "Otot, Tulang & Sendi",
    desc: "Pemulihan untuk masalah nyeri otot, sendi kaku, pasca patah tulang, atau perbaikan postur tubuh agar Anda bisa kembali bergerak bebas tanpa hambatan.",
    // Data kasus sudah dikoreksi sesuai logika medis/PRD
    cases: ["Nyeri Pinggang Bawah", "Nyeri Sendi/Lutut", "Skoliosis"],
    imgSrc: "/service-muskulo.png",
    icon: <Bandaids size={28} color="#F5B301" weight="regular" />
  },
  {
    id: "neuro",
    title: "Fisioterapi",
    titleBold: "Neuro",
    subtitle: "Saraf & Gerak Otot",
    desc: "Terapi khusus untuk memulihkan gangguan gerak akibat masalah saraf, membantu menguatkan kembali otot yang melemah, serta melatih keseimbangan tubuh.",
    cases: ["Pasca-Stroke", "HNP (Saraf Kejepit)", "Carpal Tunnel Syndrome"],
    imgSrc: "/service-Neuro.png",
    icon: <Brain size={28} color="#F5B301" weight="regular" />
  },
  {
    id: "olahraga",
    title: "Fisioterapi",
    titleBold: "Olahraga",
    subtitle: "Cedera & Aktivitas Fisik",
    desc: "Dirancang khusus untuk memulihkan cedera akibat olahraga atau aktivitas berat, sekaligus mengembalikan performa fisik terbaik Anda tanpa takut cedera lagi.",
    cases: ["Cedera ACL/MCL", "Keseleo (Sprain/Strain)", "Kram Otot Kronis"],
    imgSrc: "/service-Olahraga.png",
    icon: <Barbell size={28} color="#F5B301" weight="regular" />
  }
];

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
      {/* Menggunakan background abu-abu sangat muda agar berbeda dari section sebelumnya */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex flex-col gap-12">

          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Layanan Kami
            </h2>
            <p className="text-[#585858] text-[16px] max-w-[600px]">
              Neuro, olahraga atau muskuloskeletal, tiap kondisi kami tangani dengan pendekatan yang sesuai
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <div key={service.id} className="flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 gap-6">

                {/* Gambar Layanan */}
                <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden">
                  <Image
                    src={service.imgSrc}
                    alt={service.titleBold}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Judul & Ikon */}
                <div className="flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-[12px] border border-[#F5B301]/30 flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#1b2a4e] text-[20px] font-medium leading-tight">
                      {service.title} <span className="font-bold">{service.titleBold}</span>
                    </h3>
                    <span className="text-[#585858] text-[13px] mt-1">{service.subtitle}</span>
                  </div>
                </div>

                {/* Deskripsi */}
                <p className="text-[#585858] text-[14px] leading-relaxed">
                  {service.desc}
                </p>

                {/* Chips Contoh Kasus */}
                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
                  <span className="text-[#1b2a4e] font-bold text-[14px]">Contoh Kasus:</span>
                  <div className="flex flex-wrap gap-2">
                    {service.cases.map((caseItem, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white border border-[#1b2a4e]/20 rounded-md text-[#1b2a4e] text-[13px] font-medium"
                      >
                        {caseItem}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Tombol CTA Bawah */}
          <Link
            href="/layanan"
            className="w-full h-[56px] flex items-center justify-center gap-2 bg-[#F5B301] hover:bg-[#dda101] text-white font-semibold text-[16px] rounded-[12px] transition-colors mt-4"
          >
            Lihat Semua Layanan
            <ArrowRight size={20} weight="bold" />
          </Link>

        </div>
      </section>

      {/* 4. SECTION HUBUNGI KAMI */}
      <section className="w-full bg-[#F8F9FA] pb-16 md:pb-24 pt-12">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex flex-col gap-10">

          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Hubungi Kami
            </h2>
            <p className="text-[#585858] text-[16px] max-w-800px]">
              Masih ragu ingin booking yang mana? Chat dulu lewat WhatsApp, respon cepat di jam operasional.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card WhatsApp */}
            <Link
              href="https://wa.me/628983050149"
              target="_blank"
              className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3"> {/* biru gelap #1b2a4e atau biru terang #4C67A0 */}
                <WhatsappLogo size={32} weight="fill" color="#4C67A0" />
                <span className="text-[#4C67A0] text-[20px] md:text-[22px] font-bold">+62 898-3050-149</span>
              </div>
              <p className="text-[#585858] text-[14px]">Chat langsung, respon cepat di jam operasional</p>
            </Link>

            {/* Card Email */}
            <Link
              href="mailto:haiphysio@gmail.com"
              className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <EnvelopeSimple size={32} weight="fill" color="#1b2a4e" />
                <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold">haiphysio@gmail.com</span>
              </div>
              <p className="text-[#585858] text-[14px]">Untuk pertanyaan yang butuh jawaban lebih detail</p>
            </Link>

            {/* Card Instagram */}
            <Link
              href="https://instagram.com/fisioterapi_jakarta_timur"
              target="_blank"
              className="flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <InstagramLogo size={32} weight="fill" color="#1b2a4e" />
                <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold">@fisioterapi_jakarta_timur</span>
              </div>
              <p className="text-[#585858] text-[14px]">Lihat kegiatan dan info terbaru dari klinik</p>
            </Link>

            {/* Card Jam Operasional (Span 3 Kolom) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 gap-4">
              <div className="flex items-center gap-4">
                <Clock size={36} weight="fill" color="#1b2a4e" />
                <span className="text-[#1b2a4e] text-[20px] md:text-[22px] font-bold text-left leading-tight">
                  Senin - Sabtu,<br />08.00 - 16.00 WIB
                </span>
              </div>
              <p className="text-[#585858] text-[14px]">Hari minggu klinik tutup</p>
            </div>

          </div>

          {/* Tombol CTA Hubungi Kami */}
          <Link
            href="/kontak"
            className="w-full h-[56px] flex items-center justify-center gap-2 bg-[#F5B301] hover:bg-[#dda101] text-white font-semibold text-[16px] rounded-[12px] transition-colors"
          >
            Hubungi Kami
            <ArrowRight size={20} weight="bold" />
          </Link>

        </div>
      </section>
      {/* 5. SECTION LOKASI KLINIK */}
      <section className="w-full bg-[#F8F9FA] pb-16 md:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px]">

          {/* Kontainer Kuning Besar */}
          <div className="w-full bg-[#F5B301] rounded-[24px] md:rounded-[32px] p-6 md:p-12 flex flex-col items-center gap-8 shadow-md">

            {/* Teks Judul dan Alamat */}
            <div className="flex flex-col items-center text-center gap-3 w-full max-w-[800px]">
              <h2 className="text-[28px] md:text-[36px] font-bold text-white">
                Lokasi Klinik Kami
              </h2>
              <p className="text-white/90 text-[14px] md:text-[16px] leading-relaxed">
                Klinik Pratama Condet Jaya, Jalan Raya Condet No. 18, Batu Ampar, Kramat Jati, Jakarta Timur.
              </p>
            </div>

            {/* Kontainer Peta Interaktif */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-inner bg-gray-200">

              {/* 1. Google Maps Iframe Asli (Gratis) */}
              <iframe
                src="https://maps.google.com/maps?q=Klinik%20Fisioterapi%20Hai%20Physio&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full z-0"
              ></iframe>

              {/* 2. Floating Card UI (Sesuai Figma) */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 bg-white p-4 md:p-5 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.15)] flex items-center justify-between gap-6 max-w-[340px] md:max-w-[400px]">

                {/* Teks Alamat di dalam Card */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-[#1b2a4e] text-[15px]">Klinik Fisioterapi Hai Physio</span>
                  <span className="text-[#585858] text-[12px] leading-relaxed">
                    Jl. Raya Condet No. 18, Batu Ampar, Kec. Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13520
                  </span>
                  <span className="text-[#F5B301] text-[12px] font-bold flex items-center gap-1 mt-1">
                    4.9
                    <span className="tracking-widest">★★★★★</span>
                    <span className="text-gray-400 font-normal">(187)</span>
                  </span>
                </div>

                {/* Tombol Rute Pintas ke Google Maps App */}
                <Link
                  // Link ajaib ini akan otomatis membuka aplikasi Google Maps di HP atau web di Laptop untuk meminta rute
                  href="https://www.google.com/maps/dir/?api=1&destination=Klinik+Fisioterapi+Hai+Physio"
                  target="_blank"
                  className="flex flex-col items-center justify-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0 px-2"
                >
                  {/* Ikon Arrow/Rute Manual (SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M234.33,126.11l-96-96a8,8,0,0,0-11.31,0l-96,96a8,8,0,0,0,11.31,11.31L128,51.31l85.66,85.66a8,8,0,0,0,11.31-11.31ZM184,152a8,8,0,0,0-8,8v24H128a40,40,0,0,0-40,40v16a8,8,0,0,0,16,0v-16a24,24,0,0,1,24-24h48V224a8,8,0,0,0,13.66,5.66l32-32a8,8,0,0,0,0-11.32l-32-32A8,8,0,0,0,184,152Z"></path>
                  </svg>
                  <span className="text-[13px] font-bold">Rute</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}