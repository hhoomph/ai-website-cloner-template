import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { ArticleGrid } from "@/components/alqabas/ArticleCard";
import { articles, getArticle, getRecentArticles } from "@/lib/alqabas-data";
import { notFound } from "next/navigation";
import Image from "next/image";

export function generateStaticParams() {
  return articles.map((a) => ({ id: String(a.id) }));
}

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = getArticle(Number(params.id));
  if (!article) return notFound();
  const related = getRecentArticles(6).filter((a) => a.id !== article.id && a.categoryId === article.categoryId);

  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <article className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs text-white rounded-full mb-2" style={{ background: article.categoryColor }}>
              {article.categoryName}
            </span>
            {article.isPremium && (
              <span className="inline-block px-2 py-1 text-[10px] bg-yellow-500 text-black font-bold rounded-sm mr-2">مميز</span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{article.title}</h1>
          {article.authorName && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-bold text-[#005C9C]">{article.authorName}</span>
            </p>
          )}
          <p className="text-xs text-gray-500 mb-6">{article.publishedAt} | المشاهدات: {article.views?.toLocaleString()}</p>
          <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-6">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.summary}</p>` }} />
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">مقالات ذات صلة</h3>
            <ArticleGrid articles={related.slice(0, 3)} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}