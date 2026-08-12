import axios from "axios";

// Jalur khusus buat endpoint Auth (Login, Register, Profil)
export const authApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/auth",
  // Ini wajib true biar cookie session otomatis keikut pas request
  withCredentials: true,
});

// Jalur khusus buat endpoint Booking (Jadwal, Terapis, dll)
export const bookingApi = axios.create({
  baseURL: "http://localhost:8001/api",
  // Ini juga wajib true biar backend tau kita udah login
  withCredentials: true,
});