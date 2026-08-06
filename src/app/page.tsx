import { Metadata } from 'next'
import { HomePageClient } from './_components/HomePageClient'
import { getFeaturedArticles, getRecentArticles, getBreakingNews, getMostReadArticles, getCategories } from '@/lib/data-adapter'

export const metadata: Metadata = {
  title: 'القبس - موقع القبس الإخباري',
  description: 'موقع القبس الإخباري - آخر الأخبار المحلية والعالمية',
  keywords: ['أخبار', 'صحافة', 'القبس', 'الكويت', 'الشرق الأوسط'],
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featuredArticles, recentArticles, breakingNews, mostRead, categories] = await Promise.all([
    getFeaturedArticles(),
    getRecentArticles(12),
    getBreakingNews(),
    getMostReadArticles(5),
    getCategories(),
  ])

  const data = {
    settings: {},
    featuredArticles,
    breakingNews,
    recentArticles,
    categories,
    mostRead,
  }

  return (
    <main className="min-h-screen bg-white">
      <HomePageClient initialData={data} />
    </main>
  )
}