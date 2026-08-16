"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CaretRight, CaretLeft, CaretRight as CaretRightIcon, 
  Barbell, CalendarBlank, CheckSquare, CheckCircle, NotePencil 
} from "@phosphor-icons/react";

export default function ReschedulePage() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [sendWA, setSendWA] = useState(true);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/admin/booking");
    }, 2000);
  };

  // Mock data kalender diperbarui dengan posisi TOP dan HEIGHT presisi (1 Jam = 60px)
  // Jam 08:00 = top: 0px. Jam 09:00 = top: 60px, dst.
  const weekDays = [
    { day: "Senin", date: "07", slots: [
      { time: "09:00 - 11:00", status: "Tidak Praktik", terapis: "Ftr. Andi Pratama", top: 60, height: 120 },
      { time: "13:00 - 15:00", status: "Tersedia", terapis: "Ftr. Andi Pratama", top: 300, height: 120 },
    ]},
    { day: "Selasa", date: "08", slots: [
      { time: "09:00 - 10:00", status: "Penuh", terapis: "Ftr. Andi Pratama", top: 60, height: 60 },
      { time: "10:00 - 11:00", status: "Tersedia", terapis: "Ftr. Andi Pratama", top: 120, height: 60 },
      { time: "11:00 - 12:00", status: "Penuh", terapis: "Ftr. Sari Wijaya", top: 180, height: 60 },
      { time: "14:00 - 16:00", status: "Tersedia", terapis: "Ftr. Andi Pratama", top: 360, height: 120 },
      { time: "17:00 - 19:00", status: "Tidak Praktik", terapis: "Ftr. Sari Wijaya", top: 540, height: 120 },
    ]},
    { day: "Rabu", date: "09", slots: [
      { time: "09:00 - 10:00", status: "Tersedia", terapis: "Ftr. Bintang Dito", top: 60, height: 60 },
      { time: "10:00 - 12:00", status: "Penuh", terapis: "Ftr. Bintang Dito", top: 120, height: 120 },
      { time: "13:00 - 15:00", status: "Tersedia", terapis: "Ftr. Sari Wijaya", top: 300, height: 120 },
    ]},
    { day: "Kamis", date: "10", slots: [
      { time: "09:00 - 11:00", status: "Penuh", terapis: "Ftr. Bintang Dito", top: 60, height: 120 },
      { time: "11:00 - 13:00", status: "Tersedia", terapis: "Ftr. Andi Pratama", top: 180, height: 120 },
      { time: "14:00 - 16:00", status: "Tersedia", terapis: "Ftr. Bintang Dito", top: 360, height: 120 },
      { time: "18:00 - 19:00", status: "Tidak Praktik", terapis: "Ftr. Andi Pratama", top: 600, height: 60 },
    ]},
    { day: "Jumat", date: "11", slots: [
      { time: "09:00 - 10:00", status: "Tersedia", terapis: "Ftr. Andi Pratama", top: 60, height: 60 },
      { time: "10:00 - 11:00", status: "Terpilih", terapis: "Ftr. Sari Wijaya", top: 120, height: 60 },
      { time: "11:00 - 12:00", status: "Penuh", terapis: "Ftr. Sari Wijaya", top: 180, height: 60 },
      { time: "13:00 - 15:00", status: "Tersedia", terapis: "Ftr. Bintang Dito", top: 300, height: 120 },
      { time: "16:00 - 18:00", status: "Tidak Praktik", terapis: "Ftr. Andi Pratama", top: 480, height: 120 },
    ]},
    { day: "Sabtu", date: "12", slots: [
      { time: "08:00 - 09:00", status: "Tersedia", terapis: "Ftr. Bintang Dito", top: 0, height: 60 },
      { time: "09:00 - 10:00", status: "Tidak Praktik", terapis: "Ftr. Bintang Dito", top: 60, height: 60 },
      { time: "13:00 - 14:00", status: "Penuh", terapis: "Ftr. Sari Wijaya", top: 300, height: 60 },
    ]},
    { day: "Minggu", date: "13", slots: [
      { time: "13:00 - 15:00", status: "Tidak Praktik", terapis: "Ftr. Sari Wijaya", top: 300, height: 120 },
    ]}
  ];

  const getSlotColor = (status: string) => {
    if (status === "Tersedia") return "bg-[#dbeafe] border-[#bfdbfe] text-[#1e3a8a] hover:bg-[#bfdbfe] cursor-pointer";
    if (status === "Penuh") return "bg-[#f3f4f6] border-[#e5e7eb] text-[#9ca3af] cursor-not-allowed";
    if (status === "Tidak Praktik") return "bg-[#fee2e2] border-[#fecaca] text-[#991b1b] cursor-not-allowed";
    if (status === "Terpilih") return "bg-[#1e3a8a] border-[#1e40af] text-white shadow-md z-10";
    return "bg-white";
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      
      {/* --- BREADCRUMB & JUDUL --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <Link href="/admin/booking" className="hover:text-[#F5B301] transition-colors">List Booking Masuk</Link>
          <CaretRight size={14} />
          <span className="text-[#1b2a4e] font-bold">Reschedule</span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Reschedule Jadwal Pasien</h2>
        <p className="text-[#585858] text-[15px]">Sesuaikan kembali waktu konsultasi atau fisioterapi pasien.</p>
      </div>

      {/* --- KARTU INFO PASIEN --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-[#F5B301] font-bold flex items-center justify-center text-[16px]">KW</div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Pasien</span>
            <span className="text-[16px] font-bold text-[#1b2a4e]">Kartika Wulandari</span>
          </div>
        </div>
        
        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>
        
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Booking ID</span>
          <span className="text-[16px] font-bold text-[#1b2a4e]">#HP-9831</span>
        </div>

        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>

        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Jadwal Saat Ini</span>
          <div className="flex items-center gap-2 text-[#1b2a4e] font-bold">
            <CalendarBlank size={18} className="text-[#F5B301]" />
            19 Juli 2026, 10:00 WIB
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>

        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Layanan</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-yellow-50/30">
            <Barbell size={14} weight="bold" />
            <span className="text-[12px] font-bold">Fisioterapi Olahraga</span>
          </div>
        </div>
      </div>

      {/* --- GRID TENGAH: MINI KALENDER & PILIH TERAPIS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Kiri: Mini Kalender */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-400 hover:text-[#1b2a4e]"><CaretLeft size={20} /></button>
            <span className="font-bold text-[#1b2a4e]">Juli 2026</span>
            <button className="text-gray-400 hover:text-[#1b2a4e]"><CaretRightIcon size={20} /></button>
          </div>
          <div className="grid grid-cols-7 text-center gap-y-3">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
              <span key={d} className="text-[12px] font-bold text-gray-400">{d}</span>
            ))}
            {[29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2].map((num, i) => (
              <button 
                key={i} 
                className={`w-8 h-8 mx-auto rounded-full text-[13px] flex items-center justify-center transition-colors
                  ${num === 7 && i > 5 ? 'bg-[#FFFBEA] text-[#F5B301] font-bold border border-[#fdeeb3]' : 
                    num > 20 && i < 7 ? 'text-gray-300' : 'text-[#585858] hover:bg-gray-100'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Kanan: Pilih Fisioterapis & Layanan */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full flex flex-col">
            <h4 className="text-[14px] font-bold text-[#1b2a4e] mb-1">Pilih Fisioterapis</h4>
            <p className="text-[12px] text-gray-500 mb-4">Terapis yang ditampilkan hanya yang memegang layanan pilihan Anda (Olahraga)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors bg-blue-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Andi+Pratama" alt="Terapis" /></div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1b2a4e]">Ftr. Andi Pratama</span>
                    <span className="text-[11px] text-gray-500">Spesialis Neuro & Olahraga</span>
                  </div>
                </div>
                <CheckSquare size={24} weight="fill" className="text-[#1e3a8a]" />
              </div>
              <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Sari+Wijaya" alt="Terapis" /></div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1b2a4e]">Ftr. Sari Wijaya, S.Ft</span>
                    <span className="text-[11px] text-gray-500">Spesialis Olahraga</span>
                  </div>
                </div>
                <div className="w-5 h-5 border-2 border-gray-300 rounded mr-0.5"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-center justify-center gap-2 text-[#1e3a8a]">
            <Barbell size={18} weight="bold" />
            <span className="text-[13px] font-bold">Layanan Terpilih: Fisioterapi Olahraga (Cedera & Aktivitas Fisik)</span>
          </div>
        </div>
      </div>

      {/* --- BIG CALENDAR MINGGUAN (PERBAIKAN GRID & ABSOLUTE POSITION) --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <h3 className="text-center text-[22px] font-bold text-[#1b2a4e] mb-6">19 Juli 2026</h3>
        
        <div className="min-w-[800px] border-l border-t border-gray-200 bg-white">
          
          {/* Header Hari */}
          <div className="grid grid-cols-[60px_repeat(7,_1fr)] border-b border-gray-200">
            <div className="bg-white p-2 border-r border-gray-200"></div>
            {weekDays.map(day => (
              <div key={day.date} className="border-r border-gray-200 p-3 flex flex-col items-center justify-center bg-gray-50/50">
                <span className="text-[16px] font-bold text-[#1b2a4e]">{day.date}</span>
                <span className="text-[12px] text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>

          {/* Body Waktu & Slot (Tinggi total 12 jam x 60px = 720px) */}
          <div className="flex h-[720px] relative">
            
            {/* Garis Horizontal Background (Membantu presisi jam) */}
            <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="h-[60px] border-b border-gray-100 w-full"></div>
              ))}
            </div>

            {/* Kolom Jam */}
            <div className="w-[60px] flex flex-col border-r border-gray-200 bg-white z-10">
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(time => (
                <div key={time} className="h-[60px] flex items-start justify-center pt-2 text-[11px] text-gray-400">
                  {time}
                </div>
              ))}
            </div>

            {/* Kolom per Hari */}
            {weekDays.map(day => (
              <div key={day.date} className="flex-1 border-r border-gray-200 relative z-10">
                {day.slots.map((slot, idx) => (
                  <div 
                    key={idx} 
                    // INI DIA KUNCI PRESISINYA! Ngambil top & height dari data mock
                    style={{ top: `${slot.top}px`, height: `${slot.height - 2}px` }} 
                    className={`absolute left-1 right-1 p-2 rounded-lg border flex flex-col gap-0.5 transition-all overflow-hidden ${getSlotColor(slot.status)}`}
                  >
                    <span className={`text-[11px] font-bold leading-tight ${slot.status === 'Terpilih' ? 'text-white' : 'text-[#1b2a4e]'}`}>{slot.terapis}</span>
                    <span className={`text-[10px] truncate ${slot.status === 'Penuh' || slot.status === 'Tidak Praktik' ? 'opacity-70' : 'opacity-90'}`}>{slot.status}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- FORM ALASAN & TOMBOL --- */}
      <div className="w-full flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <NotePencil size={20} className="text-[#F5B301]" />
            <h4 className="text-[15px] font-bold text-[#1b2a4e]">Alasan Ubah Jadwal <span className="text-red-500">*</span></h4>
          </div>
          <textarea 
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Contoh: Pasien berhalangan hadir karena urusan pekerjaan mendadak. Ingin digeser ke hari senin siang."
            className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] resize-none text-[#1b2a4e]"
          ></textarea>
          
          <label className="flex items-center gap-3 cursor-pointer mt-2 w-max">
            <input type="checkbox" checked={sendWA} onChange={() => setSendWA(!sendWA)} className="w-4 h-4 rounded text-[#F5B301] focus:ring-[#F5B301]" />
            <span className="text-[13px] text-gray-500">Kirim notifikasi otomatis ke WhatsApp pasien mengenai perubahan jadwal ini.</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            href="/admin/booking"
            className="flex-1 py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-[#F5B301] bg-white border border-[#F5B301] hover:bg-yellow-50 transition-colors"
          >
            <CaretLeft size={18} />
            Kembali
          </Link>
          <button 
            onClick={handleSave}
            disabled={reason.trim() === ""}
            className="flex-1 py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] disabled:bg-[#fcd34d] transition-colors shadow-sm"
          >
            Simpan Perubahan
            <CaretRightIcon size={18} />
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Jadwal Berhasil Diubah</span>
        </div>
      )}

    </div>
  );
}