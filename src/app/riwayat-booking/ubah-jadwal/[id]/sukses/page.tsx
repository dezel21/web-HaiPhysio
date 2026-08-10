"use client";

import { Copy, FileText, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, use } from "react";

export default function SuksesUbahJadwalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isCopied, setIsCopied] = useState(false);
  const nomorReservasi = "RESV - 456130";

  // Fungsi buat nyalin teks ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(nomorReservasi);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
      <div className="w-full max-w-[800px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex flex-col items-center">
        
        {/* Ilustrasi Sukses (Pake placeholder image dulu) */}
        <div className="w-[280px] h-[200px] mb-8 flex justify-center items-center">
          <img 
            src="/success-illustration.png" 
            alt="Sukses" 
            className="w-full h-full object-contain"
            // Kalau lu blm ada gambarnya, ganti src-nya pakai path ilustrasi lu nanti
          />
        </div>

        {/* Teks Sukses */}
        <div className="text-center mb-8">
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#1b2a4e] mb-2">Ubah Jadwal Terapis Anda Berhasil Diubah!</h1>
          <p className="text-[#585858] text-[14px]">
            Silakan tunjukkan nomor reservasi Anda saat tiba di klinik.
          </p>
        </div>

        {/* Kotak Nomor Reservasi */}
        <div className="w-full max-w-[400px] border-2 border-dashed border-[#b8c4df] bg-[#f8faff] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 mb-10 relative">
          <h2 className="text-[32px] font-bold text-[#1b2a4e] tracking-wide">{nomorReservasi}</h2>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-[#585858] hover:text-[#1b2a4e] transition-colors"
          >
            {isCopied ? <CheckCircle size={20} className="text-green-500" weight="fill" /> : <Copy size={20} />}
            <span className="text-[13px] font-medium">{isCopied ? "Tersalin!" : "Klik untuk salin nomor"}</span>
          </button>
        </div>

        {/* Card Detail Sesi Terapi */}
        <div className="w-full border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={28} weight="regular" className="text-[#1b2a4e]" />
            <h3 className="text-[20px] font-bold text-[#1b2a4e]">Detail Sesi Terapi</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Jenis Layanan</label>
              <input type="text" value="Fisioterapi Olahraga (Cedera & Aktivitas Fisik)" readOnly className="w-full p-3.5 border border-gray-200 text-gray-600 rounded-xl outline-none text-[14px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Fisioterapis</label>
              <input type="text" value="Ftr. Sari Wijaya, S.Ft" readOnly className="w-full p-3.5 border border-gray-200 text-gray-600 rounded-xl outline-none text-[14px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Hari & Tanggal</label>
              <input type="text" value="Sabtu, 12 Juli 2026" readOnly className="w-full p-3.5 border border-gray-200 text-gray-600 rounded-xl outline-none text-[14px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Waktu / Jam</label>
              <input type="text" value="10:00 - 11:00 WIB" readOnly className="w-full p-3.5 border border-gray-200 text-gray-600 rounded-xl outline-none text-[14px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Lokasi Klinik</label>
              <input type="text" value="Hai Physio Pusat (Ruko Kebon Jeruk No. 12, Jakarta Barat)" readOnly className="w-full p-3.5 border border-gray-200 text-gray-600 rounded-xl outline-none text-[14px]" />
            </div>
          </div>
        </div>

        {/* Action Buttons Bawah */}
        <div className="w-full flex flex-col gap-4">
          <Link 
            href="/riwayat-booking" 
            className="w-full py-4 text-center rounded-xl bg-[#F5B301] text-white font-bold text-[15px] hover:bg-[#dda101] shadow-[0_4px_12px_rgba(245,179,1,0.2)] transition-colors"
          >
            Lihat Detail Riwayat
          </Link>
          <Link 
            href="/" 
            className="w-full py-4 text-center rounded-xl bg-[#F5F5F5] text-[#F5B301] font-bold text-[15px] hover:bg-gray-200 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}