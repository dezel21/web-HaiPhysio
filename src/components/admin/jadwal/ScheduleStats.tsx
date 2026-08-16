"use client";

export default function ScheduleStats() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Slot */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-2">
        <span className="text-[#585858] text-[14px] font-medium">Total Slot Hari Ini</span>
        <span className="text-[32px] font-bold text-[#1b2a4e]">24</span>
      </div>

      {/* Slot Terisi */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-2">
        <span className="text-[#585858] text-[14px] font-medium">Slot Terisi</span>
        <span className="text-[32px] font-bold text-green-500">18</span>
      </div>

      {/* Slot Tersedia */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-2">
        <span className="text-[#585858] text-[14px] font-medium">Slot Tersedia</span>
        <span className="text-[32px] font-bold text-[#F5B301]">6</span>
      </div>

    </div>
  );
}