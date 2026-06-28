import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";

export default function RegisterPage() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">إنشاء حساب</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#005C9D]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#005C9D]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#005C9D]" />
            </div>
            <button className="w-full bg-[#005C9D] text-white py-2 rounded-sm text-sm hover:bg-[#004d82] transition-colors">تسجيل</button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            لديك حساب بالفعل؟ <a href="/auth/login" className="text-[#005C9D] hover:underline">سجل دخول</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}