"use client";

import { Users, UserCheck, Article, CalendarBlank } from "@phosphor-icons/react";

interface PasienStatsProps {
  patients: any[];
  bookings: any[];
  isLoading: boolean;
}

export default function PasienStats({ patients, bookings, isLoading }: PasienStatsProps) {
  const totalPasien = patients.length;
  
  // Pasien aktif (yang memiliki riwayat atau booking)
  const pasienAktif = patients.filter((p: any) => (p.totalBookings || 0) > 0 || (p.totalSessions || 0) > 0).length || totalPasien;
  
  // Total sesi selesai
  const totalSelesai = bookings.filter((b: any) => (b.status || "").toLowerCase() === "selesai").length;
  
  // Sesi mendatang yang terkonfirmasi
  const sesiMendatang = bookings.filter((b: any) => (b.status || "").toLowerCase() === "terkonfirmasi").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      {/* Total Pasien */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-yellow-50 text-[#F5B301] flex items-center justify-center shrink-0">
          <Users size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Total Pasien Terdaftar</span>
          <span className="text-[32px] font-bold text-[#1b2a4e] leading-none">
            {isLoading ? "..." : `${totalPasien}`}
          </span>
        </div>
      </div>

      {/* Pasien Aktif */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#e6f7f1] text-[#00b074] flex items-center justify-center shrink-0">
          <UserCheck size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Pasien Aktif</span>
          <span className="text-[32px] font-bold text-green-600 leading-none">
            {isLoading ? "..." : `${pasienAktif}`}
          </span>
        </div>
      </div>

      {/* Total Sesi Selesai */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#f0f4ff] text-[#3b82f6] flex items-center justify-center shrink-0">
          <Article size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Total Sesi Selesai</span>
          <span className="text-[32px] font-bold text-blue-600 leading-none">
            {isLoading ? "..." : `${totalSelesai}`}
          </span>
        </div>
      </div>

      {/* Sesi Mendatang */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
          <CalendarBlank size={28} weight="fill" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#585858] text-[13px] font-medium">Sesi Terkonfirmasi</span>
          <span className="text-[32px] font-bold text-orange-500 leading-none">
            {isLoading ? "..." : `${sesiMendatang}`}
          </span>
        </div>
      </div>

    </div>
  );
}
