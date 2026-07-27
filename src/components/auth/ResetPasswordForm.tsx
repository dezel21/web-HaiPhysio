"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResetPasswordFormProps = {
  sent: boolean;
  onSentChange: (sent: boolean) => void;
};

export default function ResetPasswordForm({ sent, onSentChange }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cooldown, setCooldown] = useState(120);

  useEffect(() => {
    if (!sent || cooldown <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCooldown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown, sent]);

  function resendLink() {
    setCooldown(120);
  }

  if (sent) {
    return (
      <div className="flex min-h-[430px] flex-col items-center justify-center space-y-6 text-center">
        <div className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
          <Image
            src="/wait-reset.png"
            alt="Instruksi reset kata sandi terkirim"
            fill
            sizes="(max-width: 768px) 176px, 208px"
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-[26px] font-bold leading-tight text-[#D69A00]">
            Permintaan Atur Ulang Sandi Terkirim
          </h2>
          <p className="text-[15px] leading-7 text-[#707070]">
            Silakan periksa kotak masuk atau folder spam email Anda untuk membuka tautan atur ulang kata sandi.
          </p>
        </div>
        <button
          type="button"
          disabled={cooldown > 0}
          onClick={resendLink}
          className={`h-12 w-full rounded-[8px] border px-5 text-[15px] font-semibold transition ${
            cooldown > 0
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-[#FBBF24] bg-white text-[#1b2a4e] hover:bg-[#FBBF24]/10"
          }`}
        >
          {cooldown > 0 ? `Kirim Ulang Tautan (${cooldown}s)` : "Kirim Ulang Tautan"}
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) {
          setEmailError("Email wajib diisi.");
          return;
        }

        if (!emailPattern.test(email)) {
          setEmailError("Masukkan format email yang valid.");
          return;
        }

        setEmailError("");
        setCooldown(120);
        onSentChange(true);
      }}
    >
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="contoh@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={emailError}
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
