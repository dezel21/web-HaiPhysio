"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { List, X, UserCircle, ClockCounterClockwise } from "@phosphor-icons/react";
import { profileService } from "@/services/profileService";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ fullName: string } | null>(null);

  // Cek sesi login otomatis ke API backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await profileService.getProfile();
        const user = res.data?.user || res.user;
        setUserData({ fullName: user?.full_name || user?.name || "Pasien" });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };
    checkAuth();
  }, [pathname]);

  const appointmentHref = isLoggedIn ? "/booking" : "/login";

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Tentang Kami", path: "/tentang-kami" },
    { label: "Layanan", path: "/layanan" },
    { label: "Kontak Kami", path: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full h-[85px] md:h-[100px] bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.05)] px-5 md:px-8 lg:px-10 xl:px-[120px] flex items-center justify-between transition-all">
      
      {/* LOGO */}
      <div className="w-[110px] md:w-[125px] flex items-center justify-start relative">
        <Link href="/">
          <Image 
            src="/fisio_nobg.png" 
            alt="Logo Hai Physio" 
            width={125} 
            height={80} 
            priority 
            className="object-contain object-left w-full h-auto" 
          />
        </Link>
      </div>

      {/* MENU NAVIGASI DESKTOP */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-[60px]">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[15px] xl:text-[16px] transition-all duration-200 ${isActive ? "font-bold text-[#D69A00]" : "font-medium text-[#D69A00] hover:text-[#F5B301]"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* TOMBOL CTA / PROFIL DESKTOP */}
      <div className="hidden lg:flex items-center gap-4">
        <Link 
          href={appointmentHref} 
          className="flex items-center justify-center px-6 h-[46px] bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[15px] rounded-lg transition-colors shadow-sm"
        >
          Buat Janji Temu
        </Link>

        {isLoggedIn && (
          <div className="relative">
            <div 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center justify-center cursor-pointer p-1 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200"
            >
              <UserCircle size={40} weight="fill" color="#1b2a4e" />
            </div>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-[220px] bg-white border border-gray-100 rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link 
                  href="/profil" 
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 text-[#1b2a4e] text-[14px] font-medium transition-colors hover:bg-[#FFFBEA] hover:text-[#F5B301]"
                >
                  <UserCircle size={20} className="text-gray-400 group-hover:text-[#F5B301]" />
                  Pengaturan Profil
                </Link>
                <div className="w-full h-[1px] bg-gray-100 my-1"></div>
                <Link 
                  href="/riwayat-booking" 
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 text-[#1b2a4e] text-[14px] font-medium transition-colors hover:bg-[#FFFBEA] hover:text-[#F5B301]"
                >
                  <ClockCounterClockwise size={20} className="text-gray-400 group-hover:text-[#F5B301]" />
                  Riwayat Booking
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HAMBURGER BUTTON (Mobile Only) */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="block lg:hidden text-[#D69A00] p-2">
        {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
      </button>

      {/* DROPDOWN MOBILE MENU: top-full (MENEMPEL RAPAT 0 GAP) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden flex flex-col px-5 py-6 border-t border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-85px)] overflow-y-auto">
          
          {/* Header Profil User di Mobile (Jika Sudah Login) */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 mb-4 p-3.5 bg-[#FFFBEA] rounded-xl border border-[#FDE68A]">
              <UserCircle size={40} weight="fill" color="#1b2a4e" />
              <div className="flex flex-col min-w-0">
                <span className="text-[#1b2a4e] text-[15px] font-bold truncate">{userData?.fullName || "Akun Saya"}</span>
                <span className="text-[#D69A00] text-[12px] font-medium">Pasien Terdaftar</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 mb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[16px] py-2 border-b border-gray-50 ${isActive ? "font-bold text-[#D69A00]" : "font-medium text-[#D69A00]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col mt-2 border-t border-gray-100 pt-3">
              <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] py-3 border-b border-gray-50 font-medium text-[#1b2a4e] flex items-center gap-3">
                <UserCircle size={20} className="text-gray-400" /> Pengaturan Profil
              </Link>
              <Link href="/riwayat-booking" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] py-3 border-b border-gray-50 font-medium text-[#1b2a4e] flex items-center gap-3">
                <ClockCounterClockwise size={20} className="text-gray-400" /> Riwayat Booking
              </Link>
              <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-[46px] flex items-center justify-center bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[15px] rounded-lg mt-5"
              >
                Buat Janji Temu
              </Link>
            </div>
          ) : (
            <div className="flex flex-col mt-2 border-t border-gray-100 pt-4">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-[46px] flex items-center justify-center bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[15px] rounded-lg shadow-sm"
              >
                Buat Janji Temu
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
