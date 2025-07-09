import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DiagramProvider } from '@/context/DiagramContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ERDModeler - Interactive Visual Modeling Tool',
  description: 'Professional-grade ER/CDM/LDM modeling tool with JointJS+ and localStorage persistence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DiagramProvider>
          {children}
        </DiagramProvider>
      </body>
    </html>
  )
}