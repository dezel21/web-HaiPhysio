"use client";

import { useState } from "react";
import { CalendarBlank, Trash, CheckCircle, CalendarX, Sparkle } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

interface ScheduleGridProps {
  slots: any[];
  isLoading: boolean;
  onRefresh: () => void;
  onOpenGenerateModal: () => void;
}

export default function ScheduleGrid({ slots, isLoading, onRefresh, onOpenGenerateModal }: ScheduleGridProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<string | number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToggling, setIsToggling] = useState<string | number | null>(null);

  // Toggle Aktif / Nonaktif Slot ke API
  const handleToggle = async (slotId: string | number) => {
    setIsToggling(slotId);
    try {
      await adminService.toggleSlot(String(slotId));
      setToastMessage("Status slot berhasil diperbarui");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      onRefresh();
    } catch (error) {
      console.error("Gagal toggle status slot:", error);
      // Tetap refresh data
      onRefresh();
    } finally {
      setIsToggling(null);
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setSlotToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (slotToDelete !== null) {
      try {
        await adminService.toggleSlot(String(slotToDelete)); // Nonaktifkan slot
        setIsDeleteModalOpen(false);
        setSlotToDelete(null);
        setToastMessage("Slot jadwal berhasil dinonaktifkan");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        onRefresh();
      } catch (error) {
        console.error("Gagal menonaktifkan slot:", error);
        setIsDeleteModalOpen(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <div className="text-[16px] font-bold text-[#1b2a4e] animate-pulse">
          Memuat data slot jadwal...
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100">
          <CalendarX size={32} />
        </div>
        <h4 className="text-[18px] font-bold text-[#1b2a4e] mb-1">Belum Ada Slot Jadwal</h4>
        <p className="text-[14px] text-gray-500 max-w-md mb-6">
          Belum ada slot waktu yang dibuat untuk terapis dan tanggal ini. Anda dapat membuat slot otomatis untuk 1 pekan ke depan.
        </p>
        <button
          onClick={onOpenGenerateModal}
          className="px-6 py-3 bg-[#1b2a4e] hover:bg-[#14203b] text-white font-bold text-[14px] rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Sparkle size={18} weight="fill" className="text-[#F5B301]" />
          Generate Slot 1 Pekan Otomatis
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-0">
        {slots.map((slot: any) => {
          const isBooked = slot.is_booked || slot.isBooked;
          const isActive = slot.isActive !== false && slot.is_active !== false;
          
          const timeDisplay = slot.time || `${(slot.startTime || slot.start_time || "").substring(0, 5)} - ${(slot.endTime || slot.end_time || "").substring(0, 5)}`;
          const therapistName = slot.therapistName || slot.therapist?.name;

          let statusLabel = "Tersedia";
          let badgeStyle = "bg-green-50 text-green-600 border border-green-100";
          let dotStyle = "bg-green-500";
          let cardBg = "bg-white border-gray-200";

          if (isBooked) {
            statusLabel = "Tidak Tersedia";
            badgeStyle = "bg-gray-100 text-gray-400 border border-gray-200";
            dotStyle = "bg-gray-400";
            cardBg = "bg-[#FFFBEA] border-[#fdeeb3]";
          } else if (!isActive) {
            statusLabel = "Nonaktif";
            badgeStyle = "bg-[#f4f4f4] text-[#a1a1a1] border border-gray-200";
            dotStyle = "hidden";
            cardBg = "bg-gray-50/70 border-gray-200 opacity-75";
          }

          return (
            <div key={slot.id} className={`flex flex-col rounded-2xl border p-5 transition-all shadow-sm ${cardBg}`}>
              
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-[19px] font-bold text-[#1b2a4e] leading-tight">
                    {timeDisplay} WIB
                  </span>
                  {therapistName && (
                    <span className="text-[12px] text-gray-500 font-medium truncate max-w-[140px] mt-0.5">
                      {therapistName}
                    </span>
                  )}
                </div>
                <div className="p-2 border border-gray-200 rounded-lg bg-white text-gray-400 shrink-0">
                  <CalendarBlank size={18} />
                </div>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-max my-3 ${badgeStyle}`}>
                {dotStyle !== "hidden" && <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>}
                <span className="text-[12px] font-bold">{statusLabel}</span>
              </div>

              <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

              <div className="flex justify-between items-center">
                
                {/* Switch Toggle Aktif/Off */}
                <div 
                  onClick={() => !isBooked && handleToggle(slot.id)} 
                  className={`flex items-center gap-2 ${isBooked ? "cursor-not-allowed opacity-50" : "cursor-pointer group"}`}
                >
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors flex items-center ${isActive ? 'bg-[#22c55e]' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                  <span className={`text-[13px] font-bold ${isActive ? 'text-[#22c55e]' : 'text-gray-400'}`}>
                    {isActive ? 'Aktif' : 'Off'}
                  </span>
                </div>

                {/* Tombol Nonaktifkan Slot */}
                <button 
                  onClick={() => handleDeleteClick(slot.id)} 
                  disabled={isBooked}
                  className="text-red-400 hover:text-red-600 transition-colors p-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Nonaktifkan Slot"
                >
                  <Trash size={18} weight="fill" />
                </button>
              </div>
              
            </div>
          );
        })}
      </div>

      {/* Modal Konfirmasi Hapus/Nonaktif */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-3xl p-8 max-w-[400px] w-full flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[20px] font-bold text-[#1b2a4e] mb-2">Nonaktifkan Slot?</h3>
            <p className="text-[14px] text-gray-500 mb-8">Slot jadwal ini tidak akan dapat dipesan oleh pasien.</p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold text-[#585858] bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-[#e02424] hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
              >
                Nonaktifkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifikasi */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">{toastMessage}</span>
        </div>
      )}
    </>
  );
}
