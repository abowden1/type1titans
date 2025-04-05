import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ConsentProvider } from '@/contexts/ConsentContext'
import ConsentWrapper from '@/components/common/ConsentWrapper'
import FontProvider from '@/components/common/FontProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T1 Titans",
  description: "A demo site for T1 Titans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`} style={{ background: 'linear-gradient(to bottom, #00CBF3, black)' }}>
        <ConsentProvider>
          <ConsentWrapper>
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
              <FontProvider>
                {children}
              </FontProvider>
            </main>
            <Footer />
          </ConsentWrapper>
        </ConsentProvider>
      </body>
    </html>
  );
}
