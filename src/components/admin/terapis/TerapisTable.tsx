"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, CaretDown, DownloadSimple, PencilSimple, Bandaids, Brain, Barbell, CheckCircle, Users } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

interface TerapisTableProps {
  therapists: any[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function TerapisTable({ therapists, isLoading, onRefresh }: TerapisTableProps) {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToggling, setIsToggling] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter Data di Sisi Klien
  const filteredData = therapists.filter((t: any) => {
    const nameMatch = (t.name || t.fullName || "").toLowerCase().includes(search.toLowerCase());
    const specMatch = (t.specialization || "").toLowerCase().includes(search.toLowerCase());
    const matchSearch = nameMatch || specMatch;

    const matchService = serviceFilter 
      ? (t.specialization || "").toLowerCase().includes(serviceFilter.toLowerCase())
      : true;

    return matchSearch && matchService;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Toggle Status Aktif Terapis ke Backend API
  const handleToggle = async (t: any) => {
    const currentActive = t.isActive !== false && t.is_active !== false;
    const newActive = !currentActive;
    setIsToggling(t.id);

    try {
      await adminService.updateTherapist(t.id, { is_active: newActive });
      setToastMessage(`Status ${t.name || "Terapis"} berhasil diubah menjadi ${newActive ? "Aktif" : "Nonaktif"}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      onRefresh();
    } catch (error) {
      console.error("Gagal update status terapis:", error);
      onRefresh();
    } finally {
      setIsToggling(null);
    }
  };

  // Ekspor Data Terapis ke CSV
  const handleExportCsv = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data terapis untuk diekspor!");
      return;
    }

    const headers = ["No", "ID Terapis", "Nama Terapis", "Spesialisasi", "Jadwal Praktek", "No Telepon", "Email", "Status"];
    const rows = filteredData.map((t, i) => {
      const isActive = t.isActive !== false && t.is_active !== false;
      return [
        i + 1,
        t.id,
        `"${t.name || t.fullName || "-"}"`,
        `"${t.specialization || "Fisioterapi"}"`,
        `"${t.scheduleDays || t.practiceSchedule || "Senin - Sabtu"}"`,
        `"${t.phone || "-"}"`,
        `"${t.email || "-"}"`,
        isActive ? "Aktif" : "Nonaktif",
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Terapis_HaiPhysio_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderLayananIcon = (layanan: string) => {
    if (layanan.toLowerCase().includes("neuro")) return <Brain size={16} weight="bold" />;
    if (layanan.toLowerCase().includes("olahraga")) return <Barbell size={16} weight="bold" />;
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama terapis atau spesialisasi..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] transition-colors bg-white shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Filter Layanan */}
          <div className="relative min-w-[200px]">
            <select 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[13px] font-semibold py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer shadow-sm"
            >
              <option value="">Semua Layanan</option>
              <option value="Olahraga">Fisioterapi Olahraga</option>
              <option value="Neuro">Fisioterapi Neuro</option>
              <option value="Muskuloskeletal">Fisioterapi Muskuloskeletal</option>
            </select>
            <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Tombol Ekspor */}
          <button 
            onClick={handleExportCsv}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[13px] rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <DownloadSimple size={18} weight="bold" className="text-[#F5B301]" />
            Ekspor CSV
          </button>
        </div>
      </div>

      {/* --- TABEL TERAPIS --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="py-20 text-center text-gray-400 font-medium">
            Memuat daftar fisioterapis...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100">
              <Users size={32} />
            </div>
            <h4 className="text-[17px] font-bold text-[#1b2a4e] mb-1">Data Terapis Tidak Ditemukan</h4>
            <p className="text-[13px] text-gray-500 max-w-sm">
              Tidak ada terapis yang sesuai dengan kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 w-[60px] uppercase tracking-wider">No</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Nama Terapis</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Layanan</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Jadwal Praktek</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row: any, index: number) => {
                  const tName = row.name || row.fullName || "Fisioterapis";
                  const sName = row.specialization || "Fisioterapi";
                  const schedule = row.scheduleDays || row.practiceSchedule || "Senin - Sabtu";
                  const isActive = row.isActive !== false && row.is_active !== false;

                  return (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="py-5 px-6 text-[14px] text-gray-500">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#1b2a4e] overflow-hidden shrink-0 border border-gray-200">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(tName.replace("Ftr. ", ""))}&background=1b2a4e&color=fff`} 
                              alt="Avatar" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#1b2a4e]">{tName}</span>
                            <span className="text-[12px] text-gray-400">SIP: {row.sip || "-"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#F5B301] text-[#D69A00] bg-yellow-50/40">
                          {renderLayananIcon(sName)}
                          <span className="text-[12px] font-bold">{sName}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[14px] text-[#585858] font-medium">{schedule}</span>
                      </td>
                      <td className="py-5 px-6">
                        <div onClick={() => handleToggle(row)} className="flex items-center gap-2 cursor-pointer group w-max">
                          <div className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center ${isActive ? 'bg-[#00b074]' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                          <span className={`text-[13px] font-bold ${isActive ? 'text-[#00b074]' : 'text-gray-400'}`}>
                            {isActive ? 'Aktif' : 'Off'}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <Link 
                          href={`/admin/terapis/edit?id=${row.id}`} 
                          className="inline-flex items-center justify-center gap-1.5 text-[#F5B301] hover:text-[#dda101] transition-colors font-bold text-[14px] px-3 py-1.5 rounded-lg hover:bg-yellow-50"
                        >
                          Edit <PencilSimple size={16} weight="bold" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredData.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-[13px] text-gray-500">
              Menampilkan <strong>{paginatedData.length}</strong> dari <strong>{filteredData.length}</strong> terapis
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                {'<'}
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg font-bold text-[13px] transition-colors ${
                    currentPage === i + 1
                      ? "bg-[#1b2a4e] text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                {'>'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifikasi */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
