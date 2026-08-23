"use client";

import { CaretDown, CalendarBlank } from "@phosphor-icons/react";

interface ScheduleFilterProps {
  therapists: any[];
  selectedTherapistId: string;
  onTherapistChange: (id: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function ScheduleFilter({
  therapists,
  selectedTherapistId,
  onTherapistChange,
  selectedDate,
  onDateChange,
}: ScheduleFilterProps) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8">
      
      {/* 1. Filter Terapis Dinamis */}
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-[13px] font-bold text-[#1b2a4e]">Pilih Fisioterapis</label>
        <div className="relative">
          <select 
            value={selectedTherapistId}
            onChange={(e) => onTherapistChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-[#1b2a4e] text-[14px] font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
          >
            <option value="">-- Semua Fisioterapis --</option>
            {therapists.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name || t.fullName || "Fisioterapis"} ({t.specialization || "Fisioterapi"})
              </option>
            ))}
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 2. Filter Tanggal Dinamis */}
      <div className="flex flex-col gap-2 flex-1 md:max-w-[320px]">
        <label className="text-[13px] font-bold text-[#1b2a4e]">Pilih Tanggal Sesi</label>
        <div className="relative">
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full bg-white border border-gray-200 text-[#1b2a4e] text-[14px] font-semibold py-3 px-4 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
          />
        </div>
      </div>

    </div>
  );
}
