import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/admin/articles - List all articles (including unpublished)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId') || undefined
    const authorId = searchParams.get('authorId') || undefined
    const status = searchParams.get('status') || 'all' // 'all', 'published', 'draft'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const where: any = {}
    if (categoryId) where.categoryId = categoryId
    if (authorId) where.authorId = authorId
    if (status === 'published') where.publishedAt = { not: null }
    else if (status === 'draft') where.publishedAt = null

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: true,
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({ articles, total, limit, offset })
  } catch (error) {
    console.error('Error fetching admin articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST /api/admin/articles - Create article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const articleSchema = z.object({
      title: z.string().min(1),
      slug: z.string().min(1),
      summary: z.string().min(1),
      content: z.string().min(1),
      excerpt: z.string().min(1),
      featuredImage: z.string().url(),
      images: z.array(z.string().url()).optional(),
      categoryId: z.string().uuid(),
      authorId: z.string().uuid(),
      breakingNews: z.boolean().optional(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      videoUrl: z.string().url().optional(),
      audioUrl: z.string().url().optional(),
      tagIds: z.array(z.string().uuid()).optional(),
      publishedAt: z.string().datetime().optional(),
    })

    const data = articleSchema.parse(body)
    
    const article = await prisma.article.create({
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        tags: data.tagIds
          ? { create: data.tagIds.map(tagId => ({ tag: { connect: { id: tagId } } })) }
          : undefined,
      },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}