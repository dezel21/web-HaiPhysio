"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

export default function EditProfileForm() {
  // State buat ngontrol mode edit dan munculnya toast sukses
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // State buat nyimpen data inputan form
  const [formData, setFormData] = useState({
    fullName: "Dinda Ayu Pratiwi",
    email: "dindaAyu12@gmail.com", 
    phone: "+62 812 3456 7890",
    department: "Administration & Operations",
    address: "Jl. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan, 12190 DKI Jakarta, Indonesia",
  });

  // Logika pas tombol simpan diklik
  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
    // Toast otomatis ngilang setelah 3 detik
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fungsi buat nangkep ketikan user di form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex flex-col gap-6 relative pb-10">
      
      {/* --- KARTU PROFIL ATAS --- */}
      <div className="w-full bg-[#fcfaf7] border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Dekorasi aksen warna tipis di background kanan */}
        <div className="absolute right-0 top-0 w-[300px] h-full bg-gradient-to-l from-[#FFFBEA] to-transparent pointer-events-none"></div>

        <div className="flex items-center gap-6 relative z-10">
          {/* Foto Profil */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-[#1b2a4e] shrink-0">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=1b2a4e&color=fff&size=150`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          
          {/* Info Singkat */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[22px] md:text-[24px] font-bold text-[#1b2a4e]">{formData.fullName}</h3>
            <span className="text-[#585858] text-[14px]">Admin</span>
            {/* Badge Active Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full mt-2 w-max border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[12px] font-bold">Active Status</span>
            </div>
          </div>
        </div>

        {/* Employee ID */}
        <div className="flex flex-col border border-gray-200 bg-white rounded-xl px-5 py-3 relative z-10 shadow-sm shrink-0">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Employee ID</span>
          <span className="text-[16px] font-bold text-[#1b2a4e]">HP-ADM-042</span>
        </div>
      </div>

      {/* --- KOTAK FORM PERSONAL DETAILS --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        
        {/* Header Form & Tombol Aksi */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-gray-100 pb-4">
          <h4 className="text-[18px] font-bold text-[#1b2a4e]">Personal Details</h4>
          
          {isEditing ? (
            <div className="flex gap-3">
              <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-xl font-bold text-[#585858] bg-gray-100 hover:bg-gray-200 transition-colors text-[14px]">
                Batal
              </button>
              <button onClick={handleSave} className="px-5 py-2 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm text-[14px]">
                Simpan Perubahan
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-5 py-2 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm text-[14px]">
              Edit Profile
            </button>
          )}
        </div>

        {/* Grid Inputan Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#1b2a4e]">Full Name</label>
            <input 
              type="text" name="fullName" value={formData.fullName} onChange={handleChange} disabled={!isEditing}
              className={`w-full p-3.5 rounded-xl border outline-none transition-colors text-[14px] ${isEditing ? "border-[#F5B301] bg-white text-[#1b2a4e]" : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#1b2a4e]">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing}
              className={`w-full p-3.5 rounded-xl border outline-none transition-colors text-[14px] ${isEditing ? "border-[#F5B301] bg-white text-[#1b2a4e]" : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#1b2a4e]">Phone Number</label>
            <input 
              type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing}
              className={`w-full p-3.5 rounded-xl border outline-none transition-colors text-[14px] ${isEditing ? "border-[#F5B301] bg-white text-[#1b2a4e]" : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#1b2a4e]">Department</label>
            <input 
              type="text" name="department" value={formData.department} onChange={handleChange} disabled={!isEditing}
              className={`w-full p-3.5 rounded-xl border outline-none transition-colors text-[14px] ${isEditing ? "border-[#F5B301] bg-white text-[#1b2a4e]" : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
            />
          </div>

          {/* Residential Address (Bikin full width alias col-span-2) */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[14px] font-medium text-[#1b2a4e]">Residential Address</label>
            <textarea 
              name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} rows={3}
              className={`w-full p-3.5 rounded-xl border outline-none transition-colors text-[14px] resize-none ${isEditing ? "border-[#F5B301] bg-white text-[#1b2a4e]" : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
            />
          </div>
        </div>
      </div>

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-bounce">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Edit Profil Berhasil</span>
        </div>
      )}

    </div>
  );
}