"use client";

import { CaretLeft, CaretRight, Info, Check } from "@phosphor-icons/react";
import { useState, use } from "react";
import Link from "next/link";
import { mockTherapists } from "@/constants/data";
import GridKalender from "@/components/shared/GridKalender";

export default function UbahJadwalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedTerapis, setSelectedTerapis] = useState<string[]>(mockTherapists.map(t => t.id));
  const [alasan, setAlasan] = useState("");
  const [kirimNotif, setKirimNotif] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Fungsi toggle terapis
  const handleToggleTerapis = (id: string) => {
    if (selectedTerapis.includes(id)) {
      setSelectedTerapis(selectedTerapis.filter(t => t !== id));
    } else {
      setSelectedTerapis([...selectedTerapis, id]);
    }
    setSelectedSlot(null); // Reset jadwal kalau filter terapis diubah
  };
  
  return (
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
      <div className="w-full max-w-[1000px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] h-fit">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1b2a4e] mb-3">Ubah Jadwal Terapis</h1>
          <p className="text-[#585858] text-[14px]">
            Ubah jadwal kunjungan Anda. Anda juga bisa mengubah terapis Anda.
          </p>
        </div>

        {/* TOP SECTION: Kalender Mini & Filter Terapis (Sama persis kayak Step 2 Booking) */}
        <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* --- UI KALENDER MINI --- */}
          <div className="w-full md:w-[320px] bg-white border border-gray-200 rounded-[16px] p-6 h-fit shrink-0">
            <div className="flex justify-between items-center mb-6">
              <button className="text-gray-400 hover:text-[#1b2a4e] font-bold">&lt;</button>
              <h4 className="font-bold text-[#1b2a4e] text-[16px]">July 2026</h4>
              <button className="text-gray-400 hover:text-[#1b2a4e] font-bold">&gt;</button>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 text-center">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, i) => (
                <span key={i} className="text-[12px] font-medium text-gray-500">{day}</span>
              ))}
              {[
                28, 29, 30, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 1, 2
              ].map((date, i) => {
                const isActiveWeek = date >= 7 && date <= 13 && i >= 7 && i <= 20; 
                const isFaded = i < 3 || i > 33; 

                return (
                  <div key={i} className="flex justify-center items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px]
                      ${isActiveWeek ? "bg-[#FFFBEA] text-[#F5B301] font-bold" : isFaded ? "text-gray-300" : "text-[#1b2a4e]"}
                    `}>
                      {date}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* --- FILTER TERAPIS & INFO LAYANAN --- */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6">
              <h4 className="font-bold text-[#1b2a4e] text-[16px] mb-1">Pilih Fisioterapis</h4>
              <p className="text-[#585858] text-[13px] mb-4">Terapis yang ditampilkan hanya yang memegang layanan pilihan Anda</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Loop Terapis dari Data Terpusat mockTherapists */}
                {mockTherapists.map(therapist => {
                  const isChecked = selectedTerapis.includes(therapist.id);
                  
                  return (
                    <div 
                      key={therapist.id} 
                      onClick={() => handleToggleTerapis(therapist.id)}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors
                        ${isChecked ? "border-[#F5B301] bg-[#FFFBEA]" : "border-gray-100 hover:bg-gray-50"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-[72px] h-[72px] rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-50 shadow-sm">
                          <img 
                            src={therapist.photo} 
                            alt={therapist.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + therapist.name + "&background=F5B301&color=fff" }} 
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#1b2a4e]">{therapist.name}</span>
                          <span className="text-[12px] text-gray-500">{therapist.sp}</span>
                          <span className="text-[11px] text-[#F5B301] mt-0.5">⭐ {therapist.rating} ({therapist.patients} Pasien)</span>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-[#F5B301] pointer-events-none" 
                        checked={isChecked}
                        readOnly
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-[#3B82F6]">🩺</div>
                <span className="text-[14px] font-medium text-[#1b2a4e]">Layanan Terpilih: Fisioterapi Olahraga</span>
              </div>
              {/* Tombol Ubah bisa di-disable atau diarahin balik ke list booking kalau perlu */}
              <button className="text-[#F5B301] text-[14px] font-bold px-4 py-1.5 border border-[#F5B301] rounded-lg bg-white hover:bg-[#FFFBEA]">
                Ubah
              </button>
            </div>
          </div>
        </div>

        {/* GRID KALENDER MINGGUAN (Shared Component) */}
        <GridKalender 
          selectedTherapists={selectedTerapis}
          selectedSlot={selectedSlot}
          onSelectSlot={(id) => setSelectedSlot(id)}
        />

        {/* BOTTOM SECTION: Form Alasan & Tombol Aksi */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-10 mt-[-10px]">
          <label className="flex gap-2 items-center font-bold text-[15px] text-[#1b2a4e] mb-3">
            📝 Alasan Ubah Jadwal <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Contoh: Pasien berhalangan hadir karena urusan pekerjaan mendadak. Ingin digeser ke hari senin siang."
            className="w-full border border-gray-200 rounded-xl p-4 text-[14px] outline-none focus:border-[#F5B301] resize-none mb-4"
          />
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${kirimNotif ? 'bg-[#F5B301]' : 'border border-gray-300'}`}>
              {kirimNotif && <Check size={14} weight="bold" color="white" />}
            </div>
            <span className="text-[13px] text-gray-600">Kirim notifikasi otomatis ke WhatsApp pasien mengenai perubahan jadwal ini.</span>
            <input type="checkbox" className="hidden" checked={kirimNotif} onChange={() => setKirimNotif(!kirimNotif)} />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/riwayat-booking" className="flex-1 py-4 text-center rounded-xl border border-gray-200 text-[#F5B301] font-bold text-[15px] hover:bg-gray-50 transition-colors">
            &larr; Kembali
          </Link>
          
          <Link 
            href={selectedSlot ? `/riwayat-booking/ubah-jadwal/${id}/konfirmasi` : "#"}
            onClick={(e) => {
              if (!selectedSlot) e.preventDefault(); 
            }}
            className={`flex-1 py-4 text-center rounded-xl font-bold text-[15px] transition-colors ${
              selectedSlot 
                ? 'bg-[#F5B301] text-white hover:bg-[#dda101] shadow-[0_4px_12px_rgba(245,179,1,0.2)]' 
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            Lanjut &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}