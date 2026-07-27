"use client";

import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthPasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export default function AuthPasswordInput({
  label,
  className = "",
  id,
  ...props
}: AuthPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <label htmlFor={inputId} className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold text-[#1b2a4e]">{label}</span>
      <span className="relative block">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={`h-12 w-full rounded-[8px] border border-slate-200 bg-white px-4 pr-12 text-[15px] text-slate-800 outline-none transition focus:border-[#FBBF24] focus:ring-4 focus:ring-[#FBBF24]/20 ${className}`}
          {...props}
        />
        <button
          type="button"
          aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[8px] text-slate-500 transition hover:bg-slate-100 hover:text-[#1b2a4e]"
        >
          <Icon size={20} strokeWidth={2} />
        </button>
      </span>
    </label>
  );
}
