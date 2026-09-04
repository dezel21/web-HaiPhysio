"use client";

import { useState, useEffect } from "react";
import { CalendarBlank, CalendarCheck, CheckSquareOffset, CheckCircle, XCircle, ArrowClockwise } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

const REFRESH_INTERVAL = 30000; // 30 detik

export default function StatCards() {
  const [stats, setStats] = useState({
    todayCount: 0,
    weekCount: 0,
    confirmedCount: 0,
    doneCount: 0,
    cancelledCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardStats = async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const res = await adminService.getBookings();
      const bookings = res.data?.bookings || res.bookings || [];

      const now = new Date();
      const formatLocal = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };

      const todayStr = formatLocal(now);

      // Hitung range minggu ini (Senin–Minggu)
      const dayOfWeek = now.getDay();
      const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const monday = new Date(now);
      monday.setDate(diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const mondayStr = formatLocal(monday);
      const sundayStr = formatLocal(sunday);

      let today = 0, week = 0, confirmed = 0, done = 0, cancelled = 0;

      bookings.forEach((b: any) => {
        // Backend mengembalikan bookingDate dalam format ISO: "2026-08-31T00:00:00.000Z"
        // Ambil hanya bagian YYYY-MM-DD-nya
        const rawDate = b.bookingDate || b.slotDate || b.slot_date || "";
        const slotDate = rawDate.substring(0, 10); // "2026-08-31"
        // Backend mengembalikan bookingStatus dengan kapital: "Terkonfirmasi"
        const status = (b.bookingStatus || b.status || "").toLowerCase();

        if (slotDate === todayStr) today++;
        if (slotDate >= mondayStr && slotDate <= sundayStr) week++;
        if (status === "terkonfirmasi") confirmed++;
        else if (status === "selesai") done++;
        else if (status === "dibatalkan") cancelled++;
      });

      setStats({ todayCount: today, weekCount: week, confirmedCount: confirmed, doneCount: done, cancelledCount: cancelled });
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Gagal memuat statistik dashboard admin:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    // Auto-refresh setiap 30 detik
    const interval = setInterval(() => fetchDashboardStats(), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Gunakan format manual (bukan toLocaleTimeString) agar tidak ada SSR/client mismatch
  const formatTime = (d: Date | null) => {
    if (!d) return "...";
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  const cardData = [
    {
      label: "Booking\nHari Ini",
      value: `${stats.todayCount} Pasien`,
      sub: "Sesi Terjadwal",
      iconEl: <CalendarBlank size={24} weight="bold" />,
      iconBg: "bg-yellow-50 text-[#F5B301]",
    },
    {
      label: "Booking\nMinggu Ini",
      value: `${stats.weekCount} Sesi`,
      sub: "Total Pekan Ini",
      iconEl: <CalendarCheck size={24} weight="bold" />,
      iconBg: "bg-blue-50 text-[#1b2a4e]",
    },
    {
      label: "Terkonfirmasi",
      value: `${stats.confirmedCount} Sesi`,
      sub: "",
      iconEl: <CheckSquareOffset size={24} weight="bold" />,
      iconBg: "bg-green-50 text-green-500",
    },
    {
      label: "Selesai",
      value: `${stats.doneCount} Sesi`,
      sub: "",
      iconEl: <CheckCircle size={24} weight="bold" />,
      iconBg: "bg-gray-50 text-gray-500",
    },
    {
      label: "Dibatalkan",
      value: `${stats.cancelledCount} Sesi`,
      sub: "",
      iconEl: <XCircle size={24} weight="bold" />,
      iconBg: "bg-red-50 text-red-500",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Live indicator bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[12px] font-semibold text-gray-400">Live — diperbarui otomatis tiap 30 detik</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-gray-400">
          <span>Terakhir: {formatTime(lastUpdated)}</span>
          <button
            onClick={() => fetchDashboardStats(true)}
            disabled={isRefreshing}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Refresh sekarang"
          >
            <ArrowClockwise size={14} weight="bold" className={isRefreshing ? "animate-spin text-[#F5B301]" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* Grid Stat Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cardData.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[#585858] text-[14px] font-medium leading-tight whitespace-pre-line">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                {card.iconEl}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[28px] font-bold text-[#1b2a4e]">
                {isLoading ? (
                  <span className="inline-block w-20 h-7 bg-gray-100 rounded-lg animate-pulse"></span>
                ) : card.value}
              </span>
              {card.sub && (
                <span className="text-[12px] font-bold text-gray-400 mt-1">{card.sub}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
