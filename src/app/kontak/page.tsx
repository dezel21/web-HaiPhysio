"use client";

import Image from "next/image";
import Link from "next/link";
import HeroBanner from "../../components/home/HeroBanner";
import LocationMap from "../../components/home/LocationMap";
import ContactSection from "../../components/home/ContactSection";
import {
  EnvelopeSimple,
  InstagramLogo
} from "@phosphor-icons/react";

export default function KontakKami() {
  const isLoggedIn = false;

  return (
    <div className="w-full flex flex-col min-h-screen">

      {/* 1. HERO BANNER KONTAK */}
      <HeroBanner title="Kontak Kami" imageSrc="/hero-kontak.png" />

      {/* 2. SECTION HUBUNGI KAMI */}
      <ContactSection
        title="Masih Ada yang Ingin Ditanyakan?"
        subtitle="Hubungi kami lewat WhatsApp atau Email, atau langsung datang ke klinik."
      >
        {/* Tombol CTA JANJI TEMU */}
        <Link
          href={isLoggedIn ? "/booking" : "/login"}
          className="w-full h-[56px] flex items-center justify-center gap-2 bg-[#F5B301] hover:bg-[#dda101] text-white font-semibold text-[16px] rounded-[12px] transition-colors mt-2"
        >
          Buat Janji Temu
        </Link>
      </ContactSection>

      {/* 3. SECTION LOKASI KLINIK */}
      <LocationMap />

    </div>
  );
}