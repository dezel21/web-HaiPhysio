"use client";

import { useState } from "react";
import { CalendarBlank, Trash, CheckCircle } from "@phosphor-icons/react";

// Mock data awal (dipindah ke dalam komponen via state biar bisa dihapus)
const initialSlots = [
  { id: 1, time: "08:00 - 09:00", status: "Tidak Tersedia", isActive: true },
  { id: 2, time: "09:00 - 10:00", status: "Tersedia", isActive: true },
  { id: 3, time: "10:00 - 11:00", status: "Nonaktif", isActive: false },
  { id: 4, time: "11:00 - 12:00", status: "Tersedia", isActive: true },
  { id: 5, time: "13:00 - 14:00", status: "Tersedia", isActive: true },
  { id: 6, time: "14:00 - 15:00", status: "Tidak Tersedia", isActive: true },
  { id: 7, time: "16:00 - 17:00", status: "Tersedia", isActive: true },
  { id: 8, time: "19:00 - 20:00", status: "Tersedia", isActive: true },
];

export default function ScheduleGrid() {
  const [slots, setSlots] = useState(initialSlots);
  
  // State untuk modal hapus dan toast
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Fungsi pas tombol Trash diklik
  const handleDeleteClick = (id: number) => {
    setSlotToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Fungsi pas tombol "Hapus" di modal konfirmasi diklik
  const confirmDelete = () => {
    if (slotToDelete !== null) {
      // Hapus data dari array state
      setSlots(slots.filter(slot => slot.id !== slotToDelete));
      
      // Tutup modal
      setIsDeleteModalOpen(false);
      setSlotToDelete(null);

      // Tampilkan toast sukses
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Fungsi pas tombol "Batal" di modal konfirmasi diklik
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSlotToDelete(null);
  };

  // Fungsi toggle aktif/off (visual aja dulu)
  const toggleActive = (id: number) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
    ));
  };

  return (
    <>
      {/* --- GRID KARTU JADWAL --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-0">
        {slots.map((slot) => {
          const cardBg = slot.status === "Tidak Tersedia" ? "bg-[#FFFBEA] border-[#fdeeb3]" : "bg-white border-gray-200";
          
          let badgeStyle = "";
          let dotStyle = "";
          if (slot.status === "Tersedia") {
            badgeStyle = "bg-green-50 text-green-600 border border-green-100";
            dotStyle = "bg-green-500";
          } else if (slot.status === "Tidak Tersedia") {
            badgeStyle = "bg-gray-100 text-gray-400 border border-gray-200";
            dotStyle = "bg-gray-400";
          } else {
            badgeStyle = "bg-[#f4f4f4] text-[#a1a1a1] border border-gray-200";
            dotStyle = "hidden";
          }

          return (
            <div key={slot.id} className={`flex flex-col rounded-2xl border p-5 transition-colors shadow-sm ${cardBg}`}>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[20px] font-bold text-[#1b2a4e] leading-tight w-[80px]">
                  {slot.time}
                </span>
                <div className="p-2 border border-gray-200 rounded-lg bg-white text-gray-400">
                  <CalendarBlank size={20} />
                </div>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-max mb-6 ${badgeStyle}`}>
                {dotStyle !== "hidden" && <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>}
                <span className="text-[12px] font-bold">{slot.status}</span>
              </div>

              <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

              <div className="flex justify-between items-center">
                
                {/* Custom Toggle Switch (Bisa diklik sekarang) */}
                <div onClick={() => toggleActive(slot.id)} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors flex items-center ${slot.isActive ? 'bg-[#22c55e]' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${slot.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                  <span className={`text-[13px] font-bold ${slot.isActive ? 'text-[#22c55e]' : 'text-gray-400'}`}>
                    {slot.isActive ? 'Aktif' : 'Off'}
                  </span>
                </div>

                {/* Tombol Trash Hapus yang memicu Modal */}
                <button onClick={() => handleDeleteClick(slot.id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash size={20} weight="fill" />
                </button>
              </div>
              
            </div>
          );
        })}
      </div>

      {/* --- POP-UP MODAL KONFIRMASI HAPUS --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-3xl p-8 max-w-[400px] w-full flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[20px] font-bold text-[#1b2a4e] mb-2">Hapus Jadwal Terapi?</h3>
            <p className="text-[14px] text-gray-500 mb-8">Slot jadwal pada fisioterapis akan dihapus.</p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={cancelDelete}
                className="flex-1 py-3 rounded-xl font-bold text-[#585858] bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-[#e02424] hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Jadwal Berhasil Dihapus</span>
        </div>
      )}
    </>
  );
}