import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/media - List media files
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId') || undefined
    const mimeType = searchParams.get('mimeType') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const where: any = {}
    if (categoryId) where.categoryId = categoryId
    if (mimeType) where.mimeType = { contains: mimeType }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        include: {
          category: true,
          uploader: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.media.count({ where }),
    ])

    return NextResponse.json({ media, total, limit, offset })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

// POST /api/media - Upload media (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const mediaSchema = z.object({
      filename: z.string().min(1),
      originalName: z.string().min(1),
      mimeType: z.string().min(1),
      size: z.number().positive(),
      url: z.string().url(),
      thumbnailUrl: z.string().url().optional(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      categoryId: z.string().uuid().optional(),
      uploadedById: z.string().uuid(),
    })

    const data = mediaSchema.parse(body)
    const media = await prisma.media.create({
      data,
      include: {
        category: true,
        uploader: { select: { id: true, name: true, email: true } },
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error creating media:', error)
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 })
  }
}