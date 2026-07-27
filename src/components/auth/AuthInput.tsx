import type { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthInput({
  label,
  className = "",
  id,
  ...props
}: AuthInputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={inputId} className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold text-[#1b2a4e]">{label}</span>
      <input
        id={inputId}
        className={`h-12 rounded-[8px] border border-slate-200 bg-white px-4 text-[15px] text-slate-800 outline-none transition focus:border-[#FBBF24] focus:ring-4 focus:ring-[#FBBF24]/20 ${className}`}
        {...props}
      />
    </label>
  );
}
