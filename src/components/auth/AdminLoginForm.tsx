"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";

type AdminLoginErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const adminEmails = ["admin@haiphysio.com"];

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AdminLoginErrors>({});

  function validate() {
    const nextErrors: AdminLoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email Admin wajib diisi.";
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

        if (!adminEmails.includes(email.trim().toLowerCase())) {
          setErrors({
            email: "Email ini tidak terdaftar sebagai akun Admin",
          });
          return;
        }

        setErrors({});
      }}
    >
      <AuthInput
        label="Email Admin"
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
      <AuthButton>Masuk ke Dashboard</AuthButton>
    </form>
  );
}
