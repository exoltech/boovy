import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './theme-enhancements.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boovy - Vibe-Based Coding Platform',
  description: 'Generate full-stack web applications from natural language prompts using AI',
  keywords: ['AI', 'code generation', 'web development', 'Claude API', 'full-stack'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

