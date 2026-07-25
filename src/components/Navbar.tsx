"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
// Tambahan UserCircle untuk icon profil
import { List, X, UserCircle } from "@phosphor-icons/react"; 

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State bohongan untuk simulasi Login/Logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Tentang Kami", path: "/tentang-kami" },
    { label: "Layanan", path: "/layanan" },
    { label: "Kontak Kami", path: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full h-[83px] bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.05)] px-5 md:px-[80px] flex items-center justify-between">

      {/* KIRI: LOGO */}
      <div className="w-[103px] h-[67px] flex items-center justify-start relative">
        <Link href="/">
          {/* Pastikan file logo.svg di folder public persis seperti visual di gambar */}
          <Image
            src="/fisio_nobg.png"
            alt="Logo Hai Physio"
            width={103}
            height={67}
            priority
            className="object-contain object-left"
          />
        </Link>
      </div>

      {/* TENGAH: MENU NAVIGASI */}
      {/* Perhatikan perubahan di sini: gap diperbesar menjadi gap-[80px] */}
      <div className="hidden md:flex items-center gap-[80px]">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[16px] transition-all duration-200 ${isActive
                  ? "font-bold text-[#D69A00]"
                  : "font-medium text-[#D69A00] hover:text-[#F5B301]"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* KANAN: TOMBOL CTA & PROFIL (DENGAN LOGIKA AUTH) */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          // TAMPILAN JIKA SUDAH LOGIN
          <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex flex-col items-end">
              <span className="text-[#1b2a4e] text-[14px] font-bold leading-tight">Halo, Fathir</span>
              <span className="text-[#585858] text-[12px]">Pasien</span>
            </div>
            <UserCircle size={40} weight="light" color="#1b2a4e" />
          </div>
        ) : (
          // TAMPILAN JIKA BELUM LOGIN
          <Link
            href="/booking"
            className="flex items-center justify-center w-[224px] h-[48px] bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[16px] rounded-md transition-colors"
          >
            Buat Janji Temu
          </Link>
        )}

        {/* TOMBOL RAHASIA BUAT SIMULASI (Bisa lu hapus nanti) */}
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200 hover:bg-red-200 transition-colors"
          title="Toggle Auth"
        >
          Auth
        </button>
      </div>

      {/* HAMBURGER MENU (MOBILE) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="block md:hidden text-[#D69A00] p-2"
      >
        {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-[83px] left-0 w-full bg-white shadow-lg md:hidden flex flex-col px-5 py-6 gap-4 border-t border-gray-100">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[16px] py-2 border-b border-gray-50 ${isActive ? "font-bold text-[#D69A00]" : "font-medium text-[#D69A00]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* LOGIKA AUTH UNTUK MENU MOBILE */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-md border border-gray-100">
              <UserCircle size={40} weight="light" color="#1b2a4e" />
              <div className="flex flex-col">
                <span className="text-[#1b2a4e] text-[15px] font-bold leading-tight">Halo, Fathir</span>
                <span className="text-[#585858] text-[13px]">Pasien</span>
              </div>
            </div>
          ) : (
            <Link
              href="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full h-[48px] flex items-center justify-center bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[16px] rounded-md mt-4"
            >
              Buat Janji Temu
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}