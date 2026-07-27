"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";

export default function ResetPasswordForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FBBF24]/15 text-[#F5B301]">
          <MailCheck size={34} strokeWidth={1.8} />
        </div>
        <div className="space-y-3">
          <h2 className="text-[26px] font-bold leading-tight text-[#1b2a4e]">
            Permintaan Atur Ulang Sandi Terkirim
          </h2>
          <p className="text-[15px] leading-7 text-slate-600">
            Silakan periksa kotak masuk atau folder spam email Anda untuk membuka tautan atur ulang kata sandi.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="h-12 w-full rounded-[8px] border border-[#FBBF24] bg-white px-5 text-[15px] font-semibold text-[#1b2a4e] transition hover:bg-[#FBBF24]/10"
        >
          Kirim Ulang Tautan
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="example@email.com"
      />
      <AuthButton>Kirim Instruksi Reset</AuthButton>
      <Link
        href="/login"
        className="block text-center text-[14px] font-semibold text-[#1b2a4e] hover:text-[#F5B301]"
      >
        Kembali ke Login
      </Link>
    </form>
  );
}
