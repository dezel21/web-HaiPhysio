"use client";

import { useState } from "react";
import { Bandaids, Brain, Barbell, Info, CheckCircle, X } from "@phosphor-icons/react";
import Link from "next/link";

// Mock Data awal
const initialBookings = [
  { id: 1, kode: "#HP-9831", pasien: "Kartika Wulandari", telp: "0812 3456 7890", terapis: "Ftr. Andi Pratam", layanan: "Fisioterapi Olahraga", tanggal: "11 Juli 2026", jam: "11:00 WIB", status: "Terkonfirmasi" },
  { id: 2, kode: "#HP-9832", pasien: "Siti Nurhaliza", telp: "0821 5634 9078", terapis: "Ftr. Bintang Dito", layanan: "Fisioterapi Olahraga", tanggal: "19 Juli 2026", jam: "13:00 WIB", status: "Selesai" },
  { id: 3, kode: "#HP-9833", pasien: "Budi Santoso", telp: "0821 2790 0098", terapis: "Ftr. Sari Wijaya, S.Ft", layanan: "Fisioterapi Muskuloskeletal", tanggal: "20 Juli 2026", jam: "09:00 WIB", status: "Dibatalkan" },
];

export default function BookingTable() {
  // State buat nyimpen data tabel biar bisa di-update
  const [bookings, setBookings] = useState(initialBookings);
  
  // State buat Modal dan Toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Fungsi pas tombol "Batalkan" di tabel diklik
  const handleOpenCancelModal = (booking: any) => {
    setSelectedBooking(booking);
    setCancelReason(""); // Reset isi textarea
    setIsModalOpen(true);
  };

  // Fungsi pas tombol "Konfirmasi Pembatalan" di modal diklik
  const handleConfirmCancel = () => {
    if (selectedBooking) {
      // Update status di tabel jadi 'Dibatalkan'
      setBookings(bookings.map(b => 
        b.id === selectedBooking.id ? { ...b, status: "Dibatalkan" } : b
      ));
      
      // Tutup modal & munculin toast
      setIsModalOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const renderLayananIcon = (layanan: string) => {
    if (layanan.includes("Neuro")) return <Brain size={16} />;
    if (layanan.includes("Olahraga")) return <Barbell size={16} />;
    return <Bandaids size={16} />;
  };

  const renderStatus = (status: string) => {
    let colorClass = "";
    let dotClass = "";
    if (status === "Terkonfirmasi") {
      colorClass = "border-green-500 text-green-600 bg-white";
      dotClass = "bg-green-500";
    } else if (status === "Selesai") {
      colorClass = "border-gray-400 text-gray-500 bg-white";
      dotClass = "bg-gray-400";
    } else {
      colorClass = "border-red-400 text-red-500 bg-white";
      dotClass = "bg-red-500";
    }

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colorClass}`}>
        <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
        <span className="text-[12px] font-bold">{status}</span>
      </div>
    );
  };

  return (
    <>
      {/* --- CANGKANG TABEL --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col relative z-0">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-[18px] font-bold text-[#1b2a4e]">Antrean Booking</h3>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 w-[50px] uppercase tracking-wider">No</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Kode Booking</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Nama Pasien & No Telepon</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Fisioterapis & Layanan</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Waktu & Tanggal</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 text-[14px] text-gray-500">{index + 1}.</td>
                  <td className="py-5 px-6 text-[14px] font-bold text-[#1b2a4e]">{row.kode}</td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-bold text-[#1b2a4e]">{row.pasien}</span>
                      <span className="text-[13px] text-gray-500">{row.telp}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-2 items-start">
                      <span className="text-[14px] font-bold text-[#1b2a4e]">{row.terapis}</span>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#F5B301] bg-yellow-50/30">
                        {renderLayananIcon(row.layanan)}
                        <span className="text-[11px] font-bold">{row.layanan}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#1b2a4e]">{row.tanggal},</span>
                      <span className="text-[14px] text-[#1b2a4e]">{row.jam}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    {renderStatus(row.status)}
                  </td>
                  <td className="py-5 px-6 text-center">
                    {row.status === "Terkonfirmasi" ? (
                      <div className="flex items-center justify-center gap-3">
                        <Link href="/admin/booking/reschedule" className="px-4 py-1.5 rounded-full border border-[#F5B301] text-[#F5B301] text-[12px] font-bold hover:bg-yellow-50 transition-colors">
                          Ubah Jadwal
                        </Link>
                        <button 
                          onClick={() => handleOpenCancelModal(row)}
                          className="text-[12px] font-bold text-red-500 hover:text-red-700 transition-colors"
                        >
                          Batalkan
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-bold">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-[13px] text-gray-500">Menampilkan <strong>3</strong> dari <strong>24</strong> data booking</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'<'}</button>
            <button className="w-8 h-8 rounded-lg bg-[#F5B301] text-white font-bold flex items-center justify-center shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium bg-white hover:bg-gray-50 transition-colors">3</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-colors">{'>'}</button>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL BATALKAN JADWAL --- */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[500px] w-full flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-[20px] font-bold text-[#1b2a4e]">Konfirmasi Pembatalan Jadwal</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-[14px] text-gray-500 mb-6">
              Membatalkan sesi untuk: <strong className="text-[#1b2a4e]">{selectedBooking.pasien} ({selectedBooking.kode})</strong>
            </p>
            
            {/* Textarea Alasan */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Alasan Pembatalan <span className="text-red-500">*</span></label>
              <textarea 
                rows={4}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Tuliskan alasan pembatalan yang akan dikirimkan ke WhatsApp & Email pasien..."
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] resize-none text-[#1b2a4e]"
              ></textarea>
            </div>

            {/* Warning Box Kuning */}
            <div className="bg-[#FFFBEA] border border-[#fdeeb3] rounded-xl p-4 flex items-start gap-3 mb-8">
              <Info size={20} weight="fill" className="text-[#F5B301] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#585858] leading-relaxed">
                Pesan ini akan dikirimkan secara otomatis kepada pasien melalui jalur komunikasi resmi Hai Physio.
              </p>
            </div>
            
            {/* Tombol Aksi Modal */}
            <div className="flex gap-4 w-full mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl font-bold text-[#585858] bg-white hover:bg-gray-50 border border-gray-200 transition-colors text-[14px]"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmCancel}
                disabled={cancelReason.trim() === ""} // Tombol disable kalau textarea kosong
                className="flex-1 py-3.5 rounded-xl font-bold text-white bg-[#e02424] hover:bg-red-700 disabled:bg-red-300 transition-colors shadow-sm text-[14px]"
              >
                Konfirmasi Pembatalan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Jadwal Berhasil Dibatalkan</span>
        </div>
      )}
    </>
  );
}