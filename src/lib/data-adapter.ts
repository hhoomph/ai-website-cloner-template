import { Article, Category, Author, BreakingNewsItem } from '@/types/alqabas'
import {
  getFeaturedArticles as getMockFeatured,
  getRecentArticles as getMockRecent,
  getBreakingNews as getMockBreaking,
  getMostReadArticles as getMockMostRead,
  getArticlesByCategory as getMockByCategory,
  getArticlesByAuthor as getMockByAuthor,
  getArticle as getMockArticle,
  getCategory as getMockCategory,
  getAuthor as getMockAuthor,
  searchArticles as getMockSearch,
  categories as mockCategories,
  authors as mockAuthors,
} from '@/lib/alqabas-data'

// ===================== TYPE MAPPERS =====================

interface PrismaCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  gradient: string
  image?: string | null
  parentId?: string | null
  order?: number
  isActive?: boolean
  articleCount?: number
  _count?: { articles: number }
  createdAt?: string
  updatedAt?: string
}

interface PrismaAuthor {
  id: string
  name: string
  slug: string
  avatar?: string | null
  title: string
  bio: string
  email?: string
  articleCount?: number
  isActive?: boolean
  _count?: { articles: number }
  createdAt?: string
  updatedAt?: string
}

interface PrismaArticle {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  excerpt: string
  featuredImage: string
  images?: string[]
  categoryId: string
  category: PrismaCategory
  authorId: string
  author: PrismaAuthor
  publishedAt?: string | null
  updatedAt: string
  breakingNews: boolean
  isPremium: boolean
  isFeatured: boolean
  views: number
  likes: number
  seoTitle?: string | null
  seoDescription?: string | null
  redirectUri?: string | null
  videoUrl?: string | null
  audioUrl?: string | null
  tags?: { tag: { id: string; name: string; slug: string } }[]
  createdAt: string
}

interface PrismaBreakingNews {
  id: string
  title: string
  articleId?: string | null
  link?: string | null
  isActive: boolean
  createdAt: string
}

// ===================== MAPPING FUNCTIONS =====================

export function mapCategory(cat: PrismaCategory): Category {
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    color: cat.color,
    gradient: cat.gradient,
    image: cat.image || null,
    parentId: cat.parentId || null,
    order: cat.order,
    isActive: cat.isActive,
    articleCount: cat.articleCount ?? cat._count?.articles ?? 0,
    _count: cat._count,
    createdAt: cat.createdAt ? new Date(cat.createdAt) : undefined,
    updatedAt: cat.updatedAt ? new Date(cat.updatedAt) : undefined,
  }
}

export function mapAuthor(auth: PrismaAuthor): Author {
  return {
    id: auth.id,
    name: auth.name,
    slug: auth.slug,
    avatar: auth.avatar || null,
    title: auth.title,
    bio: auth.bio,
    email: auth.email,
    articleCount: auth.articleCount ?? auth._count?.articles ?? 0,
    isActive: auth.isActive,
    _count: auth._count,
    createdAt: auth.createdAt ? new Date(auth.createdAt) : undefined,
    updatedAt: auth.updatedAt ? new Date(auth.updatedAt) : undefined,
  }
}

export function mapArticle(art: PrismaArticle): Article {
  return {
    id: art.id,
    title: art.title,
    slug: art.slug,
    summary: art.summary,
    content: art.content,
    excerpt: art.excerpt,
    featuredImage: art.featuredImage,
    images: art.images || [],
    categoryId: art.categoryId,
    category: mapCategory(art.category),
    authorId: art.authorId,
    author: mapAuthor(art.author),
    publishedAt: art.publishedAt ? new Date(art.publishedAt) : null,
    updatedAt: new Date(art.updatedAt),
    breakingNews: art.breakingNews,
    isPremium: art.isPremium,
    isFeatured: art.isFeatured,
    views: art.views,
    likes: art.likes,
    seoTitle: art.seoTitle || null,
    seoDescription: art.seoDescription || null,
    redirectUri: art.redirectUri || null,
    videoUrl: art.videoUrl || null,
    audioUrl: art.audioUrl || null,
    tags: (art.tags || []).map(t => t.tag.name),
    createdAt: new Date(art.createdAt),
  }
}

export function mapBreakingNews(item: PrismaBreakingNews): BreakingNewsItem {
  return {
    id: item.id,
    title: item.title,
    articleId: item.articleId || undefined,
    link: item.link || undefined,
    isActive: item.isActive,
    createdAt: new Date(item.createdAt),
  }
}

// ===================== API FETCH HELPERS =====================

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

// ===================== PUBLIC DATA FUNCTIONS =====================

export async function getFeaturedArticles(limit = 6): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/articles?featured=true&limit=${limit}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockFeatured().slice(0, limit)
}

export async function getRecentArticles(limit = 12): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/articles?limit=${limit}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockRecent(limit)
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  const data = await fetchJson<PrismaBreakingNews[]>(`/api/breaking-news`)
  if (data?.length) {
    return data.map(mapBreakingNews)
  }
  return getMockBreaking()
}

export async function getMostReadArticles(limit = 5): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/articles?orderBy=views&limit=${limit}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockMostRead(limit)
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<PrismaCategory[]>(`/api/categories`)
  if (data?.length) {
    return data.map(mapCategory)
  }
  return mockCategories
}

export async function getAuthors(): Promise<Author[]> {
  const data = await fetchJson<{ authors: PrismaAuthor[] }>(`/api/authors`)
  if (data?.authors?.length) {
    return data.authors.map(mapAuthor)
  }
  return mockAuthors
}

export async function getArticlesByCategory(categoryId: string | number): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/articles?categoryId=${categoryId}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockByCategory(Number(categoryId))
}

export async function getArticlesByAuthor(authorId: string | number): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/articles?authorId=${authorId}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockByAuthor(Number(authorId))
}

export async function getArticle(idOrSlug: string | number): Promise<Article | undefined> {
  // Try by slug first (API uses slug)
  const slugData = await fetchJson<PrismaArticle>(`/api/articles/${idOrSlug}`)
  if (slugData) {
    return mapArticle(slugData)
  }
  // Fall back to mock
  return getMockArticle(idOrSlug)
}

export async function getCategory(id: string | number): Promise<Category | undefined> {
  const data = await fetchJson<PrismaCategory>(`/api/categories/${id}`)
  if (data) {
    return mapCategory(data)
  }
  return getMockCategory(Number(id))
}

export async function getAuthor(id: string | number): Promise<Author | undefined> {
  const data = await fetchJson<PrismaAuthor>(`/api/authors/${id}`)
  if (data) {
    return mapAuthor(data)
  }
  return getMockAuthor(Number(id))
}

export async function searchArticles(query: string): Promise<Article[]> {
  const data = await fetchJson<{ articles: PrismaArticle[] }>(
    `/api/search?q=${encodeURIComponent(query)}`
  )
  if (data?.articles?.length) {
    return data.articles.map(mapArticle)
  }
  return getMockSearch(query)
}
