'use client'

import { ReactNode } from 'react'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

interface FontProviderProps {
  children: ReactNode
}

export default function FontProvider({ children }: FontProviderProps) {
  return (
    <div className="font-headings">
      <style jsx global>{`
        .font-headings h1, 
        .font-headings h2, 
        .font-headings h3, 
        .font-headings h4, 
        .font-headings h5, 
        .font-headings h6 {
          font-family: ${orbitron.style.fontFamily};
        }
      `}</style>
      {children}
    </div>
  )
} 