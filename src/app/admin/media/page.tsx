'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Trash2,
  Image,
  Film,
  Music,
  FileText,
  Upload
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
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchMedia()
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

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
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
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

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