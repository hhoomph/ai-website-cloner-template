import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

type Params = { params: Promise<{ id: string }> }

// GET /api/admin/authors/[id] - Get single author
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const author = await prisma.author.findUnique({
      where: { id },
      include: { _count: { select: { articles: true } } },
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

// PUT /api/admin/authors/[id] - Update author
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()

    const schema = z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      avatar: z.string().url().optional().nullable(),
      title: z.string().optional(),
      bio: z.string().optional(),
      email: z.string().email().optional(),
      isActive: z.boolean().optional(),
    })

    const data = schema.parse(body)

    const author = await prisma.author.update({
      where: { id },
      data,
      include: { _count: { select: { articles: true } } },
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

// DELETE /api/admin/authors/[id] - Delete author
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    await prisma.author.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}