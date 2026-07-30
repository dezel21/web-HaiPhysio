"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";

type LoginErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function validate() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Masukkan format email yang valid.";
    }

    if (!password) {
      nextErrors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 8) {
      nextErrors.password = "Kata sandi minimal 8 karakter.";
    }

    return nextErrors;
  }

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        setErrors({
          password: "Kata sandi yang Anda masukkan salah. Silakan cek kembali.",
        });
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
        error={errors.email}
      />
      <AuthPasswordInput
        label="Kata Sandi"
        name="password"
        autoComplete="current-password"
        placeholder="********"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
      />
      <Link
        href="/reset-password"
        className="block text-right text-[14px] font-semibold text-[#1b2a4e] hover:text-[#F5B301]"
      >
        Lupa kata sandi?
      </Link>
      <AuthButton>Masuk</AuthButton>
    </form>
  );
}
