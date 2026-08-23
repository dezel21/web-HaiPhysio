"use client";

import { useState } from "react";
import { CalendarBlank, Plus, ArrowLeft, WarningCircle, CheckCircle } from "@phosphor-icons/react";

interface TabJadwalProps {
  isAddingException: boolean;
  setIsAddingException: (val: boolean) => void;
  therapistName?: string;
}

export default function TabJadwal({ isAddingException, setIsAddingException, therapistName }: TabJadwalProps) {
  const [excForm, setExcForm] = useState({ jenis: "", startDate: "", endDate: "", tipe: "seharian", startTime: "", endTime: "", alasan: "" });
  const [isErrorBentrok, setIsErrorBentrok] = useState(false);
  const [showExceptionToast, setShowExceptionToast] = useState(false);

  const [exceptionList, setExceptionList] = useState([
    { tgl: "24 Okt 2026", hari: "Selasa", ket: "Pelatihan Sertifikasi Dry Needling", st: "Libur Seharian", isYellow: false },
    { tgl: "30 Okt 2026", hari: "Senin", ket: "Kunjungan Rumah Sakit Partner", st: "Hanya Pagi (08:00 - 10:00)", isYellow: true }
  ]);

  const handleSimpanPengecualian = () => {
    if (excForm.tipe === "seharian") {
      setIsErrorBentrok(true);
      return;
    }
    const newExc = {
      tgl: "20 Nov 2026", hari: "Selasa",
      ket: excForm.jenis || "Keperluan Dokter / Cuti",
      st: `(${excForm.startTime || "08:00"} - ${excForm.endTime || "12:00"})`, isYellow: true
    };
    setExceptionList([...exceptionList, newExc]);
    setIsAddingException(false);
    setIsErrorBentrok(false);
    setExcForm({ jenis: "", startDate: "", endDate: "", tipe: "seharian", startTime: "", endTime: "", alasan: "" });
    setShowExceptionToast(true);
    setTimeout(() => setShowExceptionToast(false), 3000);
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      {isAddingException ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsAddingException(false)} className="text-[#1b2a4e] hover:text-[#F5B301] transition-colors">
              <ArrowLeft size={24} weight="bold" />
            </button>
            <div className="flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1b2a4e]">Tambah Pengecualian Jadwal</h3>
              <p className="text-[13px] text-gray-500">{therapistName || "Fisioterapis"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#1b2a4e]">Jenis Pengecualian</label>
                <select 
                  className="p-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] bg-white cursor-pointer" 
                  value={excForm.jenis} 
                  onChange={(e) => { setExcForm({...excForm, jenis: e.target.value}); setIsErrorBentrok(false); }}
                >
                  <option value="" hidden>Pilih jenis...</option>
                  <option value="Keperluan Keluarga">Keperluan Keluarga</option>
                  <option value="Cuti Sakit">Cuti Sakit</option>
                  <option value="Pelatihan / Workshop">Pelatihan / Workshop</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">Rentang Tanggal</label>
                  <div className="relative">
                    <CalendarBlank size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      value={excForm.startDate} 
                      onChange={(e) => { setExcForm({...excForm, startDate: e.target.value}); setIsErrorBentrok(false); }} 
                      className="w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
                    />
                  </div>
                </div>
                <span className="mt-7 text-gray-400 font-bold">→</span>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">&nbsp;</label>
                  <div className="relative">
                    <CalendarBlank size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      value={excForm.endDate} 
                      onChange={(e) => { setExcForm({...excForm, endDate: e.target.value}); setIsErrorBentrok(false); }} 
                      className="w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
                    />
                  </div>
                </div>
              </div>

              {/* Tipe Libur */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#1b2a4e]">Tipe Libur</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#1b2a4e]">
                    <input type="radio" name="tipeLibur" checked={excForm.tipe === "seharian"} onChange={() => setExcForm({...excForm, tipe: "seharian"})} />
                    Libur Seharian Penuh
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#1b2a4e]">
                    <input type="radio" name="tipeLibur" checked={excForm.tipe === "sebagian"} onChange={() => setExcForm({...excForm, tipe: "sebagian"})} />
                    Hanya Jam Tertentu
                  </label>
                </div>
              </div>

              {excForm.tipe === "sebagian" && (
                <div className="flex items-center gap-4">
                  <input 
                    type="time" 
                    value={excForm.startTime} 
                    onChange={(e) => setExcForm({...excForm, startTime: e.target.value})} 
                    className="flex-1 p-3.5 border border-gray-200 rounded-xl text-[14px]" 
                  />
                  <span className="text-gray-400 font-bold">sampai</span>
                  <input 
                    type="time" 
                    value={excForm.endTime} 
                    onChange={(e) => setExcForm({...excForm, endTime: e.target.value})} 
                    className="flex-1 p-3.5 border border-gray-200 rounded-xl text-[14px]" 
                  />
                </div>
              )}

              {/* Error Bentrok */}
              {isErrorBentrok && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-[13px]">
                  <WarningCircle size={20} weight="fill" className="shrink-0 text-red-500" />
                  <span>Jadwal bentrok dengan 2 sesi pasien yang telah terkonfirmasi. Silakan jadwalkan ulang pasien terlebih dahulu.</span>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsAddingException(false)} className="py-2.5 px-6 font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Batal</button>
                <button onClick={handleSimpanPengecualian} className="py-2.5 px-6 font-bold text-white bg-[#F5B301] hover:bg-[#dda101] rounded-xl shadow-sm">Simpan Pengecualian</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[14px] font-bold text-[#1b2a4e] mb-2">Himbauan Pengecualian</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Menambahkan pengecualian akan menutup slot ketersediaan terapis pada tanggal dan jam yang dipilih secara otomatis.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col">
              <h3 className="text-[18px] font-bold text-[#1b2a4e]">Jadwal Praktek Standar</h3>
              <p className="text-[13px] text-gray-500">Senin - Sabtu (08:00 - 16:00 WIB)</p>
            </div>
            <button 
              onClick={() => setIsAddingException(true)} 
              className="flex items-center gap-2 px-5 py-2.5 bg-[#F5B301] hover:bg-[#dda101] text-white font-bold text-[13px] rounded-xl shadow-sm transition-colors"
            >
              <Plus size={16} weight="bold" />
              Tambah Pengecualian / Cuti
            </button>
          </div>

          {/* List Pengecualian */}
          <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h4 className="text-[16px] font-bold text-[#1b2a4e]">Daftar Pengecualian & Hari Libur</h4>
            <div className="flex flex-col gap-3">
              {exceptionList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <CalendarBlank size={20} className="text-[#F5B301]" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#1b2a4e]">{item.ket}</span>
                      <span className="text-[12px] text-gray-400">{item.hari}, {item.tgl}</span>
                    </div>
                  </div>
                  <span className={`text-[12px] font-bold px-3 py-1 rounded-full border ${item.isYellow ? 'bg-yellow-50 text-[#F5B301] border-yellow-200' : 'bg-red-50 text-red-500 border-red-200'}`}>
                    {item.st}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showExceptionToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Pengecualian Jadwal Berhasil Ditambahkan</span>
        </div>
      )}
    </div>
  );
}
