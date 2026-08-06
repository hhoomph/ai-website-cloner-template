import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/breaking-news - List active breaking news
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 8

    const items = await prisma.breakingNews.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching breaking news:', error)
    return NextResponse.json({ error: 'Failed to fetch breaking news' }, { status: 500 })
  }
}