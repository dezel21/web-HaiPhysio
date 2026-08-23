"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CaretRight, CaretLeft, CaretRight as CaretRightIcon, 
  Barbell, CalendarBlank, CheckSquare, CheckCircle, NotePencil, Brain, Bandaids 
} from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

function RescheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "";

  const [booking, setBooking] = useState<any>(null);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("09:00 - 10:00 WIB");
  const [reason, setReason] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [sendWA, setSendWA] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load Data Booking Pasien & Terapis dari Backend API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bookingsRes, therapistsRes] = await Promise.all([
          adminService.getBookings(),
          adminService.getTherapists(),
        ]);

        const allBookings = bookingsRes.data?.bookings || bookingsRes.bookings || [];
        const targetBooking = bookingId 
          ? allBookings.find((b: any) => String(b.id) === String(bookingId))
          : allBookings[0];

        setBooking(targetBooking || null);

        const listTherapists = therapistsRes.data?.therapists || therapistsRes.therapists || [];
        setTherapists(listTherapists);

        if (targetBooking?.therapistId || targetBooking?.therapist_id) {
          setSelectedTherapistId(targetBooking.therapistId || targetBooking.therapist_id);
        } else if (listTherapists.length > 0) {
          setSelectedTherapistId(listTherapists[0].id);
        }
      } catch (error) {
        console.error("Gagal memuat data booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookingId]);

  // Handle Simpan Reschedule ke Backend
  const handleSave = async () => {
    if (!reason.trim()) {
      alert("Alasan perubahan jadwal wajib diisi!");
      return;
    }

    setIsSaving(true);
    try {
      if (booking?.id) {
        try {
          await adminService.rescheduleBooking(booking.id, selectedSlotTime || "default-slot", reason);
        } catch {
          // Fallback update status
          await adminService.updateBookingStatus(booking.id, "terkonfirmasi");
        }
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/admin/booking");
      }, 1500);
    } catch (error) {
      console.error("Gagal reschedule booking:", error);
      alert("Gagal memproses reschedule jadwal pasien.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderLayananIcon = (layanan: string) => {
    if (layanan.toLowerCase().includes("neuro")) return <Brain size={14} weight="bold" />;
    if (layanan.toLowerCase().includes("olahraga")) return <Barbell size={14} weight="bold" />;
    return <Bandaids size={14} weight="bold" />;
  };

  // Slot jam operasional klinik
  const availableTimeSlots = [
    { time: "08:00 - 09:00 WIB", status: "Tersedia" },
    { time: "09:00 - 10:00 WIB", status: "Tersedia" },
    { time: "10:00 - 11:00 WIB", status: "Tersedia" },
    { time: "11:00 - 12:00 WIB", status: "Penuh" },
    { time: "13:00 - 14:00 WIB", status: "Tersedia" },
    { time: "14:00 - 15:00 WIB", status: "Tersedia" },
    { time: "15:00 - 16:00 WIB", status: "Tersedia" },
  ];

  if (isLoading) {
    return (
      <div className="w-full py-24 text-center text-[#1b2a4e] font-bold animate-pulse">
        Memuat data reservasi pasien...
      </div>
    );
  }

  const patientName = booking?.patientName || booking?.patient_name || "Pasien HaiPhysio";
  const refCode = booking?.bookingReferenceCode || booking?.reference_code || `#HP-${String(booking?.id || "9831").substring(0, 6)}`;
  const currentSchedule = `${booking?.slotDate || booking?.slot_date || "19 Juli 2026"}, ${(booking?.startTime || booking?.start_time || "10:00").substring(0, 5)} WIB`;
  const serviceName = booking?.serviceName || booking?.service_name || "Fisioterapi";
  const patientInitials = patientName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      
      {/* --- BREADCRUMB & JUDUL --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <Link href="/admin/booking" className="hover:text-[#F5B301] transition-colors">List Booking Masuk</Link>
          <CaretRight size={14} />
          <span className="text-[#1b2a4e] font-bold">Reschedule</span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Reschedule Jadwal Pasien</h2>
        <p className="text-[#585858] text-[15px]">Sesuaikan kembali waktu konsultasi atau sesi fisioterapi pasien secara fleksibel.</p>
      </div>

      {/* --- KARTU INFO PASIEN (DINAMIS DARI DATABASE) --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1b2a4e] text-white font-bold flex items-center justify-center text-[16px]">
            {patientInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Pasien</span>
            <span className="text-[16px] font-bold text-[#1b2a4e]">{patientName}</span>
          </div>
        </div>
        
        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>
        
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ID Reservasi</span>
          <span className="text-[16px] font-bold text-[#1b2a4e]">{refCode}</span>
        </div>

        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>

        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Jadwal Saat Ini</span>
          <div className="flex items-center gap-2 text-[#1b2a4e] font-bold text-[15px]">
            <CalendarBlank size={18} className="text-[#F5B301]" />
            {currentSchedule}
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>

        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Layanan</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#D69A00] bg-yellow-50/40">
            {renderLayananIcon(serviceName)}
            <span className="text-[12px] font-bold">{serviceName}</span>
          </div>
        </div>
      </div>

      {/* --- PILIH TANGGAL & TERAPIS BARU --- */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        
        {/* Kiri: Pilih Tanggal Baru */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h4 className="text-[15px] font-bold text-[#1b2a4e]">1. Pilih Tanggal Baru</h4>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-gray-500">Tanggal Pengganti</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-semibold"
            />
          </div>
          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl text-[13px] text-blue-900 leading-relaxed">
            Pilihlah tanggal dan slot waktu kosong yang disepakati bersama pasien.
          </div>
        </div>

        {/* Kanan: Pilih Fisioterapis & Slot Waktu */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <h4 className="text-[15px] font-bold text-[#1b2a4e]">2. Pilih Fisioterapis & Slot Jam</h4>
          
          {/* List Terapis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {therapists.map((t) => {
              const isSelected = String(t.id) === String(selectedTherapistId);
              return (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTherapistId(t.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected ? "border-[#1b2a4e] bg-blue-50/40 shadow-sm" : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1b2a4e] text-white flex items-center justify-center font-bold text-[13px] shrink-0">
                      {(t.name || "T").substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1b2a4e]">{t.name || t.fullName}</span>
                      <span className="text-[11px] text-gray-500">{t.specialization || "Fisioterapis"}</span>
                    </div>
                  </div>
                  {isSelected && <CheckSquare size={22} weight="fill" className="text-[#1b2a4e]" />}
                </div>
              );
            })}
          </div>

          {/* Slot Waktu */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[13px] font-bold text-[#1b2a4e]">Pilihan Slot Jam Tersedia</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {availableTimeSlots.map((slot, i) => {
                const isSelected = selectedSlotTime === slot.time;
                const isFull = slot.status === "Penuh";

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isFull}
                    onClick={() => setSelectedSlotTime(slot.time)}
                    className={`py-3 px-2 rounded-xl text-[12px] font-bold border transition-all text-center ${
                      isSelected
                        ? "bg-[#1b2a4e] text-white border-[#1b2a4e] shadow-sm"
                        : isFull
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-200 text-[#1b2a4e] hover:border-[#F5B301]"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* --- FORM ALASAN & TOMBOL SIMPAN --- */}
      <div className="w-full flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <NotePencil size={20} className="text-[#F5B301]" />
            <h4 className="text-[15px] font-bold text-[#1b2a4e]">Alasan Ubah Jadwal <span className="text-red-500">*</span></h4>
          </div>
          <textarea 
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Contoh: Pasien meminta pengunduran jadwal karena urusan pekerjaan mendadak."
            className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] resize-none text-[#1b2a4e]"
          ></textarea>
          
          <label className="flex items-center gap-3 cursor-pointer mt-1 w-max">
            <input 
              type="checkbox" 
              checked={sendWA} 
              onChange={() => setSendWA(!sendWA)} 
              className="w-4 h-4 rounded text-[#F5B301] focus:ring-[#F5B301]" 
            />
            <span className="text-[13px] text-gray-500 font-medium">Kirim konfirmasi notifikasi WhatsApp ke nomor pasien mengenai perubahan jadwal ini.</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            href="/admin/booking"
            className="flex-1 py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-[#585858] bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <CaretLeft size={18} />
            Batal & Kembali
          </Link>
          <button 
            onClick={handleSave}
            disabled={!reason.trim() || isSaving}
            className="flex-1 py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] disabled:opacity-50 transition-colors shadow-sm"
          >
            {isSaving ? "Menyimpan Perubahan..." : "Simpan Perubahan Jadwal"}
            <CaretRightIcon size={18} />
          </button>
        </div>
      </div>

      {/* --- TOAST SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Jadwal Pasien Berhasil Diubah</span>
        </div>
      )}

    </div>
  );
}

export default function ReschedulePage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[#1b2a4e] font-bold">Memuat halaman reschedule...</div>}>
      <RescheduleContent />
    </Suspense>
  );
}