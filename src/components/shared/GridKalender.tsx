"use client";

import { calendarDays, calendarHours, mockSlots, mockTherapists } from "@/constants/data";

interface GridKalenderProps {
  selectedTherapists: string[]; // Nangkep daftar ID terapis yang lagi dicentang
  selectedSlot: string | null;  // Nangkep ID slot yang lagi dipilih user
  onSelectSlot: (slotId: string) => void; // Fungsi buat nge-update state pas kotak diklik
}

export default function GridKalender({ selectedTherapists, selectedSlot, onSelectSlot }: GridKalenderProps) {
  
  // Fungsi penentu warna kotak berdasarkan statusnya
  const getSlotStyle = (status: string, isSelected: boolean) => {
    if (isSelected) return "bg-[#1b2a4e] text-white border-[#1b2a4e]"; 
    if (status === "tersedia") return "bg-[#BFDBFE] text-[#1b2a4e] border-[#93C5FD] cursor-pointer hover:bg-[#93C5FD]"; 
    if (status === "penuh") return "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB] cursor-not-allowed"; 
    if (status === "tidak_praktik") return "bg-[#EF4444] text-white border-[#DC2626] cursor-not-allowed"; 
    return "";
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6 mb-10">
      <h3 className="text-center text-[20px] font-bold text-[#1b2a4e] mb-6">07-13 Juli 2026</h3>
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px] border-t border-l border-gray-200">
          
          {/* Header Baris Hari & Tanggal */}
          <div className="grid grid-cols-8 bg-white">
            <div className="p-3 border-r border-b border-gray-200"></div>
            {calendarDays.map((day, idx) => (
              <div key={idx} className="p-3 border-r border-b border-gray-200 flex flex-col items-center justify-center bg-[#FAFAFA]">
                <span className="text-[12px] text-gray-500">{day.date}</span>
                <span className="text-[14px] font-bold text-[#1b2a4e]">{day.name}</span>
              </div>
            ))}
          </div>

          {/* Body Kolom Jam & Slot Jadwal */}
          {calendarHours.map((hour, hourIdx) => (
            <div key={hourIdx} className="grid grid-cols-8">
              
              {/* Kolom Paling Kiri (Penunjuk Jam) */}
              <div className="p-3 border-r border-b border-gray-200 flex items-start justify-center">
                <span className="text-[13px] font-medium text-gray-500 mt-[-8px]">{hour}</span>
              </div>

              {/* Kolom Slot Jadwal per Hari */}
              {calendarDays.map((day, dayIdx) => {
                // FILTER LOGIC: Cuma nampilin jadwal yang terapisnya lagi tercentang di komponen parent
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
                          // Kalau statusnya tersedia, panggil fungsi onSelectSlot dari parent
                          onClick={() => slot.status === "tersedia" && onSelectSlot(slot.id)}
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
  );
}