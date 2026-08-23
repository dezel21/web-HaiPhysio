"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  User, ClipboardText, CalendarBlank, Barbell, Brain, Bandaids, CaretRight, CheckCircle, ClockCounterClockwise 
} from "@phosphor-icons/react";
import { adminService } from "@/services/adminService";

function DetailPasienContent() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("id") || "";

  const [patient, setPatient] = useState<any>(null);
  const [patientBookings, setPatientBookings] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State Form Kontak Pasien
  const [formData, setFormData] = useState({
    telepon: "",
    email: "",
    tglLahir: "12 Maret 1990"
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [patientsRes, bookingsRes] = await Promise.all([
          adminService.getPatients(),
          adminService.getBookings(),
        ]);

        const allPatients = patientsRes.data?.patients || patientsRes.patients || [];
        const allBookings = bookingsRes.data?.bookings || bookingsRes.bookings || [];

        // Cari pasien yang sesuai
        const targetPatient = patientId 
          ? allPatients.find((p: any) => String(p.id) === String(patientId))
          : allPatients[0];

        setPatient(targetPatient || null);

        if (targetPatient) {
          setFormData({
            telepon: targetPatient.phone || "-",
            email: targetPatient.email || "-",
            tglLahir: targetPatient.birthDate || targetPatient.tglLahir || "12 Maret 1990",
          });

          // Filter booking milik pasien ini
          const pName = (targetPatient.name || targetPatient.fullName || "").toLowerCase();
          const targetBookings = allBookings.filter((b: any) => {
            const bName = (b.patientName || b.patient_name || "").toLowerCase();
            return bName === pName || (b.patientId && String(b.patientId) === String(targetPatient.id));
          });

          setPatientBookings(targetBookings);
        }
      } catch (error) {
        console.error("Gagal memuat data detail pasien:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setIsEditing(true);
    }
  };

  const renderLayananIcon = (layanan: string) => {
    if (layanan.toLowerCase().includes("neuro")) return <Brain size={14} weight="bold" />;
    if (layanan.toLowerCase().includes("olahraga")) return <Barbell size={14} weight="bold" />;
    return <Bandaids size={14} weight="bold" />;
  };

  const renderStatus = (statusRaw: string) => {
    const status = (statusRaw || "").toLowerCase();
    let label = "Terkonfirmasi";
    let colorClass = "border-green-500 text-green-600 bg-green-50/40";

    if (status === "selesai") {
      label = "Selesai";
      colorClass = "border-gray-300 text-gray-500 bg-gray-50";
    } else if (status === "dibatalkan") {
      label = "Dibatalkan";
      colorClass = "border-red-300 text-red-500 bg-red-50/40";
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold ${colorClass}`}>
        <CheckCircle size={14} weight="fill" />
        <span>{label}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full py-24 text-center text-[#1b2a4e] font-bold animate-pulse">
        Memuat detail riwayat pasien...
      </div>
    );
  }

  const patientName = patient?.name || patient?.fullName || "Pasien HaiPhysio";
  const patientCode = patient?.patientCode || patient?.code || `P-${String(patient?.id || "001").padStart(3, "0")}`;
  const initials = patientName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  // Ambil sesi terkonfirmasi mendatang terdekat
  const upcomingSession = patientBookings.find((b: any) => (b.status || "").toLowerCase() === "terkonfirmasi") || patientBookings[0];
  const completedCount = patientBookings.filter((b: any) => (b.status || "").toLowerCase() === "selesai").length;
  const totalSessionsCount = patientBookings.length || 1;
  const progressPercent = Math.min(100, Math.round((completedCount / totalSessionsCount) * 100)) || 25;
  const mainService = patient?.lastService || patientBookings[0]?.serviceName || "Fisioterapi Olahraga";

  return (
    <div className="w-full flex flex-col gap-6 pb-12 max-w-[1100px] mx-auto animate-in fade-in duration-300">
      
      {/* --- BREADCRUMB --- */}
      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
        <Link href="/admin/pasien" className="hover:text-[#F5B301] transition-colors">Kelola Data Pasien</Link>
        <span>›</span>
        <span className="text-[#1b2a4e] font-bold">Lihat Detail</span>
      </div>

      {/* --- HEADER PROFIL --- */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#1b2a4e] text-white font-bold flex items-center justify-center text-[26px] shrink-0 border-4 border-white shadow-sm">
            {initials}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[28px] font-bold text-[#1b2a4e] leading-tight">{patientName}</h2>
            <p className="text-[14px] text-gray-500">ID Pasien: <span className="font-bold text-[#1b2a4e]">{patientCode}</span></p>
          </div>
        </div>

        <button 
          onClick={handleEditToggle}
          className={`px-6 py-2.5 rounded-xl font-bold text-[14px] transition-colors border shadow-sm shrink-0 ${
            isEditing 
              ? 'bg-[#F5B301] text-white border-[#F5B301] hover:bg-[#dda101]' 
              : 'bg-white text-[#1b2a4e] border-gray-200 hover:bg-gray-50'
          }`}
        >
          {isEditing ? 'Simpan Data' : 'Edit Kontak'}
        </button>
      </div>

      {/* --- 3 KARTU INFORMASI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        
        {/* Kartu 1: Data Pasien */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e]">
            <User size={20} weight="bold" /> 
            <span className="text-[16px]">Data Kontak Pasien</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">No Telepon</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.telepon} 
                  onChange={(e) => setFormData({...formData, telepon: e.target.value})} 
                  className="border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-medium"
                />
              ) : (
                <span className="text-[14px] font-bold text-[#1b2a4e]">{formData.telepon || "-"}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
              {isEditing ? (
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-medium"
                />
              ) : (
                <span className="text-[14px] font-bold text-[#1b2a4e] truncate">{formData.email || "-"}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Lahir</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.tglLahir} 
                  onChange={(e) => setFormData({...formData, tglLahir: e.target.value})} 
                  className="border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5B301] text-[14px] text-[#1b2a4e] font-medium"
                />
              ) : (
                <span className="text-[14px] font-bold text-[#1b2a4e]">{formData.tglLahir || "-"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Kartu 2: Ringkasan Medis */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e]">
            <ClipboardText size={20} weight="bold" /> 
            <span className="text-[16px]">Ringkasan Terapi</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Layanan Utama</span>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#F5B301] text-[#D69A00] bg-yellow-50/40 w-max">
                {renderLayananIcon(mainService)}
                <span className="text-[12px] font-bold">{mainService}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Progress Terapi</span>
                <span className="text-[14px] font-bold text-[#1b2a4e]">{completedCount}/{totalSessionsCount} Sesi Selesai</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F5B301] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Riwayat Sesi</span>
              <span className="text-[14px] font-bold text-[#1b2a4e]">{totalSessionsCount} Sesi Tercatat</span>
            </div>
          </div>
        </div>

        {/* Kartu 3: Fisioterapi Mendatang */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 font-bold text-[#1b2a4e] mb-4">
            <CalendarBlank size={20} weight="bold" /> 
            <span className="text-[16px]">Sesi Mendatang</span>
          </div>
          
          {upcomingSession ? (
            <div className="flex flex-col justify-between flex-1">
              <div className="border border-[#F5B301] bg-[#FFFBEA] rounded-xl p-4 flex gap-4 items-center">
                <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center w-14 h-14 shrink-0 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Tgl</span>
                  <span className="text-[16px] font-bold text-[#1b2a4e] leading-none mt-0.5">
                    {(upcomingSession.slotDate || upcomingSession.slot_date || "20").substring(8, 10)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#1b2a4e]">{upcomingSession.serviceName || mainService}</span>
                  <span className="text-[12px] text-gray-500">
                    {upcomingSession.slotDate || upcomingSession.slot_date}, {(upcomingSession.startTime || "09:00").substring(0, 5)} WIB
                  </span>
                  <span className="text-[12px] text-gray-500 font-semibold">
                    with {upcomingSession.therapistName || "Fisioterapis"}
                  </span>
                </div>
              </div>

              <Link 
                href={`/admin/booking/reschedule?id=${upcomingSession.id}`}
                className="text-[#F5B301] font-bold text-[14px] hover:text-[#dda101] transition-colors mx-auto mt-4 flex items-center gap-1"
              >
                <ClockCounterClockwise size={16} weight="bold" />
                Ubah Jadwal Pasien <CaretRight size={14} weight="bold" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 py-4 text-center text-gray-400 text-[13px]">
              Belum ada sesi konsultasi mendatang.
            </div>
          )}
        </div>
      </div>

      {/* --- RIWAYAT SESI TABEL --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-bold text-[#1b2a4e]">Riwayat Konsultasi & Terapi</h3>
          <span className="text-[13px] text-gray-500 font-medium">Total {patientBookings.length} Sesi</span>
        </div>
        
        {patientBookings.length === 0 ? (
          <div className="py-16 text-center text-gray-400 font-medium">
            Belum ada riwayat sesi yang tercatat untuk pasien ini.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="py-4 px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Waktu & Tanggal</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Layanan</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Nama Terapis</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Kode Reservasi</th>
                  <th className="py-4 px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {patientBookings.map((row: any) => {
                  const sName = row.serviceName || row.service_name || "Fisioterapi";
                  const dateStr = row.slotDate || row.slot_date || "-";
                  const timeStr = `${(row.startTime || "").substring(0, 5)} - ${(row.endTime || "").substring(0, 5)} WIB`;
                  const tName = row.therapistName || row.therapist_name || "Fisioterapis";
                  const refCode = row.bookingReferenceCode || row.code || `#HP-${String(row.id).substring(0, 6)}`;

                  return (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50 bg-white transition-colors">
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1b2a4e] text-[14px]">{dateStr}</span>
                          <span className="text-[12px] text-gray-500">{timeStr}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B301] text-[#D69A00] bg-yellow-50/40">
                          {renderLayananIcon(sName)}
                          <span className="text-[11px] font-bold">{sName}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-[14px] font-bold text-[#1b2a4e]">{tName}</td>
                      <td className="py-5 px-4 text-[13px] font-bold text-gray-500">{refCode}</td>
                      <td className="py-5 px-4 text-right">
                        {renderStatus(row.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- TOAST NOTIFIKASI --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#ecfdf3] border border-[#a6f4c5] text-[#027a48] px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(2,122,72,0.1)] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle size={20} weight="fill" />
          <span className="text-[14px] font-bold">Data Kontak Pasien Berhasil Disimpan</span>
        </div>
      )}

    </div>
  );
}

export default function DetailPasienPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[#1b2a4e] font-bold">Memuat detail pasien...</div>}>
      <DetailPasienContent />
    </Suspense>
  );
}
