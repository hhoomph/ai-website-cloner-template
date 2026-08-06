'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Save, Plus, Trash2 } from 'lucide-react'

interface Setting {
  value: string | number | boolean | object
  type: string
  description?: string | null
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, Setting>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [newType, setNewType] = useState('STRING')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (res.ok) setSettings(data)
    } catch (e) {
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (key: string) => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const setting = settings[key]
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          value: setting.value,
          type: setting.type,
          description: setting.description,
        }),
      })
      if (res.ok) {
        setSuccess(`Saved "${key}"`)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save setting')
      }
    } catch (e) {
      setError('Failed to save setting')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = async () => {
    if (!newKey.trim()) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: newKey.trim(),
          value: newValue,
          type: newType,
        }),
      })
      if (res.ok) {
        setNewKey('')
        setNewValue('')
        setSuccess(`Added "${newKey.trim()}"`)
        await fetchSettings()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to add setting')
      }
    } catch (e) {
      setError('Failed to add setting')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, field: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }))
  }

  const removeSetting = (key: string) => {
    setSettings(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Site Settings</h1>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      {/* Add New Setting */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Setting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Setting key (e.g. site_name)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="STRING">String</option>
              <option value="NUMBER">Number</option>
              <option value="BOOLEAN">Boolean</option>
              <option value="JSON">JSON</option>
            </select>
            <Button onClick={handleAdd} disabled={saving}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings ({Object.keys(settings).length})</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(settings).length === 0 ? (
            <div className="text-center py-8 text-gray-500">No settings found</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(settings).map(([key, setting]) => (
                <div key={key} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{key}</h3>
                      {setting.description && (
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                        {setting.type}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSetting(key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {setting.type === 'BOOLEAN' ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(setting.value)}
                        onChange={(e) => updateSetting(key, 'value', e.target.checked)}
                        className="rounded"
                      />
                      Enabled
                    </label>
                  ) : setting.type === 'NUMBER' ? (
                    <Input
                      type="number"
                      value={String(setting.value)}
                      onChange={(e) => updateSetting(key, 'value', Number(e.target.value))}
                    />
                  ) : setting.type === 'JSON' ? (
                    <textarea
                      value={typeof setting.value === 'string' ? setting.value : JSON.stringify(setting.value, null, 2)}
                      onChange={(e) => {
                        try {
                          updateSetting(key, 'value', JSON.parse(e.target.value))
                        } catch {
                          updateSetting(key, 'value', e.target.value)
                        }
                      }}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                    />
                  ) : (
                    <Input
                      value={String(setting.value)}
                      onChange={(e) => updateSetting(key, 'value', e.target.value)}
                    />
                  )}

                  <div className="flex justify-end mt-3">
                    <Button size="sm" onClick={() => handleSave(key)} disabled={saving}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
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