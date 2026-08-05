import { Metadata } from 'next'
import { HomePageClient } from './_components/HomePageClient'
import { getFeaturedArticles, getRecentArticles, categories, getBreakingNews, getMostReadArticles } from '@/lib/alqabas-data'

export const metadata: Metadata = {
  title: 'القبس - موقع القبس الإخباري',
  description: 'موقع القبس الإخباري - آخر الأخبار المحلية والعالمية',
  keywords: ['أخبار', 'صحافة', 'القبس', 'الكويت', 'الشرق الأوسط'],
}

export default async function HomePage() {
  const featuredArticles = getFeaturedArticles()
  const recentArticles = getRecentArticles(12)
  const breakingNews = getBreakingNews()
  const mostRead = getMostReadArticles(5)
  const data = {
    settings: {},
    featuredArticles: featuredArticles,
    breakingNews: breakingNews,
    recentArticles: recentArticles,
    categories: categories,
    mostRead: mostRead,
  }

  return (
    <main className="min-h-screen bg-white">
      <HomePageClient initialData={data} />
    </main>
  )
}
