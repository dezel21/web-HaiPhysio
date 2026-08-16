"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, CalendarBlank, ClockCounterClockwise, PencilSimple } from "@phosphor-icons/react";

// Import komponen-komponen yang udah kita pecah tadi
import TabInfoDasar from "./components/TabInfoDasar";
import TabJadwal from "./components/TabJadwal";
import TabRiwayat from "./components/TabRiwayat";

export default function EditTerapisPage() {
  const [activeTab, setActiveTab] = useState("info"); 
  const [isActive, setIsActive] = useState(true);
  const [isAddingException, setIsAddingException] = useState(false); // Naik ke atas biar header bisa disembunyiin

  const [formData, setFormData] = useState({ 
    nama: "Ftr. Andi Pratama", 
    sip: "SIP/2021/0402/PHY/99", 
    spesialisasi: "Musculoskeletal Physiotherapy", 
    telepon: "+62 123 456 789", 
    email: "andi.pratama@haiphysio.com", 
    pendidikan: "Sarjana Fisioterapi" 
  });

  return (
    <div className="w-full flex flex-col gap-6 pb-10 max-w-[1000px] mx-auto">
      
      {/* --- BREADCRUMB --- */}
      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
        <Link href="/admin/terapis" className="hover:text-[#F5B301] transition-colors">Kelola Data Terapis</Link>
        <span>›</span>
        {isAddingException ? (
          <>
            <span className="cursor-pointer hover:text-[#F5B301]" onClick={() => setIsAddingException(false)}>Edit Data Terapis</span>
            <span>›</span>
            <span className="text-[#1b2a4e] font-bold">Tambah Pengecualian Jadwal</span>
          </>
        ) : (
          <span className="text-[#1b2a4e] font-bold">Edit Data Terapis</span>
        )}
      </div>

      {/* --- HEADER KARTU PROFIL --- */}
      {!isAddingException && (
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-200">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama)}&background=1b2a4e&color=fff`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#F5B301] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#dda101] shadow-sm">
                <PencilSimple size={14} weight="bold" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-bold text-[#1b2a4e] leading-tight">{formData.nama}</h2>
              <p className="text-[14px] text-gray-500">Senior Physiotherapist • ID: PHY-2024-001</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00b074]' : 'bg-gray-400'}`}></span>
                <span className={`text-[13px] font-bold ${isActive ? 'text-[#00b074]' : 'text-gray-400'}`}>Status: {isActive ? 'Aktif' : 'Nonaktif'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 py-2 px-4 rounded-xl shrink-0">
            <span className="text-[14px] font-bold text-[#1b2a4e]">Status Keaktifan</span>
            <div onClick={() => setIsActive(!isActive)} className="flex items-center gap-2 cursor-pointer">
              <div className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${isActive ? 'bg-[#00b074]' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
              <span className={`text-[14px] font-bold ${isActive ? 'text-[#00b074]' : 'text-gray-400'}`}>{isActive ? 'Aktif' : 'Off'}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- SISTEM TABS NAVIGATION --- */}
      {!isAddingException && (
        <div className="w-full flex items-center gap-8 border-b border-gray-200 px-2 mt-2">
          {['info', 'jadwal', 'riwayat'].map(tab => (
            <button 
              key={tab} onClick={() => setActiveTab(tab)} 
              className={`flex items-center gap-2 pb-4 border-b-2 font-bold capitalize transition-colors ${activeTab === tab ? "border-[#F5B301] text-[#F5B301]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
            >
              {tab === 'info' && <><Info size={18} weight={activeTab === tab ? "bold" : "regular"} /> Informasi Dasar</>}
              {tab === 'jadwal' && <><CalendarBlank size={18} weight={activeTab === tab ? "bold" : "regular"} /> Jadwal Praktek</>}
              {tab === 'riwayat' && <><ClockCounterClockwise size={18} weight={activeTab === tab ? "bold" : "regular"} /> Riwayat Sesi</>}
            </button>
          ))}
        </div>
      )}

      {/* --- KONTEN TAB RENDERER --- */}
      {activeTab === "info" && !isAddingException && <TabInfoDasar formData={formData} setFormData={setFormData} />}
      {activeTab === "jadwal" && <TabJadwal isAddingException={isAddingException} setIsAddingException={setIsAddingException} />}
      {activeTab === "riwayat" && !isAddingException && <TabRiwayat />}

    </div>
  );
}