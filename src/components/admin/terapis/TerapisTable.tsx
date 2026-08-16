"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, CaretDown, DownloadSimple, PencilSimple, Bandaids, Brain, Barbell } from "@phosphor-icons/react";

// Mock Data sesuai SS 1
const initialTerapis = [
  { id: "01", nama: "Ftr. Andi Pratama", layanan: "Fisioterapi Muskuloskeletal", jadwal: "Senin - Sabtu", isActive: true },
  { id: "02", nama: "Ftr. Bintang Dito", layanan: "Fisioterapi Neuro", jadwal: "Senin - Jumat", isActive: true },
  { id: "03", nama: "Ftr. Sari Wijaya, S.Ft", layanan: "Fisioterapi Olahraga", jadwal: "Selasa - Sabtu", isActive: true },
];

export default function TerapisTable() {
  const [terapisData, setTerapisData] = useState(initialTerapis);

  // Helper toggle status aktif
  const toggleActive = (id: string) => {
    setTerapisData(terapisData.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
  };

  // Helper icon layanan
  const renderLayananIcon = (layanan: string) => {
    if (layanan.includes("Neuro")) return <Brain size={16} weight="bold" />;
    if (layanan.includes("Olahraga")) return <Barbell size={16} weight="bold" />;
    return <Bandaids size={16} weight="bold" />;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* --- FILTER BAR --- */}
      <div className="w-full flex flex-col xl:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama atau spesialisasi..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] transition-colors bg-white shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* Filter Layanan */}
          <div className="relative min-w-[200px]">
            <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer shadow-sm">
              <option>Semua Layanan</option>
              <option>Fisioterapi Olahraga</option>
              <option>Fisioterapi Neuro</option>
              <option>Fisioterapi Muskuloskeletal</option>
            </select>
            <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Tombol Ekspor */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[14px] rounded-xl hover:bg-gray-50 transition-colors shadow-sm ml-auto sm:ml-0">
            <DownloadSimple size={18} weight="bold" />
            Export
          </button>
        </div>
      </div>

      {/* --- TABEL TERAPIS --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 w-[60px] uppercase tracking-wider">No</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nama Terapis</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Layanan</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Jadwal Praktek</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {terapisData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="py-5 px-6 text-[14px] text-gray-500">{row.id}</td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-200">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.nama.replace("Ftr. ", ""))}&background=1b2a4e&color=fff`} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[14px] font-bold text-[#1b2a4e]">{row.nama}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#F5B301] text-[#F5B301] bg-white">
                      {renderLayananIcon(row.layanan)}
                      <span className="text-[12px] font-bold">{row.layanan}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-[14px] text-[#585858]">{row.jadwal}</span>
                  </td>
                  <td className="py-5 px-6">
                    <div onClick={() => toggleActive(row.id)} className="flex items-center gap-2 cursor-pointer group w-max">
                      <div className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center ${row.isActive ? 'bg-[#00b074]' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${row.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                      <span className={`text-[13px] font-bold ${row.isActive ? 'text-[#00b074]' : 'text-gray-400'}`}>
                        {row.isActive ? 'Aktif' : 'Off'}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <Link href="/admin/terapis/edit" className="inline-flex items-center justify-center gap-1.5 text-[#F5B301] hover:text-[#dda101] transition-colors font-bold text-[14px]">
                      Edit <PencilSimple size={16} weight="bold" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-[13px] text-gray-500">Menampilkan <strong>3</strong> dari <strong>24</strong> terapis</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'<'}</button>
            <button className="w-8 h-8 rounded-lg bg-[#F5B301] text-white font-bold flex items-center justify-center shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">3</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'>'}</button>
          </div>
        </div>
      </div>

    </div>
  );
}