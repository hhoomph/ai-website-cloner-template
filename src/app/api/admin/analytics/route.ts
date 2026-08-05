import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/analytics - Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = searchParams.get('days') ? parseInt(searchParams.get('days')!) : 30

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get article stats
    const totalArticles = await prisma.article.count()
    const publishedArticles = await prisma.article.count({
      where: { publishedAt: { not: null } },
    })
    const draftArticles = totalArticles - publishedArticles

    // Get user stats
    const totalUsers = await prisma.user.count()
    const activeSubscriptions = await prisma.subscription.count({
      where: { status: 'ACTIVE' },
    })

    // Get recent articles
    const recentArticles = await prisma.article.findMany({
      where: { publishedAt: { not: null } },
      take: 5,
      orderBy: { publishedAt: 'desc' },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, color: true } },
      },
    })

    // Get most read articles
    const mostReadArticles = await prisma.article.findMany({
      where: { publishedAt: { not: null } },
      take: 5,
      orderBy: { views: 'desc' },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, color: true } },
      },
    })

    // Get recent activity
    const recentActivity = await prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    // Get analytics data
    const analytics = await prisma.analytics.findMany({
      where: {
        createdAt: { gte: startDate },
      },
      select: {
        page: true,
        visitorId: true,
        duration: true,
        bounce: true,
        createdAt: true,
      },
      take: 1000,
    })

    // Calculate stats
    const totalViews = analytics.length
    const uniqueVisitors = new Set(analytics.map(a => a.visitorId)).size
    const avgDuration = analytics.reduce((sum, a) => sum + (a.duration || 0), 0) / (totalViews || 1)
    const bounceRate = analytics.filter(a => a.bounce).length / (totalViews || 1)

    // Group views by page
    const viewsByPage = analytics.reduce((acc, a) => {
      acc[a.page] = (acc[a.page] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Group views by date
    const viewsByDate = analytics.reduce((acc, a) => {
      const date = a.createdAt.toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalUsers,
        activeSubscriptions,
        totalViews,
        uniqueVisitors,
        avgDuration: Math.round(avgDuration),
        bounceRate: Math.round(bounceRate * 100),
      },
      recentArticles,
      mostReadArticles,
      recentActivity,
      viewsByPage,
      viewsByDate,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}