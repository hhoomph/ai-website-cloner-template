'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  UserCheck
} from 'lucide-react'
import Link from 'next/link'

interface Author {
  id: string
  name: string
  slug: string
  email: string
  title: string
  bio: string
  articleCount: number
  isActive: boolean
  createdAt: string
}

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/authors')
      const data = await response.json()
      
      if (response.ok) {
        setAuthors(data.authors)
      }
    } catch (error) {
      console.error('Error fetching authors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (authorId: string) => {
    if (!confirm('Are you sure you want to delete this author?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/authors/${authorId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setAuthors(authors.filter(a => a.id !== authorId))
      }
    } catch (error) {
      console.error('Error deleting author:', error)
    }
  }

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link href="/admin/authors/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Author
          </Button>
        </Link>
      </div>

      {/* Authors Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Authors ({filteredAuthors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredAuthors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No authors found</div>
          ) : (
            <div className="space-y-3">
              {filteredAuthors.map((author) => (
                <div
                  key={author.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 text-white flex items-center justify-center text-lg font-medium flex-shrink-0">
                      {author.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {author.name}
                        </h3>
                        <Badge variant={author.isActive ? 'default' : 'secondary'}>
                          {author.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{author.title}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{author.email}</span>
                        <span>•</span>
                        <span>{author.articleCount} articles</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/admin/authors/${author.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(author.id)}
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