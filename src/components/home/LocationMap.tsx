export default function LocationMap() {
  return (
    <section className="w-full bg-[#F8F9FA] pb-16 md:pb-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[80px]">

        {/* Kontainer Kuning Besar */}
        <div className="w-full bg-[#F5B301] rounded-[24px] md:rounded-[32px] p-6 md:p-12 flex flex-col items-center gap-8 shadow-md">

          {/* Teks Judul & Alamat */}
          <div className="flex flex-col items-center text-center gap-3 w-full max-w-[800px]">
            <h2 className="text-[28px] md:text-[36px] font-bold text-white">Lokasi Klinik Kami</h2>
            <p className="text-white/90 text-[14px] md:text-[16px] leading-relaxed">
              Klinik Fisioterapi Hai Physio, Jalan Raya Condet No. 18, Batu Ampar, Kramat Jati, Jakarta Timur.
            </p>
          </div>

          {/* Kontainer Peta */}
          <div className="w-full h-[400px] md:h-[500px] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-inner bg-gray-200">
            {/* Google Maps Iframe Asli */}
            <iframe
              src="https://maps.google.com/maps?q=Klinik%20Fisioterapi%20Hai%20Physio&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}