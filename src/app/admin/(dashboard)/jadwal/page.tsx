"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkle, Plus } from "@phosphor-icons/react";
import ScheduleStats from "@/components/admin/jadwal/ScheduleStats";
import ScheduleFilter from "@/components/admin/jadwal/ScheduleFilter";
import ScheduleGrid from "@/components/admin/jadwal/ScheduleGrid";
import { adminService } from "@/services/adminService";
import { bookingService } from "@/services/bookingService";

export default function AdminJadwalPage() {
  const [therapists, setTherapists] = useState<any[]>([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });

  const [slots, setSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateStartDate, setGenerateStartDate] = useState(selectedDate);
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Ambil daftar terapis
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await adminService.getTherapists();
        const list = res.data?.therapists || res.therapists || [];
        setTherapists(list);
      } catch (error) {
        console.error("Gagal memuat terapis:", error);
      }
    };
    fetchTherapists();
  }, []);

  // 2. Ambil data slot sesuai filter terapis & tanggal
  const loadSlots = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getSlots({
        date_from: selectedDate,
        date_to: selectedDate,
        therapist_id: selectedTherapistId || undefined,
      });
      const list = res.data?.slots || res.slots || [];
      setSlots(list);
    } catch (error) {
      console.error("Gagal memuat slot jadwal:", error);
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, [selectedTherapistId, selectedDate]);

  // 3. Handle Generate Slot 1 Pekan
  const handleGenerateWeek = async () => {
    setIsGenerating(true);
    try {
      await adminService.generateWeekSlots(generateStartDate);
      setIsGenerateModalOpen(false);
      loadSlots();
    } catch (error) {
      console.error("Gagal generate slot:", error);
      alert("Gagal generate slot. Pastikan format tanggal sudah benar.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] font-bold text-[#1b2a4e]">Manajemen Slot Jadwal Terapi</h2>
          <p className="text-[#585858] text-[15px]">Atur ketersediaan waktu untuk sesi fisioterapi harian.</p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGenerateModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1b2a4e] hover:bg-[#14203b] text-white font-bold text-[14px] rounded-xl transition-all shadow-sm shrink-0"
          >
            <Sparkle size={18} weight="fill" className="text-[#F5B301]" />
            Generate 1 Pekan
          </button>

          <Link 
            href="/admin/jadwal/tambah"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#F5B301] hover:bg-[#dda101] text-white font-bold text-[14px] rounded-xl transition-all shadow-sm shrink-0"
          >
            <Plus size={18} weight="bold" />
            Tambah Slot
          </Link>
        </div>
      </div>

      {/* --- KOMPONEN STATISTIK --- */}
      <ScheduleStats slots={slots} isLoading={isLoading} />

      {/* --- KOMPONEN FILTER --- */}
      <ScheduleFilter 
        therapists={therapists}
        selectedTherapistId={selectedTherapistId}
        onTherapistChange={setSelectedTherapistId}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* --- KOMPONEN GRID KARTU JADWAL --- */}
      <div className="mt-2">
        <ScheduleGrid 
          slots={slots} 
          isLoading={isLoading} 
          onRefresh={loadSlots}
          onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
        />
      </div>

      {/* --- MODAL GENERATE SLOT 1 PEKAN --- */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-3xl p-8 max-w-[440px] w-full flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-yellow-50 text-[#F5B301] rounded-xl">
                <Sparkle size={24} weight="fill" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1b2a4e]">Generate Slot 1 Pekan</h3>
            </div>
            
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
              Sistem akan secara otomatis membuat slot jadwal praktek standar untuk seluruh fisioterapis aktif selama 7 hari berturut-turut.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[13px] font-bold text-[#1b2a4e]">Pilih Tanggal Mulai (Senin)</label>
              <input 
                type="date"
                value={generateStartDate}
                onChange={(e) => setGenerateStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 text-[#1b2a4e] text-[14px] font-semibold py-3 px-4 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
              />
            </div>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setIsGenerateModalOpen(false)}
                disabled={isGenerating}
                className="flex-1 py-3 rounded-xl font-bold text-[#585858] bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-[14px]"
              >
                Batal
              </button>
              <button 
                onClick={handleGenerateWeek}
                disabled={isGenerating}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-[#1b2a4e] hover:bg-[#14203b] transition-colors shadow-md text-[14px]"
              >
                {isGenerating ? "Memproses..." : "Generate Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
