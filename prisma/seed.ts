import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create subscription plans
  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { slug: 'basic' },
    update: {},
    create: {
      name: 'Basic Plan',
      slug: 'basic',
      description: 'Access to basic content with limited premium articles',
      price: 9.99,
      currency: 'USD',
      durationDays: 30,
      features: ['Access to 5 premium articles per month', 'Ad-free experience', 'Email newsletters'],
      isActive: true,
    },
  })

  const premiumPlan = await prisma.subscriptionPlan.upsert({
    where: { slug: 'premium' },
    update: {},
    create: {
      name: 'Premium Plan',
      slug: 'premium',
      description: 'Full unlimited access to all premium content',
      price: 19.99,
      currency: 'USD',
      durationDays: 30,
      features: [
        'Unlimited access to all premium content',
        'Ad-free experience',
        'Exclusive newsletters',
        'Priority support',
        'Early access to features',
      ],
      isActive: true,
    },
  })

  console.log('✅ Created subscription plans')

  // Create categories
  const categories = [
    {
      name: 'أخبار محلية',
      slug: 'local-news',
      description: 'آخر الأخبار المحلية والعاجلة',
      color: '#dc2626',
      gradient: 'from-red-500 to-red-600',
      order: 1,
    },
    {
      name: 'أخبار دولية',
      slug: 'international-news',
      description: 'أخبار العالم والمناقشات الدولية',
      color: '#2563eb',
      gradient: 'from-blue-500 to-blue-600',
      order: 2,
    },
    {
      name: 'اقتصاد',
      slug: 'economy',
      description: 'آخر المستجدات الاقتصادية والأسواق المالية',
      color: '#16a34a',
      gradient: 'from-green-500 to-green-600',
      order: 3,
    },
    {
      name: 'رياضة',
      slug: 'sports',
      description: 'آخر أخبار الرياضة المحلية والدولية',
      color: '#f59e0b',
      gradient: 'from-yellow-500 to-yellow-600',
      order: 4,
    },
    {
      name: 'تكنولوجيا',
      slug: 'technology',
      description: 'أخبار التقنية والابتكار',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-purple-600',
      order: 5,
    },
    {
      name: 'ثقافة وفنون',
      slug: 'culture-arts',
      description: 'أخبار الثقافة والفنون والأدب',
      color: '#ec4899',
      gradient: 'from-pink-500 to-pink-600',
      order: 6,
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log('✅ Created categories')

  // Create admin user
  const adminHashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@alqabas.com' },
    update: {},
    create: {
      email: 'admin@alqabas.com',
      name: 'Admin User',
      password: adminHashedPassword,
      role: 'SUPERADMIN',
      emailVerified: true,
    },
  })

  console.log('✅ Created admin user')
  console.log('📧 Email: admin@alqabas.com')
  console.log('🔑 Password: admin123')

  // Create sample authors
  const authors = [
    {
      name: 'أحمد محمد',
      slug: 'ahmed-mohamed',
      title: 'مراسل أخبار محلية',
      bio: 'صحفي متخصص في الأخبار المحلية مع أكثر من 10 سنوات من الخبرة',
      email: 'ahmed@alqabas.com',
      articleCount: 0,
      isActive: true,
    },
    {
      name: 'سارة أحمد',
      slug: 'sara-ahmed',
      title: 'مراسلة اقتصادية',
      bio: 'خبيرة اقتصادية ومحللة مالية',
      email: 'sara@alqabas.com',
      articleCount: 0,
      isActive: true,
    },
    {
      name: 'محمد علي',
      slug: 'mohamed-ali',
      title: 'مراسل رياضي',
      bio: 'صحفي رياضي متخصص في كرة القدم',
      email: 'mohamed@alqabas.com',
      articleCount: 0,
      isActive: true,
    },
  ]

  for (const author of authors) {
    await prisma.author.upsert({
      where: { slug: author.slug },
      update: {},
      create: author,
    })
  }

  console.log('✅ Created sample authors')

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'القبس', type: 'STRING' as const, description: 'Site name' },
    { key: 'site_description', value: 'موقع القبس الإخباري', type: 'STRING' as const, description: 'Site description' },
    { key: 'posts_per_page', value: '12', type: 'NUMBER' as const, description: 'Number of posts per page' },
    {
      key: 'breaking_news_enabled',
      value: 'true',
      type: 'BOOLEAN' as const,
      description: 'Enable breaking news ticker',
    },
    { key: 'allow_comments', value: 'true', type: 'BOOLEAN' as const, description: 'Allow user comments' },
    { key: 'require_comment_approval', value: 'true', type: 'BOOLEAN' as const, description: 'Require admin approval for comments' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('✅ Created site settings')
  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })