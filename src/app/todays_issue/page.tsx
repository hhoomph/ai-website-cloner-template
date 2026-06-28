import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { issues } from "@/lib/alqabas-data";

export default function TodaysIssuePage() {
  const issue = issues[0];
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">عدد اليوم</h1>
            <p className="text-white/80 text-sm mt-1">تصفح العدد الحالي من الجريدة</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-sm border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{issue?.title || "العدد اليومي"}</h2>
            <p className="text-sm text-gray-600 mb-4">التاريخ: {issue?.date}</p>
            <a href={issue?.pdfUrl || "#"} className="inline-block bg-[#005C9D] text-white px-6 py-2 rounded-sm text-sm hover:bg-[#004d82] transition-colors">
              تحميل PDF
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}