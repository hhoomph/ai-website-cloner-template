export interface Article {
  id: number;
  title: string;
  summary: string;
  content?: string;
  image: string;
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  authorId?: number;
  authorName?: string;
  publishedAt: string;
  hasVideo?: boolean;
  videoUrl?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  views?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  gradient: string;
  description: string;
  articleCount?: number;
}

export interface Author {
  id: number;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  articleCount: number;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
}

export interface Podcast {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: string;
  date: string;
  host: string;
}

export interface IssueDay {
  date: string;
  title: string;
  pdfUrl: string;
}