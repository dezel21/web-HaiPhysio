import type { ButtonHTMLAttributes } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function AuthButton({
  children,
  className = "",
  disabled,
  type = "submit",
  ...props
}: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-12 w-full rounded-[8px] px-5 text-[15px] font-semibold text-white shadow-sm transition-colors ${
        disabled
          ? "cursor-not-allowed bg-slate-300 text-slate-500"
          : "bg-[#FBBF24] hover:bg-[#F5B301] active:bg-[#dda101]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
