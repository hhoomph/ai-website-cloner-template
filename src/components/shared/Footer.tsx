import Link from 'next/link'
import { MessageCircle, Camera, Users, Briefcase, Mail, Phone, MapPin } from 'lucide-react'

interface FooterProps {
  settings: Record<string, unknown>
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const siteName = typeof settings.site_name === 'string' ? settings.site_name : 'القبس'
  const siteDescription = typeof settings.site_description === 'string' ? settings.site_description : 'موقع القبس الإخباري - آخر الأخبار المحلية والعالمية'

  return (
    <footer className="bg-alqabas-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-3 block">
              {siteName}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">عن القبس</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  عن القبس
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  الاشتراكات
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">الأقسام</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/local" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  محليات
                </Link>
              </li>
              <li>
                <Link href="/category/economy" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  اقتصاد
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  رياضة
                </Link>
              </li>
              <li>
                <Link href="/category/international" className="text-gray-400 hover:text-alqabas-blue transition-colors text-sm">
                  القبس الدولي
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0 text-alqabas-blue" />
                <span className="text-gray-400 text-sm">الكويت، الشرق الأوسط</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-alqabas-blue" />
                <span className="text-gray-400 text-sm" dir="ltr">+965 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-alqabas-blue" />
                <span className="text-gray-400 text-sm">info@alqabas.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-500">
              © {currentYear} {siteName}. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-alqabas-blue transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-alqabas-blue transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}