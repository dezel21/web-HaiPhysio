"use client";

import { MagnifyingGlass, CalendarBlank, CaretDown, DownloadSimple } from "@phosphor-icons/react";

export default function BookingFilter() {
  return (
    <div className="w-full flex flex-col xl:flex-row gap-4 mb-6">
      
      {/* Search Bar */}
      <div className="relative flex-1">
        <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari Nama Pasien..." 
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] transition-colors"
        />
      </div>

      {/* Group Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        
        {/* Filter Tanggal */}
        <div className="relative min-w-[220px]">
          <CalendarBlank size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-11 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer">
            <option>19 Juli - 21 Juli 2026</option>
            <option>Bulan Ini</option>
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter Layanan */}
        <div className="relative min-w-[180px]">
          <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer">
            <option value="" disabled selected hidden>Filter Layanan</option>
            <option>Fisioterapi Olahraga</option>
            <option>Fisioterapi Neuro</option>
            <option>Fisioterapi Muskuloskeletal</option>
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter Status */}
        <div className="relative min-w-[160px]">
          <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer">
            <option value="" disabled selected hidden>Filter Status</option>
            <option>Terkonfirmasi</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>
          <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Tombol Ekspor CSV */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[14px] rounded-xl hover:bg-gray-50 transition-colors">
          <DownloadSimple size={18} weight="bold" />
          Ekspor CSV
        </button>

      </div>
    </div>
  );
}