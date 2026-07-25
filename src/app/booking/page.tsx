"use client";

import { useState } from "react";
import Step1PilihLayanan from "../../components/booking/Step1PilihLayanan";

export default function BookingPage() {
  // State ini buat nginget user lagi ada di langkah ke berapa (1, 2, 3, atau 4)
  const [currentStep, setCurrentStep] = useState(1);
  
  // State ini buat nyimpen data pesanan user dari awal sampai akhir
  const [bookingData, setBookingData] = useState({
    serviceId: "",
    therapistId: "",
    scheduleId: "",
  });

  // Fungsi ini dipanggil pas user klik tombol Lanjut di Langkah 1
  const handleNextFromStep1 = (selectedServiceId: string) => {
    // Simpan layanan yang dipilih ke dalam state bookingData
    setBookingData({ ...bookingData, serviceId: selectedServiceId });
    // Pindah halamannya ke Langkah 2
    setCurrentStep(2); 
  };

  return (
    // Pembungkus paling luar, dibikin relative biar background gradasinya gak keluar jalur
    <div className="relative w-full min-h-screen pt-[35px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] overflow-hidden">
      
      {/* Background Layer 1: Warna gradasi dari kiri terang ke kanan gelap */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-r from-[#FDE89C]/40 to-[#F5B301]/70 z-0"></div>
      
      {/* Background Layer 2: Efek memudar dari atas ke bawah biar nyatu sama warna putih */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] z-0"></div>
      
      {/* Kanvas Putih Utama: Tempat di mana semua isi form diletakkan */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto bg-white rounded-[32px] p-6 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
        
        {/* Kalau currentStep isinya 1, tampilkan komponen Step 1 */}
        {currentStep === 1 && (
          <Step1PilihLayanan onNext={handleNextFromStep1} />
        )}
        
        {/* Kalau currentStep isinya 2, tampilkan ini (nanti kita ganti pakai komponen aslinya) */}
        {currentStep === 2 && (
          <div className="w-full flex flex-col items-center pt-20">
            <h2 className="text-2xl font-bold">Ini komponen Step 2 (Segera Hadir)</h2>
            <button 
              onClick={() => setCurrentStep(1)}
              className="mt-4 px-4 py-2 border rounded"
            >
              Kembali ke Step 1
            </button>
          </div>
        )}

      </div>
    </div>
  );
}