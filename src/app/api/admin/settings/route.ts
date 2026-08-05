import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/admin/settings - Get all site settings
export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' },
    })

    const settingsMap = settings.reduce((acc, setting) => {
      let value: any = setting.value
      if (setting.type === 'NUMBER') value = Number(value)
      else if (setting.type === 'BOOLEAN') value = value === 'true'
      else if (setting.type === 'JSON') {
        try {
          value = JSON.parse(setting.value)
        } catch {
          value = setting.value
        }
      }
      acc[setting.key] = {
        value,
        type: setting.type,
        description: setting.description,
      }
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT /api/admin/settings - Update site setting
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const settingSchema = z.object({
      key: z.string().min(1),
      value: z.any(),
      type: z.enum(['STRING', 'NUMBER', 'BOOLEAN', 'JSON']).optional(),
      description: z.string().optional(),
    })

    const { key, value, type, description } = settingSchema.parse(body)

    // Determine type if not provided
    let settingType = type
    if (!settingType) {
      if (typeof value === 'number') settingType = 'NUMBER'
      else if (typeof value === 'boolean') settingType = 'BOOLEAN'
      else if (typeof value === 'object') settingType = 'JSON'
      else settingType = 'STRING'
    }

    // Convert value to string for storage
    let stringValue: string
    if (settingType === 'JSON') {
      stringValue = JSON.stringify(value)
    } else {
      stringValue = String(value)
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: {
        value: stringValue,
        type: settingType,
        description: description || null,
      },
      create: {
        key,
        value: stringValue,
        type: settingType,
        description: description || null,
      },
    })

    return NextResponse.json(setting)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error updating setting:', error)
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}