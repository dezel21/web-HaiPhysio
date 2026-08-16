"use client";

import { Users, UserCheck, Article, CalendarBlank } from "@phosphor-icons/react";

export default function PasienStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      {/* Total Pasien */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-yellow-50 text-[#F5B301] flex items-center justify-center shrink-0">
          <Users size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Total Pasien</span>
          <span className="text-[32px] font-bold text-[#1b2a4e] leading-none">124</span>
        </div>
      </div>

      {/* Aktif Bulan Ini */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#e6f7f1] text-[#00b074] flex items-center justify-center shrink-0">
          <UserCheck size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Aktif Bulan Ini</span>
          <span className="text-[32px] font-bold text-[#1b2a4e] leading-none">48</span>
        </div>
      </div>

      {/* Total Sesi */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#f0f4ff] text-[#3b82f6] flex items-center justify-center shrink-0">
          <Article size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Total Sesi</span>
          <span className="text-[32px] font-bold text-[#1b2a4e] leading-none">842</span>
        </div>
      </div>

      {/* Sesi Tertunda */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <CalendarBlank size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Sesi Tertunda</span>
          <span className="text-[32px] font-bold text-[#1b2a4e] leading-none">03</span>
        </div>
      </div>

    </div>
  );
}