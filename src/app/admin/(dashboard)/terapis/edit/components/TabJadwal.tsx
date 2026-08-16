"use client";

import { useState } from "react";
import { CalendarBlank, ClockCounterClockwise, Plus, ArrowLeft, WarningCircle, CheckCircle } from "@phosphor-icons/react";

export default function TabJadwal({ isAddingException, setIsAddingException }: any) {
  const [excForm, setExcForm] = useState({ jenis: "", startDate: "", endDate: "", tipe: "seharian", startTime: "", endTime: "", alasan: "" });
  const [isErrorBentrok, setIsErrorBentrok] = useState(false);
  const [showExceptionToast, setShowExceptionToast] = useState(false);

  const [exceptionList, setExceptionList] = useState([
    { tgl: "24 Okt 2023", hari: "Selasa", ket: "Pelatihan Sertifikasi Dry Needling", st: "Libur Seharian", isYellow: false },
    { tgl: "30 Okt 2023", hari: "Senin", ket: "Kunjungan Rumah Sakit Partner", st: "Hanya Pagi (08:00 - 10:00)", isYellow: true }
  ]);

  const handleSimpanPengecualian = () => {
    if (excForm.tipe === "seharian") {
      setIsErrorBentrok(true);
      return;
    }
    const newExc = {
      tgl: "20 Aug 2023", hari: "Selasa",
      ket: excForm.jenis || "Keperluan Keluarga",
      st: `(${excForm.startTime || "07:00"} - ${excForm.endTime || "12:00"})`, isYellow: true
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
            <button onClick={() => setIsAddingException(false)} className="text-[#1b2a4e] hover:text-[#F5B301] transition-colors"><ArrowLeft size={24} weight="bold" /></button>
            <div className="flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1b2a4e]">Tambah Pengecualian Jadwal</h3>
              <p className="text-[13px] text-gray-500">Ftr. Andi Pratama</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
               <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#1b2a4e]">Jenis Pengecualian</label>
                <select className="p-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] bg-white cursor-pointer" value={excForm.jenis} onChange={(e) => { setExcForm({...excForm, jenis: e.target.value}); setIsErrorBentrok(false); }}>
                  <option value="" hidden>Pilih jenis...</option>
                  <option value="Keperluan Keluarga">Keperluan Keluarga</option>
                  <option value="Cuti Sakit">Cuti Sakit</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">Rentang Tanggal</label>
                  <div className="relative"><CalendarBlank size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" /><input type="date" value={excForm.startDate} onChange={(e) => { setExcForm({...excForm, startDate: e.target.value}); setIsErrorBentrok(false); }} className="w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" /></div>
                </div>
                <span className="mt-7 text-gray-400 font-bold">→</span>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">&nbsp;</label>
                  <div className="relative"><CalendarBlank size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" /><input type="date" value={excForm.endDate} onChange={(e) => { setExcForm({...excForm, endDate: e.target.value}); setIsErrorBentrok(false); }} className="w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" /></div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#1b2a4e]">Tipe Durasi</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${excForm.tipe === "seharian" ? 'border-[#F5B301] bg-yellow-50/20' : 'border-gray-200'}`}>
                    <input type="radio" name="durasi" checked={excForm.tipe === "seharian"} onChange={() => { setExcForm({...excForm, tipe: "seharian"}); setIsErrorBentrok(false); }} className="w-5 h-5 accent-[#F5B301] cursor-pointer" />
                    <span className="text-[14px] font-bold text-[#1b2a4e]">Libur Seharian</span>
                  </label>
                  <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${excForm.tipe === "spesifik" ? 'border-[#F5B301] bg-yellow-50/20' : 'border-gray-200'}`}>
                    <input type="radio" name="durasi" checked={excForm.tipe === "spesifik"} onChange={() => { setExcForm({...excForm, tipe: "spesifik"}); setIsErrorBentrok(false); }} className="w-5 h-5 accent-[#F5B301] cursor-pointer" />
                    <span className="text-[14px] font-bold text-[#1b2a4e]">Jam Spesifik</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">Jam (Spesifik)</label>
                  <input type="time" disabled={excForm.tipe === "seharian"} value={excForm.startTime} onChange={(e) => setExcForm({...excForm, startTime: e.target.value})} className={`w-full p-3.5 border rounded-xl outline-none focus:border-[#F5B301] text-[14px] transition-colors ${excForm.tipe === "seharian" ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-[#1b2a4e]'}`} />
                </div>
                <span className="mt-7 text-gray-400 font-bold text-[14px]">to</span>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#1b2a4e]">&nbsp;</label>
                  <input type="time" disabled={excForm.tipe === "seharian"} value={excForm.endTime} onChange={(e) => setExcForm({...excForm, endTime: e.target.value})} className={`w-full p-3.5 border rounded-xl outline-none focus:border-[#F5B301] text-[14px] transition-colors ${excForm.tipe === "seharian" ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-[#1b2a4e]'}`} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#1b2a4e]">Alasan / Deskripsi Tambahan</label>
                <textarea rows={3} placeholder="Masukkan detail alasan pengecualian jadwal..." value={excForm.alasan} onChange={(e) => setExcForm({...excForm, alasan: e.target.value})} className="w-full p-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] resize-none"></textarea>
              </div>

              <div className="flex justify-end items-center gap-4 w-full mt-2">
                <button onClick={() => {setIsAddingException(false); setIsErrorBentrok(false);}} className="py-3 px-8 border border-gray-200 rounded-xl font-bold text-[#585858] hover:bg-gray-50 transition-colors">Batal</button>
                <button onClick={handleSimpanPengecualian} className="py-3 px-8 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm">Simpan Pengecualian</button>
              </div>
            </div>

            <div className="flex flex-col gap-4 self-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-[16px] font-bold text-[#1b2a4e] mb-4">Ringkasan Dampak</h4>
                <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#3730A3] font-bold flex items-center justify-center text-[14px]">AP</div>
                  <div className="flex flex-col"><span className="text-[13px] font-bold text-[#1b2a4e]">Ftr. Andi Pratama</span><span className="text-[12px] text-gray-500">Fisioterapis Senior</span></div>
                </div>
                {isErrorBentrok && (
                  <div className="bg-[#FEF3F2] border border-[#FEE4E2] rounded-xl p-4 flex gap-3 mb-6 animate-in slide-in-from-top-2">
                    <WarningCircle size={20} weight="fill" className="text-[#B42318] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[13px] font-bold text-[#B42318]">Jadwal Bentrok</h4>
                      <p className="text-[12px] text-[#B42318] leading-relaxed">Terdapat 3 pasien terdampak pada rentang tanggal yang dipilih.</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Kapasitas Mingguan</span>
                  <div className="flex justify-between items-center text-[13px]"><span className="text-gray-500">Total Jam Praktek</span><span className="font-bold text-[#1b2a4e]">32 Jam</span></div>
                  <div className="w-full h-[1px] bg-gray-100 border-dashed border-b"></div>
                  <div className="flex justify-between items-center text-[13px]"><span className="text-gray-500">Sesi Terjadwal</span><span className="font-bold text-[#1b2a4e]">24 Sesi</span></div>
                  <div className="w-full h-[1px] bg-gray-100 border-dashed border-b"></div>
                  <div className="flex justify-between items-center text-[13px]"><span className="text-gray-500">Pengurangan Durasi</span><span className="font-bold text-red-500">-8 Jam</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-[20px] font-bold text-[#1b2a4e]">Jadwal Praktek</h3>
            <p className="text-[13px] text-gray-500">Lihat Jadwal Praktek Terapis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day, i) => (
              <div key={day} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-[#1b2a4e]">{day}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${i > 4 ? 'bg-red-50 text-red-500' : 'bg-[#e6f7f1] text-[#00b074]'}`}>{i > 4 ? 'LIBUR' : 'AKTIF'}</span>
                </div>
                {i <= 4 ? (
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[13px] text-[#585858] font-medium"><ClockCounterClockwise size={16}/> 08:00 - 12:00</div>
                    <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[13px] text-[#585858] font-medium"><ClockCounterClockwise size={16}/> 13:00 - 17:00</div>
                  </div>
                ) : (
                  <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 mt-auto">
                    <span className="text-[20px] mb-1">⊘</span><span className="text-[12px] font-medium">Tidak ada jadwal</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col"><h4 className="text-[16px] font-bold text-[#1b2a4e]">Pengecualian & Cuti</h4><p className="text-[13px] text-gray-500">Atur jadwal khusus atau hari libur mendadak.</p></div>
              <button onClick={() => setIsAddingException(true)} className="flex items-center gap-2 bg-[#F5B301] hover:bg-[#dda101] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold transition-colors shadow-sm"><Plus size={18} weight="bold" /> Tambah Pengecualian</button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-gray-200"><th className="py-4 px-4 text-[12px] font-bold text-[#1b2a4e] w-[200px]">Tanggal</th><th className="py-4 px-4 text-[12px] font-bold text-[#1b2a4e]">Alasan / Deskripsi</th><th className="py-4 px-4 text-[12px] font-bold text-[#1b2a4e] w-[250px] text-center">Status Jadwal</th></tr></thead>
                <tbody>
                  {exceptionList.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-4 px-4"><div className="flex flex-col"><span className="font-bold text-[#1b2a4e] text-[14px]">{item.tgl}</span><span className="text-[12px] text-gray-400">{item.hari}</span></div></td>
                      <td className="py-4 px-4 text-[13px] font-medium text-[#1b2a4e]">{item.ket}</td>
                      <td className="py-4 px-4 text-center"><span className={`inline-flex px-4 py-1.5 rounded-full text-[12px] font-bold ${item.isYellow ? 'bg-yellow-100 text-[#d97706]' : 'bg-pink-100 text-[#e11d48]'}`}>{item.st}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showExceptionToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Data berhasil ditambahkan</span>
        </div>
      )}
    </div>
  );
}