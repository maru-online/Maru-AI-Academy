import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Header, Footer } from './components/layouts'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Maru AI Academy - Master AI Productivity',
  description: 'AI Productivity Training Platform - Learn to use AI effectively in your business. From basic concepts to advanced team automation.',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  keywords: ['AI training', 'AI productivity', 'business automation', 'AI academy'],
  authors: [{ name: 'Maru AI Academy' }],
  openGraph: {
    title: 'Maru AI Academy - Master AI Productivity',
    description: 'Transform your business workflows with AI. Learn from basic concepts to advanced automation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

