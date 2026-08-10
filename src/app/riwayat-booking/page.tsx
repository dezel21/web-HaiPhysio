import RiwayatBooking from "@/components/profile/RiwayatBooking";

export default function RiwayatBookingPage() {
  return (
    // Background abu-abu sama layout tengah persis kayak halaman profil
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex justify-center">
      
      {/* Kanvas putih khusus buat Riwayat Booking */}
      <div className="w-full max-w-[900px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] h-fit">
        <RiwayatBooking />
      </div>
      
    </div>
  );
}