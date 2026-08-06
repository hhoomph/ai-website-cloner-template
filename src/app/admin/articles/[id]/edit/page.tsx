'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save, Bold, Italic, Underline, List, Heading1, Quote, Link2 } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface Author {
  id: string
  name: string
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string

  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    categoryId: '',
    authorId: '',
    breakingNews: false,
    isPremium: false,
    isFeatured: false,
    publishedAt: '',
  })

  useEffect(() => {
    fetchArticle()
    fetchCategories()
    fetchAuthors()
  }, [articleId])

  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`)
      const data = await res.json()
      if (res.ok) {
        setForm({
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          content: data.content,
          excerpt: data.excerpt,
          featuredImage: data.featuredImage,
          categoryId: data.categoryId,
          authorId: data.authorId,
          breakingNews: data.breakingNews,
          isPremium: data.isPremium,
          isFeatured: data.isFeatured,
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : '',
        })
      } else {
        setError(data.error || 'Failed to load article')
      }
    } catch (e) {
      setError('Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      if (res.ok) setCategories(data.categories)
    } catch (e) { console.error(e) }
  }

  const fetchAuthors = async () => {
    try {
      const res = await fetch('/api/admin/authors')
      const data = await res.json()
      if (res.ok) setAuthors(data.authors)
    } catch (e) { console.error(e) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
        }),
      })

      if (res.ok) {
        router.push('/admin/articles')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to update article')
      }
    } catch (err) {
      setError('Failed to update article')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const insertFormat = (before: string, after = '') => {
    const textarea = document.querySelector('textarea[aria-label="content"]') as HTMLTextAreaElement | null
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const selected = form.content.slice(start, end)
    const next = form.content.slice(0, start) + before + selected + after + form.content.slice(end)
    updateField('content', next)
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/articles" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
        <h1 className="text-xl font-semibold">Edit Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <Input
                  required
                  value={form.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) => updateField('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                <select
                  required
                  value={form.authorId}
                  onChange={(e) => updateField('authorId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select author</option>
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL *</label>
                <Input
                  required
                  type="url"
                  value={form.featuredImage}
                  onChange={(e) => updateField('featuredImage', e.target.value)}
                />
                {form.featuredImage && (
                  <div className="mt-2">
                    <img
                      src={form.featuredImage}
                      alt="Featured preview"
                      className="w-full max-h-64 object-cover rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <Input
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) => updateField('publishedAt', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary *</label>
              <textarea
                required
                value={form.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <textarea
                required
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="flex items-center gap-1 p-1 bg-gray-50 border-b border-gray-200 flex-wrap">
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('**', '**')} title="Bold">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('*', '*')} title="Italic">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('<u>', '</u>')} title="Underline">
                    <Underline className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('\n> ')} title="Quote">
                    <Quote className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('# ')} title="Heading">
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('- ')} title="List">
                    <List className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-gray-200" onClick={() => insertFormat('[', '](url)')} title="Link">
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  rows={12}
                  aria-label="content"
                  className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.breakingNews}
                  onChange={(e) => updateField('breakingNews', e.target.checked)}
                  className="rounded"
                />
                Breaking News
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPremium}
                  onChange={(e) => updateField('isPremium', e.target.checked)}
                  className="rounded"
                />
                Premium
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => updateField('isFeatured', e.target.checked)}
                  className="rounded"
                />
                Featured
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/admin/articles">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}