"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlass, CaretDown, DownloadSimple, CheckCircle, Brain, Barbell, Bandaids, CalendarX, Clock } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

interface TabRiwayatProps {
  therapistName?: string;
  therapistId?: string;
}

export default function TabRiwayat({ therapistName, therapistId }: TabRiwayatProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTherapistSessions = async () => {
      setIsLoading(true);
      try {
        const res = await adminService.getBookings();
        const allBookings = res.data?.bookings || res.bookings || [];

        // Filter sesi milik terapis ini
        const filtered = allBookings.filter((b: any) => {
          const tName = (b.therapistName || b.therapist_name || "").toLowerCase();
          const targetName = (therapistName || "").toLowerCase();
          const matchName = targetName ? tName.includes(targetName) || targetName.includes(tName) : true;
          const matchId = therapistId ? b.therapistId === therapistId || b.therapist_id === therapistId : true;
          return matchName || matchId;
        });

        setSessions(filtered);
      } catch (error) {
        console.error("Gagal memuat riwayat sesi terapis:", error);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapistSessions();
  }, [therapistName, therapistId]);

  // Filter di sisi client
  const filteredData = sessions.filter((s: any) => {
    const pName = (s.patientName || s.patient_name || "").toLowerCase();
    const matchSearch = pName.includes(search.toLowerCase());
    
    const sName = (s.serviceName || s.service_name || "").toLowerCase();
    const matchService = serviceFilter ? sName.includes(serviceFilter.toLowerCase()) : true;

    const st = (s.status || "").toLowerCase();
    const matchStatus = statusFilter ? st === statusFilter.toLowerCase() : true;

    return matchSearch && matchService && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderLayananIcon = (layanan: string) => {
    if (layanan.toLowerCase().includes("neuro")) return <Brain size={14} weight="bold" />;
    if (layanan.toLowerCase().includes("olahraga")) return <Barbell size={14} weight="bold" />;
    return <Bandaids size={14} weight="bold" />;
  };

  const renderStatus = (statusRaw: string) => {
    const status = (statusRaw || "").toLowerCase();
    let label = "Terkonfirmasi";
    let colorClass = "border-green-500 text-green-600 bg-green-50/40";

    if (status === "selesai") {
      label = "Selesai";
      colorClass = "border-gray-300 text-gray-500 bg-gray-50";
    } else if (status === "dibatalkan") {
      label = "Dibatalkan";
      colorClass = "border-red-300 text-red-500 bg-red-50/40";
    } else if (status === "tidak_hadir") {
      label = "Tidak Hadir";
      colorClass = "border-orange-300 text-orange-500 bg-orange-50/40";
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold ${colorClass}`}>
        <CheckCircle size={15} weight="fill" />
        <span>{label}</span>
      </div>
    );
  };

  // Ekspor CSV
  const handleExportCsv = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada riwayat sesi untuk diekspor!");
      return;
    }

    const headers = ["No", "Kode Reservasi", "Tanggal", "Waktu", "Nama Pasien", "Layanan", "Status"];
    const rows = filteredData.map((s, i) => [
      i + 1,
      s.bookingReferenceCode || s.code || `#HP-${s.id}`,
      s.slotDate || s.slot_date || "-",
      `${(s.startTime || "").substring(0, 5)} - ${(s.endTime || "").substring(0, 5)} WIB`,
      `"${s.patientName || s.patient_name || "-"}"`,
      `"${s.serviceName || s.service_name || "Fisioterapi"}"`,
      s.status || "-",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Riwayat_Sesi_${(therapistName || "Terapis").replace(/[^a-zA-Z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama pasien..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#1b2a4e] outline-none focus:border-[#F5B301] bg-white shadow-sm" 
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[190px]">
            <select 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[13px] font-semibold py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer shadow-sm"
            >
              <option value="">Semua Layanan</option>
              <option value="Olahraga">Fisioterapi Olahraga</option>
              <option value="Neuro">Fisioterapi Neuro</option>
              <option value="Muskuloskeletal">Fisioterapi Muskuloskeletal</option>
            </select>
            <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative min-w-[160px]">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-[#585858] text-[13px] font-semibold py-3 pl-4 pr-10 rounded-xl outline-none focus:border-[#F5B301] cursor-pointer shadow-sm"
            >
              <option value="">Semua Status</option>
              <option value="terkonfirmasi">Terkonfirmasi</option>
              <option value="selesai">Selesai</option>
              <option value="dibatalkan">Dibatalkan</option>
            </select>
            <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button 
            onClick={handleExportCsv}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-[#1b2a4e] font-bold text-[13px] rounded-xl hover:bg-gray-50 shadow-sm"
          >
            <DownloadSimple size={18} weight="bold" className="text-[#F5B301]" />
            Ekspor CSV
          </button>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="py-20 text-center text-gray-400 font-medium">
            Memuat riwayat sesi konsultasi...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100">
              <CalendarX size={32} />
            </div>
            <h4 className="text-[17px] font-bold text-[#1b2a4e] mb-1">Belum Ada Riwayat Sesi</h4>
            <p className="text-[13px] text-gray-500 max-w-sm">
              Belum ada riwayat konsultasi pasien bersama {therapistName || "terapis ini"}.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Tanggal & Waktu</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nama Pasien</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Tipe Layanan</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row: any) => {
                  const pName = row.patientName || row.patient_name || "Pasien";
                  const sName = row.serviceName || row.service_name || "Fisioterapi";
                  const dateStr = row.slotDate || row.slot_date || "-";
                  const timeStr = `${(row.startTime || "").substring(0, 5)} - ${(row.endTime || "").substring(0, 5)} WIB`;
                  const initials = pName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

                  return (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 bg-white transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#1b2a4e]">{dateStr}</span>
                          <span className="text-[12px] text-gray-400">{timeStr}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#3730A3] font-bold flex items-center justify-center text-[11px] shrink-0">
                            {initials}
                          </div>
                          <span className="text-[14px] font-bold text-[#1b2a4e]">{pName}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#D69A00] bg-yellow-50/40">
                          {renderLayananIcon(sName)}
                          <span className="text-[11px] font-bold">{sName}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center">
                        {renderStatus(row.status)}
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
              Menampilkan <strong>{paginatedData.length}</strong> dari <strong>{filteredData.length}</strong> sesi
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
    </div>
  );
}
