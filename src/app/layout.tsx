import 'simplebar-react/dist/simplebar.min.css'
import '~/styles/globals.css'

import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from 'sonner'
import Navbar from '~/components/navbar'
import Providers from '~/components/providers/providers'
import { cn } from '~/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProDuctiF',
  description: 'the pdf tool',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn('min-h-screen bg-background antialiased', inter.className)}
    >
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
