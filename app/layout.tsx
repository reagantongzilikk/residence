import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google' // 👑 核心：在这里把 Bebas_Neue 抓进来
import './globals.css'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

// 👑 新增：声明高耸窄体大字标字体，天生全大写，视觉冲击力拉满
const bebasNeue = Bebas_Neue({
  weight: '400', // Bebas Neue 在谷歌字体库中默认只有 400 粗体
  variable: '--font-bebas', // 定义 CSS 变量名
  subsets: ['latin'],
  display: 'swap',
  
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theroomresidence.com'),
  title: 'The Room Residence | Premium Fully-Furnished Room Rentals in Sibu',
  description:
    'Transforming Rooms into Residences. Discover premium, fully-furnished room rentals across Sibu — Parkway, Kingsway, Norway, Steinway and Velway.',
  openGraph: {
    title: 'The Room Residence | Premium Fully-Furnished Room Rentals in Sibu',
    description: 'Transforming Rooms into Residences. Discover premium, fully-furnished room rentals across Sibu — Parkway, Kingsway, Norway, Steinway and Velway.',
    url: 'https://theroomresidence.com',
    siteName: 'The Room Residence',
    images: [
      {
        url: '/images/og-cover.webp',
        width: 1200,
        height: 630,
        alt: 'The Room Residence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Room Residence',
    description: 'Premium, fully-furnished room rentals across Sibu.',
    images: ['/images/og-cover.webp'],
  },
  icons: {
    icon: [
      {
        url: '/The Room Residence Logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/The Room Residence Logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/The Room Residence Logo.png',
        type: 'image/png',
      },
    ],
    apple: '/The Room Residence Logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      // 👑 核心：把 ${bebasNeue.variable} 灌进 html className 里，让全局组件都能调用它
      className={`${inter.variable} ${bebasNeue.variable} bg-[#1A1A1A] overscroll-none`}
      style={{ backgroundColor: '#1A1A1A' }} 
    >
      <body className="font-sans antialiased bg-[#1A1A1A] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}