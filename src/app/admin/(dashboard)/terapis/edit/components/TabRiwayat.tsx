"use client";

import { MagnifyingGlass, CalendarBlank, CaretDown, DownloadSimple, CheckCircle, Brain, Barbell, Bandaids } from "@phosphor-icons/react";

export default function TabRiwayat() {
  const renderLayananIcon = (layanan: string) => {
    if (layanan.includes("Neuro")) return <Brain size={14} weight="bold" />;
    if (layanan.includes("Olahraga")) return <Barbell size={14} weight="bold" />;
    return <Bandaids size={14} weight="bold" />;
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Cari nama pasien..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] bg-white shadow-sm" />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative min-w-[210px]">
            <CalendarBlank size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-11 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer shadow-sm">
              <option>19 Juli - 21 Juli 2026</option>
            </select>
            <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative min-w-[190px]">
            <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer shadow-sm">
              <option>Fisioterapi Olahraga</option>
              <option>Fisioterapi Neuro</option>
              <option>Fisioterapi Muskuloskeletal</option>
            </select>
            <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative min-w-[160px]">
            <select className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[14px] py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer shadow-sm">
              <option>Terkonfirmasi</option>
              <option>Selesai</option>
              <option>Dibatalkan</option>
            </select>
            <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[14px] rounded-xl hover:bg-gray-50 shadow-sm"><DownloadSimple size={18} weight="bold" /> Ekspor CSV</button>
        </div>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nama Pasien</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Tipe Layanan</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tgl: "15 Juli 2026", in: "BS", nama: "Budi Santoso", lay: "Fisioterapi Olahraga" },
                { tgl: "14 Juli 2026", in: "AR", nama: "Ani Rahayu", lay: "Fisioterapi Muskuloskeletal" },
                { tgl: "12 Juli 2026", in: "DW", nama: "Dedi Wijaya", lay: "Fisioterapi Neuro" },
                { tgl: "10 Juli 2026", in: "SP", nama: "Siti Permata", lay: "Fisioterapi Olahraga" },
                { tgl: "08 Juli 2026", in: "RP", nama: "Raka Putra", lay: "Fisioterapi Muskuloskeletal" }
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 bg-white">
                  <td className="py-5 px-6 text-[14px] text-gray-500 font-medium">{row.tgl}</td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#3730A3] font-bold flex items-center justify-center text-[11px] shrink-0">{row.in}</div>
                      <span className="text-[14px] font-bold text-[#1b2a4e]">{row.nama}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-white">
                      {renderLayananIcon(row.lay)}
                      <span className="text-[11px] font-bold">{row.lay}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-1.5 text-[#00b074] font-bold text-[13px]">
                      <CheckCircle size={18} weight="fill" /> Selesai
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-[13px] text-gray-500">Menampilkan 5 dari 124 sesi</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'<'}</button>
            <button className="w-8 h-8 rounded-lg bg-[#F5B301] text-white font-bold flex items-center justify-center shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">3</button>
            <span className="text-gray-400 mx-1">...</span>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">25</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}