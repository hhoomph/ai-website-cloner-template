'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Trash2,
  Image,
  Film,
  Music,
  FileText,
  Upload,
  X
} from 'lucide-react'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl: string | null
  alt: string | null
  caption: string | null
  createdAt: string
  categoryId: string | null
}

interface Category {
  id: string
  name: string
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadForm, setUploadForm] = useState({
    originalName: '',
    url: '',
    alt: '',
    caption: '',
    categoryId: '',
  })

  useEffect(() => {
    fetchMedia()
    fetchCategories()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/media')
      const data = await response.json()
      if (response.ok) {
        setMedia(data.media)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadForm(prev => ({
        ...prev,
        originalName: file.name,
        url: event.target?.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    setSuccess('')

    try {
      // Get current user (fallback to first admin user for now)
      let userId = ''
      const usersRes = await fetch('/api/admin/users?limit=1')
      const usersData = await usersRes.json()
      if (usersRes.ok && usersData.users?.[0]) {
        userId = usersData.users[0].id
      }

      if (!userId) {
        setError('No user found to associate upload. Please create a user first.')
        return
      }

      const mimeType = uploadForm.url.startsWith('data:')
        ? uploadForm.url.split(';')[0].split(':')[1]
        : 'application/octet-stream'

      const sizeEstimate = uploadForm.url.startsWith('data:')
        ? Math.floor((uploadForm.url.length * 3) / 4)
        : 0

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: uploadForm.originalName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase(),
          originalName: uploadForm.originalName,
          mimeType,
          size: sizeEstimate,
          url: uploadForm.url,
          alt: uploadForm.alt || null,
          caption: uploadForm.caption || null,
          categoryId: uploadForm.categoryId || undefined,
          uploadedById: userId,
        }),
      })

      if (res.ok) {
        setSuccess('Media uploaded successfully')
        setShowUpload(false)
        setUploadForm({ originalName: '', url: '', alt: '', caption: '', categoryId: '' })
        if (fileInputRef.current) fileInputRef.current.value = ''
        await fetchMedia()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to upload media')
      }
    } catch (err) {
      setError('Failed to upload media')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) {
      return
    }

    try {
      const response = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: mediaId }),
      })

      if (response.ok) {
        setMedia(media.filter(m => m.id !== mediaId))
      }
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image
    if (mimeType.startsWith('video/')) return Film
    if (mimeType.startsWith('audio/')) return Music
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const filteredMedia = media.filter(item =>
    item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Upload Media</h2>
              <button onClick={() => setShowUpload(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileSelect}
                  className="w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                <Input
                  required
                  value={uploadForm.originalName}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, originalName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <Input
                  value={uploadForm.alt}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, alt: e.target.value }))}
                  placeholder="Describe the image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <Input
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, caption: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={uploadForm.categoryId}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">No category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {uploadForm.url && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {uploadForm.url.startsWith('data:image') ? (
                    <img src={uploadForm.url} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      File selected
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowUpload(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library ({filteredMedia.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No media found</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => {
                const FileIcon = getFileIcon(item.mimeType)
                const isImage = item.mimeType.startsWith('image/')
                
                return (
                  <div
                    key={item.id}
                    className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Preview */}
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {isImage && item.url ? (
                        <img
                          src={item.url}
                          alt={item.alt || item.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate mb-1">
                        {item.originalName}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(item.size)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}