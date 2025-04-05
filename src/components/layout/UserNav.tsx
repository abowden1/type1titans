'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser } from '@/services/dataService'
import { User } from '@/types/user'

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // Load current user data
    const loadUser = () => {
      try {
        const user = getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    loadUser()
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
      >
        {currentUser ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={currentUser.profilePicture}
              alt={`${currentUser.firstname} ${currentUser.lastname}`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] rounded-md shadow-lg py-1 z-10">
          {currentUser ? (
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-white font-medium">{currentUser.firstname} {currentUser.lastname}</p>
              <p className="text-gray-400 text-sm">@{currentUser.username}</p>
            </div>
          ) : null}
          <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
            Profile
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-white hover:bg-gray-700">
            Settings
          </Link>
          <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700">
            Sign out
          </button>
        </div>
      )}
    </div>
  )
} 