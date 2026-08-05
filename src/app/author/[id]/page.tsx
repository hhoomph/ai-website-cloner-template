import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { getAuthor, getArticlesByAuthor, authors } from '@/lib/alqabas-data'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const author = getAuthor(Number(params.id))

  if (!author) return { title: 'Author Not Found' }

  return {
    title: author.name,
    description: author.bio,
  }
}

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const author = getAuthor(Number(params.id))
  const articles = getArticlesByAuthor(Number(params.id))

  if (!author) {
    notFound()
  }

  return (
    <div dir="rtl" className="min-h-screen flex flex-col" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-6">
              {author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{author.name}</h1>
                <p className="text-sm text-[#005C9D] mb-3">{author.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{author.bio}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">مقالات الكاتب</h2>
          </div>

          {articles.length === 0 ? (
            <p className="text-center text-gray-500 py-12">لا توجد مقالات من هذا الكاتب</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article key={article.id} className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/article/${article.id}`} className="hover:text-[#005C9D] transition-colors">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.category.name}</span>
                      <span>•</span>
                      <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ar-SA') : ''}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}