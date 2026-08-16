import BookingFilter from "@/components/admin/booking/BookingFilter";
import BookingTable from "@/components/admin/booking/BookingTable";

export default function AdminBookingPage() {
  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Daftar Booking Pasien</h2>
        <p className="text-[#585858] text-[15px]">Kelola dan pantau seluruh jadwal konsultasi masuk secara real-time.</p>
      </div>

      {/* --- FILTER BAR --- */}
      <BookingFilter />

      {/* --- TABEL BOOKING --- */}
      <BookingTable />

    </div>
  );
}