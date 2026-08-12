"use client";

import { calendarDays, calendarHours } from "@/constants/data";

interface GridKalenderProps {
  selectedTherapists: string[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
  slots: any[];       
  therapists: any[];  
}

export default function GridKalender({ 
  selectedTherapists, 
  selectedSlot, 
  onSelectSlot,
  slots,
  therapists
}: GridKalenderProps) {

  // Fungsi penentu warna kotak berdasarkan statusnya
  const getSlotStyle = (status: string, isSelected: boolean) => {
    if (isSelected) return "bg-[#1b2a4e] text-white shadow-md border-transparent";      
    if (status === "Tersedia") return "bg-[#BFDBFE] text-[#1e3a8a] border-[#93C5FD] cursor-pointer hover:bg-[#93C5FD] transition-colors"; 
    if (status === "Penuh") return "bg-[#F3F4F6] text-gray-400 border-gray-200 cursor-not-allowed";  
    if (status === "Tidak Praktik") return "bg-[#FEF2F2] text-[#EF4444] border-red-200 cursor-not-allowed";  
    return "bg-gray-50 border-gray-100";
  };

  // Helper buat nyamain format jam 
  const formatTime = (timeString: string) => {
    return timeString ? timeString.substring(0, 5) : "";
  };

  // Helper buat ngambil tanggal aja
  const getDayNumber = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return String(date.getDate()).padStart(2, '0');
  };

  return (
    <div className="w-full mt-6">
      {/* Header minggu (Bisa dibikin dinamis nanti di parent) */}
      <h3 className="text-[18px] font-bold text-[#1b2a4e] mb-4">Pilih Jadwal Pengganti</h3>  

      {/* Grid scroll horizontal */}
      <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="min-w-[900px] border border-gray-200 bg-white rounded-xl overflow-hidden">  

          {/* Baris Header: Hari (Senin-Minggu) */}
          <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
            <div className="p-4 flex items-center justify-center border-r border-gray-200">
              <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Jam</span>
            </div>
            {calendarDays.map((day, idx) => (
              <div key={idx} className="p-3 text-center border-r border-gray-200 last:border-0 flex flex-col justify-center">
                <span className="text-[15px] font-bold text-[#1b2a4e]">{day.name}</span>
                <span className="text-[13px] text-gray-500">{day.date}</span>
              </div>  
            ))}
          </div>

          {/* Body: Loop per jam */}
          {calendarHours.map((hour, idx) => (
            <div key={idx} className="grid grid-cols-8 border-b border-gray-100 last:border-0">
              
              {/* Kolom jam (kiri) */}
              <div className="p-3 flex items-center justify-center border-r border-gray-200 bg-gray-50">
                <span className="text-[14px] font-bold text-gray-600">{hour}</span>
              </div>  

              {/* Kolom per hari */}
              {calendarDays.map((day, dayIdx) => {
                
                // FILTER: Cari slot dari API yang cocok dengan tanggal, jam, dan terapis yang dipilih
                const cellSlots = slots.filter(s =>
                  getDayNumber(s.slotDate) === day.date &&
                  formatTime(s.startTime) === hour &&
                  selectedTherapists.includes(s.therapistId)  
                );

                return (
                  <div key={dayIdx} className="p-2 border-r border-gray-100 last:border-0 min-h-[90px] flex flex-col gap-2">
                    {cellSlots.map((slot) => {
                      const therapist = therapists.find(t => t.id === slot.therapistId);
                      const isSelected = selectedSlot === slot.id;

                      return (
                        <div
                          key={slot.id}
                          onClick={() => slot.cellStatus === "Tersedia" && onSelectSlot(slot.id)}
                          className={`p-2 flex flex-col items-center justify-center text-center rounded-lg border ${getSlotStyle(slot.cellStatus, isSelected)}`}
                        >
                          {/* Pakai fallback nama terapis */}
                          <span className="text-[11px] font-bold mb-1 leading-snug">
                            {therapist?.fullName || therapist?.name || "Terapis"}
                          </span>   
                          <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px] bg-white/50 mix-blend-multiply tracking-wide">
                            {slot.cellStatus}
                          </span>        
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}