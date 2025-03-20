'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {


  return (
    <RecoilRoot>
      <html lang="en">
        <Head>
          <title>Campus Coder</title>
          <meta name='description' content='Home' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>

        <body className={`${inter.className}`}>
            {children}
            <Toaster />
        </body>

      </html>
    </RecoilRoot >
  )
}
