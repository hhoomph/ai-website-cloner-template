export interface Article {
  id: string | number
  title: string
  slug: string
  summary: string
  content: string
  excerpt: string
  featuredImage?: string
  images?: string[]
  categoryId: string | number
  category: Category
  authorId: string | number
  author: Author
  publishedAt: Date | null
  updatedAt: Date
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
  tags: string[]
  comments?: Comment[]
  createdAt: Date
}

export interface Category {
  id: string | number
  name: string
  slug: string
  description: string
  color: string
  gradient: string
  image?: string | null
  parentId?: string | null
  parent?: Category
  children?: Category[]
  order?: number
  isActive?: boolean
  articleCount?: number
  _count?: {
    articles: number
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface Author {
  id: string | number
  name: string
  slug?: string
  avatar?: string | null
  title: string
  bio: string
  email?: string
  articleCount?: number
  isActive?: boolean
  _count?: {
    articles: number
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface Tag {
  id: string | number
  name: string
  slug: string
  createdAt: Date
}

export interface ArticleTag {
  id: string | number
  articleId: string
  tagId: string
  tag: Tag
  createdAt: Date
}

// Helper type for article tag mapping
export type ArticleTagMap = {
  articleId: string
  tag: string
}

export interface Comment {
  id: string | number
  articleId: string
  userId: string
  userName: string
  user?: {
    name: string
    avatar?: string
  }
  content: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: 'reader' | 'editor' | 'admin' | 'superadmin'
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  subscription?: Subscription
  preferences?: UserPreferences
}

export interface UserPreferences {
  id: string
  userId: string
  topics: string[]
  newsletter: boolean
  notifications: boolean
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  plan: SubscriptionPlan
  status: 'active' | 'cancelled' | 'expired' | 'pending'
  startDate: Date
  endDate: Date
  autoRenew: boolean
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  durationDays: number
  features: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Media {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  alt?: string
  caption?: string
  categoryId?: string
  uploadedById: string
  createdAt: Date
}

export interface GalleryItem {
  id: number
  title: string
  image: string
  description: string
  date: string
}

export interface Podcast {
  id: number
  title: string
  description: string
  coverImage: string
  audioUrl: string
  duration: string
  date: string
  host: string
}

export interface IssueDay {
  date: string
  title: string
  pdfUrl: string
}

export interface BreakingNewsItem {
  id: string
  title: string
  articleId?: string
  link?: string
  article?: {
    title: string
    slug: string
  }
  isActive: boolean
  createdAt: Date
}

export interface SiteSettings {
  site_name?: string
  site_description?: string
  posts_per_page?: number
  breaking_news_enabled?: boolean
  allow_comments?: boolean
  require_comment_approval?: boolean
}

export interface SearchResult {
  articles: Article[]
  authors: Author[]
  categories: Category[]
  total: number
}