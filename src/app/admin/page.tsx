import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Calendar
} from 'lucide-react'

export const dynamic = 'force-dynamic'

// Mock data for admin dashboard (database not configured)
const mockStats = {
  totalArticles: 24,
  totalUsers: 156,
  totalViews: 45231,
  todayViews: 1234,
  totalComments: 89,
  recentArticles: [
    { id: 1, title: 'الكويت تدين تكرار الاعتداءات الإيرانية وتؤكد حقها في صون سيادتها', author: { name: 'وليد عبداللطيف النصف' }, category: { name: 'محليات' }, createdAt: new Date(), publishedAt: new Date() },
    { id: 2, title: 'رئاسة الأركان: الدفاعات الجوية تتصدى لهجمات صاروخية وطائرات مسيرة معادية', author: { name: 'عبدالله غازي المضف' }, category: { name: 'محليات' }, createdAt: new Date(), publishedAt: new Date() },
    { id: 3, title: 'ممثلة الأمين العام للأمم المتحدة لـ القبس: توقيع إطار تعاون إستراتيجي', author: { name: 'القبس' }, category: { name: 'محليات' }, createdAt: new Date(), publishedAt: new Date() },
    { id: 4, title: 'حساسية الجيرة الإيرانية', author: { name: 'فهد الظفيري' }, category: { name: 'كتاب وآراء' }, createdAt: new Date(), publishedAt: new Date() },
    { id: 5, title: 'أكسيوس: الجيش الأمريكي شن ضربات على إيران', author: { name: 'القبس' }, category: { name: 'القبس الدولي' }, createdAt: new Date(), publishedAt: new Date() },
  ],
  popularArticles: [
    { id: 1, title: 'أكسيوس: الجيش الأمريكي شن ضربات على إيران رداً على استهداف ناقلة تجارية', views: 21345 },
    { id: 2, title: 'الكويت تفوز على السعودية في خليجي 26', views: 15678 },
    { id: 3, title: 'الكويت تدين تكرار الاعتداءات الإيرانية وتؤكد حقها في صون سيادتها', views: 15234 },
    { id: 4, title: '5 تمارين تُرهق الركبتين بعد سن الستين', views: 12345 },
    { id: 5, title: 'ترامب ينشر صورة له وهو يحمل الكرة الأرضية على كتفيه', views: 11234 },
  ],
}

export default async function AdminDashboard() {
  const stats = mockStats

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles.toString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Today\'s Views',
      value: stats.todayViews.toLocaleString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Comments',
      value: stats.totalComments.toString(),
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{article.author.name}</span>
                      <span>•</span>
                      <span>{article.category.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  {article.publishedAt && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Most Popular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}