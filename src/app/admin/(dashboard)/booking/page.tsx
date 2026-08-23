"use client";

import { useState, useEffect } from "react";
import BookingFilter from "@/components/admin/booking/BookingFilter";
import BookingTable from "@/components/admin/booking/BookingTable";
import { adminService } from "@/services/adminService";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getBookings({
        status: status || undefined,
        date_from: date || undefined,
        date_to: date || undefined,
        search: search || undefined,
      });
      let list = res.data?.bookings || res.bookings || [];

      // Filter sisi client tambahan jika pilih layanan
      if (service) {
        list = list.filter((b: any) => {
          const sName = b.serviceName || b.service_name || "";
          return sName.toLowerCase().includes(service.toLowerCase());
        });
      }

      setBookings(list);
    } catch (error) {
      console.error("Gagal memuat booking admin:", error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [status, service, date, search]);

  // Ekspor Data ke File CSV
  const handleExportCsv = () => {
    if (bookings.length === 0) {
      alert("Tidak ada data booking untuk diekspor!");
      return;
    }

    const headers = ["No", "Kode Reservasi", "Nama Pasien", "No Telepon", "Fisioterapis", "Layanan", "Tanggal", "Waktu", "Status"];
    const rows = bookings.map((b, i) => [
      i + 1,
      b.bookingReferenceCode || b.reference_code || b.code || `#HP-${b.id}`,
      `"${b.patientName || b.patient_name || "-"}"`,
      `"${b.patientPhone || b.patient_phone || "-"}"`,
      `"${b.therapistName || b.therapist_name || "-"}"`,
      `"${b.serviceName || b.service_name || "Fisioterapi"}"`,
      b.slotDate || b.slot_date || "-",
      `${(b.startTime || b.start_time || "").substring(0, 5)} - ${(b.endTime || b.end_time || "").substring(0, 5)} WIB`,
      b.status || "-",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Booking_HaiPhysio_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Daftar Booking Pasien</h2>
        <p className="text-[#585858] text-[15px]">Kelola dan pantau seluruh jadwal konsultasi masuk secara real-time.</p>
      </div>

      {/* --- FILTER BAR --- */}
      <BookingFilter 
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        service={service}
        onServiceChange={setService}
        date={date}
        onDateChange={setDate}
        onExportCsv={handleExportCsv}
      />

      {/* --- TABEL BOOKING --- */}
      <BookingTable 
        bookings={bookings}
        isLoading={isLoading}
        onRefresh={loadBookings}
      />

    </div>
  );
}
