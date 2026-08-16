"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import PasienStats from "./components/PasienStats";
import PasienTable from "./components/PasienTable";

export default function KelolaDataPasienPage() {
  return (
    <div className="w-full flex flex-col gap-8 pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Kelola Data Pasien</h2>
        <p className="text-[#585858] text-[15px]">Daftar riwayat medis administratif seluruh pasien klinik.</p>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative max-w-md">
        <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari ID Pasien atau Nama Pasien..." 
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] transition-colors bg-white shadow-sm"
        />
      </div>

      {/* --- KOMPONEN STATS --- */}
      <PasienStats />

      {/* --- KOMPONEN TABEL & FILTER --- */}
      <PasienTable />

    </div>
  );
}