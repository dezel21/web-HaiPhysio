"use client";

import { CalendarBlank, CalendarCheck, CheckSquareOffset, CheckCircle, XCircle } from "@phosphor-icons/react";

export default function StatCards() {
  // Catatan: Nanti angka-angka ini kita tarik dari API GET /api/admin/bookings/stats
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      
      {/* Card 1: Booking Hari Ini */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium leading-tight">Booking<br/>Hari Ini</span>
          <div className="p-2 bg-yellow-50 text-[#F5B301] rounded-lg">
            <CalendarBlank size={24} weight="regular" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[28px] font-bold text-[#1b2a4e]">12 Pasien</span>
          <span className="text-[12px] font-bold text-green-500 mt-1">↗ +4 dari kemarin</span>
        </div>
      </div>

      {/* Card 2: Booking Minggu Ini */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium leading-tight">Booking<br/>Minggu Ini</span>
          <div className="p-2 bg-blue-50 text-[#1b2a4e] rounded-lg">
            <CalendarCheck size={24} weight="regular" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[28px] font-bold text-[#1b2a4e]">45 Sesi</span>
          <span className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Target 50 Sesi</span>
        </div>
      </div>

      {/* Card 3: Terkonfirmasi */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Terkonfirmasi</span>
          <div className="p-2 bg-green-50 text-green-500 rounded-lg">
            <CheckSquareOffset size={24} weight="regular" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">4 Sesi</span>
      </div>

      {/* Card 4: Selesai */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Selesai</span>
          <div className="p-2 bg-gray-50 text-gray-500 rounded-lg">
            <CheckCircle size={24} weight="regular" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">20 Sesi</span>
      </div>

      {/* Card 5: Dibatalkan */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Dibatalkan</span>
          <div className="p-2 bg-red-50 text-red-500 rounded-lg">
            <XCircle size={24} weight="regular" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">4 Sesi</span>
      </div>

    </div>
  );
}