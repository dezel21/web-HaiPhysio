// src/types/user.types.ts

// Tipe data buat informasi profil pasien
export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

// Nanti kalau ada tipe data khusus buat error response login/register, bisa ditambahin di sini