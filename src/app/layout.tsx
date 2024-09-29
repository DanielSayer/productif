import '~/styles/globals.css'
import 'simplebar-react/dist/simplebar.min.css'

import { type Metadata } from 'next'
import { ThemeProvider } from '~/components/providers/theme-provider'
import { Inter } from 'next/font/google'

import Navbar from '~/components/navbar'
import { cn } from '~/lib/utils'
import { Toaster } from 'sonner'

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
    <html lang="en" className={cn('min-h-screen antialiased', inter.className)}>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
