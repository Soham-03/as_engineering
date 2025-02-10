// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })

const tanNimbus = localFont({
  src: '../../public/TAN-NIMBUS.ttf',  // Updated path with ../../
  display: 'swap',
  variable: '--font-tan-nimbus'
})

export const metadata: Metadata = {
  title: 'A.S. Engineering Works',
  description: 'Leading manufacturer of food processing machines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={`${tanNimbus.variable}`}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  )
}