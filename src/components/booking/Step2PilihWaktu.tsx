"use client";

import { useState } from "react";
import Stepper from "./Stepper";
import { mockTherapists } from "@/constants/data";
import GridKalender from "../shared/GridKalender";

interface Step2Props {
  onBack: () => void;
  onNext: (scheduleData: any) => void;
  selectedServiceId: string;
}

export default function Step2PilihWaktu({ onBack, onNext, selectedServiceId }: Step2Props) {
  const [selectedTherapists, setSelectedTherapists] = useState<string[]>(
    mockTherapists.map(t => t.id)
  );

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // --- FUNGSI TOGGLE FILTER ---
  const handleTherapistToggle = (therapistId: string) => {
    setSelectedTherapists((prev) => 
      prev.includes(therapistId) 
        ? prev.filter((id) => id !== therapistId) 
        : [...prev, therapistId]
    );
    setSelectedSlot(null); 
  };

  // Data UI Kalender mini 
  const calendarDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const calendarDates = [
    28, 29, 30, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 1, 2
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[36px] font-bold text-[#1b2a4e] mb-3">Tentukan Waktu & Terapis</h2>
        <p className="text-[#585858] text-[15px] md:text-[16px]">Pilih jadwal kunjungan yang paling nyaman bagi Anda. Anda juga bisa memilih terapis favorit Anda.</p>
      </div>

      <Stepper currentStep={2} />

      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* --- UI KALENDER MINI --- */}
        <div className="w-full md:w-[320px] bg-white border border-gray-200 rounded-[16px] p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <button className="text-gray-400 hover:text-[#1b2a4e] font-bold">&lt;</button>
            <h4 className="font-bold text-[#1b2a4e] text-[16px]">July 2026</h4>
            <button className="text-gray-400 hover:text-[#1b2a4e] font-bold">&gt;</button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {calendarDays.map((day, i) => (
              <span key={i} className="text-[12px] font-medium text-gray-500">{day}</span>
            ))}
            {calendarDates.map((date, i) => {
              const isActiveWeek = date >= 7 && date <= 13 && i >= 7 && i <= 20; 
              const isFaded = i < 3 || i > 33; 

              return (
                <div key={i} className="flex justify-center items-center">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px]
                    ${isActiveWeek ? "bg-[#FFFBEA] text-[#F5B301] font-bold" : isFaded ? "text-gray-300" : "text-[#1b2a4e]"}
                  `}>
                    {date}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* --- FILTER TERAPIS --- */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6">
            <h4 className="font-bold text-[#1b2a4e] text-[16px] mb-1">Pilih Fisioterapis</h4>
            <p className="text-[#585858] text-[13px] mb-4">Terapis yang ditampilkan hanya yang memegang layanan pilihan Anda</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {mockTherapists.map(therapist => {
                const isChecked = selectedTherapists.includes(therapist.id);
                
                return (
                  <div 
                    key={therapist.id} 
                    onClick={() => handleTherapistToggle(therapist.id)}
                    className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors
                      ${isChecked ? "border-[#F5B301] bg-[#FFFBEA]" : "border-gray-100 hover:bg-gray-50"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[72px] h-[72px] rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-50 shadow-sm">
                        <img 
                          src={therapist.photo} 
                          alt={therapist.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + therapist.name + "&background=F5B301&color=fff" }} 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#1b2a4e]">{therapist.name}</span>
                        <span className="text-[12px] text-gray-500">{therapist.sp}</span>
                        <span className="text-[11px] text-[#F5B301] mt-0.5">⭐ {therapist.rating} ({therapist.patients} Pasien)</span>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-[#F5B301] pointer-events-none" 
                      checked={isChecked}
                      readOnly
                    />
                  </div>
                )
              })}

            </div>
          </div>

          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-[#3B82F6]">🩺</div>
              <span className="text-[14px] font-medium text-[#1b2a4e]">Layanan Terpilih: Fisioterapi Olahraga</span>
            </div>
            <button onClick={onBack} className="text-[#F5B301] text-[14px] font-bold px-4 py-1.5 border border-[#F5B301] rounded-lg bg-white hover:bg-[#FFFBEA]">
              Ubah
            </button>
          </div>
        </div>
      </div>

      {/* --- GRID JADWAL RAKSASA (Manggil Shared Component) --- */}
      <GridKalender 
        selectedTherapists={selectedTherapists}
        selectedSlot={selectedSlot}
        onSelectSlot={(id) => setSelectedSlot(id)}
      />

      <div className="w-full flex justify-between mt-[-10px]">
        <button onClick={onBack} className="text-[#F5B301] font-bold flex items-center gap-2 px-6 py-3 rounded-[12px] hover:bg-yellow-50 transition-colors">
          <span>←</span> Kembali
        </button>
        <button 
          disabled={!selectedSlot} 
          onClick={() => onNext({ scheduleId: selectedSlot })}
          className={`px-10 py-3 rounded-[12px] font-bold flex items-center gap-2 transition-all duration-300
            ${selectedSlot ? "bg-[#F5B301] hover:bg-[#dda101] text-white cursor-pointer shadow-[0_4px_12px_rgba(245,179,1,0.3)]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
          `}
        >
          Lanjut <span>→</span>
        </button>
      </div>

    </div>
  );
}