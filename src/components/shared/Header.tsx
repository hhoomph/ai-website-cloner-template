'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import { Category } from '@/types/alqabas'

interface HeaderProps {
  categories: Category[]
  settings: Record<string, unknown>
}

export function Header({ categories, settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const today = new Date().toLocaleDateString('ar-KW', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const siteName = typeof settings.site_name === 'string' ? settings.site_name : 'القبس'

  // Main navigation categories
  const mainNavCategories = categories.filter(c => 
    ['محليات', 'كتاب وآراء', 'أمن ومحاكم', 'اقتصاد', 'القبس الدولي', 'لايت', 'القبس الثقافي', 'رياضة'].includes(c.name)
  )

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-alqabas-dark text-white text-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center gap-4">
              <span>{today}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="flex items-center gap-1 hover:text-alqabas-blue transition-colors">
                <User size={14} />
                <span>تسجيل الدخول</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-alqabas-blue shrink-0">
              {siteName}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-1">
              {mainNavCategories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alqabas-blue hover:bg-alqabas-light transition-colors rounded"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-alqabas-light rounded-full transition-colors" aria-label="بحث">
                <Search size={20} className="text-alqabas-dark" />
              </button>
              <button
                className="lg:hidden p-2 hover:bg-alqabas-light rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-1">
                <Link href="/" className="text-alqabas-dark hover:text-alqabas-blue font-medium py-2 px-3 rounded hover:bg-alqabas-light transition-colors">
                  الرئيسية
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-alqabas-dark hover:text-alqabas-blue font-medium py-2 px-3 rounded hover:bg-alqabas-light transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-alqabas-blue text-white hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 py-2">
            {categories.slice(0, 12).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-3 py-1.5 text-sm font-medium hover:bg-white/20 transition-colors rounded"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
