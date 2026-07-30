"use client";

import Image from "next/image";
import HeroBanner from "../../components/home/HeroBanner";
import { jenisPelayananData, manfaatData } from "@/constants/data";
import FokusLayanan from "@/components/home/FokusLayanan";
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

export default function Layanan() {
  return (
    <div className="w-full flex flex-col">

      {/* 1. HERO BANNER LAYANAN */}
      <HeroBanner title="Layanan" imageSrc="/hero-layanan.png" />

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
      <FokusLayanan className="bg-[#F8F9FA] pb-16 md:pb-24" />

      {/* 4. SECTION MANFAAT FISIOTERAPI */}
      <section className="w-full bg-white py-10 md:py-24">
        <div className="w-full max-w-[1000px] mx-auto px-5 flex flex-col gap-12">

          {/* Header Judul */}
          <div className="flex flex-col items-center text-center gap-1">
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