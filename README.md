# Al Qabas Newspaper Clone

A full-stack Arabic-language news platform built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Prisma, and NextAuth.js.

## Features

### Core Features
- 📰 **Article Management** - Full CRUD operations for articles with rich content support
- 📱 **Responsive Design** - Mobile-first design with RTL support for Arabic content
- 🔐 **Authentication** - NextAuth.js with credentials, Google OAuth, and Apple providers
- 👥 **Role-Based Access Control** - ADMIN, EDITOR, and READER roles
- 💳 **Subscription System** - Premium content access with subscription plans
- 🔍 **Search** - Full-text search across articles, authors, and categories
- 📊 **Admin Dashboard** - Complete CMS for content management
- 🖼️ **Media Management** - Image and file upload system
- 📈 **Analytics** - Page views, visitor tracking, and engagement metrics
- 🌙 **Dark Mode Ready** - Theme system with custom Al Qabas branding

### Technical Features
- **Next.js 16** with App Router and React Server Components
- **Prisma ORM** with PostgreSQL database
- **TypeScript** strict mode with comprehensive type safety
- **Zod Validation** for all API inputs
- **NextAuth.js** for secure authentication
- **Tailwind CSS v4** with custom theme configuration
- **RTL Support** for Arabic language
- **SEO Optimized** with meta tags and structured data

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod resolvers
- **Tables**: TanStack React Table
- **File Upload**: React Dropzone

### Backend
- **Runtime**: Node.js 24+
- **ORM**: Prisma 6
- **Authentication**: NextAuth.js 4
- **Validation**: Zod 3
- **Password Hashing**: bcryptjs
- **Image Processing**: Sharp
- **File Storage**: AWS SDK S3 (optional)

### Database
- **Primary Database**: PostgreSQL 16
- **Cache**: Redis (optional)

## Getting Started

### Prerequisites

- Node.js >= 24
- PostgreSQL 16+ (or Docker)
- npm or yarn or pnpm or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/alqabas-clone.git
cd alqabas-clone
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth (min 32 chars)
- `NEXTAUTH_URL` - Your app URL
- Optional: OAuth providers, email server, S3 credentials

4. **Start PostgreSQL database**

Option A: Using Docker (recommended)
```bash
docker-compose up -d postgres
```

Option B: Using local PostgreSQL
```bash
# Make sure PostgreSQL is running and create database:
createdb alqabas_db
```

5. **Initialize database**
```bash
# Generate Prisma client
bun run prisma:generate

# Run migrations
bun run prisma:migrate

# Seed database with initial data
bun run prisma:seed
```

6. **Start development server**
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── articles/           # Articles CRUD
│   │   ├── categories/         # Categories CRUD
│   │   ├── authors/            # Authors CRUD
│   │   ├── auth/               # Authentication routes
│   │   ├── admin/              # Admin API routes
│   │   ├── search/             # Search endpoint
│   │   └── media/              # Media management
│   ├── _components/            # Shared client components
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── shared/                 # Shared UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ArticleCard.tsx
│   ├── admin/                  # Admin dashboard components
│   └── auth/                   # Authentication components
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # NextAuth configuration
│   ├── db/
│   │   └── queries.ts          # Database query functions
│   └── utils.ts                # Utility functions
├── types/
│   ├── alqabas.ts              # TypeScript interfaces
│   └── next-auth.d.ts          # NextAuth type extensions
└── middleware.ts               # Route middleware

prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # Database seed script

public/
├── images/                     # Image assets
├── videos/                     # Video assets
└── seo/                        # SEO assets
```

## API Endpoints

### Public Endpoints
- `GET /api/articles` - List articles
- `GET /api/articles/[slug]` - Get article by slug
- `GET /api/categories` - List categories
- `GET /api/categories/[id]` - Get category by ID
- `GET /api/authors` - List authors
- `GET /api/search` - Search content
- `GET /api/media` - List media files
- `GET /api/subscription-plans` - List subscription plans
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/subscription` - Create subscription

### Admin Endpoints (require ADMIN or SUPERADMIN role)
- `GET /api/admin/articles` - List all articles (including drafts)
- `POST /api/admin/articles` - Create article
- `PUT /api/admin/articles/[slug]` - Update article
- `DELETE /api/admin/articles/[slug]` - Delete article
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `GET /api/admin/authors` - List all authors
- `POST /api/admin/authors` - Create author
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `GET /api/admin/media` - List all media
- `POST /api/admin/media` - Upload media
- `GET /api/admin/settings` - Get site settings
- `PUT /api/admin/settings` - Update settings
- `GET /api/admin/analytics` - Get dashboard analytics

## Scripts

```bash
# Development
bun run dev              # Start development server

# Building
bun run build            # Build for production
bun run start            # Start production server

# Code Quality
bun run lint             # Run ESLint
bun run typecheck        # Run TypeScript check
bun run check            # Run lint + typecheck + build

# Database
bun run prisma:generate  # Generate Prisma client
bun run prisma:migrate   # Run database migrations
bun run prisma:seed      # Seed database
bun run prisma:studio    # Open Prisma Studio
```

## Database Schema

The application uses a comprehensive database schema with the following main models:

- **User** - User accounts with roles and preferences
- **Article** - News articles with rich content
- **Category** - Article categories with hierarchy support
- **Author** - Article authors
- **Tag** - Article tags
- **Comment** - User comments on articles
- **Subscription** - User subscriptions
- **SubscriptionPlan** - Available subscription plans
- **Media** - Uploaded media files
- **Gallery** - Image galleries
- **Podcast** - Podcast episodes
- **Issue** - Newspaper issues (PDF)
- **BreakingNews** - Breaking news ticker items
- **SiteSettings** - Configurable site settings
- **Analytics** - Visitor analytics data
- **Activity** - User activity log

## Authentication & Authorization

### User Roles
- **READER** - Can read articles, manage profile
- **EDITOR** - Can create and edit articles
- **ADMIN** - Full access to admin dashboard
- **SUPERADMIN** - Complete system access

### Authentication Methods
- Email/Password (credentials)
- Google OAuth
- Apple OAuth

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker
```bash
# Build image
docker build -t alqabas-app .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  alqabas-app
```

### Manual Deployment
```bash
# Build the application
bun run build

# Start production server
bun run start
```

## Environment Variables

See `.env.example` for all available configuration options.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email info@alqabas.com or create an issue in the repository.

## Roadmap

- [ ] Implement advanced search with filters
- [ ] Add comment system with moderation
- [ ] Build admin dashboard UI
- [ ] Implement image gallery with lightbox
- [ ] Add podcast player
- [ ] Implement newsletter system
- [ ] Add social sharing buttons
- [ ] Implement RSS feeds
- [ ] Add multi-language support
- [ ] Implement push notifications

## Acknowledgments

- Design inspired by [Al Qabas](https://www.alqabas.com)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)