'use client'

import { useState, useEffect } from 'react'
import { UserRole } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Users,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string
  phone: string | null
  role: UserRole
  emailVerified: boolean
  createdAt: string
  _count: {
    comments: number
    mediaUploads: number
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  useEffect(() => {
    fetchUsers()
  }, [roleFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (roleFilter !== 'all') {
        params.set('role', roleFilter)
      }
      params.set('limit', '50')

      const response = await fetch(`/api/admin/users?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId))
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'SUPERADMIN':
        return 'default'
      case 'ADMIN':
        return 'default'
      case 'EDITOR':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'SUPERADMIN':
        return 'bg-purple-100 text-purple-800'
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800'
      case 'EDITOR':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={roleFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setRoleFilter('all')}
            >
              All
            </Button>
            <Button
              variant={roleFilter === 'ADMIN' ? 'default' : 'outline'}
              onClick={() => setRoleFilter('ADMIN')}
            >
              Admins
            </Button>
            <Button
              variant={roleFilter === 'EDITOR' ? 'default' : 'outline'}
              onClick={() => setRoleFilter('EDITOR')}
            >
              Editors
            </Button>
            <Button
              variant={roleFilter === 'READER' ? 'default' : 'outline'}
              onClick={() => setRoleFilter('READER')}
            >
              Readers
            </Button>
          </div>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New User
          </Button>
        </Link>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No users found</div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 text-white flex items-center justify-center text-lg font-medium flex-shrink-0">
                      {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                        {user.emailVerified && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{user.email}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {user.phone && <span>{user.phone}</span>}
                        <span>•</span>
                        <span>{user._count.comments} comments</span>
                        <span>•</span>
                        <span>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/admin/users/${user.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
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