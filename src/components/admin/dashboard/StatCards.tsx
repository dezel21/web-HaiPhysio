"use client";

import { useState, useEffect } from "react";
import { CalendarBlank, CalendarCheck, CheckSquareOffset, CheckCircle, XCircle } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

export default function StatCards() {
  const [stats, setStats] = useState({
    todayCount: 0,
    weekCount: 0,
    confirmedCount: 0,
    doneCount: 0,
    cancelledCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await adminService.getBookings();
        const bookings = res.data?.bookings || res.bookings || [];

        // Hitung Tanggal Hari Ini (YYYY-MM-DD lokal)
        const now = new Date();
        const formatLocal = (d: Date) => {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        };

        const todayStr = formatLocal(now);

        // Hitung range minggu ini (Senin - Minggu)
        const dayOfWeek = now.getDay();
        const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diffToMonday));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const mondayStr = formatLocal(monday);
        const sundayStr = formatLocal(sunday);

        let today = 0;
        let week = 0;
        let confirmed = 0;
        let done = 0;
        let cancelled = 0;

        bookings.forEach((b: any) => {
          const slotDate = b.slotDate || b.slot_date || "";
          const status = (b.status || "").toLowerCase();

          if (slotDate === todayStr) {
            today++;
          }
          if (slotDate >= mondayStr && slotDate <= sundayStr) {
            week++;
          }
          if (status === "terkonfirmasi") {
            confirmed++;
          } else if (status === "selesai") {
            done++;
          } else if (status === "dibatalkan") {
            cancelled++;
          }
        });

        setStats({
          todayCount: today,
          weekCount: week,
          confirmedCount: confirmed,
          doneCount: done,
          cancelledCount: cancelled,
        });
      } catch (error) {
        console.error("Gagal memuat statistik dashboard admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      
      {/* Card 1: Booking Hari Ini */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium leading-tight">Booking<br/>Hari Ini</span>
          <div className="p-2 bg-yellow-50 text-[#F5B301] rounded-lg">
            <CalendarBlank size={24} weight="bold" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[28px] font-bold text-[#1b2a4e]">
            {isLoading ? "..." : `${stats.todayCount} Pasien`}
          </span>
          <span className="text-[12px] font-bold text-gray-400 mt-1">Sesi Terjadwal</span>
        </div>
      </div>

      {/* Card 2: Booking Minggu Ini */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium leading-tight">Booking<br/>Minggu Ini</span>
          <div className="p-2 bg-blue-50 text-[#1b2a4e] rounded-lg">
            <CalendarCheck size={24} weight="bold" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[28px] font-bold text-[#1b2a4e]">
            {isLoading ? "..." : `${stats.weekCount} Sesi`}
          </span>
          <span className="text-[12px] font-bold text-gray-400 mt-1">Total Pekan Ini</span>
        </div>
      </div>

      {/* Card 3: Terkonfirmasi */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Terkonfirmasi</span>
          <div className="p-2 bg-green-50 text-green-500 rounded-lg">
            <CheckSquareOffset size={24} weight="bold" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">
          {isLoading ? "..." : `${stats.confirmedCount} Sesi`}
        </span>
      </div>

      {/* Card 4: Selesai */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Selesai</span>
          <div className="p-2 bg-gray-50 text-gray-500 rounded-lg">
            <CheckCircle size={24} weight="bold" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">
          {isLoading ? "..." : `${stats.doneCount} Sesi`}
        </span>
      </div>

      {/* Card 5: Dibatalkan */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-[#585858] text-[14px] font-medium">Dibatalkan</span>
          <div className="p-2 bg-red-50 text-red-500 rounded-lg">
            <XCircle size={24} weight="bold" />
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#1b2a4e] mt-auto">
          {isLoading ? "..." : `${stats.cancelledCount} Sesi`}
        </span>
      </div>

    </div>
  );
}
