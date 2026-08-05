# Implementation Plan: Al Qabas Newspaper Clone

[Overview]
Develop a full-stack web application that replicates the design, functionality, and user experience of https://www.alqabas.com, including a high-fidelity responsive frontend, scalable backend API, and secure role-based admin dashboard for content management.

This plan encompasses the complete architecture for a modern Arabic-language news platform with real-time content delivery, subscription management, and comprehensive administrative capabilities. The implementation will leverage Next.js 16 with React 19, TypeScript, and Tailwind CSS v4, following the existing project structure. The phased approach ensures incremental delivery of working software while maintaining the pixel-perfect design fidelity required for a newspaper clone.

[Types]
Extend the existing type system to support a comprehensive content platform with user management, subscriptions, and administrative functions.

**Core Content Types:**
```typescript
interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // HTML or MDX
  excerpt: string;
  featuredImage: string;
  images: string[]; // Gallery images
  categoryId: string;
  category: Category;
  authorId: string;
  author: Author;
  publishedAt: Date;
  updatedAt: Date;
  breakingNews: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  bookmark: boolean;
  views: number;
  likes: number;
  comments: Comment[];
  tags: Tag[];
  seoTitle?: string;
  seoDescription?: string;
  redirectUri?: string;
  videoUrl?: string;
  audioUrl?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  gradient: string;
  image?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  articleCount: number;
}

interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  title: string;
  bio: string;
  email: string;
  socialLinks: SocialLinks;
  articleCount: number;
  isActive: boolean;
}

interface Gallery {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  images: GalleryImage[];
  categoryId: string;
  publishedAt: Date;
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
  order: number;
}

interface Podcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: string;
  publishedAt: Date;
  host: string;
  categoryId: string;
}

interface Issue {
  id: string;
  date: string;
  issueNumber: number;
  pdfUrl: string;
  coverImage: string;
  isPremium: boolean;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'reader' | 'editor' | 'admin' | 'superadmin';
  subscription?: Subscription;
  preferences: UserPreferences;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentId?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
}

interface UserPreferences {
  topics: string[];
  newsletter: boolean;
  notifications: boolean;
}

interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

// Admin & CMS Types
interface AdminUser {
  id: string;
  userId: string;
  user: User;
  permissions: Permission[];
  lastLogin?: Date;
}

interface Permission {
  id: string;
  name: string;
  resource: 'articles' | 'categories' | 'authors' | 'media' | 'users' | 'settings';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedById: string;
  createdAt: Date;
}

interface SiteSettings {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
}

interface BreakingNews {
  id: string;
  title: string;
  articleId?: string;
  link?: string;
  isActive: boolean;
  createdAt: Date;
}
```

[Files]
Create and modify files across the project to implement the full-stack architecture with backend API, database layer, and admin functionality.

**New Files to Create:**

Database & ORM:
- `prisma/schema.prisma` - Complete database schema with all models
- `prisma/migrations/` - Database migration files (auto-generated)
- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/db/queries.ts` - Database query helpers

Backend API Routes:
- `src/app/api/articles/route.ts` - Articles CRUD API
- `src/app/api/articles/[slug]/route.ts` - Single article by slug
- `src/app/api/categories/route.ts` - Categories CRUD API
- `src/app/api/categories/[id]/route.ts` - Single category
- `src/app/api/authors/route.ts` - Authors CRUD API
- `src/app/api/auth/register/route.ts` - User registration
- `src/app/api/auth/login/route.ts` - User login
- `src/app/api/auth/logout/route.ts` - User logout
- `src/app/api/auth/session/route.ts` - Session validation
- `src/app/api/auth/subscribe/route.ts` - Subscription creation
- `src/app/api/auth/subscription/route.ts` - Subscription management
- `src/app/api/media/route.ts` - Media upload/list
- `src/app/api/search/route.ts` - Full-text search
- `src/app/api/admin/articles/route.ts` - Admin article management
- `src/app/api/admin/categories/route.ts` - Admin category management
- `src/app/api/admin/authors/route.ts` - Admin author management
- `src/app/api/admin/media/route.ts` - Admin media management
- `src/app/api/admin/users/route.ts` - Admin user management
- `src/app/api/admin/settings/route.ts` - Admin site settings
- `src/app/api/admin/analytics/route.ts` - Analytics dashboard data

Authentication & Middleware:
- `src/middleware.ts` - Route protection and auth middleware
- `src/lib/auth.ts` - NextAuth.js configuration
- `src/lib/auth-utils.ts` - Authentication utility functions
- `src/types/next-auth.d.ts` - NextAuth type extensions

Components:
- `src/components/admin/` - Admin dashboard components
  - `AdminLayout.tsx` - Admin dashboard layout
  - `Dashboard.tsx` - Analytics overview
  - `ArticleManager.tsx` - Article CRUD interface
  - `CategoryManager.tsx` - Category management
  - `MediaLibrary.tsx` - Media upload/browse
  - `UserManager.tsx` - User management
  - `SettingsPanel.tsx` - Site configuration
- `src/components/auth/` - Authentication components
  - `LoginForm.tsx` - Login form
  - `RegisterForm.tsx` - Registration form
  - `SubscriptionModal.tsx` - Premium subscription modal
  - `ProtectedContent.tsx` - Premium content wrapper
- `src/components/shared/` - Shared UI components
  - `Header.tsx` - Site header with navigation
  - `Footer.tsx` - Site footer
  - `ArticleCard.tsx` - Article display card
  - `CategoryNav.tsx` - Category navigation
  - `SearchBar.tsx` - Search functionality
  - `BreakingNewsTicker.tsx` - Breaking news banner
  - `PremiumWall.tsx` - Paywall overlay

Hooks & Utilities:
- `src/hooks/use-auth.ts` - Authentication hook
- `src/hooks/use-subscription.ts` - Subscription check hook
- `src/hooks/use-search.ts` - Search functionality hook
- `src/lib/validations.ts` - Zod validation schemas
- `src/lib/permissions.ts` - Permission checking utilities
- `src/lib/storage.ts` - File upload utilities (S3/local)

Configuration:
- `.env.example` - Environment variables template
- `docker-compose.yml` - PostgreSQL database service
- `next.config.ts` - Updated Next.js configuration
- `tailwind.config.ts` - Tailwind configuration (if needed)

Documentation:
- `docs/api.md` - API documentation
- `docs/database.md` - Database schema documentation
- `docs/admin-guide.md` - Admin dashboard user guide
- `docs/deployment.md` - Deployment instructions

**Existing Files to Modify:**
- `src/types/alqabas.ts` - Extend with new type definitions
- `src/lib/alqabas-data.ts` - Migrate to database-backed queries
- `src/app/globals.css` - Add custom CSS variables and animations
- `package.json` - Add new dependencies
- `tsconfig.json` - Update TypeScript configuration if needed
- `src/app/layout.tsx` - Update root layout with providers
- `src/app/page.tsx` - Convert to dynamic data fetching

**Files to Potentially Remove/Consolidate:**
- Static mock data files (replace with API calls)
- Unused CSS files (alqabas_css1.css, alqabas_css2.css, alqabas_css3.css)

[Functions]
Create comprehensive API endpoints, business logic functions, and data access layer supporting all platform features.

**New Functions:**

Article Functions (`src/lib/db/articles.ts`):
```typescript
export async function getArticles(filters?: ArticleFilters): Promise<Article[]>
export async function getArticleBySlug(slug: string): Promise<Article | null>
export async function getFeaturedArticles(limit?: number): Promise<Article[]>
export async function getMostReadArticles(limit?: number): Promise<Article[]>
export async function getArticlesByCategory(categoryId: string): Promise<Article[]>
export async function getArticlesByAuthor(authorId: string): Promise<Article[]>
export async function getPremiumArticles(): Promise<Article[]>
export async function createArticle(data: CreateArticleData): Promise<Article>
export async function updateArticle(id: string, data: UpdateArticleData): Promise<Article>
export async function deleteArticle(id: string): Promise<void>
export async function searchArticles(query: string): Promise<Article[]>
export async function incrementViews(id: string): Promise<void>
```

Category Functions (`src/lib/db/categories.ts`):
```typescript
export async function getCategories(): Promise<Category[]>
export async function getCategoryBySlug(slug: string): Promise<Category | null>
export async function getCategoryById(id: string): Promise<Category | null>
export async function createCategory(data: CreateCategoryData): Promise<Category>
export async function updateCategory(id: string, data: UpdateCategoryData): Promise<Category>
export async function deleteCategory(id: string): Promise<void>
export async function reorderCategories(orders: { id: string; order: number }[]): Promise<void>
```

Author Functions (`src/lib/db/authors.ts`):
```typescript
export async function getAuthors(): Promise<Author[]>
export async function getAuthorBySlug(slug: string): Promise<Author | null>
export async function getAuthorById(id: string): Promise<Author | null>
export async function createAuthor(data: CreateAuthorData): Promise<Author>
export async function updateAuthor(id: string, data: UpdateAuthorData): Promise<Author>
export async function deleteAuthor(id: string): Promise<void>
```

User & Subscription Functions (`src/lib/db/users.ts`):
```typescript
export async function createUser(data: CreateUserData): Promise<User>
export async function getUserByEmail(email: string): Promise<User | null>
export async function getUserById(id: string): Promise<User | null>
export async function updateUser(id: string, data: UpdateUserData): Promise<User>
export async function createSubscription(userId: string, planId: string): Promise<Subscription>
export async function cancelSubscription(userId: string): Promise<void>
export async function getActiveSubscription(userId: string): Promise<Subscription | null>
export async function hasPremiumAccess(userId: string): Promise<boolean>
```

Media Functions (`src/lib/db/media.ts`):
```typescript
export async function uploadMedia(file: File, userId: string): Promise<Media>
export async function getMediaFiles(filters?: MediaFilters): Promise<Media[]>
export async function getMediaById(id: string): Promise<Media | null>
export async function deleteMedia(id: string): Promise<void>
export async function getMediaByUrl(url: string): Promise<Media | null>
```

Authentication Functions (`src/lib/auth.ts`):
```typescript
export async function hashPassword(password: string): Promise<string>
export async function verifyPassword(password: string, hash: string): Promise<boolean>
export async function createSession(userId: string): Promise<string>
export async function getSession(sessionId: string): Promise<User | null>
export async function deleteSession(sessionId: string): Promise<void>
export async function refreshSession(sessionId: string): Promise<string | null>
```

Permission Functions (`src/lib/permissions.ts`):
```typescript
export async function checkPermission(
  userId: string,
  resource: string,
  action: string
): Promise<boolean>
export async function getUserPermissions(userId: string): Promise<Permission[]>
export async function hasRole(userId: string, role: UserRole): Promise<boolean>
```

Search Functions (`src/lib/search.ts`):
```typescript
export async function searchContent(query: string, types?: SearchType[]): Promise<SearchResult[]>
export async function getSearchSuggestions(query: string): Promise<string[]>
export async function indexArticle(article: Article): Promise<void>
export async function removeFromIndex(articleId: string): Promise<void>
```

Admin Functions (`src/lib/admin.ts`):
```typescript
export async function getDashboardStats(): Promise<DashboardStats>
export async function getRecentActivity(limit?: number): Promise<Activity[]>
export async function getSystemSettings(): Promise<SiteSettings[]>
export async function updateSystemSetting(key: string, value: any): Promise<void>
export async function getAnalyticsData(dateRange: DateRange): Promise<AnalyticsData>
```

**Modified Functions:**
- `getFeaturedArticles()` - Fetch from database with caching
- `getMostReadArticles()` - Query database with sorting
- `getArticlesByCategory()` - Database query with pagination
- `getArticle()` - Fetch single article with relations
- `searchArticles()` - Implement full-text search

[Classes]
Implement minimal class-based structures for complex business logic and service layers.

**New Classes:**

ArticleService (`src/lib/services/article.service.ts`):
```typescript
export class ArticleService {
  async publishArticle(id: string): Promise<Article>
  async unpublishArticle(id: string): Promise<Article>
  async scheduleArticle(id: string, publishAt: Date): Promise<Article>
  async duplicateArticle(id: string): Promise<Article>
  async getRelatedArticles(articleId: string, limit?: number): Promise<Article[]>
  async incrementEngagement(id: string, type: 'views' | 'likes' | 'comments'): Promise<void>
  async exportArticles(format: 'json' | 'csv' | 'xml'): Promise<string>
}
```

MediaService (`src/lib/services/media.service.ts`):
```typescript
export class MediaService {
  async uploadFile(file: File, folder?: string): Promise<Media>
  async processImage(mediaId: string, sizes: ImageSize[]): Promise<Media[]>
  async generateThumbnails(mediaId: string): Promise<void>
  async optimizeImage(mediaId: string): Promise<Media>
  async deleteFile(mediaId: string): Promise<void>
  async getOptimizedUrl(mediaId: string, size: ImageSize): Promise<string>
}
```

NotificationService (`src/lib/services/notification.service.ts`):
```typescript
export class NotificationService {
  async sendBreakingNewsAlert(articleId: string): Promise<void>
  async sendNewsletter(subscriberIds: string[], articleId: string): Promise<void>
  async notifyAuthorOnPublication(authorId: string, articleId: string): Promise<void>
  async sendSubscriptionConfirmation(userId: string): Promise<void>
}
```

CacheService (`src/lib/services/cache.service.ts`):
```typescript
export class CacheService {
  async get<T>(key: string): Promise<T | null>
  async set<T>(key: string, value: T, ttl?: number): Promise<void>
  async delete(key: string): Promise<void>
  async clear(pattern?: string): Promise<void>
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T>
}
```

[Dependencies]
Add essential packages for database, authentication, file uploads, and admin functionality while maintaining the existing tech stack.

**New Dependencies:**

Database & ORM:
- `prisma` - Database ORM and migration tool
- `@prisma/client` - Generated Prisma client
- `postgresql` (via Docker) - Primary database

Authentication:
- `next-auth` - Authentication framework
- `bcryptjs` - Password hashing (or use NextAuth built-in)
- `jsonwebtoken` - JWT token handling

File Upload & Storage:
- `@aws-sdk/client-s3` - S3 client for file uploads (or use local storage)
- `multer` - Multipart form data handling
- `sharp` - Image processing and optimization

Validation & Utilities:
- `zod` - Schema validation
- `date-fns` - Date manipulation
- `nanoid` - ID generation

Admin & UI:
- `@tanstack/react-table` - Advanced tables for admin
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `react-dropzone` - File upload UI

Search (Optional - Phase 2):
- `@tanstack/react-query` - Server state management
- `meilisearch` or `typesense` - Full-text search engine
- `@microsoft/fetch-event-source` - Server-sent events

**Updated Dependencies:**
- Keep existing: `next`, `react`, `react-dom`, `shadcn/ui`, `tailwindcss`, `lucide-react`
- Add: `prisma`, `next-auth`, `zod`, `bcryptjs`, `sharp`, `@aws-sdk/client-s3`

package.json additions:
```json
{
  "dependencies": {
    "prisma": "^6.0.0",
    "@prisma/client": "^6.0.0",
    "next-auth": "^4.24.0",
    "zod": "^3.23.0",
    "bcryptjs": "^2.4.3",
    "sharp": "^0.33.0",
    "@aws-sdk/client-s3": "^3.600.0",
    "date-fns": "^3.6.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6"
  }
}
```

[Testing]
Comprehensive testing strategy covering unit tests, integration tests, and E2E tests with minimum 85% coverage.

**Test Structure:**

Unit Tests (`src/__tests__/unit/`):
- `lib/db/articles.test.ts` - Article database operations
- `lib/db/categories.test.ts` - Category operations
- `lib/auth.test.ts` - Authentication utilities
- `lib/permissions.test.ts` - Permission checking
- `lib/search.test.ts` - Search functionality
- `lib/validations.test.ts` - Validation schemas

Integration Tests (`src/__tests__/integration/`):
- `api/articles.test.ts` - Article API endpoints
- `api/auth.test.ts` - Authentication flow
- `api/categories.test.ts` - Category API
- `api/admin/dashboard.test.ts` - Admin dashboard access

Component Tests (`src/__tests__/components/`):
- `components/auth/LoginForm.test.tsx` - Login form
- `components/admin/ArticleManager.test.tsx` - Article management
- `components/shared/ArticleCard.test.tsx` - Article card display

E2E Tests (`src/__tests__/e2e/`):
- `auth-flow.test.ts` - Complete registration/login/subscribe flow
- `article-creation.test.ts` - Admin creates and publishes article
- `premium-access.test.ts` - Premium content access control

**Testing Setup:**
- `jest.config.ts` - Jest configuration
- `src/test-setup.ts` - Test utilities and mocks
- `src/__tests__/fixtures/` - Test data fixtures

**Coverage Requirements:**
- Minimum 85% line coverage for all business logic
- 100% coverage for authentication and authorization
- All critical paths tested (publishing, subscription, admin operations)

[Implementation Order]
Structured 8-phase implementation sequence ensuring incremental delivery and risk mitigation.

**Phase 1: Foundation & Infrastructure (Weeks 1-2)**
1. Set up PostgreSQL database with Docker Compose
2. Initialize Prisma ORM with complete schema
3. Configure environment variables and secrets management
4. Set up NextAuth.js with credentials provider
5. Implement authentication middleware
6. Create database seeding scripts for demo data
7. Set up testing infrastructure (Jest, React Testing Library)

**Phase 2: Core Backend API (Weeks 3-4)**
1. Implement articles CRUD API endpoints
2. Implement categories CRUD API endpoints
3. Implement authors CRUD API endpoints
4. Add input validation with Zod schemas
5. Implement error handling and logging
6. Add API rate limiting and security headers
7. Write comprehensive API tests

**Phase 3: Frontend Core Components (Weeks 5-6)**
1. Build responsive Header component with navigation
2. Build Footer component
3. Create ArticleCard component with variants
4. Implement Category navigation with dropdowns
5. Build BreakingNewsTicker component
6. Create responsive grid layouts for articles
7. Implement dark/light mode toggle
8. Convert homepage to dynamic data fetching

**Phase 4: User Authentication & Subscription (Weeks 7-8)**
1. Build Login and Registration forms
2. Implement OAuth providers (Google, Apple)
3. Create subscription modal and plans page
4. Implement PremiumWall component
5. Add ProtectedContent wrapper
6. Build user profile page
7. Implement subscription management
8. Add email verification flow

**Phase 5: Admin Dashboard (Weeks 9-10)**
1. Create AdminLayout with sidebar navigation
2. Build Dashboard overview with analytics widgets
3. Implement ArticleManager with rich text editor
4. Build CategoryManager for taxonomy
5. Create MediaLibrary with upload functionality
6. Implement UserManager for subscriber management
7. Add SettingsPanel for site configuration
8. Implement role-based access control

**Phase 6: Enhanced Content Features (Weeks 11-12)**
1. Implement full-text search with filtering
2. Build advanced search results page
3. Add article bookmarking functionality
4. Implement comment system (pending/admin approval)
5. Create Gallery component with lightbox
6. Build Podcast listing and player
7. Implement "Today's Issue" PDF viewer
8. Add social sharing buttons

**Phase 7: Polish & Performance (Weeks 13-14)**
1. Optimize images with Next.js Image component
2. Implement infinite scroll and pagination
3. Add loading skeletons and error boundaries
4. Optimize bundle size and code splitting
5. Implement caching strategy (Redis/Upstash)
6. Add analytics tracking (Plausible/GA)
7. Improve SEO with meta tags and structured data
8. Add RSS feed generation

**Phase 8: Testing, Documentation & Deployment (Week 15)**
1. Achieve 85%+ test coverage across all modules
2. Write comprehensive API documentation
3. Create admin dashboard user guide
4. Write deployment documentation
5. Set up CI/CD pipeline (GitHub Actions)
6. Configure production environment (Vercel + PostgreSQL)
7. Perform security audit and penetration testing
8. Deploy to production and monitor