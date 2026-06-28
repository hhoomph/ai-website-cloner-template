import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { articles, issues } from "@/lib/alqabas-data";
import Link from "next/link";

export default function ArchivePage() {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">أرشيف القبس</h1>
            <p className="text-white/80 text-sm mt-1">تصفح أعداد الجريدة السابقة</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {issues.map((issue) => (
              <div key={issue.date} className="bg-white rounded-sm border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{issue.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{issue.date}</p>
                </div>
                <a href={issue.pdfUrl} className="bg-[#005C9D] text-white text-xs px-3 py-1.5 rounded-sm hover:bg-[#004d82] transition-colors">PDF</a>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4">أحدث المقالات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.slice(0, 8).map((article) => (
              <Link key={article.id} href={`/article/${article.id}`} className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 group cursor-pointer block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <span className="inline-block px-2 py-0.5 text-[10px] text-white rounded-full mb-1" style={{ background: article.categoryColor }}>{article.categoryName}</span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}