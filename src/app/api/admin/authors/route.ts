import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/admin/authors - List all authors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const [authors, total] = await Promise.all([
      prisma.author.findMany({
        include: {
          _count: { select: { articles: true } },
        },
        orderBy: { name: 'asc' },
        take: limit,
        skip: offset,
      }),
      prisma.author.count(),
    ])

    return NextResponse.json({ authors, total, limit, offset })
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

// POST /api/admin/authors - Create author
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
      isActive: z.boolean().optional(),
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

// PUT /api/admin/authors - Update author
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 })
    }

    const authorUpdateSchema = z.object({
      name: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      avatar: z.string().url().optional(),
      title: z.string().min(1).optional(),
      bio: z.string().min(1).optional(),
      email: z.string().email().optional(),
      isActive: z.boolean().optional(),
    })

    const data = authorUpdateSchema.parse(updateData)

    const author = await prisma.author.update({
      where: { id },
      data,
    })

    return NextResponse.json(author)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error updating author:', error)
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 })
  }
}

// DELETE /api/admin/authors - Delete author
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 })
    }

    await prisma.author.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}