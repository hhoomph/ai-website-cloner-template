import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getArticles } from '@/lib/db/queries'
import { z } from 'zod'

// GET /api/articles - List articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filters = {
      categoryId: searchParams.get('categoryId') || undefined,
      authorId: searchParams.get('authorId') || undefined,
      breakingNews: searchParams.get('breakingNews') ? searchParams.get('breakingNews') === 'true' : undefined,
      featured: searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined,
      premium: searchParams.get('premium') ? searchParams.get('premium') === 'true' : undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
      orderBy: (searchParams.get('orderBy') as 'publishedAt' | 'views' | 'likes' | 'createdAt') || undefined,
      orderDirection: (searchParams.get('orderDirection') as 'asc' | 'desc') || undefined,
    }

    const result = await getArticles(filters)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST /api/articles - Create article (Admin only)
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
      redirectUri: z.string().optional(),
      videoUrl: z.string().url().optional(),
      audioUrl: z.string().url().optional(),
      tagIds: z.array(z.string().uuid()).optional(),
      isPublished: z.boolean().optional(),
    })

    const data = articleSchema.parse(body)
    const article = await prisma.article.create({
      data: {
        ...data,
        publishedAt: data.isPublished ? new Date() : null,
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