import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all' // 'all', 'articles', 'authors', 'categories'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ error: 'Search query must be at least 2 characters' }, { status: 400 })
    }

    const searchTerm = query.trim()
    const results: any = {
      articles: [],
      authors: [],
      categories: [],
      total: 0,
    }

    // Search articles
    if (type === 'all' || type === 'articles') {
      const articles = await prisma.article.findMany({
        where: {
          AND: [
            { publishedAt: { not: null } },
            {
              OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { summary: { contains: searchTerm, mode: 'insensitive' } },
                { content: { contains: searchTerm, mode: 'insensitive' } },
              ],
            },
          ],
        },
        include: {
          category: true,
          author: true,
        },
        take: limit,
        orderBy: { publishedAt: 'desc' },
      })
      results.articles = articles
    }

    // Search authors
    if (type === 'all' || type === 'authors') {
      const authors = await prisma.author.findMany({
        where: {
          AND: [
            { isActive: true },
            {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { bio: { contains: searchTerm, mode: 'insensitive' } },
                { title: { contains: searchTerm, mode: 'insensitive' } },
              ],
            },
          ],
        },
        take: type === 'authors' ? limit : 5,
        orderBy: { name: 'asc' },
      })
      results.authors = authors
    }

    // Search categories
    if (type === 'all' || type === 'categories') {
      const categories = await prisma.category.findMany({
        where: {
          AND: [
            { isActive: true },
            {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
              ],
            },
          ],
        },
        take: type === 'categories' ? limit : 5,
        orderBy: { order: 'asc' },
      })
      results.categories = categories
    }

    results.total = results.articles.length + results.authors.length + results.categories.length

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 })
  }
}