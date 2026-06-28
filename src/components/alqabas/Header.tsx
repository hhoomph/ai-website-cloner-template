"use client";

import { useState } from "react";
import { MenuIcon, SearchIcon, PdfIcon, UserIcon, CloseIcon } from "./icons";

const categories = [
  { name: "محليات", href: "/categories/22/" },
  { name: "كتاب وآراء", href: "/categories/17/" },
  { name: "أمن ومحاكم", href: "/categories/25/" },
  { name: "اقتصاد", href: "/categories/3/" },
  { name: "القبس الدولي", href: "/categories/10/" },
  { name: "لايت", href: "/categories/64662/" },
  { name: "القبس الثقافي", href: "/categories/64759/" },
  { name: "رياضة", href: "/categories/7/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Header Bar */}
      <div className="bg-[#262626] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          {/* Left - Menu + Logo */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
              <MenuIcon size={18} />
            </button>
            <a href="/" className="flex items-center">
              <img
                src="https://dqnxlhsgmg1ih.cloudfront.net/logos/1721913224175_osUcD.svg"
                alt="القبس"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Right - Search, PDF, User */}
          <div className="flex items-center gap-4">
            <button className="cursor-pointer">
              <SearchIcon size={18} color="white" />
            </button>
            <a href="/electrony/" className="flex items-center gap-1 text-xs text-gray-300 hover:text-white">
              <PdfIcon size={12} height={16} />
              <span>عدد اليوم</span>
            </a>
            <div className="flex items-center gap-2">
              <UserIcon size={20} />
              <button className="bg-[#005C9C] hover:bg-[#004d82] text-white text-xs px-3 py-1.5 rounded transition-colors">
                الاشتراكات
              </button>
              <span className="text-xs text-gray-300 cursor-pointer hover:text-white">تسجيل الدخول</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
            {categories.map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                className="px-3 py-1.5 text-gray-700 hover:text-[#005C9C] hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-80 bg-[#262626] text-white h-full overflow-y-auto shadow-xl" dir="rtl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">القبس</h2>
                <button onClick={() => setMenuOpen(false)} className="cursor-pointer">
                  <CloseIcon size={16} color="white" />
                </button>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <a href="/todays_issue/" className="category-tag bg-[#0282CB]">عدد اليوم</a>
                <a href="/masterclass/" className="category-tag" style={{ background: "linear-gradient(to left bottom, rgb(2, 96, 174), rgb(79, 173, 251))" }}>ماستر كلاس</a>
                <a href="/obituaries/2026-06-28/" className="category-tag" style={{ background: "linear-gradient(to left bottom, rgb(0, 0, 0), rgb(77, 77, 77))" }}>وفيات</a>
                <a href="/albums/" className="category-tag" style={{ background: "linear-gradient(to left bottom, rgb(131, 88, 213), rgb(208, 165, 255))" }}>معرض الصور</a>
                <a href="/allAuthors/" className="category-tag" style={{ background: "linear-gradient(to left bottom, rgb(88, 143, 223), rgb(165, 220, 255))" }}>كتاب القبس</a>
                <a href="/electrony/" className="category-tag" style={{ background: "linear-gradient(to left bottom, rgb(2, 96, 174), rgb(79, 173, 251))" }}>أرشيف القبس</a>
                <a href="/categories/64746/" className="category-tag col-span-2" style={{ background: "linear-gradient(to left bottom, rgb(1, 88, 163), rgb(78, 165, 240))" }}>بودكاست</a>
              </div>

              <div className="border-t border-gray-600 my-4" />

              {/* Category Links */}
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <a key={cat.href} href={cat.href} className="category-tag bg-[#005C9C]">
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}