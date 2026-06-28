import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { ArticleCard } from "@/components/alqabas/ArticleCard";
import { searchArticles } from "@/lib/alqabas-data";
import { Suspense } from "react";

async function SearchResults({ query }: { query: string }) {
  const results = query ? searchArticles(query) : [];
  if (!query) return <p className="text-center text-gray-500 py-12">أدخل كلمة للبحث</p>;
  if (results.length === 0) return <p className="text-center text-gray-500 py-12">لا توجد نتائج</p>;
  return <ArticleGridWithResults results={results} />;
}

function ArticleGridWithResults({ results }: { results: ReturnType<typeof searchArticles> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">البحث</h1>
            <form className="mt-3 flex gap-2" method="GET" action="/search">
              <input name="q" defaultValue={searchParams.q} placeholder="ابحث في المقالات..." className="flex-1 md:w-96 px-4 py-2 rounded-sm text-gray-900 text-sm" />
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-sm text-sm transition-colors">بحث</button>
            </form>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <Suspense fallback={<p className="text-center text-gray-500">جاري البحث...</p>}>
            <SearchResults query={searchParams.q || ""} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}