import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { ArticleCard } from "@/components/alqabas/ArticleCard";
import { categories, getArticlesByCategory, getCategory } from "@/lib/alqabas-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categories.map((c) => ({ id: String(c.id) }));
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const category = getCategory(id);
  if (!category) return notFound();
  const articles = getArticlesByCategory(id);

  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9C] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-white/80 text-sm mt-1">{category.description}</p>
            <p className="text-white/70 text-xs mt-1">عدد المقالات: {articles.length}</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {articles.length === 0 && <p className="text-center text-gray-500 py-12">لا توجد مقالات في هذا القسم حالياً</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}