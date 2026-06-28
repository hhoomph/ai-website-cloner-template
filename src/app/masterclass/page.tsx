import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { ArticleCard } from "@/components/alqabas/ArticleCard";
import { getPremiumArticles, articles } from "@/lib/alqabas-data";

export default function MasterClassPage() {
  const premium = getPremiumArticles();
  const all = articles.filter((a) => !a.isPremium).slice(0, 6);
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">ماستر كلاس</h1>
            <p className="text-white/80 text-sm mt-1">المحتوى الحصري والمقالات المميزة</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          {premium.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-900">محتوى مميز</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {premium.map((article) => (
                  <div key={article.id} className="bg-white rounded-sm border border-gray-200 p-4 flex gap-4 shadow-sm">
                    <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-snug line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <h2 className="text-xl font-bold mb-4 text-gray-900">مقالات حديثة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {all.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}