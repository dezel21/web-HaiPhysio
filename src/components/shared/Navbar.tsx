"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X, UserCircle } from "@phosphor-icons/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appointmentHref = isLoggedIn ? "/booking" : "/login";

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Tentang Kami", path: "/tentang-kami" },
    { label: "Layanan", path: "/layanan" },
    { label: "Kontak Kami", path: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full h-[83px] bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.05)] px-5 md:px-8 lg:px-[80px] flex items-center justify-between">
      
      {/* LOGO */}
      <div className="w-[103px] h-[67px] flex items-center justify-start relative">
        <Link href="/">
          <Image src="/fisio_nobg.png" alt="Logo Hai Physio" width={103} height={67} priority className="object-contain object-left w-auto h-auto" />
        </Link>
      </div>

      {/* MENU NAVIGASI DESKTOP */}
      <div className="hidden lg:flex items-center gap-[40px] xl:gap-[80px]">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[16px] transition-all duration-200 ${isActive ? "font-bold text-[#D69A00]" : "font-medium text-[#D69A00] hover:text-[#F5B301]"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* TOMBOL CTA / PROFIL DESKTOP */}
      <div className="hidden lg:flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex flex-col items-end">
              <span className="text-[#1b2a4e] text-[14px] font-bold leading-tight">Halo, Fathir</span>
              <span className="text-[#585858] text-[12px]">Pasien</span>
            </div>
            <UserCircle size={40} weight="light" color="#1b2a4e" />
          </div>
        ) : (
          <Link href={appointmentHref} className="flex items-center justify-center w-[224px] h-[48px] bg-[#F5B301] hover:bg-[#dda101] text-white font-medium text-[16px] rounded-md transition-colors">
            Buat Janji Temu
          </Link>
        )}
      </div>

      {/* HAMBURGER BUTTON (Mobile Only) */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="block lg:hidden text-[#D69A00] p-2">
        {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
      </button>

      {/* DROPDOWN MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-[83px] left-0 w-full bg-white shadow-lg lg:hidden flex flex-col px-5 py-6 gap-4 border-t border-gray-100">
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

          {isLoggedIn ? (
            <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-md border border-gray-100">
              <UserCircle size={40} weight="light" color="#1b2a4e" />
              <div className="flex flex-col">
                <span className="text-[#1b2a4e] text-[15px] font-bold leading-tight">Halo, Fathir</span>
                <span className="text-[#585858] text-[13px]">Pasien</span>
              </div>
            </div>
          ) : (
            <Link href={appointmentHref} onClick={() => setIsMobileMenuOpen(false)}
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