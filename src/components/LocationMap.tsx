import Link from "next/link";

export default function LocationMap() {
  return (
    <section className="w-full bg-[#F8F9FA] pb-16 md:pb-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px]">
        
        {/* Kontainer Kuning Besar */}
        <div className="w-full bg-[#F5B301] rounded-[24px] md:rounded-[32px] p-6 md:p-12 flex flex-col items-center gap-8 shadow-md">
          
          {/* Teks Judul dan Alamat */}
          <div className="flex flex-col items-center text-center gap-3 w-full max-w-[800px]">
            <h2 className="text-[28px] md:text-[36px] font-bold text-white">
              Lokasi Klinik Kami
            </h2>
            <p className="text-white/90 text-[14px] md:text-[16px] leading-relaxed">
              Klinik Fisioterapi Hai Physio, Jalan Raya Condet No. 18, Batu Ampar, Kramat Jati, Jakarta Timur.
            </p>
          </div>
        
          {/* Kontainer Peta Interaktif */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-inner bg-gray-200">
            
            {/* 1. Google Maps Iframe Asli (Gratis) */}
            <iframe 
              src="https://maps.google.com/maps?q=Klinik%20Fisioterapi%20Hai%20Physio&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full z-0"
            ></iframe>

            {/* 2. Floating Card UI (Sesuai Figma) */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 bg-white p-4 md:p-5 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.15)] flex items-center justify-between gap-6 max-w-[340px] md:max-w-[400px]">
              
              {/* Teks Alamat di dalam Card */}
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-[#1b2a4e] text-[15px]">Klinik Fisioterapi Hai Physio</span>
                <span className="text-[#585858] text-[12px] leading-relaxed">
                  Jl. Raya Condet No. 18, Batu Ampar, Kec. Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13520
                </span>
                <span className="text-[#F5B301] text-[12px] font-bold flex items-center gap-1 mt-1">
                  4.9 
                  <span className="tracking-widest">★★★★★</span> 
                  <span className="text-gray-400 font-normal">(187)</span>
                </span>
              </div>

            {/* Tombol Rute Pintas ke Google Maps App */}
              <Link
              // Link ajaib ini akan otomatis membuka aplikasi Google Maps di HP atau web di Laptop untuk meminta rute
                href="https://www.google.com/maps/dir/?api=1&destination=Klinik+Fisioterapi+Hai+Physio"
                target="_blank"
                className="flex flex-col items-center justify-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0 px-2"
              >
                {/* Ikon Arrow/Rute Manual (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M234.33,126.11l-96-96a8,8,0,0,0-11.31,0l-96,96a8,8,0,0,0,11.31,11.31L128,51.31l85.66,85.66a8,8,0,0,0,11.31-11.31ZM184,152a8,8,0,0,0-8,8v24H128a40,40,0,0,0-40,40v16a8,8,0,0,0,16,0v-16a24,24,0,0,1,24-24h48V224a8,8,0,0,0,13.66,5.66l32-32a8,8,0,0,0,0-11.32l-32-32A8,8,0,0,0,184,152Z"></path>
                </svg>
                <span className="text-[13px] font-bold">Rute</span>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}