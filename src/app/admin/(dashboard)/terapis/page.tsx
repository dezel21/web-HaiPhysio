import Link from "next/link";
import TerapisStats from "@/components/admin/terapis/TerapisStats";
import TerapisTable from "@/components/admin/terapis/TerapisTable";

export default function AdminTerapisPage() {
  return (
    <div className="w-full flex flex-col gap-8 pb-10">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-bold text-[#1b2a4e]">Kelola Data Terapis</h2>
          <p className="text-[#585858] text-[15px]">Manajemen profil, spesialisasi, dan jadwal kerja fisioterapis.</p>
        </div>

        {/* Tombol Tambah Terapis */}
        <Link 
          href="/admin/terapis/tambah"
          className="flex items-center justify-center px-6 py-3 bg-[#F5B301] hover:bg-[#dda101] text-white font-bold text-[15px] rounded-xl transition-all shadow-sm shrink-0"
        >
          Tambah Terapis
        </Link>
      </div>

      {/* --- KOMPONEN STATISTIK --- */}
      <TerapisStats />

      {/* --- KOMPONEN TABEL & FILTER --- */}
      <TerapisTable />

    </div>
  );
}