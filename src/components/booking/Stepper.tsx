export default function Stepper({ currentStep }: { currentStep: number }) {
  // Daftar langkah-langkah yang akan ditampilkan di Stepper
  const steps = [
    { num: 1, label: "Langkah 1", desc: "Pilih Layanan" },
    { num: 2, label: "Langkah 2", desc: "Pilih Waktu & Terapis" },
    { num: 3, label: "Langkah 3", desc: "Isi Data Booking" },
    { num: 4, label: "Langkah 4", desc: "Konfirmasi Booking" },
  ];

  return (
    // Pembungkus utama Stepper.
    <div className="w-full border border-gray-200 rounded-[16px] p-8 mb-10 bg-white">
      
      {/* Judul di dalam kotak Stepper */}
      <h3 className="text-center font-bold text-[#1b2a4e] text-[18px] mb-8">
        Langkah Buat Janji Temu
      </h3>
      
      {/* Container untuk garis dan lingkaran angka */}
      <div className="flex items-start justify-between relative">
        
        {/* Garis penghubung abu-abu panjang di belakang lingkaran (Background) */}
        {/* Kalau lu mau panjang garisnya diubah, mainin angka di left-10 atau right-10 */}
        <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-200 z-0"></div>

        {/* Melakukan looping untuk merender setiap lingkaran dan teks langkah */}
        {steps.map((step, index) => {
          // Cek apakah langkah ini adalah langkah yang sedang aktif
          const isActive = currentStep === step.num;
          // Cek apakah langkah ini sudah dilewati
          const isPast = currentStep > step.num;

          return (
            // Pembungkus untuk masing-masing item (Lingkaran + Teks)
            <div key={index} className="flex flex-col items-center gap-3 relative z-10 w-1/4">
              
              {/* Lingkaran Angka */}
              {/* Kalau lu mau gedein lingkarannya, ubah w-8 h-8 jadi w-10 h-10 misalnya */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold transition-colors bg-white
                  ${isActive 
                    ? "border-2 border-[#F5B301] text-[#F5B301]" // Warna kuning jika aktif
                    : isPast 
                      ? "border-2 border-gray-400 text-gray-400" // Warna abu gelap jika sudah lewat
                      : "border-2 border-gray-200 text-gray-400" // Warna abu terang jika belum tersentuh
                  }
                `}
              >
                {step.num}
              </div>

              {/* Teks Label (Contoh: Langkah 1) dan Deskripsi (Contoh: Pilih Layanan) */}
              <div className="flex flex-col items-center text-center">
                
                {/* Teks Label */}
                <span className={`text-[14px] font-bold ${isActive ? "text-[#1b2a4e]" : "text-gray-400"}`}>
                  {step.label}
                </span>
                
                {/* Teks Deskripsi */}
                <span className={`text-[12px] ${isActive ? "text-[#585858]" : "text-gray-400"}`}>
                  {step.desc}
                </span>

              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}