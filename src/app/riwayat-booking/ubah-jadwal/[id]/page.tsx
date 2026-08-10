"use client";

import { CaretLeft, CaretRight, Info, Check } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";

export default function UbahJadwalPage({ params }: { params: { id: string } }) {
  // State buat nyimpen terapis mana yang dicentang
  const [selectedTerapis, setSelectedTerapis] = useState<string[]>(["Andi Pratama", "Sari Wijaya"]);
  const [alasan, setAlasan] = useState("");
  const [kirimNotif, setKirimNotif] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{id: string, terapis: string, jam: string, hari: string} | null>(null);

  // Fungsi buat toggle centang terapis
  const handleToggleTerapis = (nama: string) => {
    if (selectedTerapis.includes(nama)) {
      setSelectedTerapis(selectedTerapis.filter(t => t !== nama));
    } else {
      setSelectedTerapis([...selectedTerapis, nama]);
    }
  };

  // Data statis buat header kalender
  const jamList = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const hariList = [
    { nama: "Senin", tgl: "07" }, { nama: "Selasa", tgl: "08" }, { nama: "Rabu", tgl: "09" },
    { nama: "Kamis", tgl: "10" }, { nama: "Jumat", tgl: "11" }, { nama: "Sabtu", tgl: "12" }, { nama: "Minggu", tgl: "13" }
  ];

  // Fungsi buat nge-generate dummy blok jadwal biar mirip Figma SS 2 & 3
  const getDummySlots = (hari: string, jam: string) => {
    if (hari === "Senin" && jam === "09:00") return [{ id: "1", terapis: "Ftr. Andi Pratama", status: "Tidak Praktik" }];
    if (hari === "Senin" && jam === "10:00") return [{ id: "2", terapis: "Ftr. Andi Pratama", status: "Penuh" }];
    if (hari === "Senin" && jam === "14:00") return [
      { id: "3", terapis: "Ftr. Andi Pratama", status: "Tersedia" },
      { id: "4", terapis: "Ftr. Sari Wijaya, S.Ft", status: "Tersedia" }
    ];
    if (hari === "Selasa" && jam === "10:00") return [
      { id: "5", terapis: "Ftr. Andi Pratama", status: "Penuh" },
      { id: "6", terapis: "Ftr. Sari Wijaya, S.Ft", status: "Tersedia" }
    ];
    if (hari === "Selasa" && jam === "14:00") return [{ id: "7", terapis: "Ftr. Sari Wijaya, S.Ft", status: "Tersedia" }];
    if (hari === "Rabu" && jam === "09:00") return [{ id: "8", terapis: "Ftr. Bintang Dito", status: "Tersedia" }];
    if (hari === "Kamis" && jam === "11:00") return [{ id: "9", terapis: "Ftr. Andi Pratama", status: "Tersedia" }];
    if (hari === "Jumat" && jam === "14:00") return [{ id: "10", terapis: "Ftr. Bintang Dito", status: "Penuh" }];
    if (hari === "Sabtu" && jam === "09:00") return [{ id: "11", terapis: "Ftr. Bintang Dito", status: "Tersedia" }];
    if (hari === "Minggu" && jam === "13:00") return [{ id: "12", terapis: "Ftr. Sari Wijaya, S.Ft", status: "Tidak Praktik" }];
    return [];
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

        {/* TOP SECTION: Kalender Mini & Filter Terapis */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          
          {/* Kiri: Kalender Mini Statis (Visual doang sesuai Figma) */}
          <div className="w-full lg:w-[320px] border border-gray-200 rounded-2xl p-6 shrink-0">
            <div className="flex justify-between items-center mb-6">
              <CaretLeft size={20} className="text-gray-400 cursor-pointer hover:text-gray-700" />
              <span className="font-bold text-[#1b2a4e] text-[15px]">Juli 2026</span>
              <CaretRight size={20} className="text-gray-400 cursor-pointer hover:text-gray-700" />
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-[13px]">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(hari => (
                <div key={hari} className="font-bold text-gray-400">{hari}</div>
              ))}
              {/* Dummy tanggal dari tgl 29 bulan lalu sampe 2 bulan depan */}
              {['29','30','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','1','2'].map((tgl, i) => (
                <div key={i} className={`flex justify-center items-center h-8 w-8 mx-auto rounded-full ${
                  tgl === '7' ? 'bg-[#FFFBEA] text-[#F5B301] font-bold' : 
                  (i < 2 || i > 32) ? 'text-gray-300' : 'text-[#1b2a4e] hover:bg-gray-100 cursor-pointer'
                }`}>
                  {tgl}
                </div>
              ))}
            </div>
          </div>

          {/* Kanan: List Terapis & Info Layanan */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="border border-gray-200 rounded-2xl p-6 flex-1">
              <h3 className="font-bold text-[#1b2a4e] text-[15px] mb-1">Pilih Fisioterapis</h3>
              <p className="text-[13px] text-gray-500 mb-5">Terapis yang ditampilkan hanya yang menangani layanan pilihan Anda (Olahraga).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Terapis 1 */}
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors cursor-pointer" onClick={() => handleToggleTerapis("Andi Pratama")}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Andi+Pratama&background=bfdbfe&color=1e3a8a" alt="Terapis" />
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#1b2a4e]">Ftr. Andi Pratama, S.Ft</p>
                      <p className="text-[12px] text-gray-500">⭐ 4.8 (120+ Pasien)</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedTerapis.includes("Andi Pratama") ? 'bg-[#1b2a4e] border-[#1b2a4e]' : 'border-gray-300'}`}>
                    {selectedTerapis.includes("Andi Pratama") && <Check size={14} weight="bold" color="white" />}
                  </div>
                </div>

                {/* Terapis 2 */}
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors cursor-pointer" onClick={() => handleToggleTerapis("Sari Wijaya")}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Sari+Wijaya&background=bfdbfe&color=1e3a8a" alt="Terapis" />
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#1b2a4e]">Ftr. Sari Wijaya, S.Ft</p>
                      <p className="text-[12px] text-gray-500">⭐ 4.9 (150+ Pasien)</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedTerapis.includes("Sari Wijaya") ? 'bg-[#1b2a4e] border-[#1b2a4e]' : 'border-gray-300'}`}>
                    {selectedTerapis.includes("Sari Wijaya") && <Check size={14} weight="bold" color="white" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Layanan Terpilih */}
            <div className="border border-[#1b2a4e] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <Info size={24} className="text-[#1b2a4e]" />
                <span className="font-bold text-[14px] text-[#1b2a4e]">Layanan Terpilih: Fisioterapi Olahraga (Cedera & Aktivitas Fisik)</span>
              </div>
              <button className="text-[13px] text-[#F5B301] font-bold px-4 py-1.5 border border-[#F5B301] rounded-lg bg-[#FFFBEA]">Ubah</button>
            </div>
          </div>
        </div>

        {/* GRID KALENDER MINGGUAN */}
        <div className="w-full border border-gray-200 rounded-2xl overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Header Hari & Tanggal */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-[#F8FAFC] border-b border-gray-200">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center font-bold text-[#1b2a4e] text-[14px]">
                  07-13 Juli 2026
                </div>
                {hariList.map((hari, idx) => (
                  <div key={idx} className="p-3 text-center border-r border-gray-200 last:border-r-0">
                    <p className="text-[16px] font-bold text-[#1b2a4e] leading-none mb-1">{hari.tgl}</p>
                    <p className="text-[12px] text-gray-500">{hari.nama}</p>
                  </div>
                ))}
              </div>

              {/* Body Jam & Slot Jadwal */}
              {jamList.map((jam, jamIdx) => (
                <div key={jamIdx} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-100 last:border-b-0 min-h-[80px]">
                  {/* Kolom Waktu (Kiri) */}
                  <div className="p-3 text-center border-r border-gray-200 flex items-start justify-center text-[12px] text-gray-500 font-medium bg-[#F8FAFC]">
                    {jam}
                  </div>
                  
                  {/* Kolom Slot per Hari */}
                  {hariList.map((hari, hariIdx) => {
                    const slots = getDummySlots(hari.nama, jam);
                    return (
                      <div key={hariIdx} className="p-1.5 border-r border-gray-100 last:border-r-0 flex flex-col gap-1.5 bg-white">
                        {slots.map((slot) => {
                          const isSelected = selectedSlot?.id === slot.id;
                          
                          // Styling dinamis sesuai status dari Figma
                          let cardStyle = "";
                          if (isSelected) {
                            cardStyle = "bg-[#1b2a4e] text-white"; // Biru Tua (Terpilih)
                          } else if (slot.status === "Tersedia") {
                            cardStyle = "bg-[#DBEAFE] text-[#1E3A8A] hover:bg-[#BFDBFE] cursor-pointer"; // Biru Muda
                          } else if (slot.status === "Penuh") {
                            cardStyle = "bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed"; // Abu-abu
                          } else if (slot.status === "Tidak Praktik") {
                            cardStyle = "bg-[#EF4444] text-white cursor-not-allowed"; // Merah
                          }

                          return (
                            <div 
                              key={slot.id} 
                              onClick={() => slot.status === "Tersedia" ? setSelectedSlot({ ...slot, jam, hari: hari.nama }) : null}
                              className={`p-2 rounded-lg text-[11px] leading-tight transition-colors border ${isSelected ? 'border-[#1b2a4e]' : 'border-transparent'} ${cardStyle}`}
                            >
                              <p className="font-bold">{slot.terapis}</p>
                              <p className="mt-0.5 opacity-90">{isSelected ? 'Jadwal Terpilih' : slot.status}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* BOTTOM SECTION: Form Alasan & Tombol Aksi */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-10">
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
          
          {/* Tombol Lanjut (Nyala otomatis pas jadwal biru muda diklik) */}
          <Link 
            href={selectedSlot ? `/riwayat-booking/ubah-jadwal/${params.id}/konfirmasi` : "#"}
            onClick={(e) => {
              if (!selectedSlot) e.preventDefault(); // Kunci tombol kalo belum milih jadwal
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