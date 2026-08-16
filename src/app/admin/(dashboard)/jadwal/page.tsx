import Link from "next/link";
import ScheduleStats from "@/components/admin/jadwal/ScheduleStats";
import ScheduleFilter from "@/components/admin/jadwal/ScheduleFilter";
import ScheduleGrid from "@/components/admin/jadwal/ScheduleGrid";

export default function AdminJadwalPage() {
  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-bold text-[#1b2a4e]">Manajemen Slot Jadwal Terapi</h2>
          <p className="text-[#585858] text-[15px]">Atur ketersediaan waktu untuk sesi fisioterapi harian.</p>
        </div>

        {/* Tombol Tambah Slot Baru */}
        <Link 
          href="/admin/jadwal/tambah"
          className="flex items-center justify-center px-6 py-3 bg-[#F5B301] hover:bg-[#dda101] text-white font-bold text-[15px] rounded-xl transition-all shadow-sm shrink-0"
        >
          Tambah Slot Baru
        </Link>
      </div>

      {/* --- KOMPONEN STATISTIK --- */}
      <ScheduleStats />

      {/* --- KOMPONEN FILTER --- */}
      <ScheduleFilter />

      {/* --- KOMPONEN GRID KARTU JADWAL --- */}
      <div className="mt-2">
        <ScheduleGrid />
      </div>

    </div>
  );
}