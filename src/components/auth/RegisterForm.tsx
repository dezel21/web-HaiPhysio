"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";

type RegisterErrors = {
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  password?: string;
  confirmPassword?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{8,}$/;
const registeredEmails = ["pasien@haiphysio.com", "terdaftar@email.com"];
const registeredPhones = ["081234567890", "0812 3456 7890"];
const duplicateMessage =
  "Email/No Telepon ini sudah terdaftar. Silakan gunakan yang lain atau langsung masuk ke akun Anda.";

export default function RegisterForm() {
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  function updateField(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const nextErrors: RegisterErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = "Masukkan format email yang valid.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "No. Telepon wajib diisi.";
    } else if (!phonePattern.test(values.phone)) {
      nextErrors.phone = "Masukkan no. telepon yang valid.";
    }

    if (!values.birthDate) {
      nextErrors.birthDate = "Tanggal lahir wajib diisi.";
    }

    if (!values.password) {
      nextErrors.password = "Kata sandi wajib diisi.";
    } else if (values.password.length < 8) {
      nextErrors.password = "Kata sandi minimal 8 karakter.";
    } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
      nextErrors.password = "Gunakan kombinasi huruf dan angka.";
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Konfirmasi kata sandi belum sama.";
    }

    return nextErrors;
  }

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        const systemErrors: RegisterErrors = {};
        const normalizedEmail = values.email.trim().toLowerCase();
        const normalizedPhone = values.phone.replace(/\D/g, "");
        const normalizedRegisteredPhones = registeredPhones.map((phone) =>
          phone.replace(/\D/g, ""),
        );

        if (registeredEmails.includes(normalizedEmail)) {
          systemErrors.email = duplicateMessage;
        }

        if (normalizedRegisteredPhones.includes(normalizedPhone)) {
          systemErrors.phone = duplicateMessage;
        }

        setErrors(systemErrors);
      }}
    >
      <AuthInput
        label="Nama Lengkap"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Tulis Nama Lengkap Anda"
        value={values.name}
        onChange={(event) => updateField("name", event.target.value)}
        error={errors.name}
      />
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="contoh@email.com"
        value={values.email}
        onChange={(event) => updateField("email", event.target.value)}
        error={errors.email}
      />
      <AuthInput
        label="No. Telepon"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="0812 3456 7890"
        value={values.phone}
        onChange={(event) => updateField("phone", event.target.value)}
        error={errors.phone}
      />
      <AuthInput
        label="Tanggal Lahir"
        name="birthDate"
        type="date"
        value={values.birthDate}
        onChange={(event) => updateField("birthDate", event.target.value)}
        error={errors.birthDate}
      />
      <div className="space-y-2">
        <AuthPasswordInput
          label="Kata Sandi"
          name="password"
          autoComplete="new-password"
          placeholder="********"
          value={values.password}
          onChange={(event) => updateField("password", event.target.value)}
          error={errors.password}
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
        value={values.confirmPassword}
        onChange={(event) => updateField("confirmPassword", event.target.value)}
        error={errors.confirmPassword}
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
