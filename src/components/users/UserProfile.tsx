'use client'

import Image from 'next/image'
import { User } from '@/types/user'

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-[#CBCBCB] rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image 
            src={user.profilePicture} 
            alt={`${user.firstname} ${user.lastname}`}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-2">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-gray-600 mb-4">@{user.username}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Email</h3>
              <p className="text-black">{user.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Member Since</h3>
              <p className="text-black">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Friends</h3>
              <p className="text-black">{user.friends.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 