'use client'

import { useState } from 'react'
import Header from "@/components/alqabas/Header";
import Footer from "@/components/alqabas/Footer";
import { authClient } from '@/lib/better-auth/auth-client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authClient.signIn.email({
        email,
        password,
      })
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen flex flex-col" style={{ fontFamily: "'AlQabas Font', 'Cairo', 'Changa', 'IBM-Plex-Sans', sans-serif" }}>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">تسجيل الدخول</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#005C9D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#005C9D]"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#005C9D] text-white py-2 rounded-sm text-sm hover:bg-[#004d82] transition-colors disabled:opacity-50"
            >
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            ليس لديك حساب؟ <a href="/auth/register" className="text-[#005C9D] hover:underline">سجل الآن</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}