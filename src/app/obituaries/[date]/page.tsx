import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";

export default function ObituariesPage({ params }: { params: { date: string } }) {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">الوفيات</h1>
            <p className="text-white/80 text-sm mt-1">إعلانات الوفيات - {params.date}</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500">لا توجد إعلانات وفيات لهذا التاريخ</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}