import Link from "next/link";
import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AuthPasswordInput from "@/components/auth/AuthPasswordInput";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell
      headline="Kembali Bergerak Bebas Tanpa Nyeri"
      description="Masuk untuk melihat jadwal terapi, riwayat kunjungan, dan perkembangan pemulihan Anda bersama HaiPhysio."
    >
      <div className="mb-7 space-y-2">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Masuk</h2>
        <p className="text-[15px] leading-6 text-slate-500">
          Gunakan akun pasien yang sudah terdaftar.
        </p>
      </div>

      <form className="space-y-5">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
        />
        <AuthPasswordInput
          label="Kata Sandi"
          name="password"
          autoComplete="current-password"
          placeholder="********"
        />
        <Link
          href="/reset-password"
          className="block text-right text-[14px] font-semibold text-[#1b2a4e] hover:text-[#F5B301]"
        >
          Lupa kata sandi?
        </Link>
        <AuthButton>Masuk</AuthButton>
      </form>

      <p className="mt-7 text-center text-[14px] text-slate-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-[#1b2a4e] hover:text-[#F5B301]">
          Daftar sekarang
        </Link>
      </p>
    </AuthShell>
  );
}
