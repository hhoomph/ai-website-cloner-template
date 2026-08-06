import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateAuthorSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  avatar: z.string().url().optional().nullable(),
  title: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
})

// GET /api/authors/[id] - Get single author
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        _count: { select: { articles: { where: { publishedAt: { not: null } } } } },
      },
    })

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    return NextResponse.json(author)
  } catch (error) {
    console.error('Error fetching author:', error)
    return NextResponse.json({ error: 'Failed to fetch author' }, { status: 500 })
  }
}

// PUT /api/authors/[id] - Update author (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = updateAuthorSchema.parse(body)

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

// DELETE /api/authors/[id] - Delete author (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.author.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}