import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { galleries } from "@/lib/alqabas-data";

export default function AlbumsPage() {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">معرض الصور</h1>
            <p className="text-white/80 text-sm mt-1">أبرز الصور والأحداث المصورة</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleries.map((item) => (
              <div key={item.id} className="bg-white rounded-sm border border-gray-100 overflow-hidden shadow-sm group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}