"use client";

import { useState } from "react";
import { Eye, EyeSlash, X, CheckCircle } from "@phosphor-icons/react";

export default function PengaturanProfilPage() {
  // State buat buka tutup modal ganti password
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State buat nampilin status sukses ganti password
  const [isSuccess, setIsSuccess] = useState(false);

  // State buat fitur show hide password di masing masing input
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Fungsi buat nutup modal dan ngereset status suksesnya
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Dikasih delay dikit biar pas modal ketutup animasi transisinya tetep mulus
    setTimeout(() => setIsSuccess(false), 300);
  };
  
  // Fungsi buat nampilin toast pas tombol "Simpan Perubahan" diklik
  const handleSaveProfile = () => {
    setShowToast(true);
    // Otomatis ngilang lagi setelah 3 detik
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    // Pembungkus utama halaman profil
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
      
      {/* Kanvas putih utama info akun */}
      <div className="w-full max-w-[900px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] h-fit">
        
        {/* Bagian judul dan deskripsi atas */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1b2a4e] mb-3">Pengaturan Profil</h1>
          <p className="text-[#585858] text-[14px] md:text-[15px]">
            Kelola informasi pribadi akun Anda dan pantau riwayat sesi terapi fisioterapi yang pernah Anda jalani.
          </p>
        </div>

        {/* Layout dua kolom buat avatar dan form */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          
          {/* Kolom kiri bagian foto profil */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden mb-4 bg-blue-100 border-4 border-white shadow-md">
              <img 
                src="https://ui-avatars.com/api/?name=Kartika+Wulandari&background=1b2a4e&color=fff&size=140" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-[#1b2a4e] font-bold text-[18px] mb-1">Kartika Wulandari</h3>
            <button className="text-[#F5B301] text-[13px] font-bold hover:text-[#dda101] transition-colors">
              Edit Foto
            </button>
          </div>

          {/* Kolom kanan bagian form input data diri */}
          <div className="flex-1 flex flex-col gap-5">
            
            {/* Input nama lengkap */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Lengkap</label>
              <input 
                type="text" 
                defaultValue="Kartika Wulandari"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
              />
            </div>

            {/* Input email yang sengaja dimatikan aksesnya */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Email</label>
              <input 
                type="email" 
                defaultValue="kartika.wulandari@email.com"
                disabled 
                className="w-full p-4 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl outline-none cursor-not-allowed text-[14px]"
              />
            </div>

            {/* Input nomor telepon */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon</label>
              <input 
                type="text" 
                defaultValue="081234567890"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
              />
            </div>

            {/* Input tanggal lahir */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Tanggal Lahir</label>
              <input 
                type="text" 
                defaultValue="12/03/1995"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
              />
            </div>

            {/* Kumpulan tombol aksi di bawah form */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-[220px] py-4 rounded-xl border-2 border-[#F5B301] text-[#F5B301] font-bold text-[15px] hover:bg-[#FFFBEA] transition-colors shrink-0"
              >
                Ganti Password
              </button>
              <button 
                onClick={handleSaveProfile}
                className="w-full py-4 rounded-xl bg-[#F5B301] text-white font-bold text-[15px] hover:bg-[#dda101] transition-colors shadow-[0_4px_12px_rgba(245,179,1,0.2)]"
              >
                Simpan Perubahan
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Komponen Toast Notifikasi Melayang */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#E6F4EA] border border-[#bbf7d0] px-5 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle size={20} weight="fill" className="text-[#1E8E3E]" />
          <span className="text-[#1E8E3E] text-[14px] font-bold">Data berhasil diperbarui</span>
        </div>
      )}

      {/* Pop up modal ganti password */}
      {isModalOpen && (
        // Overlay hitam transparan di belakang modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* Kotak putih modalnya */}
          <div className="bg-white w-full max-w-[500px] rounded-[24px] p-8 md:p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Tombol silang buat nutup modal di pojok kanan atas */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Logika pergantian tampilan modal form vs modal sukses */}
            {!isSuccess ? (
              // Tampilan form ganti password
              <div className="flex flex-col">
                <div className="text-center mb-8">
                  <h3 className="text-[20px] font-bold text-[#1b2a4e] mb-2">Buat Kata Sandi Baru</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Pastikan kata sandi baru Anda berbeda dari sebelumnya dan tidak mudah ditebak.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Input sandi lama */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Kata Sandi Lama</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? "text" : "password"} 
                        className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showOldPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                      </button>
                    </div>
                    <span className="text-[12px] text-gray-400">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</span>
                  </div>

                  {/* Input sandi baru */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Kata Sandi Baru</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                      </button>
                    </div>
                    <span className="text-[12px] text-gray-400">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</span>
                  </div>

                  {/* Input konfirmasi sandi baru */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                      </button>
                    </div>
                    <span className="text-[12px] text-gray-400">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</span>
                  </div>
                </div>

                {/* Teks link lupa kata sandi */}
                <button className="text-left text-[#3b82f6] text-[13px] font-medium mt-3 mb-8 hover:underline w-fit">
                  Lupa kata sandi?
                </button>

                {/* Tombol submit form modal */}
                <button 
                  onClick={() => setIsSuccess(true)}
                  className="w-full py-3.5 rounded-xl bg-[#F5B301] text-white font-bold text-[15px] hover:bg-[#dda101] transition-colors"
                >
                  Konfirmasi Kata Sandi Baru
                </button>
              </div>
            ) : (
              // Tampilan state sukses ganti password
              <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300 pt-4">
                {/* Gambar ilustrasi sukses */}
                <img 
                  src="/success-illustration.png" 
                  alt="Success" 
                  className="w-[200px] h-[200px] object-contain mb-6 bg-gray-50 rounded-2xl" 
                />
                
                <h3 className="text-[20px] font-bold text-[#F5B301] mb-2">Sandi Baru Anda Berhasil Disimpan!</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                  Sandi Anda sudah kami perbarui. Silakan login kembali dengan sandi baru Anda.
                </p>

                {/* Tombol kembali ke profil untuk nutup modal */}
                <button 
                  onClick={handleCloseModal}
                  className="w-full py-3.5 rounded-xl bg-[#F5B301] text-white font-bold text-[15px] hover:bg-[#dda101] transition-colors"
                >
                  Kembali ke Profil
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}