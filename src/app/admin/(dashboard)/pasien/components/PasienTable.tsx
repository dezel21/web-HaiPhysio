"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretDown, DownloadSimple, Brain, Barbell, CaretRight, CaretLeft } from "@phosphor-icons/react";

// Mock Data sesuai SS 1
const initialData = [
  { id: "P-001", inisial: "YN", bgColor: "bg-yellow-100 text-[#d97706]", nama: "Yunus Nazar", tgl: "19 Jul 2026", layanan: "Fisioterapi Olahraga", sesi: "05" },
  { id: "P-002", inisial: "KW", bgColor: "bg-[#e6f7f1] text-[#00b074]", nama: "Kartika Wulandari", tgl: "15 Jul 2026", layanan: "Fisioterapi Neuro", sesi: "03" },
  { id: "P-003", inisial: "MM", bgColor: "bg-[#e0e7ff] text-[#3730a3]", nama: "Muhammad Malik", tgl: "10 Jul 2026", layanan: "Fisioterapi Neuro", sesi: "12" },
  { id: "P-004", inisial: "DW", bgColor: "bg-[#0f766e] text-white", nama: "Daniel Wenas", tgl: "05 Jul 2026", layanan: "Fisioterapi Olahraga", sesi: "08" },
];

export default function PasienTable() {
  const [filterLayanan, setFilterLayanan] = useState("Filter Layanan");

  // Logic Filtering
  const filteredData = filterLayanan === "Filter Layanan" 
    ? initialData 
    : initialData.filter(item => item.layanan === filterLayanan);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      
      {/* FILTER BAR */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
        <div className="flex gap-4 w-full sm:w-auto">
          {/* Dropdown Filter */}
          <div className="relative min-w-[200px]">
            <select 
              value={filterLayanan}
              onChange={(e) => setFilterLayanan(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#1b2a4e] font-medium text-[14px] py-2.5 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer"
            >
              <option value="Filter Layanan">Filter Layanan</option>
              <option value="Fisioterapi Olahraga">Fisioterapi Olahraga</option>
              <option value="Fisioterapi Neuro">Fisioterapi Neuro</option>
              <option value="Fisioterapi Muskuloskeletal">Fisioterapi Muskuloskeletal</option>
            </select>
            <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[14px] rounded-xl hover:bg-gray-50 transition-colors">
            <DownloadSimple size={18} weight="bold" />
            Ekspor CSV
          </button>
        </div>
        
        <span className="text-[13px] text-gray-400 font-medium">Terakhir diperbarui: 20 Jul 2026, 09:41</span>
      </div>

      {/* TABEL DATA */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">ID Pasien</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Kunjungan Terakhir</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Layanan</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Total Sesi</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors bg-white">
                <td className="py-5 px-6 text-[14px] font-bold text-[#1b2a4e]">{row.id}</td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full font-bold flex items-center justify-center text-[12px] shrink-0 ${row.bgColor}`}>
                      {row.inisial}
                    </div>
                    <span className="text-[14px] font-bold text-[#1b2a4e]">{row.nama}</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-[14px] text-gray-500">{row.tgl}</td>
                <td className="py-5 px-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-white">
                    {row.layanan.includes("Neuro") ? <Brain size={14} weight="bold" /> : <Barbell size={14} weight="bold" />}
                    <span className="text-[11px] font-bold">{row.layanan}</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-[14px] font-bold text-[#1b2a4e]">{row.sesi}</td>
                <td className="py-5 px-6 text-center">
                  <Link href="/admin/pasien/detail" className="inline-flex items-center justify-center gap-1.5 text-[#F5B301] hover:text-[#dda101] transition-colors font-bold text-[14px]">
                    Lihat Detail <CaretRight size={14} weight="bold" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="px-6 py-4 flex items-center justify-between bg-white">
        <span className="text-[13px] text-gray-500">
          Menampilkan <strong>{filteredData.length}</strong> dari <strong>124</strong> Pasien
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><CaretLeft size={16} weight="bold" /></button>
          <button className="w-8 h-8 rounded-lg bg-[#F5B301] text-white font-bold flex items-center justify-center shadow-sm">1</button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">2</button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">3</button>
          <span className="text-gray-400 mx-1 text-[14px]">...</span>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50">31</button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><CaretRight size={16} weight="bold" /></button>
        </div>
      </div>
    </div>
  );
}