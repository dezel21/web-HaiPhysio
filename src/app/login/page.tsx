import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      headline="Kembali Bergerak Bebas Tanpa Nyeri"
      description="Masuk untuk melihat jadwal terapi, riwayat kunjungan, dan perkembangan pemulihan Anda bersama Hai Physio."
    >
      <div className="mb-7 space-y-2">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Selamat Datang</h2>
        <p className="text-[15px] leading-6 text-slate-500">
          Gunakan akun pasien yang sudah terdaftar.
        </p>
      </div>

      <LoginForm />

      <p className="mt-7 text-center text-[14px] text-slate-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-[#1b2a4e] hover:text-[#F5B301]">
          Daftar sekarang
        </Link>
      </p>
    </AuthShell>
  );
}
