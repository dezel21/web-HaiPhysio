"use client";

import { Brain, Barbell, Bandaids } from "@phosphor-icons/react";

// Data bohongan (mock) sesuai desain Figma lu
const dummySchedules = [
  { id: 1, waktu: "08:00 - 09:00", pasien: "Mochammad Fachriza Ramadhan", terapis: "Ftr. Andi Pratama", layanan: "Fisioterapi Neuro", status: "Terkonfirmasi" },
  { id: 2, waktu: "09:00 - 10:00", pasien: "Siti Nurhaliza", terapis: "Ftr. Bintang Dito", layanan: "Fisioterapi Olahraga", status: "Selesai" },
  { id: 3, waktu: "10:00 - 11:00", pasien: "Budi Santoso", terapis: "Ftr. Sari Wijaya, S.Ft", layanan: "Fisioterapi Muskuloskeletal", status: "Dibatalkan" },
  { id: 4, waktu: "11:00 - 12:00", pasien: "Aisyah Putri Wulandari", terapis: "Ftr. Andi Pratama", layanan: "Fisioterapi Neuro", status: "Terkonfirmasi" },
  { id: 5, waktu: "12:00 - 13:00", pasien: "Roni Wijaya", terapis: "Ftr. Bintang Dito", layanan: "Fisioterapi Olahraga", status: "Selesai" },
  { id: 6, waktu: "13:00 - 14:00", pasien: "Joko Prasetyo Kusumo", terapis: "Ftr. Sari Wijaya, S.Ft", layanan: "Fisioterapi Muskuloskeletal", status: "Dibatalkan" },
];

export default function ScheduleTable() {

  // Fungsi bantuan buat nampilin label layanan beserta ikonnya
  const renderLayananBadge = (layanan: string) => {
    let Icon = Bandaids; // Default icon
    if (layanan.includes("Neuro")) Icon = Brain;
    if (layanan.includes("Olahraga")) Icon = Barbell;

    return (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5B301] text-[#F5B301] bg-white">
        <Icon size={16} weight="regular" />
        <span className="text-[13px] font-bold">{layanan}</span>
      </div>
    );
  };

  // Fungsi bantuan buat nampilin status dengan titik warna-warni
  const renderStatusBadge = (status: string) => {
    let colorClass = "";
    let dotClass = "";

    if (status === "Terkonfirmasi") {
      colorClass = "border-green-500 text-green-600 bg-white";
      dotClass = "bg-green-500";
    } else if (status === "Selesai") {
      colorClass = "border-gray-400 text-gray-600 bg-white";
      dotClass = "bg-gray-400";
    } else if (status === "Dibatalkan") {
      colorClass = "border-red-400 text-red-500 bg-white";
      dotClass = "bg-red-500";
    }

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${colorClass}`}>
        <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
        <span className="text-[13px] font-bold">{status}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
      
      {/* Bagian Header Tabel */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col gap-1">
        <h3 className="text-[18px] font-bold text-[#1b2a4e]">Jadwal Sesi Hari Ini</h3>
        <span className="text-[13px] text-gray-500">Total {dummySchedules.length} sesi</span>
      </div>

      {/* Bagian Isi Tabel (Bisa di-scroll ke samping kalau layarnya kekecilan) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 w-[50px]">No</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 min-w-[140px]">Waktu</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 min-w-[200px]">Nama Pasien</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 min-w-[180px]">Nama Terapis</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 min-w-[200px] text-center">Layanan</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 min-w-[150px] text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Looping data jadwal buat dijadiin baris tabel */}
            {dummySchedules.map((row, index) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-[14px] text-gray-500">{index + 1}</td>
                <td className="py-4 px-6 text-[14px] text-gray-600">{row.waktu}</td>
                <td className="py-4 px-6 text-[14px] font-bold text-[#1b2a4e]">{row.pasien}</td>
                <td className="py-4 px-6 text-[14px] text-[#1b2a4e]">{row.terapis}</td>
                <td className="py-4 px-6 text-center">{renderLayananBadge(row.layanan)}</td>
                <td className="py-4 px-6 text-center">{renderStatusBadge(row.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}