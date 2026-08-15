"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, List, Checks, BellRinging, CheckCircle, CalendarX } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Data bohongan (mock) notifikasi sesuai desain Figma lu
const mockNotifs = [
  { id: 1, type: "new", title: "Booking Baru Masuk!", time: "4 menit yang lalu", desc: "Pasien Mochammad Fachriza mengajukan booking baru untuk Fisioterapi Olahraga pada Jumat, 11 Juli 2026 (11:00 - 12:00 WIB)." },
  { id: 2, type: "done", title: "Sesi Terapi Selesai", time: "45 Menit yang lalu", desc: "Ftr. Sari Wijaya, S.Ft telah menyelesaikan sesi Fisioterapi Muskuloskeletal bersama pasien Joko Prasetyo." },
  { id: 3, type: "cancel", title: "Booking Dibatalkan oleh Pasien", time: "2 Jam yang lalu", desc: "Pasien Budi Santoso telah membatalkan jadwal sesi Fisioterapi Muskuloskeletal pada Rabu, 02 Juli 2026. Slot jam tersebut kini kembali terbuka." },
];

export default function AdminHeader() {
  const pathname = usePathname();
  
  // State buat buka-tutup dropdown
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Efek sakti: kalau user klik di luar kotak dropdown, dropdown otomatis nutup!
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const getTitle = () => {
     if (pathname.includes("/profil")) return "Profil";
     if (pathname.includes("/notifikasi")) return "Notifikasi";
     return "Dasbor Admin";
  };

  // Helper buat nentuin ikon notif sesuai tipenya
  const getIcon = (type: string) => {
    if (type === "new") return <BellRinging size={20} weight="fill" className="text-yellow-500" />;
    if (type === "done") return <CheckCircle size={20} weight="fill" className="text-green-500" />;
    if (type === "cancel") return <CalendarX size={20} weight="fill" className="text-red-500" />;
    return <Bell size={20} />;
  };

  return (
    <header className="w-full h-[80px] bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* --- Kiri: Judul Halaman --- */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-[#F5B301]">
          <List size={28} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-4 h-6 border-l-4 border-[#1b2a4e] rounded-sm hidden md:block"></div>
          <h1 className="text-[18px] md:text-[20px] font-bold text-[#1b2a4e]">{getTitle()}</h1>
        </div>
      </div>

      {/* --- Kanan: Notifikasi & Profil Admin --- */}
      <div className="flex items-center gap-6 relative">
        
        {/* --- WRAPPER NOTIFIKASI --- */}
        <div ref={notifRef} className="relative">
          {/* Tombol Lonceng */}
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 rounded-full transition-colors ${isNotifOpen ? "bg-gray-100 text-[#1b2a4e]" : "text-gray-500 hover:text-[#1b2a4e]"}`}
          >
            <Bell size={24} weight={isNotifOpen ? "fill" : "regular"} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {/* KOTAK DROPDOWN NOTIFIKASI */}
          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-[380px] bg-white border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden flex flex-col z-50">
              
              {/* Header Dropdown */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                <span className="font-bold text-[#1b2a4e]">Notifikasi</span>
                <button className="text-[12px] font-bold text-[#F5B301] flex items-center gap-1 hover:text-[#dda101] transition-colors">
                  <Checks size={16} weight="bold" /> Tandai sudah dibaca
                </button>
              </div>
              
              {/* List Isi Notifikasi (Bisa di-scroll kalau kepanjangan) */}
              <div className="flex flex-col max-h-[320px] overflow-y-auto">
                {mockNotifs.map((notif) => (
                  <div key={notif.id} className="flex gap-4 p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'new' ? 'bg-yellow-50' : notif.type === 'done' ? 'bg-green-50' : 'bg-red-50'}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-[#1b2a4e] text-[14px] leading-tight">{notif.title}</span>
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{notif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Footer Dropdown */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <Link 
                  href="/admin/notifikasi"
                  onClick={() => setIsNotifOpen(false)} // Tutup dropdown pas diklik
                  className="w-full py-2.5 flex items-center justify-center rounded-xl text-[13px] font-bold text-[#1b2a4e] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Lihat semua notifikasi
                </Link>
              </div>

            </div>
          )}
        </div>

        {/* Garis Pembatas */}
        <div className="w-[1px] h-8 bg-gray-200"></div>

        {/* Foto Profil & Nama */}
        <Link href="/admin/profil" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 group-hover:border-[#F5B301] transition-colors">
            <img 
              src="https://ui-avatars.com/api/?name=Dinda+Ayu&background=1b2a4e&color=fff" 
              alt="Profil Admin" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-col hidden sm:flex">
            <span className="text-[14px] font-bold text-[#1b2a4e] leading-tight group-hover:text-[#F5B301] transition-colors">Dinda Ayu</span>
            <span className="text-[12px] text-gray-500">Admin</span>
          </div>
        </Link>

      </div>
    </header>
  );
}