import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { getArticle } from '@/lib/data-adapter'
import type { Article } from '@/types/alqabas'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary,
  }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = (await getArticle(params.id)) as Article | undefined

  if (!article) {
    notFound()
  }

  return (
    <div dir="rtl" className="min-h-screen flex flex-col" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main className="flex-1 bg-white">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-6">
            <Link href={`/category/${article.category.slug}`} className="text-xs text-[#005C9D] hover:underline">
              {article.category.name}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ar-SA') : ''}</span>
            </div>
          </header>

          {article.featuredImage && (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-sm mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}