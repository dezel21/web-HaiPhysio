"use client";

import { useState } from "react";
import Stepper from "./Stepper";

// --- MOCK DATA TERAPIS ---
const mockTherapists = [
  { id: "t1", name: "Ftr. Andi Pratama", sp: "Spesialis Neuro & Olahraga", rating: 4.8, patients: "90+", photo: "/dokter-andi-pratama.png" },
  { id: "t2", name: "Ftr. Sari Wijaya, S.Ft", sp: "Spesialis Olahraga & Muskulo", rating: 4.9, patients: "150+", photo: "/dokter-sari-wijaya.png" },
  { id: "t3", name: "Ftr. Bintang Dito", sp: "Spesialis Olahraga", rating: 4.8, patients: "70+", photo: "/dokter-bintang-dito.png" },
];

// --- MOCK DATA GRID JADWAL ---
const days = [
  { name: "Senin", date: "07" }, { name: "Selasa", date: "08" }, { name: "Rabu", date: "09" },
  { name: "Kamis", date: "10" }, { name: "Jumat", date: "11" }, { name: "Sabtu", date: "12" }, { name: "Minggu", date: "13" }
];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const mockSlots = [
  { id: "s1", date: "07", time: "09:00", therapistId: "t1", status: "tersedia" },
  { id: "s2", date: "07", time: "09:00", therapistId: "t2", status: "tidak_praktik" },
  { id: "s3", date: "07", time: "10:00", therapistId: "t1", status: "penuh" },
  { id: "s4", date: "08", time: "10:00", therapistId: "t2", status: "tersedia" },
  { id: "s5", date: "09", time: "11:00", therapistId: "t3", status: "tersedia" },
  { id: "s6", date: "10", time: "14:00", therapistId: "t1", status: "penuh" },
  { id: "s7", date: "11", time: "15:00", therapistId: "t2", status: "tersedia" },
  { id: "s8", date: "12", time: "09:00", therapistId: "t3", status: "tidak_praktik" },
  { id: "s9", date: "13", time: "13:00", therapistId: "t2", status: "tersedia" },
];

interface Step2Props {
  onBack: () => void;
  onNext: (scheduleData: any) => void;
  selectedServiceId: string;
}

export default function Step2PilihWaktu({ onBack, onNext, selectedServiceId }: Step2Props) {
  // State filter terapis, defaultnya semua ID terapis masuk ke array ini
  const [selectedTherapists, setSelectedTherapists] = useState<string[]>(
    mockTherapists.map(t => t.id)
  );

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // --- FUNGSI TOGGLE FILTER ---
  // Fungsi ini dipanggil pas user nge-klik checkbox terapis
  const handleTherapistToggle = (therapistId: string) => {
    setSelectedTherapists((prev) => 
      // Kalau id udah ada di array, hapus id-nya (uncheck). Kalau belum, tambahin (check).
      prev.includes(therapistId) 
        ? prev.filter((id) => id !== therapistId) 
        : [...prev, therapistId]
    );
    // Kosongin pilihan jadwal kalau terapis yang dipilih di-uncheck
    setSelectedSlot(null); 
  };

  const getSlotStyle = (status: string, isSelected: boolean) => {
    if (isSelected) return "bg-[#1b2a4e] text-white border-[#1b2a4e]"; 
    if (status === "tersedia") return "bg-[#BFDBFE] text-[#1b2a4e] border-[#93C5FD] cursor-pointer hover:bg-[#93C5FD]"; 
    if (status === "penuh") return "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB] cursor-not-allowed"; 
    if (status === "tidak_praktik") return "bg-[#EF4444] text-white border-[#DC2626] cursor-not-allowed"; 
    return "";
  };

  // Data UI Kalender statis (biar mirip desain Figma)
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

      <div className="w-full flex flex-col md:flex-row gap-6 mb-8">
        
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
              // Sorot tanggal 7 sampai 13 sebagai minggu aktif
              const isActiveWeek = date >= 7 && date <= 13 && i >= 7 && i <= 20; 
              const isFaded = i < 3 || i > 33; // Tanggal bulan lalu / depan

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
                      {/* Foto Dokter - Ukuran diperbesar biar muka jelas! */}
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
                    {/* Checkbox yang nilainya terhubung dengan state */}
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

      {/* --- GRID JADWAL RAKSASA --- */}
      <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6 mb-10">
        <h3 className="text-center text-[20px] font-bold text-[#1b2a4e] mb-6">07-13 Juli 2026</h3>
        
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px] border-t border-l border-gray-200">
            
            <div className="grid grid-cols-8 bg-white">
              <div className="p-3 border-r border-b border-gray-200"></div>
              {days.map((day, idx) => (
                <div key={idx} className="p-3 border-r border-b border-gray-200 flex flex-col items-center justify-center bg-[#FAFAFA]">
                  <span className="text-[12px] text-gray-500">{day.date}</span>
                  <span className="text-[14px] font-bold text-[#1b2a4e]">{day.name}</span>
                </div>
              ))}
            </div>

            {hours.map((hour, hourIdx) => (
              <div key={hourIdx} className="grid grid-cols-8">
                <div className="p-3 border-r border-b border-gray-200 flex items-start justify-center">
                  <span className="text-[13px] font-medium text-gray-500 mt-[-8px]">{hour}</span>
                </div>

                {days.map((day, dayIdx) => {
                  // FILTER LOGIC: Cuma nampilin jadwal yang terapisnya lagi tercentang di filter atas!
                  const cellSlots = mockSlots.filter(s => 
                    s.date === day.date && 
                    s.time === hour &&
                    selectedTherapists.includes(s.therapistId)
                  );

                  return (
                    <div key={dayIdx} className="p-1 border-r border-b border-gray-200 min-h-[70px] flex flex-col gap-1 bg-white">
                      {cellSlots.map((slot) => {
                        const therapist = mockTherapists.find(t => t.id === slot.therapistId);
                        const isSelected = selectedSlot === slot.id;
                        
                        return (
                          <div 
                            key={slot.id}
                            onClick={() => slot.status === "tersedia" && setSelectedSlot(slot.id)}
                            className={`p-1.5 border rounded flex flex-col text-[10px] leading-tight transition-all duration-200 ${getSlotStyle(slot.status, isSelected)}`}
                          >
                            <span className="font-bold truncate">{therapist?.name}</span>
                            <span>{slot.status === "tidak_praktik" ? "Tidak Praktik" : slot.status === "penuh" ? "Penuh" : "Tersedia"}</span>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between">
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