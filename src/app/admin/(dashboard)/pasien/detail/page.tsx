"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, ClipboardText, CalendarBlank, Barbell, CaretRight, CheckCircle 
} from "@phosphor-icons/react";

export default function DetailPasienPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // State Form Data Pasien
  const [formData, setFormData] = useState({
    telepon: "+62 812-3456-7890",
    email: "kartika.wulandari@email.com",
    tglLahir: "12 Maret 1945"
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Simpan data dan munculin toast (SS 4)
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-10 max-w-[1100px] mx-auto animate-in fade-in duration-300">
      
      {/* --- BREADCRUMB --- */}
      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
        <Link href="/admin/pasien" className="hover:text-[#F5B301] transition-colors">Kelola Data Pasien</Link>
        <span>›</span>
        <span className="text-[#1b2a4e] font-bold">Lihat Detail</span>
      </div>

      {/* --- HEADER PROFIL --- */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-yellow-100 text-[#d97706] font-bold flex items-center justify-center text-[28px] shrink-0">
            KW
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[28px] font-bold text-[#1b2a4e] leading-tight">Kartika Wulandari</h2>
            <p className="text-[14px] text-gray-500">ID Pasien: <span className="font-bold text-[#1b2a4e]">P-002</span></p>
          </div>
        </div>

        <button 
          onClick={handleEditToggle}
          className={`px-6 py-2.5 rounded-xl font-bold text-[14px] transition-colors border shadow-sm shrink-0 ${
            isEditing 
              ? 'bg-[#F5B301] text-white border-[#F5B301] hover:bg-[#dda101]' 
              : 'bg-white text-[#1b2a4e] border-gray-200 hover:bg-gray-50'
          }`}
        >
          {isEditing ? 'Simpan Data' : 'Edit Data'}
        </button>
      </div>

      {/* --- 3 KARTU INFORMASI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        
        {/* Kartu 1: Data Pasien */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e]">
            <User size={20} weight="bold" /> 
            <span className="text-[16px]">Data Pasien</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">No Telepon</span>
              {isEditing ? (
                <input type="text" value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})} className="border border-gray-200 rounded-lg p-2 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]"/>
              ) : (
                <span className="text-[14px] font-medium text-[#1b2a4e]">{formData.telepon}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
              {isEditing ? (
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border border-gray-200 rounded-lg p-2 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]"/>
              ) : (
                <span className="text-[14px] font-medium text-[#1b2a4e]">{formData.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Lahir</span>
              {isEditing ? (
                <input type="text" value={formData.tglLahir} onChange={(e) => setFormData({...formData, tglLahir: e.target.value})} className="border border-gray-200 rounded-lg p-2 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]"/>
              ) : (
                <span className="text-[14px] font-medium text-[#1b2a4e]">{formData.tglLahir}</span>
              )}
            </div>
          </div>
        </div>

        {/* Kartu 2: Ringkasan Medis */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e]">
            <ClipboardText size={20} weight="bold" /> 
            <span className="text-[16px]">Ringkasan Medis</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Layanan</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-yellow-50/30 w-max">
                <Barbell size={14} weight="bold" />
                <span className="text-[12px] font-bold">Fisioterapi Olahraga</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Progress<br/>Saat Ini</span>
                <span className="text-[14px] font-bold text-[#1b2a4e]">8/12 Sesi</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#F5B301] w-[66%] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Program</span>
              <span className="text-[14px] font-medium text-[#1b2a4e]">Cedera & Aktivitas Fisik</span>
            </div>
          </div>
        </div>

        {/* Kartu 3: Fisioterapi Mendatang */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e] mb-5">
            <CalendarBlank size={20} weight="bold" /> 
            <span className="text-[16px]">Fisioterapi Mendatang</span>
          </div>
          
          <div className="border border-[#F5B301] bg-[#FFFBEA] rounded-xl p-4 flex gap-4 items-center mb-auto">
            <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center w-14 h-14 shrink-0 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Juli</span>
              <span className="text-[18px] font-bold text-[#1b2a4e] leading-none mt-0.5">20</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1b2a4e]">Sesi Fisioterapi #9</span>
              <span className="text-[12px] text-gray-500">Kamis, 09:00 WIB</span>
              <span className="text-[12px] text-gray-500">with Ftr. Andi Pratama</span>
            </div>
          </div>

          <button className="text-[#F5B301] font-bold text-[14px] hover:text-[#dda101] transition-colors mx-auto mt-6 flex items-center gap-1">
            Ubah Jadwal <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      {/* --- RIWAYAT SESI TABEL --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6 mt-2">
        <h3 className="text-[20px] font-bold text-[#1b2a4e]">Riwayat</h3>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Waktu & Tanggal</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Layanan</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nama Terapis</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[300px]">Catatan</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tgl: "July 15, 2026", jam: "09:00 - 10:00 WIB", note: "Ekstensi lutut meningkat hingga 95%. Tingkat nyeri minimal." },
                { tgl: "July 10, 2026", jam: "09:00 - 10:00 WIB", note: "Fokus pada gerakan lateral. Sedikit pembengkakan terlihat setelahnya." },
                { tgl: "July 5, 2026", jam: "09:30 - 10:30 WIB", note: "Menetapkan tolak ukur awal untuk program pemulihan Pasien." }
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1b2a4e] text-[14px]">{row.tgl}</span>
                      <span className="text-[12px] text-gray-500">{row.jam}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-white">
                      <Barbell size={14} weight="bold" />
                      <span className="text-[11px] font-bold">Fisioterapi Olahraga</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-[14px] font-bold text-[#1b2a4e]">Ftr. Andi Pratama</td>
                  <td className="py-5 px-4 text-[13px] text-gray-500 leading-relaxed pr-8">{row.note}</td>
                  <td className="py-5 px-4 text-right">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 text-gray-500 text-[12px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Selesai
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pt-2 flex items-center justify-between bg-white">
          <span className="text-[13px] text-gray-500">
            Menampilkan <strong>3</strong> of <strong>6</strong> Riwayat
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">{'<'}</button>
            <button className="w-8 h-8 rounded-lg bg-[#F5B301] text-white font-bold flex items-center justify-center shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">2</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">3</button>
            <span className="text-gray-400 mx-1 text-[14px]">...</span>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">31</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">{'>'}</button>
          </div>
        </div>
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Data berhasil diperbarui</span>
        </div>
      )}

    </div>
  );
}