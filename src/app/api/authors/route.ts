import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/authors - List authors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const [authors, total] = await Promise.all([
      prisma.author.findMany({
        where: { isActive: true },
        include: {
          _count: { select: { articles: { where: { publishedAt: { not: null } } } } },
        },
        orderBy: { name: 'asc' },
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      }),
      prisma.author.count({ where: { isActive: true } }),
    ])

    return NextResponse.json({ authors, total, limit, offset })
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

// POST /api/authors - Create author (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const authorSchema = z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      avatar: z.string().url().optional(),
      title: z.string().min(1),
      bio: z.string().min(1),
      email: z.string().email(),
    })

    const data = authorSchema.parse(body)
    const author = await prisma.author.create({
      data,
    })

    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error creating author:', error)
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
}