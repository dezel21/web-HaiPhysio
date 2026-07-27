"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";

export default function RegisterForm() {
  const [agreed, setAgreed] = useState(false);

  return (
    <form className="space-y-4">
      <AuthInput
        label="Nama Lengkap"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Tulis Nama Lengkap Anda"
      />
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="example@email.com"
      />
      <AuthInput
        label="No. Telepon"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="0812 3456 7890"
      />
      <AuthInput label="Tanggal Lahir" name="birthDate" type="date" />
      <div className="space-y-2">
        <AuthPasswordInput
          label="Kata Sandi"
          name="password"
          autoComplete="new-password"
          placeholder="********"
        />
        <p className="text-[13px] leading-5 text-slate-500">
          Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
        </p>
      </div>
      <AuthPasswordInput
        label="Konfirmasi Kata Sandi"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="********"
      />

      <label className="flex items-start gap-3 text-[14px] leading-6 text-slate-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#FBBF24] accent-[#FBBF24]"
        />
        <span>
          Saya menyetujui{" "}
          <Link href="/syarat-ketentuan" className="font-semibold text-[#1b2a4e] hover:text-[#F5B301]">
            Syarat & Ketentuan
          </Link>{" "}
          serta{" "}
          <Link href="/kebijakan-privasi" className="font-semibold text-[#1b2a4e] hover:text-[#F5B301]">
            Kebijakan Privasi
          </Link>{" "}
          yang berlaku.
        </span>
      </label>

      <AuthButton disabled={!agreed}>Buat Akun</AuthButton>
    </form>
  );
}
