"use client";

import { useState } from "react";
import Step1PilihLayanan from "../../components/booking/Step1PilihLayanan";
import Step2PilihWaktu from "../../components/booking/Step2PilihWaktu";

export default function BookingPage() {
  // State ini buat nginget user lagi ada di langkah ke berapa
  const [currentStep, setCurrentStep] = useState(1);
  
  // State ini buat nyimpen data pesanan user
  const [bookingData, setBookingData] = useState({
    serviceId: "",
    therapistId: "",
    scheduleId: "",
  });

  // Fungsi pas klik Lanjut di Step 1
  const handleNextFromStep1 = (selectedServiceId: string) => {
    setBookingData({ ...bookingData, serviceId: selectedServiceId });
    setCurrentStep(2); 
  };

  // Fungsi pas klik Kembali di Step 2
  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <div className="relative w-full min-h-screen pt-[90px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] overflow-hidden">
      
      {/* Background Layer 1 & 2 */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-r from-[#FDE89C]/40 to-[#F5B301]/70 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] z-0"></div>
      
      {/* Kanvas Putih Utama */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto bg-white rounded-[32px] p-6 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
        
        {/* Tampilkan Step 1 */}
        {currentStep === 1 && (
          <Step1PilihLayanan onNext={handleNextFromStep1} />
        )}
        
        {/* Tampilkan Step 2 */}
        {currentStep === 2 && (
          <Step2PilihWaktu 
            onBack={handleBackToStep1} 
            onNext={() => setCurrentStep(3)} 
            selectedServiceId={bookingData.serviceId}
          />
        )}

      </div>
    </div>
  );
}