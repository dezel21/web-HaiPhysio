"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CaretRight, CaretDown, CloudArrowUp, GraduationCap, Phone, EnvelopeSimple, Info, CheckCircle, Clock 
} from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

export default function TambahTerapisPage() {
  const router = useRouter();

  // State input form (sekaligus live preview)
  const [formData, setFormData] = useState({
    nama: "",
    sip: "",
    spesialisasi: "Fisioterapi Muskuloskeletal",
    jadwal: "Senin - Sabtu (08:00 - 16:00 WIB)",
    telepon: "",
    email: "",
    pendidikan: ""
  });
  
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.sip.trim()) {
      alert("Nama Lengkap dan Nomor SIP wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    try {
      await adminService.createTherapist({
        name: formData.nama,
        sip: formData.sip,
        specialization: formData.spesialisasi,
        scheduleDays: formData.jadwal,
        phone: formData.telepon,
        email: formData.email,
        education: formData.pendidikan,
        is_active: true,
      });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/admin/terapis");
      }, 1500);
    } catch (error) {
      console.error("Gagal menambahkan terapis:", error);
      alert("Gagal mendaftarkan terapis baru. Silakan periksa kembali data inputan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback nilai untuk Live Preview
  const previewNama = formData.nama || "Nama Fisioterapis";
  const previewSIP = formData.sip || "XX.XXX.XXX.XXXXX";
  const previewSpesialisasi = formData.spesialisasi || "Spesialisasi";
  const previewPendidikan = formData.pendidikan || "Belum diisi";
  const previewTelepon = formData.telepon || "-";
  const previewEmail = formData.email || "-";
  const previewJadwal = formData.jadwal || "-";

  return (
    <div className="w-full flex flex-col gap-6 pb-12 max-w-[1100px] mx-auto">
      
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
        <form onSubmit={handleSave} className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
          
          {/* Nama Lengkap */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="nama" 
              value={formData.nama} 
              onChange={handleChange}
              placeholder="Contoh: Ftr. Budi Santoso, S.Ft"
              required
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Nomor SIP */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">
              Nomor SIP (Surat Izin Praktik) <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="sip" 
              value={formData.sip} 
              onChange={handleChange}
              placeholder="Contoh: SIP/2026/0402/PHY/99"
              required
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Spesialisasi */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Spesialisasi Layanan</label>
            <div className="relative">
              <select 
                name="spesialisasi"
                value={formData.spesialisasi}
                onChange={handleChange}
                className="w-full appearance-none bg-white border border-gray-200 text-[#1b2a4e] text-[14px] font-semibold p-4 rounded-xl outline-none focus:border-[#F5B301] transition-colors cursor-pointer"
              >
                <option value="Fisioterapi Muskuloskeletal">Fisioterapi Muskuloskeletal</option>
                <option value="Fisioterapi Olahraga">Fisioterapi Olahraga</option>
                <option value="Fisioterapi Neuro">Fisioterapi Neuro</option>
              </select>
              <CaretDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Jadwal Praktek Rutin */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Jadwal Praktek Standar</label>
            <input 
              type="text" 
              name="jadwal" 
              value={formData.jadwal} 
              onChange={handleChange}
              placeholder="Contoh: Senin - Sabtu (08:00 - 16:00 WIB)"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon / WhatsApp</label>
            <input 
              type="text" 
              name="telepon" 
              value={formData.telepon} 
              onChange={handleChange}
              placeholder="0812 3456 7890"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Email Terapis</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="nama.terapis@haiphysio.com"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Pendidikan */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#1b2a4e]">Latar Belakang Pendidikan</label>
            <input 
              type="text" 
              name="pendidikan" 
              value={formData.pendidikan} 
              onChange={handleChange}
              placeholder="Contoh: S1 Fisioterapi - Universitas Indonesia"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#F5B301] transition-colors text-[14px] text-[#1b2a4e]"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="w-full h-[1px] bg-gray-100 my-2"></div>
          <div className="flex justify-end items-center gap-4 w-full">
            <Link 
              href="/admin/terapis"
              className="py-3.5 px-8 rounded-xl font-bold text-[#585858] hover:bg-gray-100 transition-colors"
            >
              Batal
            </Link>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="py-3.5 px-8 rounded-xl font-bold text-white bg-[#F5B301] hover:bg-[#dda101] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan Data..." : "Simpan Data Terapis"}
            </button>
          </div>
        </form>

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
              <div className="h-[100px] bg-gray-200 relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1b2a4e]/10 to-[#F5B301]/20"></div>
                <div className="absolute top-3 right-3 bg-[#F5B301] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                  {previewSpesialisasi}
                </div>
              </div>
              
              <div className="w-20 h-20 rounded-full border-4 border-white bg-[#1b2a4e] shadow-sm mx-auto -mt-10 relative z-10 overflow-hidden">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(previewNama.replace("Ftr. ", ""))}&background=1b2a4e&color=fff&size=150`} 
                  alt="Preview Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="p-5 flex flex-col gap-3.5 mt-1">
                <div className="flex flex-col items-center text-center pb-3 border-b border-gray-100">
                  <h3 className="text-[17px] font-bold text-[#1b2a4e]">{previewNama}</h3>
                  <span className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1">
                    SIP: {previewSIP}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap size={17} className="text-[#F5B301] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pendidikan</span>
                      <span className="text-[12px] font-semibold text-[#1b2a4e]">{previewPendidikan}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={17} className="text-[#F5B301] shrink-0" />
                    <span className="text-[12px] font-medium text-[#1b2a4e]">{previewJadwal}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={17} className="text-[#F5B301] shrink-0" />
                    <span className="text-[12px] font-medium text-[#1b2a4e]">{previewTelepon}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <EnvelopeSimple size={17} className="text-[#F5B301] shrink-0" />
                    <span className="text-[12px] font-medium text-[#1b2a4e] line-clamp-1">{previewEmail}</span>
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
                Pastikan Nomor SIP yang dimasukkan valid dan aktif. Setelah disimpan, data terapis baru akan langsung tampil di sistem booking pasien dan admin.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- TOAST NOTIFIKASI SUKSES --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Data Terapis Baru Berhasil Disimpan</span>
        </div>
      )}

    </div>
  );
}
