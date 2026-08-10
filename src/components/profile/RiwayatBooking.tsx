"use client";

import { useState } from "react";
import { dummyRiwayatBooking } from "@/constants/data"; 
import { CalendarBlank, Stethoscope, CaretDown, WarningCircle, Barbell, Brain, Bone } from "@phosphor-icons/react";

export default function RiwayatBooking() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filteredRiwayat = dummyRiwayatBooking.filter((item) => {
    if (activeTab === "Semua") return true;
    return item.status === activeTab;
  });

  // Fungsi buat nentuin logo berdasarkan nama layanan
  const renderLayananIcon = (layanan: string) => {
    if (layanan.includes("Olahraga")) return <Barbell size={28} weight="regular" />;
    if (layanan.includes("Neuro")) return <Brain size={28} weight="regular" />;
    return <Bone size={28} weight="regular" />; // Default icon (misal buat Muskuloskeletal)
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-bold text-[#1b2a4e] mb-2">Riwayat Booking</h2>
        <p className="text-[#585858] text-[14px]">
          Kelola informasi pribadi akun Anda dan pantau riwayat sesi terapi fisioterapi yang pernah Anda jalani.
        </p>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
        {["Semua", "Terkonfirmasi", "Selesai", "Dibatalkan"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#F5B301] text-white"
                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List Card Riwayat */}
      <div className="flex flex-col gap-4">
        {filteredRiwayat.length > 0 ? (
          filteredRiwayat.map((booking) => (
            <div key={booking.id} className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-sm transition-shadow">
              
              {/* Header Card */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  
                  {/* Icon Layanan Dinamis */}
                  <div className="w-[52px] h-[52px] rounded-xl bg-[#FFFBEA] text-[#F5B301] flex items-center justify-center border border-[#FDE68A] shrink-0">
                    {renderLayananIcon(booking.layanan)}
                  </div>
                  
                  <div>
                    <h4 className="text-[16px] font-bold text-[#1b2a4e]">{booking.layanan}</h4>
                    <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mt-1.5">
                      <CalendarBlank size={16} />
                      <span>{booking.tanggal} | {booking.waktu}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mt-1">
                      <Stethoscope size={16} />
                      <span>{booking.terapis}</span>
                    </div>
                  </div>
                </div>
                
                {/* Badge Status */}
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border flex items-center gap-2 ${
                    booking.status === "Terkonfirmasi" ? "text-[#10B981] border-[#D1FAE5] bg-[#ECFDF5]" :
                    booking.status === "Selesai" ? "text-gray-600 border-gray-200 bg-white shadow-sm" :
                    "text-[#EF4444] border-[#FEE2E2] bg-[#FEF2F2]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      booking.status === "Terkonfirmasi" ? "bg-[#10B981]" :
                      booking.status === "Selesai" ? "bg-gray-400" :
                      "bg-[#EF4444]"
                    }`}></span>
                    {booking.status}
                  </span>
                  
                  {booking.status === "Terkonfirmasi" && (
                    <button className="text-[#F5B301] text-[13px] font-bold hover:underline flex items-center gap-1 mt-1">
                      Lihat Detail <CaretDown size={14} weight="bold" />
                    </button>
                  )}
                </div>
              </div>

              {/* Keluhan / Alasan Batal */}
              {booking.keluhan && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-bold text-[#1b2a4e]">Keluhan:</p>
                  <p className="text-[13px] text-gray-600 leading-relaxed mt-1">{booking.keluhan}</p>
                </div>
              )}
              {booking.alasanBatal && (
                <div className="mt-3">
                  <p className="text-[13px] text-[#EF4444] flex items-center gap-1.5">
                    <WarningCircle size={16} weight="fill" />
                    {booking.alasanBatal}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {booking.status === "Terkonfirmasi" && (
                <div className="flex gap-4 mt-6 pt-5 border-t border-gray-100">
                  <button 
                    onClick={() => window.location.href = `/riwayat-booking/ubah-jadwal/${booking.id}`}
                    className="px-6 py-2.5 rounded-xl border-2 border-[#F5B301] text-[#F5B301] font-bold text-[14px] hover:bg-[#FFFBEA] transition-colors"
                  >
                    Ubah Jadwal
                  </button>
                  <button className="px-6 py-2.5 rounded-xl text-[#EF4444] font-bold text-[14px] hover:bg-red-50 transition-colors">
                    Batalkan Sesi
                  </button>
                </div>
              )}
              
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-[14px]">Belum ada riwayat {activeTab !== "Semua" ? activeTab.toLowerCase() : ""} saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}