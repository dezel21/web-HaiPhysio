import { bookingApi } from "@/app/utils/api";

export const adminService = {
  
  // --- 1. MANAJEMEN BOOKING PASIEN ---
  
  // Narik seluruh list booking pasien dengan filter (status, tanggal, search)
  getBookings: async (params?: { status?: string; date_from?: string; date_to?: string; search?: string }) => {
    const response = await bookingApi.get("/admin/bookings", { params });
    return response.data;
  },

  // Update status booking (terkonfirmasi / selesai / dibatalkan / tidak_hadir)
  updateBookingStatus: async (id: string, status: string, reason?: string) => {
    // Karena status dari frontend dikirim dalam format Title Case ("Dibatalkan", "Selesai"), kita lowercase dulu
    const normalizedStatus = status.toLowerCase();
    let url = `/admin/bookings/${id}/status`; // Fallback lama

    if (normalizedStatus === "dibatalkan") {
      url = `/bookings/${id}/cancel`;
      const response = await bookingApi.patch(url, { cancellation_reason: reason || "Dibatalkan oleh Admin" });
      return response.data;
    } else if (normalizedStatus === "selesai") {
      url = `/bookings/${id}/complete`;
      const response = await bookingApi.patch(url, {});
      return response.data;
    }
    
    const response = await bookingApi.patch(url, { status });
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
    const endpoints = [
      "/admin/slots",
      "/v1/admin/slots",
      "/v1/booking/admin/slots",
      "/slots",
    ];

    for (const url of endpoints) {
      try {
        const response = await bookingApi.get(url, { params });
        return response.data;
      } catch (err: any) {
        if (err.response?.status !== 404) throw err;
      }
    }
    return { slots: [] };
  },

  // Tambah 1 slot jadwal baru manual (Wajib capacity: 1)
  createSlot: async (data: {
    therapistId: string;
    slotDate: string;
    startTime: string;
    endTime: string;
    capacity?: number;
  }) => {
    const payload = {
      therapist_id: data.therapistId,
      slot_date: data.slotDate,
      start_time: data.startTime,
      end_time: data.endTime,
      capacity: data.capacity ?? 1,
      max_capacity: data.capacity ?? 1,
      is_available: true,
    };
    
    const endpoints = [
      "/admin/slots",
      "/v1/admin/slots",
      "/v1/booking/admin/slots",
      "/admin/slots/create",
      "/slots",
    ];

    let lastError = null;
    for (const url of endpoints) {
      try {
        const response = await bookingApi.post(url, payload);
        return response.data;
      } catch (err: any) {
        lastError = err;
        if (err.response?.status !== 404) throw err;
      }
    }
    throw lastError;
  },

  // Hapus slot jadwal secara permanen
  deleteSlot: async (id: string) => {
    const endpoints = [
      `/admin/slots/${id}`,
      `/v1/admin/slots/${id}`,
      `/v1/booking/admin/slots/${id}`,
      `/slots/${id}`,
    ];

    let lastError = null;
    for (const url of endpoints) {
      try {
        const response = await bookingApi.delete(url);
        return response.data;
      } catch (err: any) {
        lastError = err;
        if (err.response?.status !== 404) throw err;
      }
    }
    throw lastError;
  },

  // Toggle Buka/Tutup slot jam tertentu
  // targetStatus: true = aktifkan (status: "aktif"), false = nonaktifkan (status: "nonaktif")
  toggleSlot: async (id: string, targetStatus: boolean) => {
    const payload = {
      status: targetStatus ? "aktif" : "nonaktif",
    };

    const endpoints = [
      `/admin/slots/${id}`,
      `/v1/admin/slots/${id}`,
      `/slots/${id}`,
    ];

    let lastError = null;
    for (const url of endpoints) {
      try {
        const response = await bookingApi.patch(url, payload);
        return response.data;
      } catch (err: any) {
        lastError = err;
        if (err.response?.status !== 404) throw err;
      }
    }
    throw lastError;
  },

  // Generate otomatis slot jadwal 1 minggu (Dengan Smart Client Fallback)
  generateWeekSlots: async (startDate: string) => {
    // 1. Coba panggil endpoint backend jika tersedia
    try {
      const response = await bookingApi.post("/admin/slots/generate-week", { start_date: startDate });
      return response.data;
    } catch (err: any) {
      if (err.response?.status !== 404) throw err;
    }

    // 2. Fallback: Generate otomatis 7 hari x jam praktek standar untuk seluruh terapis aktif
    const therapistsRes = await adminService.getTherapists();
    const therapistsList = therapistsRes.data?.therapists || therapistsRes.therapists || [];
    
    if (therapistsList.length === 0) {
      throw new Error("Tidak ada terapis aktif yang ditemukan.");
    }

    // Jam praktek standar klinik
    const defaultHours = [
      { start: "08:00", end: "09:00" },
      { start: "09:00", end: "10:00" },
      { start: "10:00", end: "11:00" },
      { start: "11:00", end: "12:00" },
      { start: "13:00", end: "14:00" },
      { start: "14:00", end: "15:00" },
      { start: "15:00", end: "16:00" },
    ];

    const baseDate = new Date(startDate);
    let createdCount = 0;

    for (let day = 0; day < 7; day++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + day);
      const dateStr = d.toISOString().split("T")[0];

      for (const therapist of therapistsList) {
        for (const hour of defaultHours) {
          try {
            await adminService.createSlot({
              therapistId: therapist.id,
              slotDate: dateStr,
              startTime: hour.start,
              endTime: hour.end,
              capacity: 1,
            });
            createdCount++;
          } catch {
            // Lewati jika slot sudah pernah dibuat sebelumnya (conflict skip)
          }
        }
      }
    }

    return { success: true, count: createdCount };
  },


  // --- 3. MANAJEMEN DATA PASIEN ---
  
  // Narik daftar pasien klinik
  getPatients: async (search?: string) => {
    try {
      const response = await bookingApi.get("/admin/patients", { params: { search } });
      return response.data;
    } catch {
      // Fallback cerdas: Agregasikan daftar pasien unik dari bookings
      const bookingsRes = await adminService.getBookings();
      const allBookings = bookingsRes.data?.bookings || bookingsRes.bookings || [];
      
      const patientsMap = new Map<string, any>();
      for (const b of allBookings) {
        const key = b.patientId || b.patientPhone || b.patientName;
        if (!key) continue;
        
        if (!patientsMap.has(key)) {
          patientsMap.set(key, {
            id: b.patientId || b.id,
            patientCode: `P-${String(b.patientId || b.id).substring(0, 4).toUpperCase()}`,
            name: b.patientName || b.patient_name || "Pasien",
            fullName: b.patientName || b.patient_name || "Pasien",
            phone: b.patientPhone || b.patient_phone || "-",
            email: b.patientEmail || b.patient_email || `${(b.patientName || "pasien").toLowerCase().replace(/\s+/g, "")}@gmail.com`,
            lastVisitDate: (b.bookingDate || b.slotDate || b.slot_date || "").substring(0, 10),
            lastBookingDate: (b.bookingDate || b.slotDate || b.slot_date || "").substring(0, 10),
            lastService: b.therapistSpecializations?.[0]?.name ? `Fisioterapi ${b.therapistSpecializations[0].name}` : b.serviceName || b.service_name || "Fisioterapi",
            totalSessions: 1,
            totalBookings: 1,
          });
        } else {
          const existing = patientsMap.get(key);
          existing.totalSessions = (existing.totalSessions || 1) + 1;
          existing.totalBookings = existing.totalSessions;
          const currentBDate = (b.bookingDate || b.slotDate || b.slot_date || "").substring(0, 10);
          if (currentBDate && currentBDate > existing.lastVisitDate) {
            existing.lastVisitDate = currentBDate;
            existing.lastBookingDate = currentBDate;
            existing.lastService = b.therapistSpecializations?.[0]?.name ? `Fisioterapi ${b.therapistSpecializations[0].name}` : b.serviceName || b.service_name || existing.lastService;
          }
        }
      }

      let patientsList = Array.from(patientsMap.values());
      if (search) {
        const q = search.toLowerCase();
        patientsList = patientsList.filter(p => 
          (p.name || "").toLowerCase().includes(q) ||
          (p.phone || "").toLowerCase().includes(q) ||
          (p.email || "").toLowerCase().includes(q) ||
          (p.patientCode || "").toLowerCase().includes(q)
        );
      }
      return { data: { patients: patientsList }, patients: patientsList };
    }
  },

  // Update data pasien
  updatePatient: async (id: string, data: any) => {
    try {
      const response = await bookingApi.patch(`/admin/patients/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Fallback for different endpoints
        try {
          const res = await bookingApi.patch(`/patients/${id}`, data);
          return res.data;
        } catch (fallbackError) {
          throw fallbackError;
        }
      }
      throw error;
    }
  },



  // --- 4. MANAJEMEN DATA TERAPIS ---
  
  // Narik daftar seluruh fisioterapis klinik
  getTherapists: async () => {
    const response = await bookingApi.get("/admin/therapists");
    return response.data;
  },

  // Tambah data terapis baru
  createTherapist: async (data: any) => {
    const response = await bookingApi.post("/admin/therapists", data);
    return response.data;
  },

  // Update data terapis
  updateTherapist: async (id: string, data: any) => {
    const response = await bookingApi.patch(`/admin/therapists/${id}`, data);
    return response.data;
  },

  // Hapus / nonaktifkan terapis
  deleteTherapist: async (id: string) => {
    const response = await bookingApi.delete(`/admin/therapists/${id}`);
    return response.data;
  },

  // Toggle status aktif/nonaktif terapis
  toggleTherapistStatus: async (id: string) => {
    const response = await bookingApi.patch(`/admin/therapists/${id}/toggle`);
    return response.data;
  }
};
