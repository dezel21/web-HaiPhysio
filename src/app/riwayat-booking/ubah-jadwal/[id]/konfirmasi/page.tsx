"use client";

import { Calendar } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, use } from "react";

export default function KonfirmasiUbahJadwalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            window.location.href = `/riwayat-booking/ubah-jadwal/${id}/sukses`;
        }, 1500);
    };

    return (
        <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
            <div className="w-full max-w-[800px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] h-fit">

                {/* Header Title */}
                <div className="text-center mb-10">
                    <h1 className="text-[28px] md:text-[32px] font-bold text-[#1b2a4e] mb-3">Tinjau & Konfirmasi Ubah Jadwal Terapis</h1>
                    <p className="text-[#585858] text-[14px]">
                        Mohon periksa kembali detail jadwal, terapis, dan keluhan Anda di bawah ini agar proses terapi berjalan lancar.
                    </p>
                </div>

                <div className="flex flex-col gap-8">

                    {/* Card Jadwal Lama */}
                    <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar size={28} weight="regular" className="text-[#1b2a4e]" />
                            <h3 className="text-[20px] font-bold text-[#1b2a4e]">Jadwal Lama</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Jenis Layanan</label>
                                <input type="text" value="Fisioterapi Olahraga (Cedera & Aktivitas Fisik)" disabled className="w-full p-3.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Fisioterapis</label>
                                <input type="text" value="Ftr. Sari Wijaya, S.Ft" disabled className="w-full p-3.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Hari & Tanggal</label>
                                <input type="text" value="Jumat, 11 Juli 2026" disabled className="w-full p-3.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Waktu / Jam</label>
                                <input type="text" value="11:00 - 12:00 WIB" disabled className="w-full p-3.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Lokasi Klinik</label>
                                <input type="text" value="Hai Physio Pusat (Ruko Kebon Jeruk No. 12, Jakarta Barat)" disabled className="w-full p-3.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-xl outline-none text-[14px]" />
                            </div>
                        </div>
                    </div>

                    {/* Card Jadwal Baru */}
                    <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar size={28} weight="regular" className="text-[#1b2a4e]" />
                            <h3 className="text-[20px] font-bold text-[#1b2a4e]">Jadwal Baru</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Jenis Layanan</label>
                                <input type="text" value="Fisioterapi Olahraga (Cedera & Aktivitas Fisik)" readOnly className="w-full p-3.5 border border-gray-200 text-[#1b2a4e] rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Fisioterapis</label>
                                <input type="text" value="Ftr. Sari Wijaya, S.Ft" readOnly className="w-full p-3.5 border border-gray-200 text-[#1b2a4e] rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Hari & Tanggal</label>
                                <input type="text" value="Sabtu, 12 Juli 2026" readOnly className="w-full p-3.5 border border-gray-200 text-[#1b2a4e] rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Waktu / Jam</label>
                                <input type="text" value="10:00 - 11:00 WIB" readOnly className="w-full p-3.5 border border-gray-200 text-[#1b2a4e] rounded-xl outline-none text-[14px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-2 md:gap-4">
                                <label className="text-[14px] font-bold text-[#1b2a4e]">Lokasi Klinik</label>
                                <input type="text" value="Hai Physio Pusat (Ruko Kebon Jeruk No. 12, Jakarta Barat)" readOnly className="w-full p-3.5 border border-gray-200 text-[#1b2a4e] rounded-xl outline-none text-[14px]" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-10">
                    <Link
                        href={`/riwayat-booking/ubah-jadwal/${id}`}
                        className="flex-1 py-4 text-center rounded-xl bg-gray-50 border border-gray-200 text-[#F5B301] font-bold text-[15px] hover:bg-gray-100 transition-colors"
                    >
                        &larr; Kembali
                    </Link>
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className={`flex-1 py-4 rounded-xl text-white font-bold text-[15px] transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F5B301] hover:bg-[#dda101] shadow-[0_4px_12px_rgba(245,179,1,0.2)]'
                            }`}
                    >
                        {isSubmitting ? 'Memproses...' : 'Konfirmasi Ubah Jadwal →'}
                    </button>
                </div>

            </div>
        </div>
    );
}