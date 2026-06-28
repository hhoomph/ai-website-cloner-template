import { TwitterIcon, WhatsAppIcon, TelegramIcon, InstagramIcon, FacebookIcon, YoutubeIcon, SnapchatIcon, TikTokIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-[#262626] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Social */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="https://qabas-staging-upload-bucket.s3-eu-west-1.amazonaws.com/logos/1610449678531_iQaFQ.svg"
                alt="القبس"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-xs text-gray-400 mb-4">رئيس التحرير: وليد عبداللطيف النصف</p>
            <p className="text-xs text-gray-400 mb-4">نائب رئيس التحرير: عبدالله غازي المضف</p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2">
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <TwitterIcon size={14} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <WhatsAppIcon size={15} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <TikTokIcon size={14} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <InstagramIcon size={15} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <FacebookIcon size={8} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <TwitterIcon size={16} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <YoutubeIcon size={16} color="white" />
              </span>
              <span className="social-icon !bg-white/10 hover:!bg-white/20">
                <TelegramIcon size={18} color="white" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">الأقسام</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/categories/22/" className="hover:text-white transition-colors">محليات</a></li>
              <li><a href="/categories/17/" className="hover:text-white transition-colors">كتاب وآراء</a></li>
              <li><a href="/categories/25/" className="hover:text-white transition-colors">أمن ومحاكم</a></li>
              <li><a href="/categories/3/" className="hover:text-white transition-colors">اقتصاد</a></li>
              <li><a href="/categories/10/" className="hover:text-white transition-colors">القبس الدولي</a></li>
              <li><a href="/categories/7/" className="hover:text-white transition-colors">رياضة</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/todays_issue/" className="hover:text-white transition-colors">عدد اليوم</a></li>
              <li><a href="/electrony/" className="hover:text-white transition-colors">أرشيف القبس</a></li>
              <li><a href="/allAuthors/" className="hover:text-white transition-colors">كتاب القبس</a></li>
              <li><a href="/albums/" className="hover:text-white transition-colors">معرض الصور</a></li>
              <li><a href="/categories/64746/" className="hover:text-white transition-colors">بودكاست</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>جميع الحقوق محفوظة © 2026 جريدة القبس</p>
        </div>
      </div>
    </footer>
  );
}