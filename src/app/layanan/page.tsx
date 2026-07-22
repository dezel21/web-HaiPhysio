"use client";

import Image from "next/image";
import { 
  Lightbulb, 
  ShieldCheck, 
  Stethoscope, 
  Person,
  Bandaids,
  Brain,
  Barbell,
  PersonSimpleRun,
  Bed,
  Heartbeat,
  HandHeart
} from "@phosphor-icons/react";

// 1. Data Jenis Pelayanan (Rapi dan mudah di-maintain)
const jenisPelayananData = [
  {
    id: "promotif",
    title: "Promotif",
    desc: "Menjaga fungsi gerak tubuh Anda supaya tetap optimal, sebelum ada keluhan.",
    icon: <Lightbulb size={56} color="#1b2a4e" weight="fill" />
  },
  {
    id: "preventif",
    title: "Preventif",
    desc: "Mengenali risiko sejak dini, sebelum berkembang jadi gangguan yang lebih serius.",
    icon: <ShieldCheck size={56} color="#1b2a4e" weight="fill" />
  },
  {
    id: "kuratif",
    title: "Kuratif",
    desc: "Menangani keluhan yang sedang Anda alami saat ini.",
    icon: <Stethoscope size={48} color="#1b2a4e" weight="regular" />
  },
  {
    id: "rehabilitatif",
    title: "Rehabilitatif",
    desc: "Memulihkan fungsi tubuh secara bertahap setelah cedera, operasi, atau sakit.",
    icon: <Person size={48} color="#1b2a4e" weight="regular" />
  }
];

// 2. Data Fokus Layanan (Reuse dari Beranda, dengan Contoh Kasus yang sudah dikoreksi)
const servicesData = [
  {
    id: "muskuloskeletal",
    title: "Fisioterapi",
    titleBold: "Muskuloskeletal",
    subtitle: "Otot, Tulang & Sendi",
    desc: "Pemulihan untuk masalah nyeri otot, sendi kaku, pasca patah tulang, atau perbaikan postur tubuh agar Anda bisa kembali bergerak bebas tanpa hambatan.",
    cases: ["Nyeri Pinggang Bawah", "Nyeri Sendi/Lutut", "Skoliosis"], 
    imgSrc: "/service-Muskulo.png",
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

// 3. Data Manfaat Fisioterapi
const manfaatData = [
  { text: "Meningkatkan Mobilitas Gerak", icon: <PersonSimpleRun size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Pemulihan Pasca Operasi", icon: <Bed size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Pemulihan Pasca Stroke", icon: <Brain size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Rehabilitasi Jantung & Paru", icon: <Heartbeat size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Mengurangi Nyeri", icon: <HandHeart size={28} color="#1b2a4e" weight="fill" /> }
];

export default function Layanan() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER LAYANAN */}
      <section className="relative w-full h-[240px] md:h-[320px] flex items-center justify-center">
        <Image
          // Pastikan kamu mengekspor gambar dari Figma dan menyimpannya di public/
          src="/hero-layanan.png" 
          alt="Banner Layanan Hai Physio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay gelap tipis */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <h1 className="relative z-10 text-[32px] md:text-[44px] font-bold text-white tracking-wide drop-shadow-md">
          Layanan
        </h1>
      </section>

      {/* 2. SECTION JENIS PELAYANAN */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-24 px-5 md:px-[80px]">
        
        {/* Kotak Putih Pembungkus Utama */}
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-[32px] p-8 md:p-16 flex flex-col gap-12 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          
          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Jenis Pelayanan
            </h2>
            <p className="text-[#585858] text-[15px] md:text-[16px]">
              Empat pendekatan yang kami pakai dalam menangani pasien.
            </p>
          </div>

          {/* Grid 2x2 Kontainer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[900px] mx-auto w-full">
            {jenisPelayananData.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col items-center text-center p-8 md:p-10 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-md transition-shadow gap-5"
              >
                {/* Render Phosphor Icon */}
                <div className="flex items-center justify-center h-[64px]">
                   {item.icon}
                </div>
                
                {/* Teks Judul & Deskripsi */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#F5B301] text-[20px] font-bold">
                    {item.title}
                  </h3>
                  <p className="text-[#585858] text-[14px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      {/* 3. SECTION FOKUS LAYANAN KAMI */}
      <section className="w-full bg-[#F8F9FA] pb-16 md:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex flex-col gap-12">
          
          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Fokus Layanan Kami
            </h2>
            <p className="text-[#585858] text-[16px] max-w-[600px]">
              Tiga bidang yang kami tangani
            </p>
          </div>

          {/* Grid Cards (Reuse 100% dari Beranda) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <div key={service.id} className="flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 gap-6">
                <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden">
                  <Image
                    src={service.imgSrc} 
                    alt={service.titleBold}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
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
                <p className="text-[#585858] text-[14px] leading-relaxed">
                  {service.desc}
                </p>
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

        </div>
      </section>

      {/* 4. SECTION MANFAAT FISIOTERAPI */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="w-full max-w-[1000px] mx-auto px-5 flex flex-col gap-12">
          
          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
              Manfaat Fisioterapi
            </h2>
            <p className="text-[#585858] text-[16px]">
              Beberapa manfaat yang bisa dirasakan lewat terapi rutin.
            </p>
          </div>

          {/* Kontainer Flexbox untuk Kapsul */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {manfaatData.map((manfaat, index) => (
              <div 
                key={index}
                className="flex items-center justify-center gap-3 bg-white border border-gray-100 shadow-[0_4px_15px_rgb(0,0,0,0.06)] rounded-full px-6 py-4 md:px-8 md:py-5 hover:shadow-md transition-shadow"
              >
                <div className="shrink-0">
                  {manfaat.icon}
                </div>
                <span className="text-[#1b2a4e] font-bold text-[14px] md:text-[16px]">
                  {manfaat.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}