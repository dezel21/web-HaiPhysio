"use client";

import { useState } from "react";
import { 
  CalendarBlank, 
  User, 
  CaretDown, 
  CaretUp, 
  Info,
  Barbell, 
  Brain, 
  FirstAid
} from "@phosphor-icons/react";

// --- MOCK DATA RIWAYAT BOOKING ---
const mockHistory = [
  {
    id: 1,
    service: "Fisioterapi Olahraga",
    date: "Jumat, 11 Juli 2026 | 11:00 - 12:00 WIB",
    therapist: "Ftr. Sari Wijaya, S.Ft",
    status: "Terkonfirmasi",
    complaint: "Paha bagian belakang terasa seperti ada yang robek dan bunyi 'pop' saat saya melakukan sprint lari kemarin. Sekarang sangat nyeri jika dipakai berjalan dan mulai muncul memar biru.",
    icon: Barbell,
  },
  {
    id: 2,
    service: "Fisioterapi Neuro",
    date: "Senin, 7 Juli 2026 | 14:00 - 15:00 WIB",
    therapist: null,
    status: "Selesai",
    complaint: null,
    icon: Brain,
  },
  {
    id: 3,
    service: "Fisioterapi Muskuloskeletal",
    date: "Rabu, 02 Juli 2026 | 13:00 - 14:00 WIB",
    therapist: null,
    status: "Dibatalkan",
    reason: "Jadwal terapis bertabrakan",
    icon: FirstAid,
  }
];

export default function RiwayatBookingPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const tabs = ["Semua", "Terkonfirmasi", "Selesai", "Dibatalkan"];

  // Filter data berdasarkan tab yang lagi aktif
  const filteredHistory = activeTab === "Semua" 
    ? mockHistory 
    : mockHistory.filter(item => item.status === activeTab);

  // Fungsi buat buka/tutup accordion "Lihat Detail"
  const toggleExpand = (id: number) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  // Fungsi pembantu buat styling badge status
  const getStatusStyle = (status: string) => {
    if (status === "Terkonfirmasi") return "bg-[#E6F4EA] text-[#1E8E3E]";
    if (status === "Selesai") return "bg-[#FEF3C7] text-[#D97706]";
    if (status === "Dibatalkan") return "bg-[#FEE2E2] text-[#EF4444]";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="relative w-full min-h-screen pt-[90px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] overflow-hidden">
      
      {/* Background Layer (Gradasi Kuning) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-r from-[#FDE89C]/40 to-[#F5B301]/70 z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto mt-10">
        
        {/* HEADER & TABS */}
        <div className="mb-8">
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#1b2a4e] mb-6">Riwayat Booking</h1>
          
          {/* Hapus overflow-x-auto, ganti jadi flex-wrap */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                // Sedikit dikecilin padding dan font-nya di versi mobile (HP)
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-[#F5B301] text-white shadow-md" 
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* LIST KARTU RIWAYAT */}
        <div className="flex flex-col gap-5">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              const isExpanded = expandedCardId === item.id;
              const IconComponent = item.icon;

              return (
                <div key={item.id} className="w-full bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm transition-all duration-300">
                  
                  {/* Bagian Atas Kartu (Selalu Tampil) */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    <div className="flex items-start gap-4">
                      {/* Ikon Layanan */}
                      <div className="w-[56px] h-[56px] rounded-xl border border-[#F5B301]/30 flex items-center justify-center shrink-0 bg-[#FFFBEA]">
                        <IconComponent size={32} weight="light" className="text-[#F5B301]" />
                      </div>
                      
                      {/* Info Singkat */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-[#1b2a4e] text-[18px] font-bold">{item.service}</h3>
                        
                        <div className="flex items-center gap-2 text-[14px] text-gray-500">
                          <CalendarBlank size={16} />
                          <span>{item.date}</span>
                        </div>
                        
                        {item.therapist && (
                          <div className="flex items-center gap-2 text-[14px] text-gray-500">
                            <User size={16} />
                            <span>Fisioterapis: {item.therapist}</span>
                          </div>
                        )}

                        {/* Kalau status dibatalkan, munculin alasan */}
                        {item.status === "Dibatalkan" && item.reason && (
                          <div className="flex items-center gap-2 text-[13px] text-red-500 mt-1">
                            <Info size={16} />
                            <span>Alasan: {item.reason}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Badge Status & Tombol Expand (Hanya untuk Terkonfirmasi) */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto mt-2 md:mt-0">
                      <div className={`px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 ${getStatusStyle(item.status)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                        {item.status}
                      </div>

                      {item.status === "Terkonfirmasi" && (
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center gap-1 text-[#F5B301] text-[13px] font-bold mt-3 hover:text-[#dda101] transition-colors"
                        >
                          Lihat Detail
                          {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bagian Accordion (Keluhan & Tombol Aksi) */}
                  {item.status === "Terkonfirmasi" && isExpanded && (
                    <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#1b2a4e] text-[14px] font-bold">Keluhan:</span>
                        <p className="text-gray-500 text-[14px] leading-relaxed">
                          {item.complaint}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <button className="px-6 py-2.5 rounded-full border border-[#F5B301] text-[#F5B301] font-bold text-[14px] hover:bg-[#FFFBEA] transition-colors">
                          Ubah Jadwal
                        </button>
                        <button className="text-red-500 font-bold text-[14px] hover:text-red-600 transition-colors">
                          Batalkan Sesi
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="w-full bg-white border border-gray-200 rounded-[16px] p-10 flex flex-col items-center justify-center text-center">
              <span className="text-gray-400 text-[16px]">Belum ada riwayat booking untuk status ini.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}