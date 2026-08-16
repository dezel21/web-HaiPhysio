"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";

export default function TabInfoDasar({ formData, setFormData }: any) {
  const [showToast, setShowToast] = useState(false);

  const handleSaveInfo = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm animate-in fade-in duration-300">
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Lengkap</label>
        <input type="text" name="nama" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor SIP (Surat Izin Praktik)</label>
        <input type="text" name="sip" value={formData.sip} onChange={(e) => setFormData({...formData, sip: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Spesialisasi</label>
        <input type="text" name="spesialisasi" value={formData.spesialisasi} onChange={(e) => setFormData({...formData, spesialisasi: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon</label>
        <input type="text" name="telepon" value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Email</label>
        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Latar Belakang Pendidikan</label>
        <input type="text" name="pendidikan" value={formData.pendidikan} onChange={(e) => setFormData({...formData, pendidikan: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-gray-500" />
      </div>

      <div className="w-full h-[1px] bg-gray-100 my-2"></div>
      <div className="flex justify-end items-center gap-4 w-full">
        <Link href="/admin/terapis" className="py-3 px-8 rounded-xl font-bold text-[#585858] hover:bg-gray-100 transition-colors">Batal</Link>
        <button onClick={handleSaveInfo} className="py-3 px-8 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] shadow-sm transition-colors">Simpan Data Terapis</button>
      </div>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Perubahan Berhasil Disimpan</span>
        </div>
      )}
    </div>
  );
}