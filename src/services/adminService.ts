import { bookingApi } from "@/app/utils/api";

export const adminService = {
  
  // --- 1. MANAJEMEN BOOKING PASIEN ---
  
  // Narik seluruh list booking pasien dengan filter (status, tanggal, search)
  getBookings: async (params?: { status?: string; date_from?: string; date_to?: string; search?: string }) => {
    const response = await bookingApi.get("/admin/bookings", { params });
    return response.data;
  },

  // Update status booking (terkonfirmasi / selesai / dibatalkan / tidak_hadir)
  updateBookingStatus: async (id: string, status: string) => {
    const response = await bookingApi.patch(`/admin/bookings/${id}/status`, { status });
    return response.data;
  },

  // Reschedule / Ubah Jadwal Booking Pasien
  rescheduleBooking: async (id: string, newSlotId: string, reason?: string) => {
    const response = await bookingApi.patch(`/bookings/${id}/reschedule`, {
      new_slot_id: newSlotId,
      reschedule_reason: reason
    });
    return response.data;
  },


  // --- 2. MANAJEMEN SLOT JADWAL TERAPIS ---

  // Narik slot jadwal terapis di range tanggal tertentu
  getSlots: async (params?: { date_from?: string; date_to?: string; therapist_id?: string }) => {
    const response = await bookingApi.get("/admin/slots", { params });
    return response.data;
  },

  // Generate otomatis slot jadwal 1 minggu (Senin-Minggu)
  generateWeekSlots: async (startDate: string) => {
    const response = await bookingApi.post("/admin/slots/generate-week", { start_date: startDate });
    return response.data;
  },

  // Buka / Tutup slot jam tertentu
  toggleSlot: async (id: string) => {
    const response = await bookingApi.patch(`/admin/slots/${id}/toggle`);
    return response.data;
  },


  // --- 3. MANAJEMEN DATA PASIEN ---
  
  // Narik daftar pasien klinik
  getPatients: async (search?: string) => {
    const response = await bookingApi.get("/admin/patients", { params: { search } });
    return response.data;
  },


  // --- 4. MANAJEMEN DATA TERAPIS ---
  
  // Narik daftar seluruh fisioterapis klinik
  getTherapists: async () => {
    const response = await bookingApi.get("/admin/therapists");
    return response.data;
  },

  // Tambah fisioterapis baru
  createTherapist: async (data: any) => {
    const response = await bookingApi.post("/admin/therapists", data);
    return response.data;
  },

  // Update data / status aktif terapis
  updateTherapist: async (id: string, data: any) => {
    const response = await bookingApi.patch(`/admin/therapists/${id}`, data);
    return response.data;
  },
};
