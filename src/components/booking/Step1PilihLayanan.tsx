"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { servicesData } from "../../constants/data"; 
import Stepper from "./Stepper";

interface Step1Props {
  onNext: (serviceId: string) => void;
}

export default function Step1PilihLayanan({ onNext }: Step1Props) {
  // State ini buat nyimpen ID kartu mana yang lagi diklik sama user
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Bagian Judul dan Deskripsi Paling Atas */}
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[36px] font-bold text-[#1b2a4e] mb-3">Booking Layanan Fisioterapi</h2>
        <p className="text-[#585858] text-[15px] md:text-[16px]">Silakan pilih jenis layanan yang sesuai dengan keluhan tubuh Anda untuk memulai janji temu.</p>
      </div>

      {/* Komponen Baris Langkah 1, 2, 3, 4 */}
      <Stepper currentStep={1} />

      {/* Bagian Pembungkus 3 Kartu Layanan (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        
        {/* Looping data dari servicesData buat bikin kartunya satu per satu */}
        {servicesData.map((service) => {
          // Ngecek apakah kartu ini yang lagi dipilih sama user
          const isSelected = selectedId === service.id.toString();

          return (
            // Desain Kotak Kartu Utama
            <div 
              key={service.id}
              onClick={() => setSelectedId(service.id.toString())}
              className={`flex flex-col rounded-[20px] p-8 cursor-pointer transition-all duration-300 border-2
                ${isSelected 
                  ? "border-[#F5B301] bg-[#FFFBEA] shadow-[0_8px_24px_rgba(245,179,1,0.2)]" 
                  : "border-gray-100 bg-white hover:border-[#F5B301]/50 hover:bg-[#FFFBEA] hover:shadow-[0_8px_24px_rgba(245,179,1,0.15)]"}
              `}
            >
              
              {/* Bagian Icon dan Judul Layanan di dalam Kartu */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[56px] h-[56px] rounded-xl border border-[#F5B301]/30 flex items-center justify-center shrink-0 bg-white">
                  {service.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#1b2a4e] text-[20px] font-bold leading-tight">{service.titleBold}</h3>
                  <span className="text-[#585858] text-[14px] mt-1">{service.subtitle}</span>
                </div>
              </div>
              
              {/* Paragraf Penjelasan Layanan */}
              <p className="text-[#585858] text-[14px] leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Garis Abu-abu Pembatas */}
              <div className="w-full h-[1px] bg-gray-100 mb-6"></div>

              {/* Bagian List Paling Cocok Untuk */}
              <span className="text-[#F5B301] font-bold text-[15px] mb-4">Paling Cocok Untuk:</span>
              <ul className="flex flex-col gap-3">
                {service.cases.map((caseItem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} weight="fill" color="#3B82F6" className="shrink-0 mt-0.5" />
                    <span className="text-[#585858] text-[14px] leading-relaxed">{caseItem}</span>
                  </li>
                ))}
              </ul>

            </div>
          );
        })}
      </div>

      {/* Bagian Tombol Lanjut di Bawah Kanan */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => selectedId && onNext(selectedId)}
          disabled={!selectedId} // Matiin tombol kalau belum ada kartu yang dipilih
          className={`w-full max-w-[300px] h-[56px] rounded-[12px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-300
            ${selectedId 
              ? "bg-[#F5B301] hover:bg-[#dda101] text-white cursor-pointer shadow-[0_4px_12px_rgba(245,179,1,0.3)]" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"}
          `}
        >
          Lanjut 
          <span>→</span>
        </button>
      </div>

    </div>
  );
}