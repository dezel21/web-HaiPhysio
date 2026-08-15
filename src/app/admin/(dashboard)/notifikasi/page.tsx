"use client";

import { useState } from "react";
import { BellRinging, CheckCircle, CalendarX, Checks } from "@phosphor-icons/react";

// Data bohongan sesuai dengan teks di desain Figma lu
const initialNotifs = [
  { 
    id: 1, type: "new", title: "Booking Baru Masuk!", time: "4 menit yang lalu", 
    desc: "Pasien Mochammad Fachriza mengajukan booking baru untuk Fisioterapi Olahraga pada Jumat, 11 Juli 2026 (11:00 - 12:00 WIB) bersama Ftr. Sari Wijaya, S.Ft.", 
    isRead: false 
  },
  { 
    id: 2, type: "done", title: "Sesi Terapi Selesai", time: "45 Menit yang lalu", 
    desc: "Ftr. Sari Wijaya, S.Ft telah menyelesaikan sesi Fisioterapi Muskuloskeletal bersama pasien Joko Prasetyo.", 
    isRead: false 
  },
  { 
    id: 3, type: "cancel", title: "Booking Dibatalkan oleh Pasien", time: "2 Jam yang lalu", 
    desc: "Pasien Budi Santoso telah membatalkan jadwal sesi Fisioterapi Muskuloskeletal pada Rabu, 02 Juli 2026 (13:00 WIB). Slot jam tersebut kini kembali terbuka.", 
    isRead: false 
  },
];

export default function NotifikasiPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  // Fungsi sakti buat nandain semua notif jadi "udah dibaca"
  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  // Helper buat render ikon berdasarkan tipe & status baca
  const getIcon = (type: string, isRead: boolean) => {
    if (type === "new") return <BellRinging size={28} weight="fill" className={isRead ? "text-yellow-400/60" : "text-[#F5B301]"} />;
    if (type === "done") return <CheckCircle size={28} weight="fill" className={isRead ? "text-green-400/60" : "text-green-500"} />;
    if (type === "cancel") return <CalendarX size={28} weight="fill" className={isRead ? "text-red-400/60" : "text-red-500"} />;
    return <BellRinging size={28} />;
  };

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* --- Bagian Header Halaman --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-bold text-[#1b2a4e]">Notifikasi</h2>
          <p className="text-[#585858] text-[15px]">
            Pantau pembaruan aktivitas booking masuk, permintaan jadwal ulang, dan pembatalan dari pasien secara real-time.
          </p>
        </div>

        {/* Tombol Tandai Semua Sudah Dibaca */}
        <button 
          onClick={handleMarkAllRead}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#1b2a4e] font-bold text-[14px] rounded-xl transition-all shadow-sm shrink-0"
        >
          <Checks size={20} weight="bold" className="text-[#F5B301]" />
          Tandai semua sudah dibaca
        </button>
      </div>

      {/* --- List Kartu Notifikasi --- */}
      <div className="flex flex-col gap-4">
        {notifs.map((notif) => {
          // Logika gaya visual kalau udah dibaca vs belum
          const cardClass = notif.isRead 
            ? "bg-white border-gray-100 opacity-70" 
            : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]";
            
          const iconBgClass = notif.isRead
            ? "bg-gray-50 border-gray-100"
            : notif.type === 'new' ? 'bg-yellow-50 border-yellow-100' : notif.type === 'done' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100';

          return (
            <div 
              key={notif.id} 
              className={`w-full flex gap-5 md:gap-6 p-6 rounded-2xl border transition-all duration-300 ${cardClass}`}
            >
              {/* Box Ikon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${iconBgClass}`}>
                {getIcon(notif.type, notif.isRead)}
              </div>
              
              {/* Konten Notif */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
                  <h3 className={`font-bold text-[16px] md:text-[18px] ${notif.isRead ? "text-gray-600" : "text-[#1b2a4e]"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[12px] md:text-[13px] font-medium text-gray-400 whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
                <p className={`text-[14px] md:text-[15px] leading-relaxed ${notif.isRead ? "text-gray-400" : "text-[#585858]"}`}>
                  {notif.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}