import Image from "next/image";

// Ini adalah "kontrak" data apa saja yang wajib dilempar ke komponen ini
interface HeroBannerProps {
  title: string;
  imageSrc: string;
}

export default function HeroBanner({ title, imageSrc }: HeroBannerProps) {
  return (
    <section className="relative w-full h-[240px] md:h-[320px] flex items-center justify-center">
      <Image
        src={imageSrc} 
        alt={`Banner ${title}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay gelap transparan */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <h1 className="relative z-10 text-[32px] md:text-[44px] font-bold text-white tracking-wide drop-shadow-md">
        {title}
      </h1>
    </section>
  );
}