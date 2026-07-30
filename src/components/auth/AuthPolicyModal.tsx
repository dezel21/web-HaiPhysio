"use client";

import { X } from "@phosphor-icons/react";

type AuthPolicyModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
};

const ipsumSections = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 101, 202, 303, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, 404, 505, 606, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Lorem ipsum dolor sit amet, 707, 808, 909, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

export default function AuthPolicyModal({
  title,
  open,
  onClose,
}: AuthPolicyModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-policy-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-[720px] rounded-[8px] bg-white p-6 shadow-[0_32px_100px_rgba(15,23,42,0.3)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#F5B301]">
              Informasi
            </p>
            <h2
              id="auth-policy-modal-title"
              className="text-[24px] font-bold leading-tight text-[#1b2a4e] md:text-[28px]"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-slate-500 transition hover:bg-slate-100 hover:text-[#1b2a4e]"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {ipsumSections.map((section, index) => (
            <p key={index} className="text-[15px] leading-7 text-slate-600">
              {section}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
