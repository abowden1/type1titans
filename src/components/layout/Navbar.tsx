'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserNav from './UserNav'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#1E1E1E] py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`text-lg ${orbitron.className} ${pathname === '/' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
            >
              Home
            </Link>
            <Link 
              href="/spaces" 
              className={`text-lg ${orbitron.className} ${pathname === '/spaces' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
            >
              Spaces
            </Link>
            <Link 
              href="/users" 
              className={`text-lg ${orbitron.className} ${pathname === '/users' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
            >
              Users
            </Link>
          </div>
        </div>
        <UserNav />
      </div>
    </nav>
  )
} 