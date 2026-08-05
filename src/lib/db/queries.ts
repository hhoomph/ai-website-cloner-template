import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type ArticleFilters = {
  categoryId?: string
  authorId?: string
  breakingNews?: boolean
  featured?: boolean
  premium?: boolean
  search?: string
  limit?: number
  offset?: number
  orderBy?: 'publishedAt' | 'views' | 'likes' | 'createdAt'
  orderDirection?: 'asc' | 'desc'
}

export type MediaFilters = {
  categoryId?: string
  mimeType?: string
  limit?: number
  offset?: number
}

export async function getArticles(filters: ArticleFilters = {}) {
  const {
    categoryId,
    authorId,
    breakingNews,
    featured,
    premium,
    search,
    limit = 12,
    offset = 0,
    orderBy = 'publishedAt',
    orderDirection = 'desc',
  } = filters

  const where: Prisma.ArticleWhereInput = {
    publishedAt: { not: null },
    ...(categoryId && { categoryId }),
    ...(authorId && { authorId }),
    ...(breakingNews !== undefined && { breakingNews }),
    ...(featured !== undefined && { isFeatured: featured }),
    ...(premium !== undefined && { isPremium: premium }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    }),
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
        comments: { where: { status: 'APPROVED' } },
      },
      take: limit,
      skip: offset,
      orderBy: { [orderBy]: orderDirection },
    }),
    prisma.article.count({ where }),
  ])

  return {
    articles,
    total,
    pages: Math.ceil(total / limit),
  }
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
      comments: { where: { status: 'APPROVED' }, include: { user: { select: { name: true, avatar: true } } } },
    },
  })
}

export async function getFeaturedArticles(limit = 6) {
  return prisma.article.findMany({
    where: { isFeatured: true, publishedAt: { not: null } },
    include: { category: true, author: true, tags: { include: { tag: true } } },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  })
}

export async function getMostReadArticles(limit = 10) {
  return prisma.article.findMany({
    where: { publishedAt: { not: null } },
    include: { category: true, author: true },
    take: limit,
    orderBy: { views: 'desc' },
  })
}

export async function getBreakingNews() {
  return prisma.breakingNews.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { articles: { where: { publishedAt: { not: null } } } } } },
    orderBy: { order: 'asc' },
  })
}

export async function getAuthors() {
  return prisma.author.findMany({
    where: { isActive: true },
    include: { _count: { select: { articles: { where: { publishedAt: { not: null } } } } } },
    orderBy: { name: 'asc' },
  })
}

export async function incrementArticleViews(articleId: string) {
  return prisma.article.update({
    where: { id: articleId },
    data: { views: { increment: 1 } },
  })
}

export async function getLatestIssues(limit = 5) {
  return prisma.issue.findMany({
    take: limit,
    orderBy: { date: 'desc' },
  })
}

export async function getPodcasts(limit = 10) {
  return prisma.podcast.findMany({
    include: { category: true },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  })
}

export async function getGalleries(limit = 10) {
  return prisma.gallery.findMany({
    include: { category: true, images: { orderBy: { order: 'asc' } } },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  })
}

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany()
  return settings.reduce((acc, setting) => {
    let value: any = setting.value
    if (setting.type === 'NUMBER') value = Number(value)
    else if (setting.type === 'BOOLEAN') value = value === 'true'
    else if (setting.type === 'JSON')
      try {
        value = JSON.parse(setting.value)
      } catch {
        value = setting.value
      }
    acc[setting.key] = value
    return acc
  }, {} as Record<string, any>)
}
