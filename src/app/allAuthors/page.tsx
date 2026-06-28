import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { authors, articles, getArticlesByAuthor } from "@/lib/alqabas-data";
import Link from "next/link";

export default function AuthorsPage() {
  return (
    <div dir="rtl" className="min-h-screen" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main>
        <div className="bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] py-10 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">كتاب القبس</h1>
            <p className="text-white/80 text-sm mt-1">تعرف على كتاب وآراء الجريدة</p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => {
              const authorArticles = getArticlesByAuthor(author.id);
              return (
                <div key={author.id} className="bg-white rounded-sm border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-l from-[#005C9D] to-[#4FCFFF] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {author.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 leading-tight">{author.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{author.title}</p>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{author.bio}</p>
                      <p className="text-xs text-[#005C9D] mt-2">{author.articleCount} مقال</p>
                    </div>
                  </div>
                  {authorArticles.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-700 mb-2">أحدث المقالات:</p>
                      <div className="space-y-2">
                        {authorArticles.slice(0, 3).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="block text-xs text-gray-700 hover:text-[#005C9D] transition-colors line-clamp-1">
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}