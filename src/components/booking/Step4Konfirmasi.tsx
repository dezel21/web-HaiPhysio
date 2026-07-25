"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, UserCircle, Copy } from "@phosphor-icons/react";
import Stepper from "./Stepper";

interface Step4Props {
    onBack: () => void;
    bookingData: any; // Menerima data dari langkah-langkah sebelumnya
}

export default function Step4Konfirmasi({ onBack, bookingData }: Step4Props) {
    // State ini buat nentuin apakah user udah klik tombol "Konfirmasi Booking"
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter(); // Inisialisasi router buat tombol

    // Fungsi untuk mensimulasikan proses nembak ke API (Back-End)
    const handleConfirm = () => {
        // Di dunia nyata, di sini lu bakal pasang loading dan fetch API. 
        // Untuk sekarang, tampilannya jadi sukses.
        setIsConfirmed(true);
    };

    // Fungsi untuk fitur copy nomor resi
    const handleCopyResi = () => {
        navigator.clipboard.writeText("RESV - 456123");
        alert("Nomor reservasi berhasil disalin!");
    };

    // --- LOGIKA FRONT-END (Penterjemah Data) ---
    const getScheduleDetails = (id: string) => {
        const slots: Record<string, any> = {
            "s1": { date: "Senin, 07 Juli 2026", time: "09:00 - 10:00 WIB", therapist: "Ftr. Andi Pratama" },
            "s4": { date: "Selasa, 08 Juli 2026", time: "10:00 - 11:00 WIB", therapist: "Ftr. Sari Wijaya, S.Ft" },
            "s5": { date: "Rabu, 09 Juli 2026", time: "11:00 - 12:00 WIB", therapist: "Ftr. Bintang Dito" },
            "s7": { date: "Jumat, 11 Juli 2026", time: "15:00 - 16:00 WIB", therapist: "Ftr. Sari Wijaya, S.Ft" },
            "s9": { date: "Minggu, 13 Juli 2026", time: "13:00 - 14:00 WIB", therapist: "Ftr. Sari Wijaya, S.Ft" },
        };
        return slots[id] || { date: "-", time: "-", therapist: "-" };
    };

    const scheduleInfo = getScheduleDetails(bookingData.scheduleId);
    const getServiceName = (id: string) => {
        const safeId = id?.toLowerCase() || "";

        if (safeId.includes("olahraga") || safeId === "1") {
            return "Fisioterapi Olahraga (Cedera & Aktivitas Fisik)";
        }
        if (safeId.includes("muskuloskeletal") || safeId === "2") {
            return "Fisioterapi Muskuloskeletal";
        }
        if (safeId.includes("neurologi") || safeId === "3") {
            return "Fisioterapi Neurologi";
        }

        // Kalau ID-nya bener-bener gak dikenali, tampilin apa adanya dari Step 1
        return id || "Fisioterapi Olahraga (Cedera & Aktivitas Fisik)";
    };

    const serviceName = getServiceName(bookingData.serviceId);

    // --- KONDISI 2: TAMPILAN HALAMAN SUKSES ---
    if (isConfirmed) {
        return (
            <div className="w-full flex flex-col items-center">
                {/* Stepper kita kasih angka 5 biar Langkah 4 ikutan jadi centang kuning semua */}
                <Stepper currentStep={5} />

                <div className="flex flex-col items-center text-center mt-4 w-full max-w-[700px] mx-auto gap-6">
                    {/* Ilustrasi Dokter*/}
                    <div className="w-full max-w-[320px] h-[220px] flex items-center justify-center mb-2">
                        <img
                            src="/ilustrasi-sukses.png"
                            alt="Janji Temu Berhasil"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-[28px] md:text-[32px] font-bold text-[#1b2a4e]">Janji Temu Anda Berhasil Dipesan!</h2>
                        <p className="text-[#585858] text-[15px]">Silakan tunjukkan nomor reservasi Anda saat tiba di klinik.</p>
                    </div>

                    {/* Kotak Nomor Reservasi */}
                    <div className="flex items-center justify-between border-2 border-dashed border-[#8b9dc3] bg-[#f4f7fe] rounded-[16px] px-8 py-4 w-full max-w-[500px]">
                        <span className="text-[28px] font-bold text-[#1b2a4e]">RESV - 456123</span>
                        <div
                            onClick={handleCopyResi}
                            className="flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-[#1b2a4e] transition-colors"
                        >
                            <Copy size={24} weight="bold" />
                            <span className="text-[10px] mt-1 font-medium">Klik untuk<br />salin nomor</span>
                        </div>
                    </div>

                    {/* Ringkasan Singkat Dinamis */}
                    <div className="w-full border border-gray-200 rounded-[16px] p-6 text-left mt-4 bg-white">
                        <h3 className="flex items-center gap-2 text-[18px] font-bold text-[#1b2a4e] mb-4">
                            <FileText size={24} weight="fill" className="text-[#1b2a4e]" /> Detail Sesi Terapi
                        </h3>
                        <div className="flex flex-col gap-3 text-[14px]">
                            <div className="flex border border-gray-100 rounded-lg p-3">
                                <span className="w-[150px] font-bold text-[#1b2a4e]">Jenis Layanan</span>
                                <span className="text-gray-600 flex-1">{serviceName}</span>
                            </div>
                            <div className="flex border border-gray-100 rounded-lg p-3">
                                <span className="w-[150px] font-bold text-[#1b2a4e]">Fisioterapis</span>
                                <span className="text-gray-600 flex-1">{scheduleInfo.therapist}</span>
                            </div>
                            <div className="flex border border-gray-100 rounded-lg p-3">
                                <span className="w-[150px] font-bold text-[#1b2a4e]">Hari & Tanggal</span>
                                <span className="text-gray-600 flex-1">{scheduleInfo.date}</span>
                            </div>
                            <div className="flex border border-gray-100 rounded-lg p-3">
                                <span className="w-[150px] font-bold text-[#1b2a4e]">Waktu / Jam</span>
                                <span className="text-gray-600 flex-1">{scheduleInfo.time}</span>
                            </div>
                            <div className="flex border border-gray-100 rounded-lg p-3">
                                <span className="w-[150px] font-bold text-[#1b2a4e]">Lokasi Klinik</span>
                                <span className="text-gray-600 flex-1">Hai Physio Pusat (Ruko Kebon Jeruk No. 12, Jakarta Barat)</span>
                            </div>
                        </div>
                    </div>

                    {/* --- TOMBOL AKSI ROUTING DINAMIS --- */}
                    <div className="flex flex-col gap-3 w-full mt-4">
                        <button
                            onClick={() => router.push("/riwayat")}
                            className="w-full bg-[#F5B301] hover:bg-[#dda101] text-white py-4 rounded-[12px] font-bold transition-colors"
                        >
                            Lihat Detail Riwayat
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-[#1b2a4e] py-4 rounded-[12px] font-bold transition-colors"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- KONDISI 1: TAMPILAN REVIEW & KONFIRMASI (Default) ---
    return (
        <div className="w-full flex flex-col items-center">

            <div className="text-center mb-10">
                <h2 className="text-[32px] md:text-[36px] font-bold text-[#1b2a4e] mb-3">Tinjau & Konfirmasi Reservasi Anda</h2>
                <p className="text-[#585858] text-[15px] md:text-[16px]">Mohon periksa kembali detail jadwal, terapis, dan keluhan Anda di bawah ini agar proses terapi berjalan lancar.</p>
            </div>

            <Stepper currentStep={4} />

            {/* --- KARTU 1: DETAIL SESI TERAPI (DINAMIS) --- */}
            <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6 md:p-8 mb-6">
                <h3 className="flex items-center gap-3 text-[20px] font-bold text-[#1b2a4e] mb-6">
                    <FileText size={28} weight="fill" className="text-[#1b2a4e]" /> Detail Sesi Terapi
                </h3>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Jenis Layanan</span>
                        <span className="text-gray-600 text-[14px]">{serviceName}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Fisioterapis</span>
                        <span className="text-gray-600 text-[14px]">{scheduleInfo.therapist}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Hari & Tanggal</span>
                        <span className="text-gray-600 text-[14px]">{scheduleInfo.date}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Waktu / Jam</span>
                        <span className="text-gray-600 text-[14px]">{scheduleInfo.time}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Lokasi Klinik</span>
                        <span className="text-gray-600 text-[14px]">Hai Physio Pusat (Ruko Kebon Jeruk No. 12, Jakarta Barat)</span>
                    </div>
                </div>
            </div>

            {/* --- KARTU 2: DETAIL INFORMASI PASIEN --- */}
            <div className="w-full bg-white border border-gray-200 rounded-[16px] p-6 md:p-8 mb-10">
                <h3 className="flex items-center gap-3 text-[20px] font-bold text-[#1b2a4e] mb-6">
                    <UserCircle size={28} weight="fill" className="text-[#1b2a4e]" /> Detail Informasi Pasien
                </h3>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Nama Lengkap</span>
                        <span className="text-gray-600 text-[14px]">{bookingData.patientData?.name || "-"}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Nomor Telepon</span>
                        <span className="text-gray-600 text-[14px]">{bookingData.patientData?.phone || "-"}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px]">Alamat Email</span>
                        <span className="text-gray-600 text-[14px]">{bookingData.patientData?.email || "-"}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px] shrink-0 mt-1">Keluhan Utama</span>
                        <span className="text-gray-600 text-[14px] leading-relaxed">
                            {bookingData.patientData?.complaint ? bookingData.patientData.complaint : "-"}
                        </span>
                    </div>

                    {/* FOTO KELUHAN - Perbaikan: object-contain dan bg abu-abu agar tidak terpotong */}
                    <div className="flex flex-col md:flex-row md:items-start border border-gray-100 rounded-xl p-4 gap-2 md:gap-0">
                        <span className="w-[180px] font-bold text-[#1b2a4e] text-[14px] shrink-0 mt-1">Foto Keluhan</span>
                        {bookingData.patientData?.photoPreview ? (
                            <div className="w-full max-w-[500px] h-[200px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center p-2">
                                <img src={bookingData.patientData.photoPreview} alt="Keluhan" className="w-full h-full object-contain" />
                            </div>
                        ) : (
                            <span className="text-gray-600 text-[14px] mt-1">-</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-between">
                <button onClick={onBack} className="text-[#F5B301] font-bold flex items-center gap-2 px-6 py-3 rounded-[12px] bg-gray-50 hover:bg-yellow-50 transition-colors">
                    <span>←</span> Kembali
                </button>
                <button
                    onClick={handleConfirm}
                    className="bg-[#F5B301] hover:bg-[#dda101] text-white px-10 py-3 rounded-[12px] font-bold flex items-center gap-2 transition-colors shadow-[0_4px_12px_rgba(245,179,1,0.3)]"
                >
                    Konfirmasi Booking <span>→</span>
                </button>
            </div>

        </div>
    );
}