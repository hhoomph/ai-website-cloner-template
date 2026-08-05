'use client'

import { useState, useEffect } from 'react'
import { Prisma } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter
} from 'lucide-react'
import Link from 'next/link'

type ArticleWithRelations = Prisma.ArticleGetPayload<{
  include: {
    category: true
    author: true
    tags: { include: { tag: true } }
  }
}>

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchArticles()
  }, [statusFilter])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('status', statusFilter)
      params.set('limit', '50')

      const response = await fetch(`/api/admin/articles?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setArticles(articles.filter(a => a.id !== articleId))
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'published' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('published')}
            >
              Published
            </Button>
            <Button
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('draft')}
            >
              Drafts
            </Button>
          </div>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No articles found</div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </h3>
                      {article.publishedAt ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      {article.isFeatured && (
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.author.name}</span>
                      <span>•</span>
                      <span>{article.category.name}</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {article.publishedAt && (
                      <Link href={`/article/${article.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}