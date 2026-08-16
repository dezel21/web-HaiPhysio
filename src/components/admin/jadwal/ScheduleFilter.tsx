"use client";

import { CaretDown, CalendarBlank } from "@phosphor-icons/react";

export default function ScheduleFilter() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10">
      
      {/* Filter Terapis */}
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-[13px] font-bold text-[#1b2a4e]">Pilih Terapis</label>
        <div className="relative">
          <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer">
            <option>Ftr. Andi Pratama</option>
            <option>Ftr. Bintang Dito</option>
            <option>Ftr. Sari Wijaya, S.Ft</option>
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Filter Tanggal */}
      <div className="flex flex-col gap-2 flex-1 md:max-w-[300px]">
        <label className="text-[13px] font-bold text-[#1b2a4e]">Pilih Tanggal</label>
        <div className="relative">
          <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer">
            <option>28 Juli 2026</option>
            <option>29 Juli 2026</option>
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

    </div>
  );
}