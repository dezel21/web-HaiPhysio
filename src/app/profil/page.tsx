"use client";

import { useEffect, useState } from "react";
import { Eye, EyeSlash, X, CheckCircle, SignOut } from "@phosphor-icons/react";
import { authApi } from "../utils/api";
import axios from 'axios';

export default function PengaturanProfilPage() {
  // State buat buka tutup modal ganti password
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State buat nampilin status sukses ganti password
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // State baru buat modal konfirmasi logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // State buat buka-tutup mata password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State buat nangkep inputan teks ganti password (sudah dirapihkan)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  
  // State buat loading utama & loading khusus modal password
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "12/03/1995", // Statis dulu karena belum disediain di endpoint GET /profile
  });
  
  // Fungsi narik data profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.get("/profile");
        const user = response.data.data.user;

        setProfileData({
          fullName: user.full_name,
          email: user.email,
          phone: user.phone,
          dateOfBirth: "12/03/1995", 
        });
      } catch (error) {
        console.error("Gagal narik data profil:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  // Fungsi buat nutup modal dan ngereset form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      setErrorMessage("");
    }, 300);
  };

  // Fungsi buat simpan profil
  const handleSaveProfile = async () => {
    try {
      await authApi.patch("/profile", {
        full_name: profileData.fullName,
      });
      
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Gagal update profil:", error);
      alert("Gagal menyimpan perubahan. Coba lagi!");
    }
  };

  // Fungsi buat nembak API ganti password yang bener
  const handleSubmitPassword = async () => {
    setErrorMessage("");

    if (newPassword !== newPasswordConfirmation) {
      setErrorMessage("Konfirmasi kata sandi baru tidak sama!");
      return;
    }

    setIsPasswordLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/auth/profile/password",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation
        },
        { 
          withCredentials: true 
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error.message);
      } else {
        setErrorMessage("Terjadi kesalahan sistem. Coba lagi nanti.");
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // Fungsi buat eksekusi logout ke API
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.post("/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Gagal keluar akun, coba lagi nanti!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Tampilan pas lagi nunggu data API
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-[#FAFAFA]">
        <span className="text-[#1b2a4e] font-bold">Sedang memuat data profil...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
      
      <div className="w-full max-w-[900px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] h-fit">
        
        <div className="text-center mb-10">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1b2a4e] mb-3">Pengaturan Profil</h1>
          <p className="text-[#585858] text-[14px] md:text-[15px]">
            Kelola informasi pribadi akun Anda dan pantau riwayat sesi terapi fisioterapi yang pernah Anda jalani.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden mb-4 bg-blue-100 border-4 border-white shadow-md">
              <img 
                src={`https://ui-avatars.com/api/?name=${profileData.fullName.replace(" ", "+")}&background=1b2a4e&color=fff&size=140`}
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
           <h3 className="text-[#1b2a4e] font-bold text-[18px] mb-1 w-full max-w-[200px] text-center break-words">
            {profileData.fullName || "User"}
            </h3>
            <button className="text-[#F5B301] text-[13px] font-bold hover:text-[#dda101] transition-colors">
              Edit Foto
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Nama Lengkap</label>
              <input 
                type="text" 
                value={profileData.fullName}
                maxLength={100}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] transition-colors text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Email</label>
              <input 
                type="email" 
                value={profileData.email}
                disabled 
                className="w-full p-4 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl outline-none cursor-not-allowed text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Nomor Telepon</label>
              <input 
                type="text" 
                value={profileData.phone}
                disabled
                className="w-full p-4 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl outline-none cursor-not-allowed text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#1b2a4e]">Tanggal Lahir</label>
              <input 
                type="text" 
                value={profileData.dateOfBirth}
                disabled 
                className="w-full p-4 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl outline-none cursor-not-allowed text-[14px]"
              />
            </div>

            <div className="mt-2 p-5 border border-red-200 bg-[#FEF2F2] rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[#DC2626] font-bold text-[15px]">Keluar dari Akun</span>
                <span className="text-[#EF4444] text-[13px]">Keluar dari akun kamu saat ini.</span>
              </div>
              <button 
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white px-5 py-2.5 rounded-lg font-medium text-[14px] transition-colors"
              >
                Keluar Akun
                <SignOut size={18} weight="bold" />
              </button>
            </div>

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

      {/* MODAL KONFIRMASI LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[400px] rounded-[20px] p-8 text-center relative shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[20px] font-bold text-[#1b2a4e] mb-2">Keluar Akun?</h3>
            <p className="text-[14px] text-gray-500 mb-8">Sesi kamu akan diakhiri.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-[#F5B301] font-bold text-[15px] hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex-1 py-3 rounded-xl text-white font-bold text-[15px] transition-colors ${isLoggingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EF4444] hover:bg-[#DC2626]'}`}
              >
                {isLoggingOut ? "Keluar..." : "Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop up modal ganti password */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="bg-white w-full max-w-[500px] rounded-[24px] p-8 md:p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} weight="bold" />
            </button>

            {!isSuccess ? (
              <div className="flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-[20px] font-bold text-[#1b2a4e] mb-2">Buat Kata Sandi Baru</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Pastikan kata sandi baru Anda berbeda dari sebelumnya dan tidak mudah ditebak.
                  </p>
                </div>

                {/* Tempat nampilin pesan error dari backend */}
                {errorMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-500 text-[13px] font-medium border border-red-100 text-center">
                    {errorMessage}
                  </div>
                )}

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Kata Sandi Lama</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? "text" : "password"} 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Kata Sandi Baru</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
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

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1b2a4e]">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        value={newPasswordConfirmation}
                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
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
                  </div>
                </div>

                <button className="text-left text-[#3b82f6] text-[13px] font-medium mt-3 mb-8 hover:underline w-fit">
                  Lupa kata sandi?
                </button>

                <button 
                  onClick={handleSubmitPassword}
                  disabled={isPasswordLoading}
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-[15px] transition-colors ${isPasswordLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F5B301] hover:bg-[#dda101]'}`}
                >
                  {isPasswordLoading ? 'Memproses...' : 'Konfirmasi Kata Sandi Baru'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300 pt-4">
                <img 
                  src="/success-illustration.png" 
                  alt="Success" 
                  className="w-[200px] h-[200px] object-contain mb-6 bg-gray-50 rounded-2xl" 
                />
                
                <h3 className="text-[20px] font-bold text-[#F5B301] mb-2">Sandi Baru Anda Berhasil Disimpan!</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                  Sandi Anda sudah kami perbarui. Sesi di perangkat lain telah otomatis keluar.
                </p>

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