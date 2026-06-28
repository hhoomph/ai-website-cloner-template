import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { podcasts } from "@/lib/alqabas-data";

export default function PodcastPage() {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">البودكاست</h1>
            <p className="text-white/80 text-sm mt-1">استمع لأحدث الحلقات والمناقشات</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-4">
            {podcasts.map((pod) => (
              <div key={pod.id} className="bg-white rounded-sm border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-sm">
                  <img src={pod.coverImage} alt={pod.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-right">
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{pod.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{pod.description}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{pod.host} | {pod.date} | {pod.duration}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-[#005C9D] text-white text-xs px-3 py-1 rounded-sm">{pod.audioUrl}</span>
                  </div>
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