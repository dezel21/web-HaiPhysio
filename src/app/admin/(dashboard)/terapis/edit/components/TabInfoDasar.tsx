"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, CaretDown } from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";
import { bookingService } from "@/services/bookingService";

export default function TabInfoDasar({ formData, setFormData, therapistId }: any) {
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [focusAreasList, setFocusAreasList] = useState<any[]>([]);

  useEffect(() => {
    const loadFocusAreas = async () => {
      try {
        const res = await bookingService.getFocusAreas();
        const list = res.data?.focus_areas || res.data?.focusAreas || res.focus_areas || res.focusAreas || res.data || [];
        setFocusAreasList(list);
      } catch (err) {
        console.error("Gagal memuat focus areas:", err);
      }
    };
    loadFocusAreas();
  }, []);

  const handleSaveInfo = async () => {
    if (!formData.nama?.trim() || !formData.sip?.trim()) {
      alert("Nama Lengkap dan Nomor SIP wajib diisi!");
      return;
    }

    setIsSaving(true);
    try {
      if (therapistId) {
        // Cari focus_id yang cocok berdasarkan nama spesialisasi
        const matchedFocus = focusAreasList.find((f: any) => 
          (formData.spesialisasi || "").toLowerCase().includes((f.name || "").toLowerCase()) ||
          (f.name || "").toLowerCase().includes((formData.spesialisasi || "").toLowerCase())
        );

        const payload: any = {
          full_name: formData.nama,
          sip: formData.sip,
          phone: formData.telepon,
          email: formData.email,
          education: formData.pendidikan,
        };

        if (matchedFocus?.id) {
          payload.focus_ids = [matchedFocus.id];
        }

        await adminService.updateTherapist(therapistId, payload);
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error: any) {
      console.error("Gagal update data terapis:", error);
      const errMsg = error.response?.data?.message || "Gagal menyimpan perubahan data terapis.";
      alert(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm animate-in fade-in duration-300">
      
      {/* Nama Lengkap */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Lengkap</label>
        <input 
          type="text" 
          name="nama" 
          value={formData.nama} 
          onChange={(e) => setFormData({...formData, nama: e.target.value})} 
          className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-semibold" 
        />
      </div>

      {/* Nomor SIP */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor SIP (Surat Izin Praktik)</label>
        <input 
          type="text" 
          name="sip" 
          value={formData.sip} 
          onChange={(e) => setFormData({...formData, sip: e.target.value})} 
          className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
        />
      </div>

      {/* Spesialisasi */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Spesialisasi</label>
        <div className="relative">
          <select 
            name="spesialisasi" 
            value={formData.spesialisasi} 
            onChange={(e) => setFormData({...formData, spesialisasi: e.target.value})} 
            className="w-full appearance-none p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-semibold bg-white cursor-pointer"
          >
            <option value="Fisioterapi Muskuloskeletal">Fisioterapi Muskuloskeletal</option>
            <option value="Fisioterapi Olahraga">Fisioterapi Olahraga</option>
            <option value="Fisioterapi Neuro">Fisioterapi Neuro</option>
          </select>
          <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Nomor Telepon */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon</label>
        <input 
          type="text" 
          name="telepon" 
          value={formData.telepon} 
          onChange={(e) => setFormData({...formData, telepon: e.target.value})} 
          className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
        />
      </div>

      {/* Latar Belakang Pendidikan */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1b2a4e]">Latar Belakang Pendidikan</label>
        <input 
          type="text" 
          name="pendidikan" 
          value={formData.pendidikan} 
          onChange={(e) => setFormData({...formData, pendidikan: e.target.value})} 
          className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e]" 
        />
      </div>

      {/* Tombol Aksi */}
      <div className="w-full h-[1px] bg-gray-100 my-2"></div>
      <div className="flex justify-end items-center gap-4 w-full">
        <Link 
          href="/admin/terapis" 
          className="py-3.5 px-8 rounded-xl font-bold text-[#585858] hover:bg-gray-100 transition-colors"
        >
          Kembali
        </Link>
        <button 
          onClick={handleSaveInfo} 
          disabled={isSaving}
          className="py-3.5 px-8 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] shadow-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {/* Toast Sukses */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Perubahan Data Terapis Berhasil Disimpan</span>
        </div>
      )}
    </div>
  );
}
