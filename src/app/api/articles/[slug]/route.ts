import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { incrementArticleViews } from '@/lib/db/queries'
import { z } from 'zod'

// GET /api/articles/[slug] - Get single article by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
        comments: {
          where: { status: 'APPROVED' },
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Increment view count asynchronously
    if (article.publishedAt) {
      incrementArticleViews(article.id).catch(console.error)
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

// PUT /api/articles/[slug] - Update article (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    
    const updateSchema = {
      title: z.string().min(1).optional(),
      summary: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      excerpt: z.string().min(1).optional(),
      featuredImage: z.string().url().optional(),
      images: z.array(z.string().url()).optional(),
      categoryId: z.string().uuid().optional(),
      authorId: z.string().uuid().optional(),
      breakingNews: z.boolean().optional(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      videoUrl: z.string().url().optional(),
      audioUrl: z.string().url().optional(),
      tagIds: z.array(z.string().uuid()).optional(),
    }

    const updateSchemaObj = z.object(updateSchema)
    const data = updateSchemaObj.parse(body)

    const article = await prisma.article.update({
      where: { slug },
      data: {
        ...data,
        tags: data.tagIds
          ? {
              deleteMany: {},
              create: data.tagIds.map(tagId => ({
                tag: { connect: { id: tagId } }
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE /api/articles/[slug] - Delete article (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await prisma.article.delete({
      where: { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}