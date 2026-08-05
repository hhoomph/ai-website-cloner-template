'use client'

import Link from 'next/link'
import { Article, Category, BreakingNewsItem } from '@/types/alqabas'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { ArticleCard } from '@/components/shared/ArticleCard'

interface HomePageClientProps {
  initialData: {
    settings: AnyRecord
    featuredArticles: Article[]
    breakingNews: BreakingNewsItem[]
    recentArticles: Article[]
    categories: Category[]
    mostRead?: Article[]
  }
}

export function HomePageClient({ initialData }: HomePageClientProps) {
  const { settings, featuredArticles, breakingNews, recentArticles, categories, mostRead } = initialData

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breaking News Ticker */}
      {breakingNews.length > 0 && (
        <div className="bg-red-600 text-white py-2 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="font-bold text-sm whitespace-nowrap">عاجل</span>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {breakingNews.map((item: BreakingNewsItem, index: number) => (
                    <span key={item.id} className="mx-4">
                      {item.title}
                      {index < breakingNews.length - 1 && ' •'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header categories={categories} settings={settings} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-0">
          {/* Category Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Content Area - 2 columns */}
            <div className="lg:col-span-2">
              {/* محليات Section */}
              {recentArticles.length > 0 && (
                <section className="border-b border-gray-200">
                  <div className="bg-alqabas-blue text-white px-4 py-2">
                    <h2 className="text-lg font-bold">محليات</h2>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="space-y-0">
                      {recentArticles.slice(0, 8).map((article: Article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* كتاب وآراء Section */}
              {featuredArticles.length > 0 && (
                <section className="border-b border-gray-200">
                  <div className="bg-alqabas-blue text-white px-4 py-2">
                    <h2 className="text-lg font-bold">كتاب وآراء</h2>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="space-y-0">
                      {featuredArticles.slice(0, 5).map((article: Article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <aside className="bg-gray-50">
              {/* Trending Widget */}
              {(mostRead || []).length > 0 && (
                <div className="bg-alqabas-blue text-white p-4">
                  <h3 className="text-lg font-bold mb-3">Trending</h3>
                  <div className="space-y-3">
                    {(mostRead || []).slice(0, 5).map((article: Article, index: number) => (
                      <Link
                        key={article.id}
                        href={`/article/${article.slug}`}
                        className="flex gap-2 group"
                      >
                        <span className="text-xl font-bold shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium leading-snug group-hover:underline">
                            {article.title}
                          </h4>
                          {article.publishedAt && (
                            <span className="text-xs text-white/80 mt-1 block">
                              {new Date(article.publishedAt).toLocaleDateString('ar-KW')}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Widget */}
              {categories.length > 0 && (
                <div className="bg-white border-b border-gray-200 p-4">
                  <h3 className="text-base font-bold text-alqabas-dark mb-3">
                    الأقسام
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category: Category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="text-sm text-gray-700 hover:text-alqabas-blue transition-colors py-1"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional widgets can be added here */}
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  )
}
