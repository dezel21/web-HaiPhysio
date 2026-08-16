"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CaretRight, CloudArrowUp, GraduationCap, Phone, EnvelopeSimple, Info, CheckCircle 
} from "@phosphor-icons/react";

export default function TambahTerapisPage() {
  const router = useRouter();

  // State buat nyimpen data inputan (sekaligus buat Live Preview)
  const [formData, setFormData] = useState({
    nama: "",
    sip: "",
    spesialisasi: "",
    telepon: "",
    email: "",
    pendidikan: ""
  });
  
  const [showToast, setShowToast] = useState(false);

  // Fungsi buat nangkep ketikan user
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi pas tombol simpan diklik
  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/admin/terapis");
    }, 2000);
  };

  // Fallback nilai buat di Live Preview kalau inputan masih kosong
  const previewNama = formData.nama || "Nama Terapis";
  const previewSIP = formData.sip || "-";
  const previewSpesialisasi = formData.spesialisasi || "Spesialisasi";
  const previewPendidikan = formData.pendidikan || "Belum diisi";
  const previewTelepon = formData.telepon || "-";
  const previewEmail = formData.email || "-";

  return (
    <div className="w-full flex flex-col gap-6 pb-10 max-w-[1100px] mx-auto">
      
      {/* --- BREADCRUMB & JUDUL --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <Link href="/admin/terapis" className="hover:text-[#F5B301] transition-colors">
            Kelola Data Terapis
          </Link>
          <CaretRight size={14} />
          <span className="text-[#1b2a4e] font-bold">Tambah Terapis</span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Tambah Terapis Baru</h2>
        <p className="text-[#585858] text-[15px]">Lengkapi informasi di bawah ini untuk mendaftarkan terapis profesional baru ke dalam sistem Hai Physio.</p>
      </div>

      {/* --- LAYOUT GRID (KIRI: FORM, KANAN: LIVE PREVIEW) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start mt-2">
        
        {/* === KOLOM KIRI: FORM INPUT === */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
          
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Lengkap</label>
            <input 
              type="text" name="nama" value={formData.nama} onChange={handleChange}
              placeholder="Contoh: Dr. Budi Santoso, Sp.Ftr"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor SIP (Surat Izin Praktik)</label>
            <input 
              type="text" name="sip" value={formData.sip} onChange={handleChange}
              placeholder="XX.XXX.XXX.XXXXX"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Spesialisasi</label>
            <input 
              type="text" name="spesialisasi" value={formData.spesialisasi} onChange={handleChange}
              placeholder="Pilih Spesialisasi"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon</label>
            <input 
              type="text" name="telepon" value={formData.telepon} onChange={handleChange}
              placeholder="+62"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Email</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="nama@haiphysio.com"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Latar Belakang Pendidikan</label>
            <input 
              type="text" name="pendidikan" value={formData.pendidikan} onChange={handleChange}
              placeholder="Sebutkan riwayat pendidikan terakhir dan institusi..."
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Area Drag & Drop Foto */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Foto Profil Terapis</label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <CloudArrowUp size={32} className="text-gray-400" />
              <span className="text-[14px] font-bold text-[#1b2a4e]">Klik atau seret foto ke sini</span>
              <span className="text-[12px] text-gray-400">PNG, JPG up to 5MB (Recomm. 1:1 ratio)</span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="w-full h-[1px] bg-gray-100 my-2"></div>
          <div className="flex justify-end items-center gap-4 w-full">
            <Link 
              href="/admin/terapis"
              className="py-3 px-8 rounded-xl font-bold text-[#585858] hover:bg-gray-100 transition-colors"
            >
              Batal
            </Link>
            <button 
              onClick={handleSave}
              className="py-3 px-8 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm"
            >
              Simpan Data Terapis
            </button>
          </div>
        </div>

        {/* === KOLOM KANAN: LIVE PREVIEW & CATATAN PENTING === */}
        <div className="flex flex-col gap-6 sticky top-28">
          
          {/* Kartu Pratinjau */}
          <div className="w-full bg-[#FFFBEA] border border-[#fdeeb3] rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col relative">
            <div className="flex items-center gap-2 mb-6">
              <Info size={18} className="text-[#F5B301]" />
              <span className="text-[13px] font-bold text-[#1b2a4e]">Pratinjau Kartu Terapis</span>
            </div>

            {/* Konten Kartu */}
            <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
              {/* Bagian Atas: Cover & Avatar */}
              <div className="h-[120px] bg-gray-200 relative w-full overflow-hidden">
                {/* Mockup cover bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300"></div>
                {/* Badge Spesialisasi */}
                <div className="absolute top-3 right-3 bg-[#F5B301] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                  {previewSpesialisasi}
                </div>
              </div>
              
              {/* Avatar bulet */}
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm mx-auto -mt-12 relative z-10 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(previewNama)}&background=1b2a4e&color=fff&size=150`} alt="Preview Avatar" className="w-full h-full object-cover" />
              </div>

              {/* Data Terapis di Kartu */}
              <div className="p-5 flex flex-col gap-4 mt-2">
                <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
                  <h3 className="text-[18px] font-bold text-[#1b2a4e]">{previewNama}</h3>
                  <span className="text-[13px] text-gray-500 mt-1 flex items-center gap-1.5">
                    <Info size={14} /> SIP: {previewSIP}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-[#F5B301] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pendidikan</span>
                      <span className="text-[13px] font-medium text-[#1b2a4e]">{previewPendidikan}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#F5B301] shrink-0" />
                    <span className="text-[13px] font-medium text-[#1b2a4e]">{previewTelepon}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EnvelopeSimple size={18} className="text-[#F5B301] shrink-0" />
                    <span className="text-[13px] font-medium text-[#1b2a4e] line-clamp-1">{previewEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Catatan Penting Warning Box */}
          <div className="bg-white border-l-4 border-l-[#F5B301] border-y border-r border-gray-200 rounded-xl p-5 flex items-start gap-3 shadow-sm">
            <Info size={24} weight="fill" className="text-[#F5B301] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <h4 className="text-[14px] font-bold text-[#1b2a4e]">Catatan Penting</h4>
              <p className="text-[13px] text-[#585858] leading-relaxed">
                Pastikan Nomor SIP yang dimasukkan sudah valid dan masih aktif. Data yang disimpan akan segera muncul di Booking List untuk pasien.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Data Terapis Berhasil Disimpan</span>
        </div>
      )}

    </div>
  );
}