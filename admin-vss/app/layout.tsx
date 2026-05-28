import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Noto_Serif } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { AuthGuard } from '@/components/shared/AuthGuard'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['vietnamese'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Việt Sử Số — Ký Ức Cộng Đồng · Di Sản Số Bền Vững',
  description: 'Nền tảng học liệu số bảo tồn và lan tỏa ký ức văn hóa Việt Nam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSerif.variable}`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
