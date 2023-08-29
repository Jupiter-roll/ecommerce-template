import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from "./Providers";
import styles from '../styles/page.module.css';
import { Navbar } from "../components/Navbar";
import { ProductProvider } from '../helpers/ProductContext';
import { CartProvider } from '../helpers/CartContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store Template',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <main className={styles.main}>
            <ProductProvider>
              <CartProvider>
                <Navbar />
                {children}
              </CartProvider>
            </ProductProvider>
          </main>
        </body>
      </Providers>
    </html>
  )
}
