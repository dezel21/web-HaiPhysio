import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      headline="Atur Ulang Akses Akun Anda"
      description="Masukkan email akun pasien untuk menerima instruksi reset kata sandi dari HaiPhysio."
      illustration="mail"
    >
      <div className="mb-7 space-y-2">
        <h2 className="text-[28px] font-bold text-[#1b2a4e]">Reset Kata Sandi</h2>
        <p className="text-[15px] leading-6 text-slate-500">
          Kami akan mengirim tautan pengaturan ulang ke email yang terdaftar.
        </p>
      </div>

      <ResetPasswordForm />
    </AuthShell>
  );
}
