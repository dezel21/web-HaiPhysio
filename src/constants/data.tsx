import { 
  Bandaids, 
  Brain, 
  Barbell,
  Lightbulb, 
  ShieldCheck, 
  Stethoscope, 
  Person,
  PersonSimpleRun,
  Bed,
  Heartbeat,
  HandHeart
} from "@phosphor-icons/react";

// 1. Data Fokus Layanan Kami (Dipakai di Beranda & Layanan)
export const servicesData = [
  {
    id: "muskuloskeletal",
    title: "Fisioterapi",
    titleBold: "Muskuloskeletal",
    subtitle: "Otot, Tulang & Sendi",
    desc: "Pemulihan untuk masalah nyeri otot, sendi kaku, pasca patah tulang, atau perbaikan postur tubuh agar Anda bisa kembali bergerak bebas tanpa hambatan.",
    cases: ["Nyeri Pinggang Bawah", "Nyeri Sendi/Lutut", "Skoliosis"], 
    imgSrc: "/service-Muskulo.png",
    icon: <Bandaids size={28} color="#F5B301" weight="regular" />
  },
  {
    id: "neuro",
    title: "Fisioterapi",
    titleBold: "Neuro",
    subtitle: "Saraf & Gerak Otot",
    desc: "Terapi khusus untuk memulihkan gangguan gerak akibat masalah saraf, membantu menguatkan kembali otot yang melemah, serta melatih keseimbangan tubuh.",
    cases: ["Pasca-Stroke", "HNP (Saraf Kejepit)", "Carpal Tunnel Syndrome"],
    imgSrc: "/service-Neuro.png",
    icon: <Brain size={28} color="#F5B301" weight="regular" />
  },
  {
    id: "olahraga",
    title: "Fisioterapi",
    titleBold: "Olahraga",
    subtitle: "Cedera & Aktivitas Fisik",
    desc: "Dirancang khusus untuk memulihkan cedera akibat olahraga atau aktivitas berat, sekaligus mengembalikan performa fisik terbaik Anda tanpa takut cedera lagi.",
    cases: ["Cedera ACL/MCL", "Keseleo (Sprain/Strain)", "Kram Otot Kronis"],
    imgSrc: "/service-Olahraga.png",
    icon: <Barbell size={28} color="#F5B301" weight="regular" />
  }
];

// 2. Data Kenapa Pilih Kami (Dipakai di Tentang Kami)
export const reasonsData = [
  {
    id: "pemeriksaan",
    title: "Pemeriksaan Detail & Personal",
    desc: "Kami melakukan pencatatan data pemeriksaan yang menyeluruh, baik secara subjektif maupun objektif, untuk memahami akar masalah Anda secara tepat.",
    imgSrc: "/reason-1.png" 
  },
  {
    id: "progres",
    title: "Progres Terapi Terukur",
    desc: "Evaluasi pemeriksaan terapi dilakukan berkala, sehingga kemajuan terapi Anda benar-benar terpantau dari waktu ke waktu.",
    imgSrc: "/reason-2.png" 
  },
  {
    id: "profesional",
    title: "Ditangani Tenaga Profesional",
    desc: "Terapis kami memiliki sertifikasi resmi dan berpengalaman dalam menangani berbagai kasus gangguan gerak serta fungsi tubuh dengan metode yang aman.",
    imgSrc: "/reason-3.png" 
  }
];

// 3. Data Jenis Pelayanan (Dipakai di Layanan)
export const jenisPelayananData = [
  {
    id: "promotif",
    title: "Promotif",
    desc: "Menjaga fungsi gerak tubuh Anda supaya tetap optimal, sebelum ada keluhan.",
    icon: <Lightbulb size={56} color="#1b2a4e" weight="fill" />
  },
  {
    id: "preventif",
    title: "Preventif",
    desc: "Mengenali risiko sejak dini, sebelum berkembang jadi gangguan yang lebih serius.",
    icon: <ShieldCheck size={56} color="#1b2a4e" weight="fill" />
  },
  {
    id: "kuratif",
    title: "Kuratif",
    desc: "Menangani keluhan yang sedang Anda alami saat ini.",
    icon: <Stethoscope size={56} color="#1b2a4e" weight="fill" />
  },
  {
    id: "rehabilitatif",
    title: "Rehabilitatif",
    desc: "Memulihkan fungsi tubuh secara bertahap setelah cedera, operasi, atau sakit.",
    icon: <Person size={56} color="#1b2a4e" weight="fill" />
  }
];

// 4. Data Manfaat Fisioterapi (Dipakai di Layanan)
export const manfaatData = [
  { text: "Meningkatkan Mobilitas Gerak", icon: <PersonSimpleRun size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Pemulihan Pasca Operasi", icon: <Bed size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Pemulihan Pasca Stroke", icon: <Brain size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Membantu Rehabilitasi Jantung & Paru", icon: <Heartbeat size={28} color="#1b2a4e" weight="fill" /> },
  { text: "Mengurangi Nyeri", icon: <HandHeart size={28} color="#1b2a4e" weight="fill" /> }
];

// 5. Data Riwayat Booking untuk Halaman User
export interface RiwayatBooking {
  id: string;
  layanan: string;
  tanggal: string;
  waktu: string;
  terapis: string;
  status: "Terkonfirmasi" | "Selesai" | "Dibatalkan";
  keluhan?: string;
  alasanBatal?: string;
}

export const dummyRiwayatBooking: RiwayatBooking[] = [
  {
    id: "BK-001",
    layanan: "Fisioterapi Olahraga",
    tanggal: "Jumat, 11 Juli 2026",
    waktu: "11:00 - 12:00 WIB",
    terapis: "Ftr. Sari Wijaya, S.Ft",
    status: "Terkonfirmasi",
    keluhan: "Paha bagian belakang terasa seperti ada yang robek dan bunyi 'pop' saat saya melakukan sprint lari kemarin. Sekarang sangat nyeri jika dipakai berjalan dan mulai muncul memar biru."
  },
  {
    id: "BK-002",
    layanan: "Fisioterapi Neuro",
    tanggal: "Senin, 7 Juli 2026",
    waktu: "14:00 - 15:00 WIB",
    terapis: "Ftr. Andi Pratama, S.Ft", 
    status: "Selesai"
  },
  {
    id: "BK-003",
    layanan: "Fisioterapi Muskuloskeletal",
    tanggal: "Rabu, 02 Juli 2026",
    waktu: "13:00 - 14:00 WIB",
    terapis: "Ftr. Bintang Dito, S.Ft",
    status: "Dibatalkan",
    alasanBatal: "Alasan: Jadwal terapis bertabrakan"
  }
];

// 6. Data Mock Kalender & Terapis (Shared Data untuk Buat Janji Temu & Ubah Jadwal)
export const mockTherapists = [
  { id: "t1", name: "Ftr. Andi Pratama", sp: "Spesialis Neuro & Olahraga", rating: 4.8, patients: "90+", photo: "/dokter-andi-pratama.png" },
  { id: "t2", name: "Ftr. Sari Wijaya, S.Ft", sp: "Spesialis Olahraga & Muskulo", rating: 4.9, patients: "150+", photo: "/dokter-sari-wijaya.png" },
  { id: "t3", name: "Ftr. Bintang Dito", sp: "Spesialis Olahraga", rating: 4.8, patients: "70+", photo: "/dokter-bintang-dito.png" },
];

export const calendarDays = [
  { name: "Senin", date: "07" }, { name: "Selasa", date: "08" }, { name: "Rabu", date: "09" },
  { name: "Kamis", date: "10" }, { name: "Jumat", date: "11" }, { name: "Sabtu", date: "12" }, { name: "Minggu", date: "13" }
];

export const calendarHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const mockSlots = [
  { id: "s1", date: "07", time: "09:00", therapistId: "t1", status: "tersedia" },
  { id: "s2", date: "07", time: "09:00", therapistId: "t2", status: "tidak_praktik" },
  { id: "s3", date: "07", time: "10:00", therapistId: "t1", status: "penuh" },
  { id: "s4", date: "08", time: "10:00", therapistId: "t2", status: "tersedia" },
  { id: "s5", date: "09", time: "11:00", therapistId: "t3", status: "tersedia" },
  { id: "s6", date: "10", time: "14:00", therapistId: "t1", status: "penuh" },
  { id: "s7", date: "11", time: "15:00", therapistId: "t2", status: "tersedia" },
  { id: "s8", date: "12", time: "09:00", therapistId: "t3", status: "tidak_praktik" },
  { id: "s9", date: "13", time: "13:00", therapistId: "t2", status: "tersedia" },
];