import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { articles: { where: { publishedAt: { not: null } } } } },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const categorySchema = z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().min(1),
      color: z.string().min(1),
      gradient: z.string().min(1),
      image: z.string().url().optional(),
      parentId: z.string().uuid().optional(),
      order: z.number().optional(),
    })

    const data = categorySchema.parse(body)
    const category = await prisma.category.create({
      data,
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}