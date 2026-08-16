"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { CaretRight, CaretDown, Info, Brain, Barbell, Bandaids, CheckCircle } from "@phosphor-icons/react";

export default function TambahJadwalPage() {
  const router = useRouter();

  const [terapis, setTerapis] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [selectedLayanan, setSelectedLayanan] = useState<string | null>(null);
  
  const [showToast, setShowToast] = useState(false);

  const layananList = [
    { id: "neuro", name: "Fisioterapi Neuro", icon: Brain },
    { id: "olahraga", name: "Fisioterapi Olahraga", icon: Barbell },
    { id: "muskuloskeletal", name: "Fisioterapi Muskuloskeletal", icon: Bandaids },
  ];

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/admin/jadwal");
    }, 2000);
  };

  return (
    // 1. Bungkus paling luar dibikin w-full aja (nggak usah di-center)
    <div className="w-full flex flex-col gap-6 pb-10">
      
      {/* --- BREADCRUMB & JUDUL (Tetap rata kiri) --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <Link href="/admin/jadwal" className="hover:text-[#F5B301] transition-colors">
            Kelola Slot Jadwal
          </Link>
          <CaretRight size={14} />
          <span className="text-[#1b2a4e] font-bold">Tambah Slot</span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Tambah Slot Jadwal Baru</h2>
      </div>

      {/* --- KOTAK FORM UTAMA (Ini yang di-center pakai mx-auto & max-w) --- */}
      <div className="w-full max-w-[900px] mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-8 shadow-sm">
        
        {/* 1. Input Nama Fisioterapis */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Fisioterapis</label>
          <div className="relative">
            <select 
              value={terapis}
              onChange={(e) => setTerapis(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#1b2a4e] text-[14px] p-4 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
            >
              <option value="" disabled hidden className="text-gray-400">Nama Fisioterapis</option>
              <option value="Ftr. Andi Pratama">Ftr. Andi Pratama</option>
              <option value="Ftr. Bintang Dito">Ftr. Bintang Dito</option>
              <option value="Ftr. Sari Wijaya, S.Ft">Ftr. Sari Wijaya, S.Ft</option>
            </select>
            <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100"></div>

        {/* 2. Input Tanggal Praktek */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#1b2a4e]">Tanggal Praktek</label>
          <div className="relative">
            <select 
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#1b2a4e] text-[14px] p-4 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
            >
              <option value="" disabled hidden className="text-gray-400">Select a date</option>
              <option value="21 Juli 2026">21 Juli 2026</option>
              <option value="22 Juli 2026">22 Juli 2026</option>
              <option value="23 Juli 2026">23 Juli 2026</option>
            </select>
            <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span className="text-[12px] text-gray-400 mt-1">Pilih tanggal untuk ketersediaan slot terapis.</span>
        </div>

        {/* 3. Input Jam Mulai & Jam Selesai */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Jam Mulai</label>
            <input 
              type="time" 
              value={jamMulai}
              onChange={(e) => setJamMulai(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>
          
          <div className="hidden md:block w-4 h-[2px] bg-gray-300 mt-8"></div>
          
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Jam Selesai</label>
            <input 
              type="time" 
              value={jamSelesai}
              onChange={(e) => setJamSelesai(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100 mt-2"></div>

        {/* 4. Layanan Terapi Tersedia */}
        <div className="flex flex-col gap-3">
          <label className="text-[14px] font-bold text-[#1b2a4e]">Layanan Terapi Tersedia</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {layananList.map((layanan) => {
              const Icon = layanan.icon;
              const isSelected = selectedLayanan === layanan.id;
              
              return (
                <button
                  key={layanan.id}
                  onClick={() => setSelectedLayanan(layanan.id)}
                  className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border transition-all duration-200
                    ${isSelected 
                      ? "border-[#F5B301] bg-yellow-50 text-[#F5B301] font-bold ring-1 ring-[#F5B301]" 
                      : "border-gray-200 bg-white text-gray-500 hover:border-[#F5B301] hover:text-[#F5B301] font-medium"
                    }`}
                >
                  <Icon size={20} weight={isSelected ? "bold" : "regular"} />
                  <span className="text-[14px]">{layanan.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Warning Box (Himbauan) */}
        <div className="bg-[#FFFBEA] border border-[#fdeeb3] rounded-xl p-5 flex items-start gap-4 mt-2">
          <Info size={24} weight="fill" className="text-[#F5B301] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px] font-bold text-[#1b2a4e]">Himbauan Aktivasi Slot</h4>
            <p className="text-[13px] text-[#585858] leading-relaxed">
              Pastikan jadwal dan layanan yang dipilih sudah sesuai sebelum menyimpan. Slot akan tersedia bagi pasien setelah jadwal diaktifkan.
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100"></div>

        {/* 6. Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            href="/admin/jadwal"
            className="flex-1 py-4 flex items-center justify-center rounded-xl font-bold text-[#585858] bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button 
            onClick={handleSave}
            className="flex-1 py-4 flex items-center justify-center rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm"
          >
            Simpan Slot Baru
          </button>
        </div>

      </div>

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Jadwal Baru Berhasil Ditambahkan</span>
        </div>
      )}

    </div>
  );
}