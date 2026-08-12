"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bookingService } from "@/services/bookingService";
import GridKalender from "@/components/shared/GridKalender";
import { UserCircle } from "@phosphor-icons/react";

export default function UbahJadwalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  // State penyimpan data dari database
  const [bookingData, setBookingData] = useState<any>(null);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

  // State untuk nyimpen pilihan dan inputan user
  const [selectedTerapis, setSelectedTerapis] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [alasan, setAlasan] = useState("");
  const [kirimNotif, setKirimNotif] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Proses narik data saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Ambil detail booking lama buat ngecek pasien ini milih layanan apa (misal Neuro)
        const bookingRes = await bookingService.getDetailBooking(id);
        const booking = bookingRes.data.booking;
        setBookingData(booking);

        const focusId = booking.therapistSpecializations?.[0]?.id;

        if (focusId) {
          // Tarik data terapis yang ahli di layanan tersebut
          const therapistsRes = await bookingService.getTherapists(focusId);
          const fetchedTherapists = therapistsRes.data.therapists;
          setTherapists(fetchedTherapists);

          // Centang semua terapis secara default
          const therapistIds = fetchedTherapists.map((t: any) => t.id);
          setSelectedTerapis(therapistIds);

          // Tarik jadwal buat masing-masing terapis. Karena API nembak per terapis, 
          // kita loop dan gabungin semua jadwalnya. (Asumsi narik jadwal minggu ini: 10 Agustus 2026)
          const weekDate = "2026-08-10";
          const slotsPromises = therapistIds.map((tId: string) =>
            bookingService.getScheduleGrid(tId, weekDate)
          );

          const slotsResponses = await Promise.all(slotsPromises);

          let allSlots: any[] = [];
          slotsResponses.forEach((res) => {
            if (res.data?.slots) {
              allSlots = [...allSlots, ...res.data.slots];
            }
          });
          setSlots(allSlots);
        }
      } catch (error) {
        console.error("Gagal menarik data jadwal:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  // Fungsi saat user mencentang/menghapus centang terapis
  const handleToggleTerapis = (therapistId: string) => {
    if (selectedTerapis.includes(therapistId)) {
      setSelectedTerapis(selectedTerapis.filter(t => t !== therapistId));
    } else {
      setSelectedTerapis([...selectedTerapis, therapistId]);
    }
    setSelectedSlot(null); // Slot otomatis batal kalau filter terapis diubah
  };

  // Fungsi untuk memproses data saat tombol Lanjut ditekan
  const handleLanjut = () => {
    if (!selectedSlot) return;
    
    // Oper ID Slot dan alasan ke halaman konfirmasi lewat URL Params
    const url = `/riwayat-booking/ubah-jadwal/${id}/konfirmasi?slotId=${selectedSlot}&reason=${encodeURIComponent(alasan)}`;
    router.push(url);
  };

  // Tampilan layar memuat data
  if (isLoading) {
    return (
      <div className="w-full min-h-screen pt-[120px] pb-24 flex justify-center items-center bg-[#FAFAFA]">
        <span className="text-[#1b2a4e] font-bold animate-pulse">Menyiapkan jadwal pengganti...</span>
      </div>
    );
  }

  const namaLayanan = bookingData?.therapistSpecializations?.[0]?.name || "Fisioterapi";

  return (
    <div className="w-full min-h-screen pt-[120px] pb-24 px-5 md:px-[80px] bg-[#FAFAFA] flex flex-col items-center">
      
      {/* Kanvas Putih Utama */}
      <div className="w-full max-w-[900px] bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 h-fit">

        {/* Judul Halaman */}
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#1b2a4e] mb-2">Ubah Jadwal Terapis</h1>
        <p className="text-gray-500 text-[14px] mb-8">Pilih jadwal baru untuk sesi {namaLayanan} Anda.</p>

        {/* Bagian Filter Terapis */}
        <div className="mb-8">
          <h3 className="text-[15px] font-bold text-[#1b2a4e] mb-4">Pilih Terapis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* List Terapis Aktif */}
            {therapists.map(therapist => {
              const isChecked = selectedTerapis.includes(therapist.id);
              
              return (
                <div
                  key={therapist.id}
                  onClick={() => handleToggleTerapis(therapist.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isChecked ? "border-[#F5B301] bg-[#FFFBEA]" : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  {therapist.photoUrl ? (
                    <img src={therapist.photoUrl} alt={therapist.fullName} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <UserCircle size={48} className="text-gray-300" weight="fill" />
                  )}
                  
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1b2a4e]">{therapist.fullName}</p>
                    <p className="text-[12px] text-gray-500">{therapist.totalPatientsLabel || "Fisioterapis"}</p>
                  </div>
                  
                  {/* Checkbox Penanda Aktif */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="w-5 h-5 accent-[#F5B301] pointer-events-none"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pemanggilan Komponen Kalender Jadwal */}
        <GridKalender
          selectedTherapists={selectedTerapis}
          selectedSlot={selectedSlot}
          onSelectSlot={(slotId) => setSelectedSlot(slotId)}
          slots={slots}
          therapists={therapists}
        />

        {/* Input Alasan Ubah Jadwal */}
        <div className="mt-8 mb-6">
          <label className="block text-[14px] font-bold text-[#1b2a4e] mb-2">Alasan Ubah Jadwal (Opsional)</label>
          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Contoh: Saya berhalangan hadir karena ada urusan mendadak..."
            rows={3}
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#F5B301] text-[14px] resize-none transition-colors"
          />
        </div>

        {/* Opsi Kirim Notifikasi WhatsApp */}
        <label className="flex items-start gap-3 mb-10 cursor-pointer">
          <input
            type="checkbox"
            checked={kirimNotif}
            onChange={() => setKirimNotif(!kirimNotif)}
            className="w-5 h-5 mt-0.5 accent-[#F5B301] rounded cursor-pointer"
          />
          <span className="text-[14px] text-gray-600 leading-relaxed">
            Kirim detail perubahan jadwal ini ke WhatsApp saya secara otomatis.
          </span>
        </label>

        {/* Area Tombol Navigasi */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <Link
            href={`/riwayat-booking`}
            className="flex-1 py-4 text-center rounded-xl border border-gray-200 text-gray-600 font-bold text-[15px] hover:bg-gray-50 transition-colors"
          >
            Kembali
          </Link>
          
          <button
            onClick={handleLanjut}
            disabled={!selectedSlot}
            className={`flex-1 py-4 text-center rounded-xl font-bold text-[15px] transition-colors ${
              selectedSlot ? "bg-[#F5B301] text-white hover:bg-[#dda101]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Lanjut
          </button>
        </div>

      </div>
    </div>
  );
}