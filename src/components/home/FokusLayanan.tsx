import Image from "next/image";
import { servicesData } from "@/constants/data";

interface FokusLayananProps {
  className?: string; // Prop opsional untuk ngubah warna background/spasi dari luar
}

export default function FokusLayanan({ className = "bg-white py-16 md:py-24" }: FokusLayananProps) {
  return (
    <section className={`w-full ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px] flex flex-col gap-12">
        
        {/* Header Judul */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#F5B301]">
            Fokus Layanan Kami
          </h2>
          <p className="text-[#585858] text-[16px] max-w-[600px]">
            Tiga bidang yang kami tangani
          </p>
        </div>

        {/* Grid Cards (Ambil data otomatis dari SSOT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div key={service.id} className="flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 gap-6">
              <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden">
                
                {/* Gambar Layanan */}
                <Image
                  src={service.imgSrc} 
                  alt={service.titleBold}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Judul & Ikon */}
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-[12px] border border-[#F5B301]/30 flex items-center justify-center shrink-0">
                  {service.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#1b2a4e] text-[20px] font-medium leading-tight">
                    {service.title} <span className="font-bold">{service.titleBold}</span>
                  </h3>
                  <span className="text-[#585858] text-[13px] mt-1">{service.subtitle}</span>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-[#585858] text-[14px] leading-relaxed">
                {service.desc}
              </p>

              {/* Chips Contoh Kasus */}
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
                <span className="text-[#1b2a4e] font-bold text-[14px]">Contoh Kasus:</span>
                <div className="flex flex-wrap gap-2">
                  {service.cases.map((caseItem, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-white border border-[#1b2a4e]/20 rounded-md text-[#1b2a4e] text-[13px] font-medium"
                    >
                      {caseItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}