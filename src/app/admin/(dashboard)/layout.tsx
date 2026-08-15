import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

// Cangkang ini bakal ngebungkus semua file page.tsx yang ada di dalam folder /admin
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      
      {/* Sidebar kita taro di sini. Posisi fix di kiri */}
      <AdminSidebar />
      
      {/* Area utama digeser ke kanan sejauh 280px (lebarnya Sidebar) */}
      <div className="flex flex-col flex-1 ml-[280px]">
        {/* Header kita taro di atas area utama */}
        <AdminHeader />
        
        {/* Semua konten halaman lu (Dashboard, Profil, dll) bakal masuk ke {children} ini */}
        <main className="p-8 w-full">
          {children}
        </main>
      </div>
      
    </div>
  );
}