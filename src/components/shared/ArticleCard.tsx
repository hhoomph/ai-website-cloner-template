import Link from 'next/link'
import { Calendar, Eye, Heart } from 'lucide-react'
import { Article } from '@/types/alqabas'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('ar-KW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (variant === 'featured') {
    return (
      <article className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <Link href={`/article/${article.slug}`} className="block">
          <div className="aspect-[16/9] w-full overflow-hidden bg-gray-200">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                style={{
                  backgroundColor: article.category.color,
                  color: '#ffffff',
                }}
              >
                {article.category.name}
              </span>
            </div>
            <h3 className="text-base font-bold text-alqabas-dark mb-1 line-clamp-2 group-hover:text-alqabas-blue transition-colors leading-snug">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">{article.excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-alqabas-blue" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} className="text-alqabas-blue" />
                {article.views}
              </span>
              <span>{article.author.name}</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
        <Link href={`/article/${article.slug}`} className="shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/article/${article.slug}`}>
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span
              className="font-medium"
              style={{ color: article.category.color }}
            >
              {article.category.name}
            </span>
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>
        </div>
      </article>
    )
  }

  // Default variant - horizontal layout
  return (
    <article className="group flex gap-4 py-3 border-b border-gray-200 last:border-b-0">
      <Link href={`/article/${article.slug}`} className="shrink-0">
        <div className="w-32 h-24 rounded-sm overflow-hidden bg-gray-200">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/article/${article.slug}`}>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-sm"
              style={{
                backgroundColor: article.category.color,
                color: '#ffffff',
              }}
            >
              {article.category.name}
            </span>
          </div>
          <h3 className="font-bold text-alqabas-dark mb-1 line-clamp-2 group-hover:text-alqabas-blue transition-colors leading-snug text-sm">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-alqabas-blue" />
            {formatDate(article.publishedAt || article.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} className="text-alqabas-blue" />
            {article.views}
          </span>
        </div>
      </div>
    </article>
  )
}