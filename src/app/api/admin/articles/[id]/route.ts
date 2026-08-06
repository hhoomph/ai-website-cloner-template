import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

type Params = { params: Promise<{ id: string }> }

// GET /api/admin/articles/[id] - Get single article
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

// PUT /api/admin/articles/[id] - Update article
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
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
      seoTitle: z.string().optional().nullable(),
      seoDescription: z.string().optional().nullable(),
      videoUrl: z.string().url().optional().nullable(),
      audioUrl: z.string().url().optional().nullable(),
      tagIds: z.array(z.string().uuid()).optional(),
      publishedAt: z.string().datetime().optional().nullable(),
    })

    const data = articleSchema.parse(body)

    const article = await prisma.$transaction(async (tx) => {
      // Delete existing tag relations
      await tx.articleTag.deleteMany({ where: { articleId: id } })

      return tx.article.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          content: data.content,
          excerpt: data.excerpt,
          featuredImage: data.featuredImage,
          images: data.images || [],
          categoryId: data.categoryId,
          authorId: data.authorId,
          breakingNews: data.breakingNews || false,
          isPremium: data.isPremium || false,
          isFeatured: data.isFeatured || false,
          seoTitle: data.seoTitle ?? null,
          seoDescription: data.seoDescription ?? null,
          videoUrl: data.videoUrl ?? null,
          audioUrl: data.audioUrl ?? null,
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

// DELETE /api/admin/articles/[id] - Delete article
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    await prisma.article.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}